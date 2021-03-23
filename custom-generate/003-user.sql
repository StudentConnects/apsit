create or replace table user
(
	id int(20) auto_increment
		primary key,
	email varchar(50) not null,
	password varchar(50) not null,
	name varchar(50) not null,
	uType varchar(6) default 'user' not null,
	mobile int(15) not null,
	address longtext not null,
	city varchar(15) not null,
	country varchar(25) not null,
	postalcode int(10) not null,
	institutename varchar(100) not null,
	photo varchar(325) not null,
	badges_id longtext collate utf8mb4_bin null,
	description int(200) null,
	quiz_id longtext collate utf8mb4_bin null,
	total_score int(20) null,
	isActive tinyint not null,
	isVerified tinyint default 0 not null,
	verificationCode varchar(21) null,
	constraint user_verificationLink_uindex
		unique (verificationCode)
);

