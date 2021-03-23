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

