-- Recruitment Management System schema for Supabase PostgreSQL
-- This schema intentionally keeps login roles limited to 7 internal roles.
-- Public candidates can apply without a login account.

CREATE EXTENSION IF NOT EXISTS "pgcrypto";

CREATE TABLE IF NOT EXISTS roles (
    id SERIAL PRIMARY KEY,
    role_name VARCHAR(50) UNIQUE NOT NULL,
    description TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO roles (role_name, description)
SELECT 'DELIVERY_HEAD', 'Delivery leadership'
WHERE NOT EXISTS (SELECT 1 FROM roles WHERE role_name = 'DELIVERY_HEAD');

INSERT INTO roles (role_name, description)
SELECT 'HR_EXECUTIVE', 'HR operations and recruitment coordination'
WHERE NOT EXISTS (SELECT 1 FROM roles WHERE role_name = 'HR_EXECUTIVE');

INSERT INTO roles (role_name, description)
SELECT 'HR_MANAGER', 'HR planning and team management'
WHERE NOT EXISTS (SELECT 1 FROM roles WHERE role_name = 'HR_MANAGER');

INSERT INTO roles (role_name, description)
SELECT 'OPERATIONS_MANAGER', 'Operational leadership'
WHERE NOT EXISTS (SELECT 1 FROM roles WHERE role_name = 'OPERATIONS_MANAGER');

INSERT INTO roles (role_name, description)
SELECT 'TRAINER', 'Training and onboarding support'
WHERE NOT EXISTS (SELECT 1 FROM roles WHERE role_name = 'TRAINER');

INSERT INTO roles (role_name, description)
SELECT 'MANAGEMENT', 'Senior leadership access'
WHERE NOT EXISTS (SELECT 1 FROM roles WHERE role_name = 'MANAGEMENT');

INSERT INTO roles (role_name, description)
SELECT 'SYSTEM_ADMINISTRATOR', 'Platform administration'
WHERE NOT EXISTS (SELECT 1 FROM roles WHERE role_name = 'SYSTEM_ADMINISTRATOR');

CREATE TABLE IF NOT EXISTS users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    username VARCHAR(100) UNIQUE NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash TEXT NOT NULL,
    role_id INT NOT NULL REFERENCES roles(id) ON DELETE RESTRICT,
    is_active BOOLEAN NOT NULL DEFAULT TRUE,
    last_login_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- Seed mock accounts for the 7 internal roles (demo data only)
INSERT INTO users (username, email, password_hash, role_id, is_active)
SELECT 'delivery_boss', 'deliveryhead@hwoip.com', 'Delivery@123', r.id, TRUE
FROM roles r
WHERE r.role_name = 'DELIVERY_HEAD'
AND NOT EXISTS (SELECT 1 FROM users u WHERE u.username = 'delivery_boss');

INSERT INTO users (username, email, password_hash, role_id, is_active)
SELECT 'hr_exec1', 'hrexecutive@hwoip.com', 'HrExec@123', r.id, TRUE
FROM roles r
WHERE r.role_name = 'HR_EXECUTIVE'
AND NOT EXISTS (SELECT 1 FROM users u WHERE u.username = 'hr_exec1');

INSERT INTO users (username, email, password_hash, role_id, is_active)
SELECT 'hr_mgr1', 'hrmanager@hwoip.com', 'HrMgr@123', r.id, TRUE
FROM roles r
WHERE r.role_name = 'HR_MANAGER'
AND NOT EXISTS (SELECT 1 FROM users u WHERE u.username = 'hr_mgr1');

INSERT INTO users (username, email, password_hash, role_id, is_active)
SELECT 'ops_mgr1', 'opsmanager@hwoip.com', 'OpsMgr@123', r.id, TRUE
FROM roles r
WHERE r.role_name = 'OPERATIONS_MANAGER'
AND NOT EXISTS (SELECT 1 FROM users u WHERE u.username = 'ops_mgr1');

INSERT INTO users (username, email, password_hash, role_id, is_active)
SELECT 'trainer1', 'trainer@hwoip.com', 'Trainer@123', r.id, TRUE
FROM roles r
WHERE r.role_name = 'TRAINER'
AND NOT EXISTS (SELECT 1 FROM users u WHERE u.username = 'trainer1');

INSERT INTO users (username, email, password_hash, role_id, is_active)
SELECT 'mgmt_exec', 'management@hwoip.com', 'Mgmt@123', r.id, TRUE
FROM roles r
WHERE r.role_name = 'MANAGEMENT'
AND NOT EXISTS (SELECT 1 FROM users u WHERE u.username = 'mgmt_exec');

INSERT INTO users (username, email, password_hash, role_id, is_active)
SELECT 'sys_admin', 'admin@hwoip.com', 'Admin@123', r.id, TRUE
FROM roles r
WHERE r.role_name = 'SYSTEM_ADMINISTRATOR'
AND NOT EXISTS (SELECT 1 FROM users u WHERE u.username = 'sys_admin');

CREATE TABLE IF NOT EXISTS departments (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    department_name VARCHAR(100) UNIQUE NOT NULL,
    description TEXT,
    is_active BOOLEAN NOT NULL DEFAULT TRUE,
    created_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS designations (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    designation_name VARCHAR(100) UNIQUE NOT NULL,
    description TEXT,
    is_active BOOLEAN NOT NULL DEFAULT TRUE,
    created_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS candidates (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    username VARCHAR(100) UNIQUE,
    email VARCHAR(255) NOT NULL,
    password_hash TEXT,
    full_name VARCHAR(150) NOT NULL,
    phone_number VARCHAR(20),
    address TEXT,
    gender VARCHAR(20),
    date_of_birth DATE,
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
    updated_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT chk_graduation_year CHECK (graduation_year IS NULL OR graduation_year BETWEEN 1900 AND 2100)
);

CREATE TABLE IF NOT EXISTS jobs (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    job_code VARCHAR(50) UNIQUE,
    title VARCHAR(150) NOT NULL,
    department_id UUID REFERENCES departments(id) ON DELETE SET NULL,
    location VARCHAR(100),
    employment_type VARCHAR(30) NOT NULL DEFAULT 'FULL_TIME',
    experience_required VARCHAR(50),
    salary_min NUMERIC(12,2),
    salary_max NUMERIC(12,2),
    skills_required TEXT,
    job_description TEXT,
    openings_count INT NOT NULL DEFAULT 1,
    status VARCHAR(30) NOT NULL DEFAULT 'DRAFT',
    posted_by UUID REFERENCES users(id) ON DELETE SET NULL,
    published_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT chk_salary_range CHECK (salary_min IS NULL OR salary_max IS NULL OR salary_min <= salary_max),
    CONSTRAINT chk_openings CHECK (openings_count >= 1)
);

CREATE TABLE IF NOT EXISTS candidate_applications (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    candidate_id UUID NOT NULL REFERENCES candidates(id) ON DELETE CASCADE,
    job_id UUID NOT NULL REFERENCES jobs(id) ON DELETE RESTRICT,
    application_status VARCHAR(30) NOT NULL DEFAULT 'APPLIED',
    cover_letter TEXT,
    resume_file_name VARCHAR(255),
    resume_file_url TEXT,
    notes TEXT,
    source_channel VARCHAR(50) NOT NULL DEFAULT 'PUBLIC_FORM',
    candidate_score NUMERIC(5,2),
    applied_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT uq_candidate_job UNIQUE (candidate_id, job_id),
    CONSTRAINT chk_application_status CHECK (
        application_status IN ('APPLIED', 'SCREENING', 'SHORTLISTED', 'INTERVIEWING', 'OFFERED', 'HIRED', 'REJECTED', 'WITHDRAWN')
    )
);

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

CREATE TABLE IF NOT EXISTS interviews (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    application_id UUID NOT NULL REFERENCES candidate_applications(id) ON DELETE CASCADE,
    interviewer_id UUID REFERENCES users(id) ON DELETE SET NULL,
    interview_round VARCHAR(50) NOT NULL,
    scheduled_at TIMESTAMPTZ,
    status VARCHAR(30) NOT NULL DEFAULT 'SCHEDULED',
    feedback TEXT,
    score NUMERIC(5,2),
    created_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT chk_interview_score CHECK (score IS NULL OR score BETWEEN 0 AND 10)
);

CREATE TABLE IF NOT EXISTS offers (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    application_id UUID NOT NULL REFERENCES candidate_applications(id) ON DELETE CASCADE,
    offer_status VARCHAR(30) NOT NULL DEFAULT 'PENDING',
    offered_salary NUMERIC(12,2) NOT NULL DEFAULT 0,
    currency VARCHAR(3) NOT NULL DEFAULT 'INR',
    offer_date DATE,
    joining_date DATE,
    created_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT chk_offer_salary CHECK (offered_salary >= 0)
);

CREATE TABLE IF NOT EXISTS employees (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    candidate_id UUID UNIQUE REFERENCES candidates(id) ON DELETE SET NULL,
    user_id UUID UNIQUE REFERENCES users(id) ON DELETE SET NULL,
    employee_code VARCHAR(50) UNIQUE,
    first_name VARCHAR(100) NOT NULL,
    last_name VARCHAR(100),
    email VARCHAR(255) UNIQUE,
    phone_number VARCHAR(20),
    department_id UUID REFERENCES departments(id) ON DELETE SET NULL,
    designation_id UUID REFERENCES designations(id) ON DELETE SET NULL,
    manager_id UUID REFERENCES employees(id) ON DELETE SET NULL,
    role_id INT REFERENCES roles(id) ON DELETE RESTRICT,
    joining_date DATE,
    employment_status VARCHAR(30) NOT NULL DEFAULT 'ACTIVE',
    employment_type VARCHAR(30) NOT NULL DEFAULT 'FULL_TIME',
    work_location VARCHAR(100),
    created_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT chk_employment_status CHECK (
        employment_status IN ('ACTIVE', 'PROBATION', 'INACTIVE', 'RESIGNED', 'TERMINATED')
    ),
    CONSTRAINT chk_employment_type CHECK (
        employment_type IN ('FULL_TIME', 'PART_TIME', 'CONTRACT', 'INTERN')
    )
);

CREATE INDEX IF NOT EXISTS idx_users_role_id ON users(role_id);
CREATE INDEX IF NOT EXISTS idx_users_is_active ON users(is_active);
CREATE INDEX IF NOT EXISTS idx_candidates_email ON candidates(email);
CREATE INDEX IF NOT EXISTS idx_candidates_phone ON candidates(phone_number);
CREATE INDEX IF NOT EXISTS idx_jobs_department_id ON jobs(department_id);
CREATE INDEX IF NOT EXISTS idx_jobs_status ON jobs(status);
CREATE INDEX IF NOT EXISTS idx_candidate_applications_candidate_id ON candidate_applications(candidate_id);
CREATE INDEX IF NOT EXISTS idx_candidate_applications_job_id ON candidate_applications(job_id);
CREATE INDEX IF NOT EXISTS idx_candidate_applications_status ON candidate_applications(application_status);
CREATE INDEX IF NOT EXISTS idx_candidate_slots_application_id ON candidate_availability_slots(application_id);
CREATE INDEX IF NOT EXISTS idx_interviews_application_id ON interviews(application_id);
CREATE INDEX IF NOT EXISTS idx_interviews_scheduled_at ON interviews(scheduled_at);
CREATE INDEX IF NOT EXISTS idx_employees_department_id ON employees(department_id);
CREATE INDEX IF NOT EXISTS idx_employees_manager_id ON employees(manager_id);

CREATE OR REPLACE FUNCTION set_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DO $$
BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_trigger WHERE tgname = 'set_users_updated_at') THEN
        CREATE TRIGGER set_users_updated_at
        BEFORE UPDATE ON users
        FOR EACH ROW EXECUTE FUNCTION set_updated_at();
    END IF;
END $$;

DO $$
BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_trigger WHERE tgname = 'set_departments_updated_at') THEN
        CREATE TRIGGER set_departments_updated_at
        BEFORE UPDATE ON departments
        FOR EACH ROW EXECUTE FUNCTION set_updated_at();
    END IF;
END $$;

DO $$
BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_trigger WHERE tgname = 'set_designations_updated_at') THEN
        CREATE TRIGGER set_designations_updated_at
        BEFORE UPDATE ON designations
        FOR EACH ROW EXECUTE FUNCTION set_updated_at();
    END IF;
