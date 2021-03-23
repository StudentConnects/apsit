create or replace table company
(
	id int(10) auto_increment
		primary key,
	active int not null,
	name varchar(50) not null,
	description varchar(200) not null,
	logo varchar(325) not null
);

