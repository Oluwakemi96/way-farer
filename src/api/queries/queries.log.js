export default {
  createActivityLogs: `
      INSERT INTO user_activity_logs (
          user_id, 
          activity_type, 
          activity_status
      )VALUES($1, $2, $3)`,

  createAdminActivityLogs: `
    INSERT INTO admin_activity_logs (
        user_id, 
        activity_type, 
        activity_status
    )VALUES($1, $2, $3)`
};
  
