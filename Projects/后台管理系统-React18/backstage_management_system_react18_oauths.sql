create table oauths
(
    id           int unsigned auto_increment
        primary key,
    access_token varchar(255)    not null,
    provider     varchar(255)    not null,
    uid          bigint unsigned not null,
    user_id      int unsigned    not null,
    created_at   datetime        null,
    updated_at   datetime        null,
    constraint oauths_ibfk_1
        foreign key (user_id) references users (id)
)
    engine = InnoDB;

create index user_id
    on oauths (user_id);

INSERT INTO `backstage-management-system-react18`.oauths (id, access_token, provider, uid, user_id, created_at, updated_at) VALUES (4, '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', 'github', 45784210, 100000007, '2022-05-16 15:56:38', '2022-05-16 15:57:11');
