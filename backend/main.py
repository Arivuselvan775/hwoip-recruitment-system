import os
from uuid import uuid4

from fastapi import Depends, FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, EmailStr
import psycopg2
from psycopg2.extras import RealDictCursor

DEFAULT_DATABASE_URL = "postgresql://postgres.njkalmdhlpsmmgxscvri:.2589630147894@aws-0-ap-northeast-1.pooler.supabase.com:6543/postgres"


def build_database_url(raw_url: str) -> str:
    if not raw_url:
        raw_url = DEFAULT_DATABASE_URL
    if "sslmode=" in raw_url:
        return raw_url
    separator = "&" if "?" in raw_url else "?"
    return f"{raw_url}{separator}sslmode=require"


DATABASE_URL = build_database_url(os.getenv("DATABASE_URL", DEFAULT_DATABASE_URL))

app = FastAPI(title="HWOIP - Recruitment & Selection Platform")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


def get_db():
    try:
        conn = psycopg2.connect(DATABASE_URL, cursor_factory=RealDictCursor)
    except Exception as exc:
        raise HTTPException(status_code=500, detail=f"Database connection failed: {exc}") from exc
    try:
        yield conn
    finally:
        conn.close()


def ensure_schema() -> None:
    conn = psycopg2.connect(DATABASE_URL, cursor_factory=RealDictCursor)
    try:
        with conn.cursor() as cursor:
            cursor.execute("CREATE EXTENSION IF NOT EXISTS pgcrypto;")
            cursor.execute(
                """
                CREATE TABLE IF NOT EXISTS roles (
                    id SERIAL PRIMARY KEY,
                    role_name VARCHAR(50) UNIQUE NOT NULL,
                    description TEXT,
                    created_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP
                );
                """
            )
            cursor.execute(
                """
                INSERT INTO roles (role_name, description)
                SELECT 'DELIVERY_HEAD', 'Delivery leadership'
                WHERE NOT EXISTS (SELECT 1 FROM roles WHERE role_name = 'DELIVERY_HEAD');
                """
            )
            cursor.execute(
                """
                INSERT INTO roles (role_name, description)
                SELECT 'HR_EXECUTIVE', 'HR operations and recruitment coordination'
                WHERE NOT EXISTS (SELECT 1 FROM roles WHERE role_name = 'HR_EXECUTIVE');
                """
            )
            cursor.execute(
                """
                INSERT INTO roles (role_name, description)
                SELECT 'HR_MANAGER', 'HR planning and team management'
                WHERE NOT EXISTS (SELECT 1 FROM roles WHERE role_name = 'HR_MANAGER');
                """
            )
            cursor.execute(
                """
                INSERT INTO roles (role_name, description)
                SELECT 'OPERATIONS_MANAGER', 'Operational leadership'
                WHERE NOT EXISTS (SELECT 1 FROM roles WHERE role_name = 'OPERATIONS_MANAGER');
                """
            )
            cursor.execute(
                """
                INSERT INTO roles (role_name, description)
                SELECT 'TRAINER', 'Training and onboarding support'
                WHERE NOT EXISTS (SELECT 1 FROM roles WHERE role_name = 'TRAINER');
                """
            )
            cursor.execute(
                """
                INSERT INTO roles (role_name, description)
                SELECT 'MANAGEMENT', 'Senior leadership access'
                WHERE NOT EXISTS (SELECT 1 FROM roles WHERE role_name = 'MANAGEMENT');
                """
            )
            cursor.execute(
                """
                INSERT INTO roles (role_name, description)
                SELECT 'SYSTEM_ADMINISTRATOR', 'Platform administration'
                WHERE NOT EXISTS (SELECT 1 FROM roles WHERE role_name = 'SYSTEM_ADMINISTRATOR');
                """
            )
            cursor.execute(
                """
                CREATE TABLE IF NOT EXISTS users (
                    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
                    username VARCHAR(100) UNIQUE NOT NULL,
                    email VARCHAR(255) UNIQUE NOT NULL,
                    password_hash TEXT NOT NULL,
                    role_id INT NOT NULL REFERENCES roles(id) ON DELETE RESTRICT,
                    is_active BOOLEAN NOT NULL DEFAULT TRUE,
                    created_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP
                );
                """
            )
            cursor.execute(
                """
                INSERT INTO users (username, email, password_hash, role_id, is_active)
                SELECT 'delivery_boss', 'deliveryhead@hwoip.com', 'Delivery@123', r.id, TRUE
                FROM roles r
                WHERE r.role_name = 'DELIVERY_HEAD'
                AND NOT EXISTS (SELECT 1 FROM users u WHERE u.username = 'delivery_boss');
                """
            )
            cursor.execute(
                """
                INSERT INTO users (username, email, password_hash, role_id, is_active)
                SELECT 'hr_exec1', 'hrexecutive@hwoip.com', 'HrExec@123', r.id, TRUE
                FROM roles r
                WHERE r.role_name = 'HR_EXECUTIVE'
                AND NOT EXISTS (SELECT 1 FROM users u WHERE u.username = 'hr_exec1');
                """
            )
            cursor.execute(
                """
                INSERT INTO users (username, email, password_hash, role_id, is_active)
                SELECT 'hr_mgr1', 'hrmanager@hwoip.com', 'HrMgr@123', r.id, TRUE
                FROM roles r
                WHERE r.role_name = 'HR_MANAGER'
                AND NOT EXISTS (SELECT 1 FROM users u WHERE u.username = 'hr_mgr1');
                """
            )
            cursor.execute(
                """
                INSERT INTO users (username, email, password_hash, role_id, is_active)
                SELECT 'ops_mgr1', 'opsmanager@hwoip.com', 'OpsMgr@123', r.id, TRUE
                FROM roles r
                WHERE r.role_name = 'OPERATIONS_MANAGER'
                AND NOT EXISTS (SELECT 1 FROM users u WHERE u.username = 'ops_mgr1');
                """
            )
            cursor.execute(
                """
                INSERT INTO users (username, email, password_hash, role_id, is_active)
                SELECT 'trainer1', 'trainer@hwoip.com', 'Trainer@123', r.id, TRUE
                FROM roles r
                WHERE r.role_name = 'TRAINER'
                AND NOT EXISTS (SELECT 1 FROM users u WHERE u.username = 'trainer1');
                """
            )
            cursor.execute(
                """
                INSERT INTO users (username, email, password_hash, role_id, is_active)
                SELECT 'mgmt_exec', 'management@hwoip.com', 'Mgmt@123', r.id, TRUE
                FROM roles r
                WHERE r.role_name = 'MANAGEMENT'
                AND NOT EXISTS (SELECT 1 FROM users u WHERE u.username = 'mgmt_exec');
                """
            )
            cursor.execute(
                """
                INSERT INTO users (username, email, password_hash, role_id, is_active)
                SELECT 'sys_admin', 'admin@hwoip.com', 'Admin@123', r.id, TRUE
                FROM roles r
                WHERE r.role_name = 'SYSTEM_ADMINISTRATOR'
                AND NOT EXISTS (SELECT 1 FROM users u WHERE u.username = 'sys_admin');
                """
            )
            cursor.execute(
                """
                CREATE TABLE IF NOT EXISTS candidates (
                    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
                    username VARCHAR(100) UNIQUE,
                    email VARCHAR(255) NOT NULL,
                    password_hash TEXT,
                    full_name VARCHAR(150) NOT NULL,
                    phone_number VARCHAR(20),
                    address TEXT,
                    gender VARCHAR(20),
                    degree VARCHAR(150),
                    graduation_year INTEGER,
                    experience_years NUMERIC(4,2),
                    skills TEXT,
                    current_company VARCHAR(150),
                    expected_salary VARCHAR(50),
                    cover_letter TEXT,
                    resume_file_name VARCHAR(255),
                    resume_file_url TEXT,
                    source_channel VARCHAR(50) NOT NULL DEFAULT 'PUBLIC_FORM',
                    current_status VARCHAR(50) NOT NULL DEFAULT 'APPLIED',
                    is_active BOOLEAN NOT NULL DEFAULT TRUE,
                    created_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
                    updated_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP
                );
                """
            )
            cursor.execute(
                """
                CREATE TABLE IF NOT EXISTS jobs (
                    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
                    job_code VARCHAR(50) UNIQUE,
                    title VARCHAR(150) NOT NULL,
                    department_name VARCHAR(100),
                    location VARCHAR(100),
                    employment_type VARCHAR(30) NOT NULL DEFAULT 'FULL_TIME',
                    experience_required VARCHAR(50),
                    salary_min NUMERIC(12,2),
                    salary_max NUMERIC(12,2),
                    skills_required TEXT,
                    job_description TEXT,
                    status VARCHAR(30) NOT NULL DEFAULT 'PUBLISHED',
                    created_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
                    updated_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP
                );
                """
            )
            cursor.execute(
                """
                CREATE TABLE IF NOT EXISTS candidate_applications (
                    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
                    candidate_id UUID NOT NULL REFERENCES candidates(id) ON DELETE CASCADE,
                    job_id UUID NOT NULL REFERENCES jobs(id) ON DELETE RESTRICT,
                    application_status VARCHAR(30) NOT NULL DEFAULT 'APPLIED',
                    cover_letter TEXT,
                    resume_file_name VARCHAR(255),
                    resume_file_url TEXT,
                    source_channel VARCHAR(50) NOT NULL DEFAULT 'PUBLIC_FORM',
                    applied_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
                    updated_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
                    CONSTRAINT uq_candidate_job UNIQUE (candidate_id, job_id)
                );
                """
            )
            cursor.execute(
                """
                CREATE TABLE IF NOT EXISTS candidate_availability_slots (
                    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
                    application_id UUID NOT NULL REFERENCES candidate_applications(id) ON DELETE CASCADE,
                    slot_date DATE NOT NULL,
                    start_time TIME NOT NULL,
                    end_time TIME NOT NULL,
                    created_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
                    updated_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
                    CONSTRAINT chk_slot_times CHECK (end_time > start_time)
                );
                """
            )
        conn.commit()
    except Exception:
        conn.rollback()
        raise
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
def read_root() -> dict:
    return {"status": "Online", "message": "Welcome to HWOIP Recruitment API Setup!"}


