-- this is an example migration

-- auto-generated definition
create table users
(
    id              varchar(255)
        primary key,
    email           varchar(255)  not null,
    api_key_version int default 1 not null,
    created_at      datetime      not null,
    updated_at      datetime      not null,
    deleted_at      datetime      null
);
