create or replace table badge
(
	id int(10) auto_increment
		primary key,
	name int(50) not null,
	badgelink varchar(100) not null,
	quiz_id longtext collate utf8mb4_bin not null
);

create or replace table company
(
	id int(10) auto_increment
		primary key,
	active int not null,
	name varchar(50) not null,
	description varchar(200) not null,
	logo varchar(325) not null
);

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

create or replace table submitted_quiz
(
	id int(20) auto_increment
		primary key,
	uid int(20) not null,
	qid int(20) not null,
	answers longtext collate utf8mb4_bin not null,
	marks int(20) not null
);

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

create or replace procedure Reg(IN UEmail varchar(50), IN pass varchar(50), IN Uname varchar(50), IN UNo int(15), IN Uadd longtext, IN city varchar(15), IN ctry varchar(25), IN post int(10), IN inst varchar(100), IN photo varchar(325), IN verificationCode varchar(21))
BEGIN
IF exists (SELECT * FROM user WHERE email = UEmail)
      Then
           SET @status='Already exist';
      ELSE
		insert into `user` (`email`,`password`,`name`,`mobile`,`address`,`city`,`country`,`postalcode`,`institutename`,`photo`,`isActive`,`isVerified`, `verificationCode`) values(UEmail,pass,Uname,UNo,Uadd,city,ctry,post,inst,photo,1,0, verificationCode);
        SET @status='Registered';
		end if;
        SELECT id, email , @status,  isVerified FROM user WHERE email = UEmail;
END;

create or replace procedure addCOMP(IN ac int, IN cname varchar(50), IN descrip varchar(200), IN logo varchar(325))
BEGIN
insert into `company`(`active`,`name`,`description`,`logo`) values(ac,cname,descrip,logo);
Set @status='Company details added';
Select @status;
END;

create or replace procedure addQuiz(IN Qname varchar(100), IN CompID int, IN quizTime int, IN is_active tinyint(1))
BEGIN
set @table:=Qname;
if exists (select 1 from information_schema.tables WHERE table_name=@table )
then
set @status="table already Exist";
else
SET @sql_text:=CONCAT('CREATE TABLE ',@table,'( `qno` INT(10) NOT NULL AUTO_INCREMENT , `question` VARCHAR(500) NOT NULL , `op1` VARCHAR(100) NOT NULL , `op2` VARCHAR(100) NOT NULL , `op3` VARCHAR(100) NOT NULL , `op4` VARCHAR(100) NOT NULL , `ans` JSON NOT NULL , PRIMARY KEY (`qno`)) ENGINE = InnoDB;');
PREPARE stmt from @sql_text;
EXECUTE stmt;
Insert Into quiz_list (company_id, quiz_id, quiz_time, isActive) Values (CompID,@table, quizTime, is_active);
set @status="success";
end if;
select @status,@table;
END;

create or replace procedure fetchQuiz(IN entryId int, IN quizId varchar(500))
BEGIN
    set @active := false;
    select isActive INTO @active from quiz_list where id = entryId and quiz_id = quizId;
IF(@active = TRUE)
      Then
          set @statement := CONCAT('Select qno as id, question, op1, op2, op3, op4 from ', quizId);
          PREPARE stmt from @statement;
          EXECUTE stmt;
      ELSE
		SET @Return = 'Invalid';
		select @Return;
end if;
END;

