create or replace table quiz_list
(
	id int auto_increment
		primary key,
	company_id int not null,
	quiz_id varchar(255) not null,
	quiz_time int not null,
	isActive tinyint(1) default 0 not null,
	constraint quizes_list
		foreign key (company_id) references company (id)
);

