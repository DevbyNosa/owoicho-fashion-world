  CREATE TABLE chats (
    id SERIAL PRIMARY KEY,
    chat_name VARCHAR(100),
    chat_contact VARCHAR(50),
    chat_service VARCHAR(25),
    chat_message VARCHAR(300),
    created_at DATE
  )

  -- UPLOADING TEXT CONTENTS TO DB FOR HOME PAGE --
CREATE TABLE content_Upload (
  id SERIAL PRIMARY KEY,
  header_h1 VARCHAR(255),
  header_text VARCHAR(300),
  about_text VARCHAR(300),
  location VARCHAR(255),
  number VARCHAR(255),
  email VARCHAR(255),
  logo_path VARCHAR(255),
  image_path VARCHAR(255)
);

--- Admin Credentials ---
CREATE TABLE adminCredentials (
	id INT PRIMARY KEY DEFAULT 1,
	username VARCHAR(255),
	password VARCHAR(255),
	maintenance_mode BOOLEAN DEFAULT FALSE,
	maintenance_message TEXT
);

-- Session store table for connect-pg-simple
CREATE TABLE user_sessions (
  sid VARCHAR NOT NULL COLLATE "default",
  sess JSON NOT NULL,
  expire TIMESTAMP(6) NOT NULL
);
ALTER TABLE user_sessions ADD CONSTRAINT user_sessions_pkey PRIMARY KEY (sid) NOT DEFERRABLE INITIALLY IMMEDIATE;
CREATE INDEX idx_user_sessions_expire ON user_sessions(expire);
