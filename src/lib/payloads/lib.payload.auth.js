export default {
  registerUser: (body, hashedPassword, email_token, email_token_expiry) => [ body.email.trim(), body.first_name.trim(), body.last_name.trim(), hashedPassword, email_token, email_token_expiry ]
};
