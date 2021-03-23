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