@app.get("/health")
def health_check() -> dict:
    return {"status": "ok"}


@app.get("/api/jobs")
def list_jobs(conn=Depends(get_db)) -> dict:
    cursor = conn.cursor()
    cursor.execute(
        """
        SELECT j.id, j.title, COALESCE(d.department_name, j.department_name) AS dept,
               j.location, j.employment_type AS job_type,
               j.experience_required AS exp, j.salary_min, j.salary_max,
               j.skills_required AS skills, j.job_description AS jd
        FROM jobs j
        LEFT JOIN departments d ON j.department_id = d.id
        WHERE j.status <> 'DRAFT'
        ORDER BY j.created_at DESC
        LIMIT 20;
        """
    )
    rows = cursor.fetchall()

    if rows:
        jobs = []
        for row in rows:
            salary = None
            if row["salary_min"] is not None or row["salary_max"] is not None:
                if row["salary_min"] is not None and row["salary_max"] is not None:
                    salary = f"₹{row['salary_min']}-{row['salary_max']}"
                elif row["salary_min"] is not None:
                    salary = f"₹{row['salary_min']}+"
                elif row["salary_max"] is not None:
                    salary = f"Up to ₹{row['salary_max']}"
            jobs.append(
                {
                    "id": str(row["id"]),
                    "title": row["title"],
                    "dept": row["dept"] or "General",
                    "exp": row["exp"] or "Not specified",
                    "salary": salary or "Competitive",
                    "location": row["location"] or "Remote",
                    "type": row["job_type"] or "FULL_TIME",
                    "skills": row["skills"] or "Open",
                    "jd": row["jd"] or "Exciting opportunity with HWOIP.",
                }
            )
        return {"jobs": jobs}

    return {
        "jobs": [
            {
                "id": "seed-1",
                "title": "React Developer",
                "dept": "Frontend",
                "exp": "2+ Years",
                "salary": "6-10 LPA",
                "location": "Remote",
                "type": "Remote",
                "skills": "React, JavaScript",
                "jd": "Build scalable user interfaces for healthcare workforce products and collaborate with design and backend teams.",
            },
            {
                "id": "seed-2",
                "title": "FastAPI Backend",
                "dept": "Backend",
                "exp": "3+ Years",
                "salary": "8-12 LPA",
                "location": "Hybrid",
                "type": "Hybrid",
                "skills": "Python, FastAPI",
                "jd": "Design REST APIs and data models for recruitment workflows, integrations, and reporting.",
            },
        ]
    }


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
            (candidate_id, data.username, str(data.email), data.password, data.full_name, data.mobile_number),
        )
        conn.commit()
        return {"status": "success", "message": "Candidate registered successfully!"}
    except psycopg2.errors.UniqueViolation:
        conn.rollback()
        raise HTTPException(status_code=400, detail="Username, email, or mobile number already exists.") from None
    except Exception as exc:
        conn.rollback()
        raise HTTPException(status_code=500, detail=str(exc)) from exc


