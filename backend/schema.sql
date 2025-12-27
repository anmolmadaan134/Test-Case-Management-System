CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100),
  email VARCHAR(100) UNIQUE,
  password TEXT,
  role VARCHAR(20) DEFAULT 'tester',
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE projects (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100),
  description TEXT,
  version VARCHAR(20),
  status VARCHAR(20)
);

CREATE TABLE test_cases (
  id SERIAL PRIMARY KEY,
  project_id INT REFERENCES projects(id),
  title TEXT,
  description TEXT,
  priority VARCHAR(20),
  type VARCHAR(30),
  pre_conditions TEXT,
  post_conditions TEXT,
  created_by INT REFERENCES users(id)
);

CREATE TABLE test_steps (
  id SERIAL PRIMARY KEY,
  test_case_id INT REFERENCES test_cases(id),
  step TEXT,
  expected_result TEXT
);

CREATE TABLE test_suites (
  id SERIAL PRIMARY KEY,
  project_id INT REFERENCES projects(id),
  name TEXT
);

CREATE TABLE test_suite_cases (
  suite_id INT REFERENCES test_suites(id),
  test_case_id INT REFERENCES test_cases(id),
  PRIMARY KEY (suite_id, test_case_id)
);

CREATE TABLE test_executions (
  id SERIAL PRIMARY KEY,
  test_case_id INT REFERENCES test_cases(id),
  executed_by INT REFERENCES users(id),
  status VARCHAR(20),
  comments TEXT,
  executed_at TIMESTAMP DEFAULT NOW()
);
