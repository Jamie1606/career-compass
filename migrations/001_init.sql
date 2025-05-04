-- Status table
CREATE TABLE IF NOT EXISTS status (
  status_id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL UNIQUE,
  color TEXT DEFAULT '000000',
  created_at TEXT DEFAULT CURRENT_TIMESTAMP
);

-- Office type table
CREATE TABLE IF NOT EXISTS office_type (
  office_type_id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL UNIQUE,
  created_at TEXT DEFAULT CURRENT_TIMESTAMP
);

-- Employer table
CREATE TABLE IF NOT EXISTS employer (
  employer_id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL,
  created_at TEXT DEFAULT CURRENT_TIMESTAMP
);

-- Contact type table
CREATE TABLE IF NOT EXISTS contact_type (
  contact_type_id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL UNIQUE,
  created_at TEXT DEFAULT CURRENT_TIMESTAMP
);

-- People table
CREATE TABLE IF NOT EXISTS people (
  people_id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL,
  email TEXT UNIQUE,
  phone TEXT,
  url TEXT,
  note TEXT,
  created_at TEXT DEFAULT CURRENT_TIMESTAMP,
  employer_id INTEGER,
  contact_type_id INTEGER,
  FOREIGN KEY (employer_id) REFERENCES employer(employer_id),
  FOREIGN KEY (contact_type_id) REFERENCES contact_type(contact_type_id)
);

-- Resume table
CREATE TABLE IF NOT EXISTS resume (
  resume_id INTEGER PRIMARY KEY AUTOINCREMENT,
  resume BLOB,
  created_at TEXT DEFAULT CURRENT_TIMESTAMP
);

-- Cover letter table
CREATE TABLE IF NOT EXISTS cover_letter (
  cover_letter_id INTEGER PRIMARY KEY AUTOINCREMENT,
  cover_letter BLOB,
  created_at TEXT DEFAULT CURRENT_TIMESTAMP
);

-- Job table
CREATE TABLE IF NOT EXISTS job (
  job_id INTEGER PRIMARY KEY AUTOINCREMENT,
  title TEXT NOT NULL,
  location TEXT,
  job_description TEXT,
  link TEXT,
  note TEXT,
  created_at TEXT DEFAULT CURRENT_TIMESTAMP,
  referrer_id INTEGER,
  office_type_id INTEGER,
  employer_id INTEGER,
  resume_id INTEGER,
  cover_letter_id INTEGER,
  FOREIGN KEY (referrer_id) REFERENCES people(people_id),
  FOREIGN KEY (office_type_id) REFERENCES office_type(office_type_id),
  FOREIGN KEY (employer_id) REFERENCES employer(employer_id),
  FOREIGN KEY (resume_id) REFERENCES resume(resume_id),
  FOREIGN KEY (cover_letter_id) REFERENCES cover_letter(cover_letter_id)
);

-- Job status history table
CREATE TABLE IF NOT EXISTS job_status_history (
  history_id INTEGER PRIMARY KEY AUTOINCREMENT,
  note TEXT,
  created_at TEXT DEFAULT CURRENT_TIMESTAMP,
  job_id INTEGER,
  status_id INTEGER,
  FOREIGN KEY (job_id) REFERENCES job(job_id),
  FOREIGN KEY (status_id) REFERENCES status(status_id)
);

-- Task table
CREATE TABLE IF NOT EXISTS task (
  task_id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL,
  due_date TEXT,
  completed INTEGER,
  note TEXT,
  created_at TEXT DEFAULT CURRENT_TIMESTAMP,
  job_id INTEGER,
  FOREIGN KEY (job_id) REFERENCES job(job_id)
);

-- Meta table
CREATE TABLE IF NOT EXISTS meta (
  key TEXT PRIMARY KEY,
  value TEXT
);

-- Seed meta data
INSERT OR REPLACE INTO meta (key, value) VALUES ('schema_version', '1');

-- Seed sample status data
INSERT OR REPLACE INTO status (name, color) VALUES 
('applied', '0033ff'),
('interview', '10b123'),
('viewed', 'cee70d'),
('rejected', 'ff0000');

-- Seed sample office type data
INSERT OR REPLACE INTO office_type (name) VALUES 
('remote'),
('hybrid'),
('onsite');
