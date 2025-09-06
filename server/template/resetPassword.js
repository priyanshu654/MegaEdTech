// mails/ResetPassword.js
module.exports = function resetPasswordTemplate(url) {
  return `
    <div style="font-family: Arial, sans-serif; padding: 20px;">
      <h2>Password Reset Request</h2>
      <p>You requested a password reset. Click the button below to reset your password:</p>
      <a href="${url}" style="background-color:#6366f1; color:white; padding:10px 20px; text-decoration:none; border-radius:5px;">
        Reset Password
      </a>
      <p>If you did not request this, you can ignore this email.</p>
      <p>Thanks,<br/>Team StudyNotion</p>
    </div>
  `;
};
