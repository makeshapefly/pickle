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
  join_code VARCHAR(8),
  created_at DATE,
  PRIMARY KEY (id),
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

CREATE TABLE member (
  id uuid DEFAULT gen_random_uuid(),
  mobile_phone VARCHAR(15),
  email VARCHAR(100),
  first_name VARCHAR(100),
  last_name  VARCHAR(100),
  created_at DATE,
  PRIMARY KEY (id)
);

/*insert into member(email, first_name, last_name, created_at) values ('tony@tony.com', 'Tony', 'Turner', '2024-12-06') */

/* join table */
CREATE TABLE organisation_member (
  member_id uuid,
  organisation_id integer,
  PRIMARY KEY (member_id, organisation_id)
);
/*insert into organisation_member values('c0e87981-fd82-4c4b-9b08-d59329392df1', 1)*/

CREATE TABLE session (
  id uuid DEFAULT gen_random_uuid(),
  name VARCHAR(100),
  location VARCHAR(200),
  recurring boolean,
  start_date DATE,
  end_date DATE,
  session_date DATE,
  days_of_week TEXT[] UNIQUE,
  price DECIMAL(4,2),
  config jsonb,
  created_at DATE,
  organisation_id integer,
  PRIMARY KEY (id),
  CONSTRAINT fk_organisation
      FOREIGN KEY(organisation_id)
        REFERENCES organisation(id)
);