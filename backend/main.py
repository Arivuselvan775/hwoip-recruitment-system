from fastapi import FastAPI, HTTPException, Depends
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, EmailStr
import psycopg2
from psycopg2.extras import RealDictCursor

app = FastAPI(title="HWOIP - Recruitment & Selection Platform")

# Enable CORS so Navani's React app can access this backend safely
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

# Pydantic Schemas for Request Validation
class CandidateRegisterSchema(BaseModel):
    username: str
    email: EmailStr
    password: str
    full_name: str
    mobile_number: str

class LoginSchema(BaseModel):
    username_or_email: str
    password: str

    # Intha simple GET route ah add pannunga
@app.get("/")
def read_root():
    return {"status": "Online", "message": "Welcome to HWOIP Recruitment API Setup!"}

# 1. CANDIDATE REGISTRATION ENDPOINT
@app.post("/api/auth/register")
def register_candidate(data: CandidateRegisterSchema, conn=Depends(get_db)):
    cursor = conn.cursor()
    try:
        # Enforce that registration defaults solely to the CANDIDATE role
        cursor.execute("SELECT id FROM roles WHERE role_name = 'CANDIDATE';")
        role_res = cursor.fetchone()
        candidate_role_id = role_res['id']

        # Insert User credentials into the core Auth table
        cursor.execute(
            """
            INSERT INTO users (username, email, password_hash, role_id)
            VALUES (%s, %s, %s, %s) RETURNING id;
            """,
            (data.username, data.email, data.password, candidate_role_id) # Using simple mock strings for Day 1
        )
        user_id = cursor.fetchone()['id']

        # Construct matching profile entry within the candidate domain space
        cursor.execute(
            """
            INSERT INTO candidate_profiles (id, full_name, mobile_number, current_status)
            VALUES (%s, %s, %s, 'Applied');
            """,
            (user_id, data.full_name, data.mobile_number)
        )
        
        conn.commit()
        return {"status": "success", "message": "Candidate registered successfully!"}
    
    except psycopg2.errors.UniqueViolation:
        conn.rollback()
        raise HTTPException(status_code=400, detail="Username, email, or mobile number already exists.")
    except Exception as e:
        conn.rollback()
        raise HTTPException(status_code=500, detail=str(e))

# 2. LOGIN API (UPDATED FOR EXACT STRING MATCHING)
@app.post("/api/auth/login")
def login(data: LoginSchema, conn=Depends(get_db)):
    cursor = conn.cursor()
    
    # Selecting the corresponding matching user profile entries
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

    # Checking if user exists in the database
    if not user:
        raise HTTPException(status_code=401, detail="🚨 Account text check failed: User template found illai!")

    # Strip function uses space alignments handling to prevent copy-paste spaces
    db_password = str(user['password_hash']).strip()
    input_password = str(data.password).strip()

    if db_password != input_password:
        raise HTTPException(status_code=401, detail="🚨 Password Mismatch: Database hash match aagala!")

    return {
        "status": "success",
        "user": {
            "id": str(user['id']),
            "username": user['username'],
            "email": user['email'],
            "role": user['role_name']
        }
    }

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("main:app", host="127.0.0.1", port=8000, reload=True)