@app.post("/api/auth/login")
def login(data: LoginSchema, conn=Depends(get_db)):
    cursor = conn.cursor()

    cursor.execute(
        """
        SELECT id, username, email, password_hash
        FROM candidates
        WHERE username = %s OR email = %s;
        """,
        (data.username_or_email, data.username_or_email),
    )
    candidate = cursor.fetchone()

    if candidate:
        db_password = str(candidate["password_hash"]).strip()
        input_password = str(data.password).strip()
        if db_password == input_password:
            return {
                "status": "success",
                "user": {
                    "id": str(candidate["id"]),
                    "username": candidate["username"],
                    "email": candidate["email"],
                    "role": "CANDIDATE",
                },
            }

    cursor.execute(
        """
        SELECT u.id, u.username, u.email, u.password_hash, r.role_name
        FROM users u
        JOIN roles r ON u.role_id = r.id
        WHERE u.username = %s OR u.email = %s;
        """,
        (data.username_or_email, data.username_or_email),
    )
    user = cursor.fetchone()

    if not user:
        raise HTTPException(status_code=401, detail="Authentication failed: User account not found.")

    db_password = str(user["password_hash"]).strip()
    input_password = str(data.password).strip()

    if db_password != input_password:
        raise HTTPException(status_code=401, detail="Authentication failed: Invalid password credentials.")

    return {
        "status": "success",
        "user": {
            "id": str(user["id"]),
            "username": user["username"],
            "email": user["email"],
            "role": user["role_name"],
        },
    }


