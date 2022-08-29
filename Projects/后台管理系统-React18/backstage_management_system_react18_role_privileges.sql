create table role_privileges
(
    role_id      int unsigned not null,
    privilege_id int unsigned not null,
    created_at   datetime     null,
    updated_at   datetime     null,
    primary key (role_id, privilege_id),
    constraint role_privileges_ibfk_1
        foreign key (role_id) references roles (id)
            on update cascade on delete cascade,
    constraint role_privileges_ibfk_2
        foreign key (privilege_id) references privileges (id)
            on update cascade on delete cascade
)
    engine = InnoDB;

create index privilege_id
    on role_privileges (privilege_id);

INSERT INTO `backstage-management-system-react18`.role_privileges (role_id, privilege_id, created_at, updated_at) VALUES (14, 1, '2022-06-13 00:39:58', '2022-06-13 00:39:58');
INSERT INTO `backstage-management-system-react18`.role_privileges (role_id, privilege_id, created_at, updated_at) VALUES (14, 2, '2022-06-13 00:39:58', '2022-06-13 00:39:58');
INSERT INTO `backstage-management-system-react18`.role_privileges (role_id, privilege_id, created_at, updated_at) VALUES (14, 3, '2022-06-13 00:39:58', '2022-06-13 00:39:58');
INSERT INTO `backstage-management-system-react18`.role_privileges (role_id, privilege_id, created_at, updated_at) VALUES (14, 4, '2022-06-12 19:25:23', '2022-06-12 19:25:23');
INSERT INTO `backstage-management-system-react18`.role_privileges (role_id, privilege_id, created_at, updated_at) VALUES (14, 5, '2022-06-13 00:39:58', '2022-06-13 00:39:58');
INSERT INTO `backstage-management-system-react18`.role_privileges (role_id, privilege_id, created_at, updated_at) VALUES (14, 6, '2022-06-13 00:39:58', '2022-06-13 00:39:58');
INSERT INTO `backstage-management-system-react18`.role_privileges (role_id, privilege_id, created_at, updated_at) VALUES (14, 7, '2022-06-13 00:39:58', '2022-06-13 00:39:58');
INSERT INTO `backstage-management-system-react18`.role_privileges (role_id, privilege_id, created_at, updated_at) VALUES (14, 8, '2022-06-13 00:39:58', '2022-06-13 00:39:58');
INSERT INTO `backstage-management-system-react18`.role_privileges (role_id, privilege_id, created_at, updated_at) VALUES (14, 9, '2022-06-12 19:25:23', '2022-06-12 19:25:23');
INSERT INTO `backstage-management-system-react18`.role_privileges (role_id, privilege_id, created_at, updated_at) VALUES (14, 10, '2022-06-15 13:46:54', '2022-06-15 13:46:54');
INSERT INTO `backstage-management-system-react18`.role_privileges (role_id, privilege_id, created_at, updated_at) VALUES (14, 11, '2022-06-15 13:46:54', '2022-06-15 13:46:54');
INSERT INTO `backstage-management-system-react18`.role_privileges (role_id, privilege_id, created_at, updated_at) VALUES (14, 12, '2022-06-15 13:46:54', '2022-06-15 13:46:54');
INSERT INTO `backstage-management-system-react18`.role_privileges (role_id, privilege_id, created_at, updated_at) VALUES (14, 13, '2022-06-15 13:46:54', '2022-06-15 13:46:54');
INSERT INTO `backstage-management-system-react18`.role_privileges (role_id, privilege_id, created_at, updated_at) VALUES (14, 14, '2022-06-15 13:46:54', '2022-06-15 13:46:54');
INSERT INTO `backstage-management-system-react18`.role_privileges (role_id, privilege_id, created_at, updated_at) VALUES (14, 15, '2022-06-15 13:46:54', '2022-06-15 13:46:54');
INSERT INTO `backstage-management-system-react18`.role_privileges (role_id, privilege_id, created_at, updated_at) VALUES (14, 16, '2022-06-15 13:46:54', '2022-06-15 13:46:54');
INSERT INTO `backstage-management-system-react18`.role_privileges (role_id, privilege_id, created_at, updated_at) VALUES (14, 20, '2022-06-16 19:15:44', '2022-06-16 19:15:44');
INSERT INTO `backstage-management-system-react18`.role_privileges (role_id, privilege_id, created_at, updated_at) VALUES (14, 21, '2022-06-16 19:22:56', '2022-06-16 19:22:56');
INSERT INTO `backstage-management-system-react18`.role_privileges (role_id, privilege_id, created_at, updated_at) VALUES (14, 22, '2022-06-16 19:21:55', '2022-06-16 19:21:55');
INSERT INTO `backstage-management-system-react18`.role_privileges (role_id, privilege_id, created_at, updated_at) VALUES (14, 26, '2022-06-16 19:21:55', '2022-06-16 19:21:55');
INSERT INTO `backstage-management-system-react18`.role_privileges (role_id, privilege_id, created_at, updated_at) VALUES (15, 1, '2022-06-10 22:07:43', '2022-06-10 22:07:43');
INSERT INTO `backstage-management-system-react18`.role_privileges (role_id, privilege_id, created_at, updated_at) VALUES (15, 2, '2022-06-05 13:54:26', '2022-06-05 13:54:26');
INSERT INTO `backstage-management-system-react18`.role_privileges (role_id, privilege_id, created_at, updated_at) VALUES (15, 3, '2022-06-10 22:07:43', '2022-06-10 22:07:43');
INSERT INTO `backstage-management-system-react18`.role_privileges (role_id, privilege_id, created_at, updated_at) VALUES (15, 4, '2022-06-10 22:07:43', '2022-06-10 22:07:43');
INSERT INTO `backstage-management-system-react18`.role_privileges (role_id, privilege_id, created_at, updated_at) VALUES (15, 5, '2022-06-10 22:07:43', '2022-06-10 22:07:43');
INSERT INTO `backstage-management-system-react18`.role_privileges (role_id, privilege_id, created_at, updated_at) VALUES (15, 6, '2022-06-10 22:07:43', '2022-06-10 22:07:43');
INSERT INTO `backstage-management-system-react18`.role_privileges (role_id, privilege_id, created_at, updated_at) VALUES (15, 7, '2022-06-10 22:07:43', '2022-06-10 22:07:43');
INSERT INTO `backstage-management-system-react18`.role_privileges (role_id, privilege_id, created_at, updated_at) VALUES (15, 8, '2022-06-10 22:07:43', '2022-06-10 22:07:43');
INSERT INTO `backstage-management-system-react18`.role_privileges (role_id, privilege_id, created_at, updated_at) VALUES (15, 9, '2022-06-10 22:07:43', '2022-06-10 22:07:43');
INSERT INTO `backstage-management-system-react18`.role_privileges (role_id, privilege_id, created_at, updated_at) VALUES (16, 10, '2022-06-05 07:42:04', '2022-06-05 07:42:04');
INSERT INTO `backstage-management-system-react18`.role_privileges (role_id, privilege_id, created_at, updated_at) VALUES (16, 11, '2022-06-05 07:42:04', '2022-06-05 07:42:04');
INSERT INTO `backstage-management-system-react18`.role_privileges (role_id, privilege_id, created_at, updated_at) VALUES (16, 12, '2022-06-05 07:42:04', '2022-06-05 07:42:04');
INSERT INTO `backstage-management-system-react18`.role_privileges (role_id, privilege_id, created_at, updated_at) VALUES (16, 13, '2022-06-05 07:42:04', '2022-06-05 07:42:04');
INSERT INTO `backstage-management-system-react18`.role_privileges (role_id, privilege_id, created_at, updated_at) VALUES (16, 14, '2022-06-05 07:42:04', '2022-06-05 07:42:04');
INSERT INTO `backstage-management-system-react18`.role_privileges (role_id, privilege_id, created_at, updated_at) VALUES (16, 15, '2022-06-05 07:42:04', '2022-06-05 07:42:04');
INSERT INTO `backstage-management-system-react18`.role_privileges (role_id, privilege_id, created_at, updated_at) VALUES (16, 16, '2022-06-05 07:42:04', '2022-06-05 07:42:04');
INSERT INTO `backstage-management-system-react18`.role_privileges (role_id, privilege_id, created_at, updated_at) VALUES (17, 17, '2022-06-05 09:19:05', '2022-06-05 09:19:05');
INSERT INTO `backstage-management-system-react18`.role_privileges (role_id, privilege_id, created_at, updated_at) VALUES (17, 18, '2022-06-05 09:19:05', '2022-06-05 09:19:05');
INSERT INTO `backstage-management-system-react18`.role_privileges (role_id, privilege_id, created_at, updated_at) VALUES (17, 19, '2022-06-05 09:19:05', '2022-06-05 09:19:05');
INSERT INTO `backstage-management-system-react18`.role_privileges (role_id, privilege_id, created_at, updated_at) VALUES (17, 20, '2022-06-05 09:19:05', '2022-06-05 09:19:05');
INSERT INTO `backstage-management-system-react18`.role_privileges (role_id, privilege_id, created_at, updated_at) VALUES (17, 21, '2022-06-05 09:19:05', '2022-06-05 09:19:05');
INSERT INTO `backstage-management-system-react18`.role_privileges (role_id, privilege_id, created_at, updated_at) VALUES (18, 22, '2022-06-05 07:42:30', '2022-06-05 07:42:30');
INSERT INTO `backstage-management-system-react18`.role_privileges (role_id, privilege_id, created_at, updated_at) VALUES (18, 26, '2022-06-05 07:42:30', '2022-06-05 07:42:30');
