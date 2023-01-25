/* Replace with your SQL commands */
INSERT INTO activity_type (code, name, description)
VALUES 
('SNUP', 'signup', 'user creates account'),
('VUEM', 'verify email', 'user creates account'),
('RESVEM', 'resend verify email', 'user regenerates verify email token'),
('FGPWD', 'forgot password', 'user forgets password'),
('REPWD', 'reset password', 'user resets password'),
('LGIN', 'login', 'user logs in'),
('BOTRP', 'book trip', 'user books trip'),
('CABOK', 'cancel booking', 'user cancels booking') ON CONFLICT (code)
DO
UPDATE
SET
code = EXCLUDED.code,
name = EXCLUDED.name,
description = EXCLUDED.description;

INSERT INTO admin_activity_type (code, name, description)
VALUES 
('FGPWD', 'forgot password', 'admin forgets password'),
('REPWD', 'reset password', 'admin resets password'),
('LGIN', 'login', 'admin logs in'),
('CRTRP', 'create trip', 'admin creates a trip'),
('REGBUS', 'register bus', 'admin registers bus'),
('CANTRP', 'cancel trip', 'admin cancels trip'),
('TRPIP', 'trip in progress', 'admin sets trip status to in progress'),
('COMTRP', 'trip completed', 'admin sets trip status to completed'),
('ACTRP', 'active trip', 'admin sets trip status to active') ON CONFLICT (code)
DO
UPDATE
SET
code = EXCLUDED.code,
name = EXCLUDED.name,
description = EXCLUDED.description;