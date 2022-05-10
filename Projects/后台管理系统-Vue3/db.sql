-- ----------------------------
-- Records of privileges
-- ----------------------------
INSERT INTO `privileges` (id, privilege_name, privilege_description, privilege_state, type, privilege_url, parent_id, level, request_method) VALUES (42, 'Menu privileges', 'Permission to use the specific menu', 1, 'menu', null, null, 1, null);
INSERT INTO `privileges` (id, privilege_name, privilege_description, privilege_state, type, privilege_url, parent_id, level, request_method) VALUES (43, 'User management menu', 'Use "User Management" menus', 1, 'menu', null, 42, 2, null);
INSERT INTO `privileges` (id, privilege_name, privilege_description, privilege_state, type, privilege_url, parent_id, level, request_method) VALUES (44, 'User list menu', 'Use "User List" menu', 1, 'menu', '/admin/users', 43, 3, null);
INSERT INTO `privileges` (id, privilege_name, privilege_description, privilege_state, type, privilege_url, parent_id, level, request_method) VALUES (45, 'Permission management menu', 'Use "Permission Management" menus', 1, 'menu', null, 42, 2, null);
INSERT INTO `privileges` (id, privilege_name, privilege_description, privilege_state, type, privilege_url, parent_id, level, request_method) VALUES (46, 'Role list menu', 'Use "Role List" menu', 1, 'menu', '/admin/roles', 45, 3, null);
INSERT INTO `privileges` (id, privilege_name, privilege_description, privilege_state, type, privilege_url, parent_id, level, request_method) VALUES (47, 'Privilege list menu', 'Use "Privilege List" menu', 1, 'menu', '/admin/privileges', 45, 3, null);
INSERT INTO `privileges` (id, privilege_name, privilege_description, privilege_state, type, privilege_url, parent_id, level, request_method) VALUES (48, 'Route privileges', 'Permission to use the specific route', 1, 'route', '/admin/welcome', null, 1, null);
INSERT INTO `privileges` (id, privilege_name, privilege_description, privilege_state, type, privilege_url, parent_id, level, request_method) VALUES (49, 'User management route', 'Use "User Management" routes', 1, 'route', null, 48, 2, null);
INSERT INTO `privileges` (id, privilege_name, privilege_description, privilege_state, type, privilege_url, parent_id, level, request_method) VALUES (50, 'User list route', 'Use "User List" route', 1, 'route', '/admin/users', 49, 3, null);
INSERT INTO `privileges` (id, privilege_name, privilege_description, privilege_state, type, privilege_url, parent_id, level, request_method) VALUES (51, 'Permission management route', 'Use "Permission Management" routes', 1, 'route', null, 48, 2, null);
INSERT INTO `privileges` (id, privilege_name, privilege_description, privilege_state, type, privilege_url, parent_id, level, request_method) VALUES (52, 'Role list route', 'Use "Role List" route', 1, 'route', '/admin/roles', 51, 3, null);
INSERT INTO `privileges` (id, privilege_name, privilege_description, privilege_state, type, privilege_url, parent_id, level, request_method) VALUES (53, 'Privilege list route', 'Use "Privilege List" route', 1, 'route', '/admin/privileges', 51, 3, null);
INSERT INTO `privileges` (id, privilege_name, privilege_description, privilege_state, type, privilege_url, parent_id, level, request_method) VALUES (54, 'Request privileges', 'Permission to send the specific request with the specific method', 1, 'request', null, null, 1, 'all');
INSERT INTO `privileges` (id, privilege_name, privilege_description, privilege_state, type, privilege_url, parent_id, level, request_method) VALUES (55, 'User list request', 'Send "User List"\'s requests', 1, 'request', null, 54, 2, 'all');
INSERT INTO `privileges` (id, privilege_name, privilege_description, privilege_state, type, privilege_url, parent_id, level, request_method) VALUES (56, 'Fetch users request', 'Send "fetch users" request', 1, 'request', '/api/v1/users', 55, 3, 'get');
INSERT INTO `privileges` (id, privilege_name, privilege_description, privilege_state, type, privilege_url, parent_id, level, request_method) VALUES (57, 'Create user request', 'Send "create user" request', 1, 'request', '/api/v1/users', 55, 3, 'post');
INSERT INTO `privileges` (id, privilege_name, privilege_description, privilege_state, type, privilege_url, parent_id, level, request_method) VALUES (58, 'Update user request', 'Send "update user" request', 1, 'request', '/api/v1/users', 55, 3, 'put');
INSERT INTO `privileges` (id, privilege_name, privilege_description, privilege_state, type, privilege_url, parent_id, level, request_method) VALUES (59, 'Delete user request', 'Send "delete user" request', 1, 'request', '/api/v1/users', 55, 3, 'delete');
INSERT INTO `privileges` (id, privilege_name, privilege_description, privilege_state, type, privilege_url, parent_id, level, request_method) VALUES (60, 'Role list request', 'Send "Role List"\'s requests', 1, 'request', null, 54, 2, 'all');
INSERT INTO `privileges` (id, privilege_name, privilege_description, privilege_state, type, privilege_url, parent_id, level, request_method) VALUES (61, 'Fetch roles request', 'Send "fetch roles" request', 1, 'request', '/api/v1/roles', 60, 3, 'get');
INSERT INTO `privileges` (id, privilege_name, privilege_description, privilege_state, type, privilege_url, parent_id, level, request_method) VALUES (62, 'Create role request', 'Send "create role" request', 1, 'request', '/api/v1/roles', 60, 3, 'post');
INSERT INTO `privileges` (id, privilege_name, privilege_description, privilege_state, type, privilege_url, parent_id, level, request_method) VALUES (63, 'Delete role request', 'Send "delete role" request', 1, 'request', '/api/v1/roles', 60, 3, 'delete');
INSERT INTO `privileges` (id, privilege_name, privilege_description, privilege_state, type, privilege_url, parent_id, level, request_method) VALUES (64, 'Update role request', 'Send "update role" request', 1, 'request', '/api/v1/roles', 60, 3, 'put');
INSERT INTO `privileges` (id, privilege_name, privilege_description, privilege_state, type, privilege_url, parent_id, level, request_method) VALUES (65, 'Privilege list request', 'Send "Privilege List"\'s requests', 1, 'request', null, 54, 2, 'all');
INSERT INTO `privileges` (id, privilege_name, privilege_description, privilege_state, type, privilege_url, parent_id, level, request_method) VALUES (66, 'Fetch privileges request', 'Send "fetch privileges" request', 1, 'request', '/api/v1/privileges', 65, 3, 'get');
INSERT INTO `privileges` (id, privilege_name, privilege_description, privilege_state, type, privilege_url, parent_id, level, request_method) VALUES (67, 'Delete privilege request', 'Send "delete privilege" request', 1, 'request', '/api/v1/privileges', 65, 3, 'delete');
INSERT INTO `privileges` (id, privilege_name, privilege_description, privilege_state, type, privilege_url, parent_id, level, request_method) VALUES (68, 'Create privilege request', 'Send "create privilege" request', 1, 'request', '/api/v1/privileges', 65, 3, 'post');
INSERT INTO `privileges` (id, privilege_name, privilege_description, privilege_state, type, privilege_url, parent_id, level, request_method) VALUES (69, 'Update privilege request', 'Send "update privilege" request', 1, 'request', '/api/v1/privileges', 65, 3, 'put');
INSERT INTO `privileges` (id, privilege_name, privilege_description, privilege_state, type, privilege_url, parent_id, level, request_method) VALUES (70, 'Assign roles request', 'Send "assign roles to the user" request', 1, 'request', '/api/v1/user-role', 55, 3, 'post');
INSERT INTO `privileges` (id, privilege_name, privilege_description, privilege_state, type, privilege_url, parent_id, level, request_method) VALUES (74, 'Assign privileges request', 'Send "assign privileges to the role" request', 1, 'request', '/api/v1/role-privilege', 60, 3, 'post');

