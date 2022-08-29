create table user_roles
(
    user_id    int unsigned not null,
    role_id    int unsigned not null,
    created_at datetime     null,
    updated_at datetime     null,
    primary key (user_id, role_id),
    constraint user_roles_ibfk_1
        foreign key (user_id) references users (id)
            on update cascade on delete cascade,
    constraint user_roles_ibfk_2
        foreign key (role_id) references roles (id)
            on update cascade on delete cascade
)
    engine = InnoDB;

create index role_id
    on user_roles (role_id);

INSERT INTO `backstage-management-system-react18`.user_roles (user_id, role_id, created_at, updated_at) VALUES (1, 14, null, null);
INSERT INTO `backstage-management-system-react18`.user_roles (user_id, role_id, created_at, updated_at) VALUES (1, 15, null, null);
INSERT INTO `backstage-management-system-react18`.user_roles (user_id, role_id, created_at, updated_at) VALUES (1, 16, null, null);
INSERT INTO `backstage-management-system-react18`.user_roles (user_id, role_id, created_at, updated_at) VALUES (1, 17, null, null);
INSERT INTO `backstage-management-system-react18`.user_roles (user_id, role_id, created_at, updated_at) VALUES (1, 18, null, null);
INSERT INTO `backstage-management-system-react18`.user_roles (user_id, role_id, created_at, updated_at) VALUES (1, 19, null, null);
INSERT INTO `backstage-management-system-react18`.user_roles (user_id, role_id, created_at, updated_at) VALUES (2, 15, '2022-06-10 13:00:20', '2022-06-10 13:00:20');
INSERT INTO `backstage-management-system-react18`.user_roles (user_id, role_id, created_at, updated_at) VALUES (3, 16, '2022-06-10 13:00:24', '2022-06-10 13:00:24');
INSERT INTO `backstage-management-system-react18`.user_roles (user_id, role_id, created_at, updated_at) VALUES (4, 17, '2022-06-11 13:25:19', '2022-06-11 13:25:19');
INSERT INTO `backstage-management-system-react18`.user_roles (user_id, role_id, created_at, updated_at) VALUES (5, 18, '2022-06-10 21:55:45', '2022-06-10 21:55:45');
INSERT INTO `backstage-management-system-react18`.user_roles (user_id, role_id, created_at, updated_at) VALUES (100000007, 14, null, null);
INSERT INTO `backstage-management-system-react18`.user_roles (user_id, role_id, created_at, updated_at) VALUES (100000035, 19, '2022-06-05 08:29:14', '2022-06-05 08:29:14');
