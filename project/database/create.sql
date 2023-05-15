drop table ccat9.stock_entry;
drop table ccat9.zipcode;
drop table ccat9.item;
drop table ccat9.order;
drop table ccat9.product;
drop table ccat9.coupon;
drop schema ccat9;

create schema ccat9;

create table ccat9.product (
  id_product integer primary key,
  description text,
  price numeric,
  width integer,
  height integer,
  length integer,
  weight numeric,
  currency text
);

insert into ccat9.product (id_product, description, price, width, height, length, weight, currency) 
values 
(1, 'A', 1000, 100, 30, 10, 3, 'BRL'), 
(2, 'B', 5000, 50, 50, 50, 22, 'BRL'), 
(3, 'C', 30, 10, 10, 10, 0.9, 'BRL'), 
(4, 'D', 100, 100, 30, 10, 3, 'USD');

create table ccat9.coupon (
  code text primary key,
  percentage numeric,
  expire_date timestamp
);

insert into ccat9.coupon (code, percentage, expire_date) values ('VALE20', 20, '2023-12-01T10:00:00'), ('VALE20_EXPIRED', 20, '2022-10-01T10:00:00');

create table ccat9.order (
  id_order serial primary key,
  coupon_code text,
  coupon_percentage numeric,
  code text,
  cpf text,
  email text,
  issue_date timestamp,
  freight numeric,
  total numeric,
  sequence integer
);

create table ccat9.item (
  id_order integer references ccat9.order (id_order),
  id_product integer references ccat9.product (id_product),
  price numeric,
  quantity integer,
  primary key (id_order, id_product)
);

create table ccat9.zipcode (
  code text primary key,
  street text,
  neighborhood text,
  lat numeric,
  long numeric
);

insert into ccat9.zipcode (code, street, neighborhood, lat, long) 
values ('22030060', '', '', -27.5945, -48.5477), 
       ('88015600', '', '', -22.9129, -43.2003);

create table ccat9.stock_entry (
  id_stock_entry serial primary key,
  id_product integer references ccat9.product (id_product),
  operation text,
  quantity integer 
);