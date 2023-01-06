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
    `
};
