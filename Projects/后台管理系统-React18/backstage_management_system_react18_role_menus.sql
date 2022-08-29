create table role_menus
(
    role_id    int unsigned not null,
    menu_id    int unsigned not null,
    created_at datetime     null,
    updated_at datetime     null,
    primary key (role_id, menu_id),
    constraint role_menus_ibfk_1
        foreign key (role_id) references roles (id)
            on update cascade on delete cascade,
    constraint role_menus_ibfk_2
        foreign key (menu_id) references menus (id)
            on update cascade on delete cascade
)
    engine = InnoDB;

create index menu_id
    on role_menus (menu_id);

INSERT INTO `backstage-management-system-react18`.role_menus (role_id, menu_id, created_at, updated_at) VALUES (14, 1, '2022-06-06 18:24:24', '2022-06-06 18:24:24');
INSERT INTO `backstage-management-system-react18`.role_menus (role_id, menu_id, created_at, updated_at) VALUES (14, 2, '2022-06-06 18:24:24', '2022-06-06 18:24:24');
INSERT INTO `backstage-management-system-react18`.role_menus (role_id, menu_id, created_at, updated_at) VALUES (14, 3, '2022-06-06 20:02:25', '2022-06-06 20:02:25');
INSERT INTO `backstage-management-system-react18`.role_menus (role_id, menu_id, created_at, updated_at) VALUES (14, 4, '2022-06-06 20:02:25', '2022-06-06 20:02:25');
INSERT INTO `backstage-management-system-react18`.role_menus (role_id, menu_id, created_at, updated_at) VALUES (14, 5, '2022-06-06 20:02:25', '2022-06-06 20:02:25');
INSERT INTO `backstage-management-system-react18`.role_menus (role_id, menu_id, created_at, updated_at) VALUES (14, 6, '2022-06-06 18:24:24', '2022-06-06 18:24:24');
INSERT INTO `backstage-management-system-react18`.role_menus (role_id, menu_id, created_at, updated_at) VALUES (15, 1, '2022-06-10 12:56:01', '2022-06-10 12:56:01');
INSERT INTO `backstage-management-system-react18`.role_menus (role_id, menu_id, created_at, updated_at) VALUES (15, 2, '2022-06-10 12:56:01', '2022-06-10 12:56:01');
INSERT INTO `backstage-management-system-react18`.role_menus (role_id, menu_id, created_at, updated_at) VALUES (16, 4, '2022-06-10 12:56:06', '2022-06-10 12:56:06');
INSERT INTO `backstage-management-system-react18`.role_menus (role_id, menu_id, created_at, updated_at) VALUES (17, 5, '2022-06-10 12:56:10', '2022-06-10 12:56:10');
INSERT INTO `backstage-management-system-react18`.role_menus (role_id, menu_id, created_at, updated_at) VALUES (18, 6, '2022-06-10 12:56:14', '2022-06-10 12:56:14');
