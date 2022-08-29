-- ----------------------------
-- Records of privileges
-- ----------------------------
INSERT INTO `privileges` (id, privilege_name, privilege_description, privilege_state, request_method, privilege_url, parent_id, level) VALUES (1, 'USER_MANAGER', 'User related privileges', 1, null, null, 0, 1);
INSERT INTO `privileges` (id, privilege_name, privilege_description, privilege_state, request_method, privilege_url, parent_id, level) VALUES (2, 'CREATE_USER', 'Create user', 1, 'post', '/api/v1/users', 1, 2);
INSERT INTO `privileges` (id, privilege_name, privilege_description, privilege_state, request_method, privilege_url, parent_id, level) VALUES (3, 'DELETE_USER', 'Delete user', 1, 'delete', '/api/v1/users', 1, 2);
INSERT INTO `privileges` (id, privilege_name, privilege_description, privilege_state, request_method, privilege_url, parent_id, level) VALUES (4, 'UPDATE_USER', 'Update user\'s details', 1, 'put', '/api/v1/users', 1, 2);
INSERT INTO `privileges` (id, privilege_name, privilege_description, privilege_state, request_method, privilege_url, parent_id, level) VALUES (5, 'GET_USER', 'Get user\'s details', 1, 'get', '/api/v1/users', 1, 2);
INSERT INTO `privileges` (id, privilege_name, privilege_description, privilege_state, request_method, privilege_url, parent_id, level) VALUES (6, 'EXPORT_USERS', 'Export all users', 1, 'get', '/api/v1/export-all-users', 1, 2);
INSERT INTO `privileges` (id, privilege_name, privilege_description, privilege_state, request_method, privilege_url, parent_id, level) VALUES (7, 'IMPORT_USERS', 'Import users from EXCEL', 1, 'post', '/api/v1/import-users', 1, 2);
INSERT INTO `privileges` (id, privilege_name, privilege_description, privilege_state, request_method, privilege_url, parent_id, level) VALUES (8, 'UPLOAD_AVATAR', 'Upload user\'s avatar', 1, 'post', '/api/v1/upload-user-avatar', 1, 2);
INSERT INTO `privileges` (id, privilege_name, privilege_description, privilege_state, request_method, privilege_url, parent_id, level) VALUES (9, 'DISPATCH_USER_ROLES', 'Assign roles for user', 1, 'post', '/api/v1/user-role', 1, 2);
INSERT INTO `privileges` (id, privilege_name, privilege_description, privilege_state, request_method, privilege_url, parent_id, level) VALUES (10, 'ROLE_MANAGER', 'Role related privileges', 1, null, null, 0, 1);
INSERT INTO `privileges` (id, privilege_name, privilege_description, privilege_state, request_method, privilege_url, parent_id, level) VALUES (11, 'CREATE_ROLE', 'Create role', 1, 'post', '/api/v1/roles', 10, 2);
INSERT INTO `privileges` (id, privilege_name, privilege_description, privilege_state, request_method, privilege_url, parent_id, level) VALUES (12, 'DELETE_ROLE', 'Delete role', 1, 'delete', '/api/v1/roles', 10, 2);
INSERT INTO `privileges` (id, privilege_name, privilege_description, privilege_state, request_method, privilege_url, parent_id, level) VALUES (13, 'UPDATE_ROLE', 'Update role\'s details', 1, 'put', '/api/v1/roles', 10, 2);
INSERT INTO `privileges` (id, privilege_name, privilege_description, privilege_state, request_method, privilege_url, parent_id, level) VALUES (14, 'GET_ROLE', 'Get role\'s details', 1, 'get', '/api/v1/roles', 10, 2);
INSERT INTO `privileges` (id, privilege_name, privilege_description, privilege_state, request_method, privilege_url, parent_id, level) VALUES (15, 'DISPATCH_ROLE_PRIVILEGES', 'Assign privileges for role', 1, 'post', '/api/v1/role-privilege', 10, 2);
INSERT INTO `privileges` (id, privilege_name, privilege_description, privilege_state, request_method, privilege_url, parent_id, level) VALUES (16, 'DISPATCH_ROLE_MENUS', 'Assign menus for role', 1, 'post', '/api/v1/role-menu', 10, 2);
INSERT INTO `privileges` (id, privilege_name, privilege_description, privilege_state, request_method, privilege_url, parent_id, level) VALUES (17, 'PRIVILEGE_MANAGER', 'Privilege related privileges', 1, null, null, 0, 1);
INSERT INTO `privileges` (id, privilege_name, privilege_description, privilege_state, request_method, privilege_url, parent_id, level) VALUES (18, 'CREATE_PRIVILEGE', 'Create privilege', 1, 'post', '/api/v1/privileges', 17, 2);
INSERT INTO `privileges` (id, privilege_name, privilege_description, privilege_state, request_method, privilege_url, parent_id, level) VALUES (19, 'DELETE_PRIVILEGE', 'Delete privilege', 1, 'delete', '/api/v1/privileges', 17, 2);
INSERT INTO `privileges` (id, privilege_name, privilege_description, privilege_state, request_method, privilege_url, parent_id, level) VALUES (20, 'UPDATE_PRIVILEGE', 'Update privilege\'s details', 1, 'put', '/api/v1/privileges', 17, 2);
INSERT INTO `privileges` (id, privilege_name, privilege_description, privilege_state, request_method, privilege_url, parent_id, level) VALUES (21, 'GET_PRIVILEGE', 'Get privilege\'s details', 1, 'get', '/api/v1/privileges', 17, 2);
INSERT INTO `privileges` (id, privilege_name, privilege_description, privilege_state, request_method, privilege_url, parent_id, level) VALUES (22, 'MENU_MANAGER', 'Menu related privileges', 1, null, null, 0, 1);
INSERT INTO `privileges` (id, privilege_name, privilege_description, privilege_state, request_method, privilege_url, parent_id, level) VALUES (23, 'CREATE_MENU', 'Create menu', 1, 'post', '/api/v1/menus', 22, 2);
INSERT INTO `privileges` (id, privilege_name, privilege_description, privilege_state, request_method, privilege_url, parent_id, level) VALUES (24, 'DELETE_MENU', 'Delete menu', 1, 'delete', '/api/v1/menus', 22, 2);
INSERT INTO `privileges` (id, privilege_name, privilege_description, privilege_state, request_method, privilege_url, parent_id, level) VALUES (25, 'UPDATE_MENU', 'Update menu\'s details', 1, 'put', '/api/v1/menus', 22, 2);
INSERT INTO `privileges` (id, privilege_name, privilege_description, privilege_state, request_method, privilege_url, parent_id, level) VALUES (26, 'GET_MENU', 'Get menu\'s details', 1, 'get', '/api/v1/menus', 22, 2);

