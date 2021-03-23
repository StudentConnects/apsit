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

