create table sequelizemeta
(
    name varchar(255) not null,
    constraint name
        unique (name)
)
    engine = InnoDB
    collate = utf8_unicode_ci;

alter table sequelizemeta
    add primary key (name);

INSERT INTO `backstage-management-system-react18`.sequelizemeta (name) VALUES ('20220225063333-init-user.ts');
INSERT INTO `backstage-management-system-react18`.sequelizemeta (name) VALUES ('20220308042501-modify-user.ts');
INSERT INTO `backstage-management-system-react18`.sequelizemeta (name) VALUES ('20220308042736-init-oauth.ts');
INSERT INTO `backstage-management-system-react18`.sequelizemeta (name) VALUES ('20220312085153-modify-user.ts');
INSERT INTO `backstage-management-system-react18`.sequelizemeta (name) VALUES ('20220323220804-init-role.ts');
INSERT INTO `backstage-management-system-react18`.sequelizemeta (name) VALUES ('20220323222102-init-userRole.ts');
INSERT INTO `backstage-management-system-react18`.sequelizemeta (name) VALUES ('20220326190606-init-privilege.ts');
INSERT INTO `backstage-management-system-react18`.sequelizemeta (name) VALUES ('20220329060300-init-rolePrivilege.ts');
INSERT INTO `backstage-management-system-react18`.sequelizemeta (name) VALUES ('20220605045454-init-menu.ts');
INSERT INTO `backstage-management-system-react18`.sequelizemeta (name) VALUES ('20220605064502-init-roleMenu.ts');
