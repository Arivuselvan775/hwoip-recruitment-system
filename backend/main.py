from uuid import uuid4
from fastapi import FastAPI, HTTPException, Depends
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, EmailStr
import psycopg2
from psycopg2.extras import RealDictCursor

app = FastAPI(title="HWOIP - Recruitment & Selection Platform")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

SQLALCHEMY_DATABASE_URL = "postgresql://postgres.piuhurxlsbegvozbciix:.2589630147894@aws-1-ap-south-1.pooler.supabase.com:6543/postgres"


def get_db():
    try:
        conn = psycopg2.connect(SQLALCHEMY_DATABASE_URL, cursor_factory=RealDictCursor)
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Database connection failed: {e}")
    try:
        yield conn
    finally:
        conn.close()


def ensure_schema():
    try:
        conn = psycopg2.connect(SQLALCHEMY_DATABASE_URL, cursor_factory=RealDictCursor)
        cursor = conn.cursor()
        cursor.execute(
            """
            CREATE TABLE IF NOT EXISTS candidates (
                id UUID PRIMARY KEY,
                username VARCHAR(50) UNIQUE NOT NULL,
                email VARCHAR(100) UNIQUE NOT NULL,
                password_hash TEXT NOT NULL,
                full_name VARCHAR(150) NOT NULL,
                phone_number VARCHAR(20),
                address TEXT,
                gender VARCHAR(20),
                degree VARCHAR(100),
                graduation_year INTEGER,
                experience VARCHAR(100),
                skills TEXT,
                current_company VARCHAR(100),
                expected_salary VARCHAR(50),
                cover_letter TEXT,
                resume_name TEXT,
                resume_data TEXT,
                created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
            );
            """
        )
        cursor.execute(
            """
            CREATE TABLE IF NOT EXISTS candidate_applications (
                id UUID PRIMARY KEY,
                candidate_id UUID REFERENCES candidates(id) ON DELETE CASCADE,
                job_title VARCHAR(150) NOT NULL,
                department VARCHAR(100),
                experience_required VARCHAR(100),
                salary_range VARCHAR(100),
                location VARCHAR(100),
                employment_type VARCHAR(50),
                skills_required TEXT,
                full_job_description TEXT,
                application_status VARCHAR(50) DEFAULT 'Applied',
                applied_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
            );
            """
        )
        cursor.execute(
            """
            CREATE TABLE IF NOT EXISTS candidate_availability_slots (
                id UUID PRIMARY KEY,
                application_id UUID REFERENCES candidate_applications(id) ON DELETE CASCADE,
                slot_date DATE NOT NULL,
                start_time TIME NOT NULL,
                end_time TIME NOT NULL,
                created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
            );
            """
        )
        conn.commit()
    except Exception:
        conn.rollback()
    finally:
        conn.close()


ensure_schema()


class CandidateRegisterSchema(BaseModel):
    username: str
    email: EmailStr
    password: str
    full_name: str
    mobile_number: str


class LoginSchema(BaseModel):
    username_or_email: str
    password: str


class ApplicationSlotSchema(BaseModel):
    date: str
    startTime: str
    endTime: str


class ApplicationSubmissionSchema(BaseModel):
    email: EmailStr
    password: str
    fullName: str
    phoneNumber: str
    address: str
    gender: str
    degree: str
    graduationYear: int | None = None
    experience: str
    skills: str
    currentCompany: str
    expectedSalary: str
    coverLetter: str
    resumeName: str
    resumeData: str
    jobTitle: str
    department: str
    experienceRequired: str
    salaryRange: str
    location: str
    employmentType: str
    skillsRequired: str
    fullJobDescription: str
    slots: list[ApplicationSlotSchema]


@app.get("/")
def read_root():
    return {"status": "Online", "message": "Welcome to HWOIP Recruitment API Setup!"}


@app.post("/api/auth/register")
def register_candidate(data: CandidateRegisterSchema, conn=Depends(get_db)):
    cursor = conn.cursor()
    try:
        candidate_id = str(uuid4())
        cursor.execute(
            """
            INSERT INTO candidates (id, username, email, password_hash, full_name, phone_number)
            VALUES (%s, %s, %s, %s, %s, %s);
            """,
            (candidate_id, data.username, str(data.email), data.password, data.full_name, data.mobile_number)
        )
        conn.commit()
        return {"status": "success", "message": "Candidate registered successfully!"}
    except psycopg2.errors.UniqueViolation:
        conn.rollback()
        raise HTTPException(status_code=400, detail="Username, email, or mobile number already exists.")
    except Exception as e:
        conn.rollback()
        raise HTTPException(status_code=500, detail=str(e))


