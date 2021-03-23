create or replace table submitted_quiz
(
	id int(20) auto_increment
		primary key,
	uid int(20) not null,
	qid int(20) not null,
	answers longtext collate utf8mb4_bin not null,
	marks int(20) not null
);

