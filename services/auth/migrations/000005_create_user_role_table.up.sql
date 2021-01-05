CREATE TABLE IF NOT EXISTS user_role(
    user_id int,
    role_id int,
    PRIMARY KEY (user_id, role_id),

    CONSTRAINT FK_user 
        FOREIGN KEY (user_id) REFERENCES users(id),
    CONSTRAINT FK_role 
        FOREIGN KEY (role_id) REFERENCES roles(id)
);