@app.post("/api/applications/submit")
def submit_application(data: ApplicationSubmissionSchema, conn=Depends(get_db)):
    # Validate slots
    if len(data.slots) < 3 or len(data.slots) > 10:
        raise HTTPException(status_code=400, detail=f"Must provide between 3 and 10 availability slots. Provided: {len(data.slots)}")
    
    # Validate each slot has valid time range
    for i, slot in enumerate(data.slots):
        if not slot.date or not slot.startTime or not slot.endTime:
            raise HTTPException(status_code=400, detail=f"Slot {i+1}: All fields (date, start time, end time) are required.")
        if slot.startTime >= slot.endTime:
            raise HTTPException(status_code=400, detail=f"Slot {i+1}: End time must be after start time.")
    
    cursor = conn.cursor()
    try:
        username_base = str(data.email).split("@", 1)[0].replace(".", "_")
        username = f"{username_base}_{uuid4().hex[:6]}"

        experience_years = None
        if data.experience:
            try:
                experience_years = float(str(data.experience).replace("years", "").replace("Years", "").strip())
            except ValueError:
                experience_years = None

        candidate_id = str(uuid4())
        cursor.execute(
            """
            INSERT INTO candidates (
                id, username, email, password_hash, full_name, phone_number, address, gender,
                degree, graduation_year, experience_years, skills, current_company, expected_salary,
                cover_letter, resume_file_name, resume_file_url, source_channel, current_status
            )
            VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s);
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
                experience_years,
                data.skills,
                data.currentCompany,
                data.expectedSalary,
                data.coverLetter,
                data.resumeName,
                data.resumeData,
                "PUBLIC_FORM",
                "APPLIED",
            ),
        )

        # Resolve department: find existing department id by name or create one
        department_id = None
        if data.department:
            cursor.execute(
                """
                SELECT id FROM departments WHERE department_name = %s LIMIT 1;
                """,
                (data.department,)
            )
            dept_row = cursor.fetchone()
            if dept_row:
                department_id = str(dept_row["id"])
            else:
                # create department
                department_id = str(uuid4())
                cursor.execute(
                    """
                    INSERT INTO departments (id, department_name, description)
                    VALUES (%s, %s, %s);
                    """,
                    (department_id, data.department, None),
                )

        # Try to find existing job by title and department_id (if available), else by title only
        if department_id:
            cursor.execute(
                """
                SELECT j.id FROM jobs j WHERE j.title = %s AND j.department_id = %s LIMIT 1;
                """,
                (data.jobTitle, department_id),
            )
        else:
            cursor.execute(
                """
                SELECT j.id FROM jobs j WHERE j.title = %s LIMIT 1;
                """,
                (data.jobTitle,),
            )

        existing_job = cursor.fetchone()
        if existing_job:
            job_id = str(existing_job["id"])
        else:
            job_id = str(uuid4())
            cursor.execute(
                """
                INSERT INTO jobs (id, job_code, title, department_id, location, employment_type,
                                 experience_required, salary_min, salary_max, skills_required, job_description, status)
                VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s);
                """,
                (
                    job_id,
                    f"JOB-{uuid4().hex[:8]}",
                    data.jobTitle,
                    department_id,
                    data.location,
                    data.employmentType,
                    data.experienceRequired,
                    None,
                    None,
                    data.skillsRequired,
                    data.fullJobDescription,
                    "PUBLISHED",
                ),
            )

        application_id = str(uuid4())
        cursor.execute(
            """
            INSERT INTO candidate_applications (
                id, candidate_id, job_id, application_status, cover_letter, resume_file_name, resume_file_url, source_channel
            )
            VALUES (%s, %s, %s, %s, %s, %s, %s, %s);
            """,
            (
                application_id,
                candidate_id,
                job_id,
                "APPLIED",
                data.coverLetter,
                data.resumeName,
                data.resumeData,
                "PUBLIC_FORM",
            ),
        )

        for slot in data.slots:
            cursor.execute(
                """
                INSERT INTO candidate_availability_slots (id, application_id, slot_date, start_time, end_time)
                VALUES (%s, %s, %s, %s, %s);
                """,
                (str(uuid4()), application_id, slot.date, slot.startTime, slot.endTime),
            )

        conn.commit()
        return {"status": "success", "message": "Job application submitted successfully."}
    except psycopg2.errors.UniqueViolation as exc:
        conn.rollback()
        if "email" in str(exc):
            raise HTTPException(status_code=400, detail="This email is already registered.") from exc
        if "username" in str(exc):
            raise HTTPException(status_code=400, detail="This username is already taken. Please use a different email.") from exc
        raise HTTPException(status_code=400, detail="This record already exists.") from exc
    except Exception as exc:
        conn.rollback()
        raise HTTPException(status_code=500, detail=str(exc)) from exc


if __name__ == "__main__":
    import uvicorn

    uvicorn.run(app, host="127.0.0.1", port=8000, reload=True)