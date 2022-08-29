create table privileges
(
    id                    int unsigned auto_increment
        primary key,
    privilege_name        varchar(255)                          not null,
    privilege_description varchar(255)                          not null,
    privilege_state       tinyint(1) default 1                  not null,
    request_method        enum ('get', 'post', 'put', 'delete') null,
    privilege_url         varchar(255)                          null,
    parent_id             int unsigned                          not null,
    level                 tinyint unsigned                      not null,
    created_at            datetime                              null,
    updated_at            datetime                              null,
    constraint privilege_description
        unique (privilege_description),
    constraint privilege_name
        unique (privilege_name)
)
    engine = InnoDB;

INSERT INTO `backstage-management-system-react18`.privileges (id, privilege_name, privilege_description, privilege_state, request_method, privilege_url, parent_id, level, created_at, updated_at) VALUES (1, 'USER_MANAGER', 'User related privileges', 1, null, null, 0, 1, null, '2022-06-04 07:39:14');
INSERT INTO `backstage-management-system-react18`.privileges (id, privilege_name, privilege_description, privilege_state, request_method, privilege_url, parent_id, level, created_at, updated_at) VALUES (2, 'CREATE_USER', 'Create user', 1, 'post', '/api/v1/users', 1, 2, null, '2022-06-04 07:39:14');
INSERT INTO `backstage-management-system-react18`.privileges (id, privilege_name, privilege_description, privilege_state, request_method, privilege_url, parent_id, level, created_at, updated_at) VALUES (3, 'DELETE_USER', 'Delete user', 1, 'delete', '/api/v1/users', 1, 2, null, '2022-06-04 07:39:14');
INSERT INTO `backstage-management-system-react18`.privileges (id, privilege_name, privilege_description, privilege_state, request_method, privilege_url, parent_id, level, created_at, updated_at) VALUES (4, 'UPDATE_USER', 'Update user''s details', 1, 'put', '/api/v1/users', 1, 2, null, '2022-06-04 07:39:14');
INSERT INTO `backstage-management-system-react18`.privileges (id, privilege_name, privilege_description, privilege_state, request_method, privilege_url, parent_id, level, created_at, updated_at) VALUES (5, 'GET_USER', 'Get user''s details', 1, 'get', '/api/v1/users', 1, 2, null, '2022-06-04 07:39:14');
INSERT INTO `backstage-management-system-react18`.privileges (id, privilege_name, privilege_description, privilege_state, request_method, privilege_url, parent_id, level, created_at, updated_at) VALUES (6, 'EXPORT_USERS', 'Export all users', 1, 'get', '/api/v1/export-all-users', 1, 2, null, '2022-06-04 07:39:14');
INSERT INTO `backstage-management-system-react18`.privileges (id, privilege_name, privilege_description, privilege_state, request_method, privilege_url, parent_id, level, created_at, updated_at) VALUES (7, 'IMPORT_USERS', 'Import users from EXCEL', 1, 'post', '/api/v1/import-users', 1, 2, null, '2022-06-04 07:39:14');
INSERT INTO `backstage-management-system-react18`.privileges (id, privilege_name, privilege_description, privilege_state, request_method, privilege_url, parent_id, level, created_at, updated_at) VALUES (8, 'UPLOAD_AVATAR', 'Upload user''s avatar', 1, 'post', '/api/v1/upload-user-avatar', 1, 2, null, '2022-06-04 07:39:14');
INSERT INTO `backstage-management-system-react18`.privileges (id, privilege_name, privilege_description, privilege_state, request_method, privilege_url, parent_id, level, created_at, updated_at) VALUES (9, 'DISPATCH_USER_ROLES', 'Assign roles for user', 1, 'post', '/api/v1/user-role', 1, 2, null, '2022-06-04 07:39:14');
INSERT INTO `backstage-management-system-react18`.privileges (id, privilege_name, privilege_description, privilege_state, request_method, privilege_url, parent_id, level, created_at, updated_at) VALUES (10, 'ROLE_MANAGER', 'Role related privileges', 1, null, null, 0, 1, null, '2022-06-04 07:39:21');
INSERT INTO `backstage-management-system-react18`.privileges (id, privilege_name, privilege_description, privilege_state, request_method, privilege_url, parent_id, level, created_at, updated_at) VALUES (11, 'CREATE_ROLE', 'Create role', 1, 'post', '/api/v1/roles', 10, 2, null, '2022-06-04 07:39:21');
INSERT INTO `backstage-management-system-react18`.privileges (id, privilege_name, privilege_description, privilege_state, request_method, privilege_url, parent_id, level, created_at, updated_at) VALUES (12, 'DELETE_ROLE', 'Delete role', 1, 'delete', '/api/v1/roles', 10, 2, null, '2022-06-04 07:39:21');
INSERT INTO `backstage-management-system-react18`.privileges (id, privilege_name, privilege_description, privilege_state, request_method, privilege_url, parent_id, level, created_at, updated_at) VALUES (13, 'UPDATE_ROLE', 'Update role''s details', 1, 'put', '/api/v1/roles', 10, 2, null, '2022-06-04 07:39:21');
INSERT INTO `backstage-management-system-react18`.privileges (id, privilege_name, privilege_description, privilege_state, request_method, privilege_url, parent_id, level, created_at, updated_at) VALUES (14, 'GET_ROLE', 'Get role''s details', 1, 'get', '/api/v1/roles', 10, 2, null, '2022-06-04 07:39:21');
INSERT INTO `backstage-management-system-react18`.privileges (id, privilege_name, privilege_description, privilege_state, request_method, privilege_url, parent_id, level, created_at, updated_at) VALUES (15, 'DISPATCH_ROLE_PRIVILEGES', 'Assign privileges for role', 1, 'post', '/api/v1/role-privilege', 10, 2, null, '2022-06-04 07:39:21');
INSERT INTO `backstage-management-system-react18`.privileges (id, privilege_name, privilege_description, privilege_state, request_method, privilege_url, parent_id, level, created_at, updated_at) VALUES (16, 'DISPATCH_ROLE_MENUS', 'Assign menus for role', 1, 'post', '/api/v1/role-menu', 10, 2, null, '2022-06-04 07:39:21');
INSERT INTO `backstage-management-system-react18`.privileges (id, privilege_name, privilege_description, privilege_state, request_method, privilege_url, parent_id, level, created_at, updated_at) VALUES (17, 'PRIVILEGE_MANAGER', 'Privilege related privileges', 1, null, null, 0, 1, null, '2022-06-04 07:39:19');
INSERT INTO `backstage-management-system-react18`.privileges (id, privilege_name, privilege_description, privilege_state, request_method, privilege_url, parent_id, level, created_at, updated_at) VALUES (18, 'CREATE_PRIVILEGE', 'Create privilege', 1, 'post', '/api/v1/privileges', 17, 2, null, '2022-06-04 07:39:19');
INSERT INTO `backstage-management-system-react18`.privileges (id, privilege_name, privilege_description, privilege_state, request_method, privilege_url, parent_id, level, created_at, updated_at) VALUES (19, 'DELETE_PRIVILEGE', 'Delete privilege', 1, 'delete', '/api/v1/privileges', 17, 2, null, '2022-06-04 07:39:19');
INSERT INTO `backstage-management-system-react18`.privileges (id, privilege_name, privilege_description, privilege_state, request_method, privilege_url, parent_id, level, created_at, updated_at) VALUES (20, 'UPDATE_PRIVILEGE', 'Update privilege''s details', 1, 'put', '/api/v1/privileges', 17, 2, null, '2022-06-04 07:39:19');
INSERT INTO `backstage-management-system-react18`.privileges (id, privilege_name, privilege_description, privilege_state, request_method, privilege_url, parent_id, level, created_at, updated_at) VALUES (21, 'GET_PRIVILEGE', 'Get privilege''s details', 1, 'get', '/api/v1/privileges', 17, 2, null, '2022-06-04 07:39:19');
INSERT INTO `backstage-management-system-react18`.privileges (id, privilege_name, privilege_description, privilege_state, request_method, privilege_url, parent_id, level, created_at, updated_at) VALUES (22, 'MENU_MANAGER', 'Menu related privileges', 1, null, null, 0, 1, null, null);
INSERT INTO `backstage-management-system-react18`.privileges (id, privilege_name, privilege_description, privilege_state, request_method, privilege_url, parent_id, level, created_at, updated_at) VALUES (26, 'GET_MENU', 'Get menu''s details', 1, 'get', '/api/v1/menus', 22, 2, null, null);
