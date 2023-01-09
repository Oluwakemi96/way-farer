
export default {
  registerUsers: `
        INSERT INTO users(
            email,
            first_name,
            last_name,
            password,
            email_token,
            email_token_expiry
        )
        VALUES($1, $2, $3, $4, $5, $6)
        RETURNING *

    `,
  findEmail: `
        SELECT user_id,
               first_name,
               last_name,
               email, 
               is_email_verified,
               is_admin, 
               password
           FROM users
        WHERE email = $1
    `,
  findEmailVerificationToken: `
        SELECT user_id, email_token, email
            FROM users
        WHERE email_token = $1
            AND email_token_expiry::timestamp > NOW()       
    `,
  verifyEmail: `
        UPDATE users
            SET is_email_verified = true,
                email_token = null,
                email_token_expiry = null,
                updated_at = NOW()
        WHERE user_id = $1    
    `,
  getUserDetailsByEmail: `
        SELECT 
            id,
            user_id,
            email,
            first_name,
            last_name,
            is_admin,
            is_email_verified,
            email_token,
            email_token_expiry,
            password_token,
            password_token_expiry
        FROM 
            users   
        WHERE email =  $1         
      `,

  setForgotPasswordToken: `
        UPDATE users
            SET 
              updated_at = NOW(),
              password_token = $2,
              password_token_expiry = $3
        WHERE user_id = $1
        RETURNING 
            email,
            first_name,
            last_name,
            is_admin,
            is_email_verified
            password_token           
   `,

  resetUserPassword: `
            UPDATE users
                SET 
                 updated_at = NOW(),
                 password = $2
            WHERE user_id = $1
   `,
  getUserByToken: `
            SELECT 
            id,
            user_id,
            email,
            first_name,
            last_name,
            is_admin,
            is_email_verified,
            email_token,
            email_token_expiry,
            password_token,
            password_token_expiry
        FROM 
            users   
        WHERE password_token =  $1 
            AND password_token_expiry::timestamp > NOW()    
   `
};