-- ----------------------------
-- Records of role_privileges
-- ----------------------------

INSERT INTO `role_privileges` (role_id, privilege_id) VALUES (1, 43);
INSERT INTO `role_privileges` (role_id, privilege_id) VALUES (1, 42);
INSERT INTO `role_privileges` (role_id, privilege_id) VALUES (2, 45);
INSERT INTO `role_privileges` (role_id, privilege_id) VALUES (2, 46);
INSERT INTO `role_privileges` (role_id, privilege_id) VALUES (2, 47);
INSERT INTO `role_privileges` (role_id, privilege_id) VALUES (2, 42);
INSERT INTO `role_privileges` (role_id, privilege_id) VALUES (1, 44);
INSERT INTO `role_privileges` (role_id, privilege_id) VALUES (1, 45);
INSERT INTO `role_privileges` (role_id, privilege_id) VALUES (1, 46);
INSERT INTO `role_privileges` (role_id, privilege_id) VALUES (1, 47);
INSERT INTO `role_privileges` (role_id, privilege_id) VALUES (1, 48);
INSERT INTO `role_privileges` (role_id, privilege_id) VALUES (1, 49);
INSERT INTO `role_privileges` (role_id, privilege_id) VALUES (1, 50);
INSERT INTO `role_privileges` (role_id, privilege_id) VALUES (1, 51);
INSERT INTO `role_privileges` (role_id, privilege_id) VALUES (1, 52);
INSERT INTO `role_privileges` (role_id, privilege_id) VALUES (1, 53);
INSERT INTO `role_privileges` (role_id, privilege_id) VALUES (1, 54);
INSERT INTO `role_privileges` (role_id, privilege_id) VALUES (1, 55);
INSERT INTO `role_privileges` (role_id, privilege_id) VALUES (1, 56);
INSERT INTO `role_privileges` (role_id, privilege_id) VALUES (1, 57);
INSERT INTO `role_privileges` (role_id, privilege_id) VALUES (1, 58);
INSERT INTO `role_privileges` (role_id, privilege_id) VALUES (1, 59);
INSERT INTO `role_privileges` (role_id, privilege_id) VALUES (1, 70);
INSERT INTO `role_privileges` (role_id, privilege_id) VALUES (1, 71);
INSERT INTO `role_privileges` (role_id, privilege_id) VALUES (1, 60);
INSERT INTO `role_privileges` (role_id, privilege_id) VALUES (1, 61);
INSERT INTO `role_privileges` (role_id, privilege_id) VALUES (1, 62);
INSERT INTO `role_privileges` (role_id, privilege_id) VALUES (1, 63);
INSERT INTO `role_privileges` (role_id, privilege_id) VALUES (1, 64);
INSERT INTO `role_privileges` (role_id, privilege_id) VALUES (1, 65);
INSERT INTO `role_privileges` (role_id, privilege_id) VALUES (1, 66);
INSERT INTO `role_privileges` (role_id, privilege_id) VALUES (1, 67);
INSERT INTO `role_privileges` (role_id, privilege_id) VALUES (1, 68);
INSERT INTO `role_privileges` (role_id, privilege_id) VALUES (1, 69);
INSERT INTO `role_privileges` (role_id, privilege_id) VALUES (2, 51);
INSERT INTO `role_privileges` (role_id, privilege_id) VALUES (2, 52);
INSERT INTO `role_privileges` (role_id, privilege_id) VALUES (2, 53);
INSERT INTO `role_privileges` (role_id, privilege_id) VALUES (2, 48);
INSERT INTO `role_privileges` (role_id, privilege_id) VALUES (2, 65);
INSERT INTO `role_privileges` (role_id, privilege_id) VALUES (2, 66);
INSERT INTO `role_privileges` (role_id, privilege_id) VALUES (2, 67);
INSERT INTO `role_privileges` (role_id, privilege_id) VALUES (2, 68);
INSERT INTO `role_privileges` (role_id, privilege_id) VALUES (2, 69);
INSERT INTO `role_privileges` (role_id, privilege_id) VALUES (2, 54);
INSERT INTO `role_privileges` (role_id, privilege_id) VALUES (2, 60);
