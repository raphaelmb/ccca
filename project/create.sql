drop table ccat9.product;
drop table ccat9.coupon;
drop schema ccat9;

create schema ccat9;

create table ccat9.product (
  id_product integer primary key,
  description text,
  price numeric
);

insert into ccat9.product (id_product, description, price) values (1, 'A', 1000), (2, 'B', 5000), (3, 'C', 30);

create table ccat9.coupon (
  code text primary key,
  percentage numeric
);

insert into ccat9.coupon (code, percentage) values ('VALE20', 20);