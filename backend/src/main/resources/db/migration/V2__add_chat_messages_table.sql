-- Таблица для хранения сообщений чата
CREATE TABLE chat_messages
(
    id     UUID NOT NULL               DEFAULT uuid_generate_v4(),
    author UUID NOT NULL,
    text   VARCHAR(2048),
    date   TIMESTAMP WITHOUT TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT pk_chat_messages PRIMARY KEY (id),
    CONSTRAINT fk_chat_messages_author FOREIGN KEY (author) REFERENCES users (id) ON DELETE CASCADE
);