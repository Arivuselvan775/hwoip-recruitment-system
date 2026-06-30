-- 1. Create Roles Enum-like table
CREATE TABLE roles (
    id SERIAL PRIMARY KEY,
    role_name VARCHAR(50) UNIQUE NOT NULL
);

-- Insert the 8 mandatory roles
INSERT INTO roles (role_name) VALUES 
('DELIVERY_HEAD'),
('HR_EXECUTIVE'),
('HR_MANAGER'),
('OPERATIONS_MANAGER'),
('TRAINER'),
('MANAGEMENT'),
('SYSTEM_ADMINISTRATOR'),
('CANDIDATE');

-- 2. Master Users Table (For Auth, Login and Session Management)
CREATE TABLE users (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    username VARCHAR(50) UNIQUE NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password_hash TEXT NOT NULL, -- Storing encrypted passwords
    role_id INT REFERENCES roles(id) ON DELETE RESTRICT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 3. Candidate Specific Profiles Table (Linked to FR-003 Requirements)
CREATE TABLE candidate_profiles (
    id UUID PRIMARY KEY REFERENCES users(id) ON DELETE CASCADE,
    full_name VARCHAR(100) NOT NULL,
    mobile_number VARCHAR(15) UNIQUE NOT NULL,
    qualification VARCHAR(100),
    experience_years NUMERIC(4,2),
    certification VARCHAR(150),
    specialty VARCHAR(100),
    current_employer VARCHAR(100),
    current_ctc NUMERIC(12,2),
    expected_ctc NUMERIC(12,2),
    notice_period_days INT,
    resume_url TEXT,    
    current_status VARCHAR(50) DEFAULT 'Applied', -- Linked to Candidate Status Lifecycle
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 4. INSERT MOCK DATA FOR THE 7 INTERNAL ROLES 
-- Note: In production, passwords must be properly hashed using bcrypt. 
-- These are plain text mock representations or predefined hashes for Day 1 development testing.

INSERT INTO users (username, email, password_hash, role_id) VALUES
('delivery_boss', 'deliveryhead@hwoip.com', 'mock_password_123', (SELECT id FROM roles WHERE role_name = 'DELIVERY_HEAD')),
('hr_exec1', 'hrexecutive@hwoip.com', 'mock_password_123', (SELECT id FROM roles WHERE role_name = 'HR_EXECUTIVE')),
('hr_mgr1', 'hrmanager@hwoip.com', 'mock_password_123', (SELECT id FROM roles WHERE role_name = 'HR_MANAGER')),
('ops_mgr1', 'opsmanager@hwoip.com', 'mock_password_123', (SELECT id FROM roles WHERE role_name = 'OPERATIONS_MANAGER')),
('trainer1', 'trainer@hwoip.com', 'mock_password_123', (SELECT id FROM roles WHERE role_name = 'TRAINER')),
('mgmt_exec', 'management@hwoip.com', 'mock_password_123', (SELECT id FROM roles WHERE role_name = 'MANAGEMENT')),
('sys_admin', 'admin@hwoip.com', 'mock_password_123', (SELECT id FROM roles WHERE role_name = 'SYSTEM_ADMINISTRATOR'));