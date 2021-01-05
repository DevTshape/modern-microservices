CREATE TABLE IF NOT EXISTS role_permission(
    role_id int,
    permission_id int,
    PRIMARY KEY (role_id, permission_id),

    CONSTRAINT FK_role 
        FOREIGN KEY (role_id) REFERENCES roles(id),
    CONSTRAINT FK_permission 
        FOREIGN KEY (permission_id) REFERENCES permissions(id)
);