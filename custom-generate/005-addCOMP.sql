create or replace procedure addCOMP(IN ac int, IN cname varchar(50), IN descrip varchar(200), IN logo varchar(325))
BEGIN
insert into `company`(`active`,`name`,`description`,`logo`) values(ac,cname,descrip,logo);
Set @status='Company details added';
Select @status;
END;

