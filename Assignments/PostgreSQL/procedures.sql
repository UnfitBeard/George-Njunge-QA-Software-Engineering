-- create users
CREATE OR REPLACE PROCEDURE createUserProcedure(
    p_userName TEXT,
    p_email TEXT,
    p_password TEXT,
    p_roleId INT
)
LANGUAGE plpgsql
AS $$
BEGIN
    INSERT INTO users (username, email, password, role_id) 
    VALUES (p_userName, p_email, p_password, p_roleId);
END;
$$;

-- get a users by ID
CREATE OR REPLACE PROCEDURE GetUser(
    IN p_id INT,
    OUT o_id INT,
    OUT o_username TEXT,
    OUT o_email TEXT,
    OUT o_role_id INT
)
LANGUAGE plpgsql
AS $$
BEGIN
    SELECT id, username, email, role_id
    INTO o_id, o_username, o_email, o_role_id
    FROM users
    WHERE id = p_id;
END;
$$;

-- update users
CREATE OR REPLACE PROCEDURE UpdateUsers(
	p_id INT,
    p_username TEXT,
    p_email TEXT,
    p_password TEXT,
    p_roleId INT
)
LANGUAGE plpgsql
AS $$
BEGIN
    UPDATE users 
	SET username = p_username, email = p_email, password = p_password, role_id = p_roleId
	WHERE id = p_id;
END;
$$;

-- delete users
CREATE OR REPLACE PROCEDURE DeleteUser(p_id INT)
LANGUAGE plpgsql
As $$
BEGIN 
	DELETE FROM users 
	WHERE id = p_id;
END;
$$;

-- combination of delete and create a user
CREATE OR REPLACE PROCEDURE DeleteAndInsertNewUser(
	p_olduserId INT,
	p_username TEXT,
	p_email TEXT,
	p_password TEXT,
	p_roleID INT
)
LANGUAGE plpgsql
AS $$
BEGIN
	DELETE FROM users 
	WHERE id = p_olduserId;

	INSERT INTO USERS(username, email, password, role_id)
	VALUES(p_username, p_email, p_password, p_roleId);

END;
$$;

	
CALL createUserProcedure('george', 'george2@gmail.com', 'george','11');
CALL Getuser(9, NULL, NULL, NULL, NULL)
CALL UpdateUsers(9, 'garge', 'george@gmail.com','garge', 12)
CALL DeleteUser(11)
CALL DeleteAndInsertNewUser(1, 'kim', 'kim@gmail.com', 'kim', 12)
