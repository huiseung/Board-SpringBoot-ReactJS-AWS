create table comments (
    comment_id bigint not null auto_increment,
    create_at datetime(6),
    modified_at datetime(6),
    author varchar(255),
    content varchar(255) not null,
    post_id bigint,
    primary key (comment_id)
);

create table images (
    image_id bigint not null auto_increment,
    file_name varchar(255),
    storage_path varchar(255),
    post_id bigint,
    primary key (image_id)
);

create table posts (
    post_id bigint not null auto_increment,
    create_at datetime(6),
    modified_at datetime(6),
    category varchar(255),
    content longtext not null,
    title varchar(255) not null,
    thumbnail_image_id bigint,
    user_id bigint,
    primary key (post_id)
);

create table users (
   user_id bigint not null auto_increment,
    create_at datetime(6),
    modified_at datetime(6),
    identifier varchar(255),
    nick_name varchar(255),
    password varchar(255),
    user_role varchar(255),
    primary key (user_id)
);

alter table users
   add constraint UK_qxbxprw69rusb9ap6ydm5ndue unique (identifier)

alter table users
   add constraint UK_pl4047a5k5enw6up4sjs8lyut unique (nick_name)

alter table comments
   add constraint FKh4c7lvsc298whoyd4w9ta25cr
   foreign key (post_id)
   references posts (post_id)

alter table images
   add constraint FKcp0pycisii8ub3q4b7x5mfpn1
   foreign key (post_id)
   references posts (post_id)

alter table posts
   add constraint FKfvnbajbdvf3rltye6y4eue5fj
   foreign key (thumbnail_image_id)
   references images (image_id)

alter table posts
   add constraint FK5lidm6cqbc7u4xhqpxm898qme
   foreign key (user_id)
   references users (user_id)