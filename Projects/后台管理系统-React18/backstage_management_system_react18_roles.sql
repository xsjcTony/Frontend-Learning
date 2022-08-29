create table roles
(
    id               int unsigned auto_increment
        primary key,
    role_name        varchar(255)         not null,
    role_description varchar(255)         not null,
    role_state       tinyint(1) default 1 not null,
    created_at       datetime             null,
    updated_at       datetime             null,
    constraint role_description
        unique (role_description),
    constraint role_name
        unique (role_name)
)
    engine = InnoDB;

INSERT INTO `backstage-management-system-react18`.roles (id, role_name, role_description, role_state, created_at, updated_at) VALUES (14, 'Administrator', 'Has all privileges', 1, '2022-06-03 04:45:45', '2022-06-03 04:46:10');
INSERT INTO `backstage-management-system-react18`.roles (id, role_name, role_description, role_state, created_at, updated_at) VALUES (15, 'User manager', 'Has all user related privileges', 1, '2022-06-03 04:46:23', '2022-06-05 09:15:14');
INSERT INTO `backstage-management-system-react18`.roles (id, role_name, role_description, role_state, created_at, updated_at) VALUES (16, 'Role manager', 'Has all role related privileges', 1, '2022-06-03 04:46:33', '2022-06-03 04:46:33');
INSERT INTO `backstage-management-system-react18`.roles (id, role_name, role_description, role_state, created_at, updated_at) VALUES (17, 'Privilege manager', 'Has all privilege related privileges', 1, '2022-06-03 04:47:14', '2022-06-03 04:47:14');
INSERT INTO `backstage-management-system-react18`.roles (id, role_name, role_description, role_state, created_at, updated_at) VALUES (18, 'Menu manager', 'Has all menu related privileges', 1, '2022-06-03 04:47:25', '2022-06-05 09:15:00');
INSERT INTO `backstage-management-system-react18`.roles (id, role_name, role_description, role_state, created_at, updated_at) VALUES (19, 'Normal user', 'Has no privilege (currently)', 1, '2022-06-03 04:48:18', '2022-06-03 04:48:18');
