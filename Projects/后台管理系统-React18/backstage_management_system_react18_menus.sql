create table menus
(
    id               int unsigned auto_increment
        primary key,
    menu_name        varchar(255)         not null,
    menu_description varchar(255)         not null,
    menu_state       tinyint(1) default 1 not null,
    menu_key         varchar(255)         not null,
    menu_icon        varchar(255)         null,
    parent_id        int unsigned         not null,
    level            tinyint unsigned     not null,
    created_at       datetime             null,
    updated_at       datetime             null,
    constraint menu_description
        unique (menu_description),
    constraint menu_key
        unique (menu_key),
    constraint menu_name
        unique (menu_name)
)
    engine = InnoDB;

INSERT INTO `backstage-management-system-react18`.menus (id, menu_name, menu_description, menu_state, menu_key, menu_icon, parent_id, level, created_at, updated_at) VALUES (1, 'menu.user-management', 'User management', 1, 'user-management', 'SettingOutlined', 0, 1, null, null);
INSERT INTO `backstage-management-system-react18`.menus (id, menu_name, menu_description, menu_state, menu_key, menu_icon, parent_id, level, created_at, updated_at) VALUES (2, 'menu.user-management.user-list', 'User list', 1, '/admin/users', 'UserOutlined', 1, 2, null, null);
INSERT INTO `backstage-management-system-react18`.menus (id, menu_name, menu_description, menu_state, menu_key, menu_icon, parent_id, level, created_at, updated_at) VALUES (3, 'menu.privilege-management', 'Privilege management', 1, 'privilege-management', 'UnlockOutlined', 0, 1, null, null);
INSERT INTO `backstage-management-system-react18`.menus (id, menu_name, menu_description, menu_state, menu_key, menu_icon, parent_id, level, created_at, updated_at) VALUES (4, 'menu.privilege-management.role-list', 'Role list', 1, '/admin/roles', 'EyeOutlined', 3, 2, null, null);
INSERT INTO `backstage-management-system-react18`.menus (id, menu_name, menu_description, menu_state, menu_key, menu_icon, parent_id, level, created_at, updated_at) VALUES (5, 'menu.privilege-management.privilege-list', 'Privilege list', 1, '/admin/privileges', 'SafetyCertificateOutlined', 3, 2, null, null);
INSERT INTO `backstage-management-system-react18`.menus (id, menu_name, menu_description, menu_state, menu_key, menu_icon, parent_id, level, created_at, updated_at) VALUES (6, 'menu.privilege-management.menu-list', 'Menu list', 1, '/admin/menus', 'MenuOutlined', 3, 2, null, null);