END $$;

DO $$
BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_trigger WHERE tgname = 'set_candidates_updated_at') THEN
        CREATE TRIGGER set_candidates_updated_at
        BEFORE UPDATE ON candidates
        FOR EACH ROW EXECUTE FUNCTION set_updated_at();
    END IF;
END $$;

DO $$
BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_trigger WHERE tgname = 'set_jobs_updated_at') THEN
        CREATE TRIGGER set_jobs_updated_at
        BEFORE UPDATE ON jobs
        FOR EACH ROW EXECUTE FUNCTION set_updated_at();
    END IF;
END $$;

DO $$
BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_trigger WHERE tgname = 'set_candidate_applications_updated_at') THEN
        CREATE TRIGGER set_candidate_applications_updated_at
        BEFORE UPDATE ON candidate_applications
        FOR EACH ROW EXECUTE FUNCTION set_updated_at();
    END IF;
END $$;

DO $$
BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_trigger WHERE tgname = 'set_candidate_availability_slots_updated_at') THEN
        CREATE TRIGGER set_candidate_availability_slots_updated_at
        BEFORE UPDATE ON candidate_availability_slots
        FOR EACH ROW EXECUTE FUNCTION set_updated_at();
    END IF;
END $$;

DO $$
BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_trigger WHERE tgname = 'set_interviews_updated_at') THEN
        CREATE TRIGGER set_interviews_updated_at
        BEFORE UPDATE ON interviews
        FOR EACH ROW EXECUTE FUNCTION set_updated_at();
    END IF;
END $$;

DO $$
BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_trigger WHERE tgname = 'set_offers_updated_at') THEN
        CREATE TRIGGER set_offers_updated_at
        BEFORE UPDATE ON offers
        FOR EACH ROW EXECUTE FUNCTION set_updated_at();
    END IF;
END $$;

DO $$
BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_trigger WHERE tgname = 'set_employees_updated_at') THEN
        CREATE TRIGGER set_employees_updated_at
        BEFORE UPDATE ON employees
        FOR EACH ROW EXECUTE FUNCTION set_updated_at();
    END IF;
END $$;