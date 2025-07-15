-- Расширения
CREATE
EXTENSION IF NOT EXISTS "uuid-ossp";

-- ТАБЛИЦЫ

-- Таблица для хранения разрешений
CREATE TABLE authorities
(
    id    UUID         NOT NULL DEFAULT uuid_generate_v4(),
    value VARCHAR(255) NOT NULL,
    name  VARCHAR(255),
    CONSTRAINT pk_authorities PRIMARY KEY (id),
    CONSTRAINT uc_authority_value UNIQUE (value)
);

-- Таблица для хранения ролей
CREATE TABLE roles
(
    id    UUID         NOT NULL DEFAULT uuid_generate_v4(),
    value VARCHAR(255) NOT NULL,
    name  VARCHAR(255),
    CONSTRAINT pk_roles PRIMARY KEY (id),
    CONSTRAINT uc_role_value UNIQUE (value)
);

-- Таблица для связывания ролей и разрешений
CREATE TABLE role_authorities
(
    authority_id UUID NOT NULL,
    role_id      UUID NOT NULL,
    CONSTRAINT pk_role_authorities PRIMARY KEY (authority_id, role_id),
    CONSTRAINT fk_role_authorities_authority FOREIGN KEY (authority_id) REFERENCES authorities (id),
    CONSTRAINT fk_role_authorities_role FOREIGN KEY (role_id) REFERENCES roles (id)
);

-- Таблица для хранения пользователей
CREATE TABLE users
(
    id           UUID         NOT NULL DEFAULT uuid_generate_v4(),
    username     VARCHAR(255) NOT NULL,
    email        VARCHAR(255),
    phone_number VARCHAR(32),
    password     VARCHAR(255) NOT NULL,
    role_id      UUID,
    CONSTRAINT pk_users PRIMARY KEY (id),
    CONSTRAINT uc_users_username UNIQUE (username),
    CONSTRAINT uc_users_email UNIQUE (email),
    CONSTRAINT fk_users_role FOREIGN KEY (role_id) REFERENCES roles (id)
);

-- Таблица с дополнительной информацией о пользователе
CREATE TABLE user_info
(
    id         UUID NOT NULL DEFAULT uuid_generate_v4(),
    user_id    UUID NOT NULL,
    gender     VARCHAR(32),
    last_name  VARCHAR(255),
    first_name VARCHAR(255),
    patronymic VARCHAR(255),
    birth_date DATE,
    avatar_url VARCHAR(512),
    status     VARCHAR(255),
    CONSTRAINT pk_user_info PRIMARY KEY (id),
    CONSTRAINT fk_user_info_user FOREIGN KEY (user_id) REFERENCES users (id) ON DELETE CASCADE,
    CONSTRAINT uc_user_info_user UNIQUE (user_id)
);

-- Таблица для хранения постов
CREATE TABLE posts
(
    id     UUID NOT NULL DEFAULT uuid_generate_v4(),
    author UUID NOT NULL,
    text   VARCHAR(2048),
    date   TIMESTAMP WITHOUT TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT pk_posts PRIMARY KEY (id),
    CONSTRAINT fk_posts_author FOREIGN KEY (author) REFERENCES users (id) ON DELETE CASCADE
);

-- Таблица для хранения сообщений чата
CREATE TABLE chat_messages
(
    id     UUID NOT NULL DEFAULT uuid_generate_v4(),
    author UUID NOT NULL,
    text   VARCHAR(2048),
    date   TIMESTAMP WITHOUT TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT pk_chat_messages PRIMARY KEY (id),
    CONSTRAINT fk_chat_messages_author FOREIGN KEY (author) REFERENCES users (id) ON DELETE CASCADE
);

-- Вставка ролей
INSERT INTO roles (value, name)
VALUES ('USER', 'Пользователь'),
       ('ADMIN', 'Админ') ON CONFLICT (value) DO NOTHING;

-- Вставка привелегий
INSERT INTO authorities (value, name)
VALUES ('ROLE_USER', 'Роль "Пользователь"'),
       ('ROLE_ADMIN', 'Роль "Админ"') ON CONFLICT (value) DO NOTHING;

-- Привязка привилегий к роли USER
INSERT INTO role_authorities (role_id, authority_id)
SELECT r.id, a.id
FROM roles r
         JOIN authorities a ON a.value = 'ROLE_USER'
WHERE r.value = 'USER' ON CONFLICT DO NOTHING;

-- Привязка привилегий к роли ADMIN
INSERT INTO role_authorities (role_id, authority_id)
SELECT r.id, a.id
FROM roles r
         JOIN authorities a ON a.value IN ('ROLE_USER', 'ROLE_ADMIN')
WHERE r.value = 'ADMIN' ON CONFLICT DO NOTHING;