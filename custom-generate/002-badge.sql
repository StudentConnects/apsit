create or replace table badge
(
	id int(10) auto_increment
		primary key,
	name int(50) not null,
	badgelink varchar(100) not null,
	quiz_id longtext collate utf8mb4_bin not null
);