-- ----------------------------
-- Records of menus
-- ----------------------------
INSERT INTO `menus` (id, menu_name, menu_description, menu_state, menu_key, menu_icon, parent_id, level) VALUES (1, 'menu.user-management', 'User management', 1, 'user-management', 'SettingOutlined', 0, 1);
INSERT INTO `menus` (id, menu_name, menu_description, menu_state, menu_key, menu_icon, parent_id, level) VALUES (2, 'menu.user-management.user-list', 'User list', 1, '/admin/users', 'UserOutlined', 1, 2);
INSERT INTO `menus` (id, menu_name, menu_description, menu_state, menu_key, menu_icon, parent_id, level) VALUES (3, 'menu.privilege-management', 'Privilege management', 1, 'privilege-management', 'UnlockOutlined', 0, 1);
INSERT INTO `menus` (id, menu_name, menu_description, menu_state, menu_key, menu_icon, parent_id, level) VALUES (4, 'menu.privilege-management.role-list', 'Role list', 1, '/admin/roles', 'EyeOutlined', 3, 2);
INSERT INTO `menus` (id, menu_name, menu_description, menu_state, menu_key, menu_icon, parent_id, level) VALUES (5, 'menu.privilege-management.privilege-list', 'Privilege list', 1, '/admin/privileges', 'SafetyCertificateOutlined', 3, 2);
INSERT INTO `menus` (id, menu_name, menu_description, menu_state, menu_key, menu_icon, parent_id, level) VALUES (6, 'menu.privilege-management.menu-list', 'Menu list', 1, '/admin/menus', 'MenuOutlined', 3, 2);