@app.post("/api/auth/login")
def login(data: LoginSchema, conn=Depends(get_db)):
    cursor = conn.cursor()

    cursor.execute(
        """
        SELECT id, username, email, password_hash
        FROM candidates
        WHERE username = %s OR email = %s;
        """,
        (data.username_or_email, data.username_or_email)
    )
    candidate = cursor.fetchone()

    if candidate:
        db_password = str(candidate['password_hash']).strip()
        input_password = str(data.password).strip()
        if db_password == input_password:
            return {
                "status": "success",
                "user": {
                    "id": str(candidate['id']),
                    "username": candidate['username'],
                    "email": candidate['email'],
                    "role": "CANDIDATE"
                }
            }

    cursor.execute(
        """
        SELECT u.id, u.username, u.email, u.password_hash, r.role_name
        FROM users u
        JOIN roles r ON u.role_id = r.id
        WHERE u.username = %s OR u.email = %s;
        """,
        (data.username_or_email, data.username_or_email)
    )
    user = cursor.fetchone()

    if not user:
        raise HTTPException(status_code=401, detail="Authentication failed: User account not found.")

    db_password = str(user['password_hash']).strip()
    input_password = str(data.password).strip()

    if db_password != input_password:
        raise HTTPException(status_code=401, detail="Authentication failed: Invalid password credentials.")

    return {
        "status": "success",
        "user": {
            "id": str(user['id']),
            "username": user['username'],
            "email": user['email'],
            "role": user['role_name']
        }
    }


@app.post("/api/applications/submit")
def submit_application(data: ApplicationSubmissionSchema, conn=Depends(get_db)):
    cursor = conn.cursor()
    try:
        # Generate username from email
        username = data.email.split('@')[0]
        
        candidate_id = str(uuid4())
        cursor.execute(
            """
            INSERT INTO candidates (
                id, username, email, password_hash, full_name, phone_number, address, gender,
                degree, graduation_year, experience, skills, current_company, expected_salary,
                cover_letter, resume_name, resume_data
            )
            VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s);
            """,
            (
                candidate_id,
                username,
                str(data.email),
                data.password,
                data.fullName,
                data.phoneNumber,
                data.address,
                data.gender,
                data.degree,
                data.graduationYear,
                data.experience,
                data.skills,
                data.currentCompany,
                data.expectedSalary,
                data.coverLetter,
                data.resumeName,
                data.resumeData,
            )
        )

        application_id = str(uuid4())
        cursor.execute(
            """
            INSERT INTO candidate_applications (
                id, candidate_id, job_title, department, experience_required, salary_range,
                location, employment_type, skills_required, full_job_description
            )
            VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s);
            """,
            (
                application_id,
                candidate_id,
                data.jobTitle,
                data.department,
                data.experienceRequired,
                data.salaryRange,
                data.location,
                data.employmentType,
                data.skillsRequired,
                data.fullJobDescription,
            )
        )

        for slot in data.slots:
            slot_id = str(uuid4())
            cursor.execute(
                """
                INSERT INTO candidate_availability_slots (id, application_id, slot_date, start_time, end_time)
                VALUES (%s, %s, %s, %s, %s);
                """,
                (slot_id, application_id, slot.date, slot.startTime, slot.endTime)
            )

        conn.commit()
        return {"status": "success", "message": "Job application submitted successfully."}
    except psycopg2.errors.UniqueViolation as e:
        conn.rollback()
        if 'email' in str(e):
            raise HTTPException(status_code=400, detail="This email is already registered.")
        elif 'username' in str(e):
            raise HTTPException(status_code=400, detail="This username is already taken. Please use a different email.")
        else:
            raise HTTPException(status_code=400, detail="This record already exists.")
    except Exception as e:
        conn.rollback()
        print(f"Error during application submission: {e}")
        raise HTTPException(status_code=500, detail=str(e))


if __name__ == "__main__":
    import uvicorn
    uvicorn.run("main:app", host="127.0.0.1", port=8000, reload=True)