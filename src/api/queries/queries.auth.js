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
        SELECT email
           FROM users
        WHERE email = $1
        
    `
};
