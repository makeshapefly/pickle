CREATE TABLE users (
  id uuid DEFAULT gen_random_uuid(),
  first_name VARCHAR(100),
  last_name  VARCHAR(100),
  email VARCHAR(100),
  created_at DATE,
  organisation integer,
  PRIMARY KEY (id),
  CONSTRAINT fk_organisation
      FOREIGN KEY(organisation)
        REFERENCES organisation(id)
);

/*insert into users(first_name, last_name, email, organisation) values ('Tony', 'Turner', 'turner2448@hotmail.com', 1) */

CREATE TABLE organisation (
  id SERIAL PRIMARY KEY,
  org_name VARCHAR(100) NOT NULL,
  created_at DATE
);

/*insert into organisation(org_name, created_at) values ('NONE', '2024-12-06') */

CREATE TABLE role (
  id uuid DEFAULT gen_random_uuid(),
  role VARCHAR(20),
  user_id uuid,
  PRIMARY KEY (id),
  CONSTRAINT fk_users
      FOREIGN KEY(user_id)
        REFERENCES users(id)
);

/*insert into role(role, user_id) values ('ADMIN', '43ed3637-4830-4e55-ba74-3cf9c75c52db') */