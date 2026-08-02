const ResetPasswordMailTemp = (resetLink) => {
  return `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Reset Password</title>
  </head>
  <body
    style="
      margin: 0;
      padding: 0;
      font-family: Arial, sans-serif;
      background: linear-gradient(135deg, #0f172a, #1e3a8a, #2563eb);
    "
  >
    <table
      width="100%"
      cellpadding="0"
      cellspacing="0"
      border="0"
      style="padding: 40px 20px"
    >
      <tr>
        <td align="center">
          <table
            width="100%"
            cellpadding="0"
            cellspacing="0"
            border="0"
            style="
              max-width: 600px;
              background: rgba(255, 255, 255, 0.12);
              border-radius: 24px;
              overflow: hidden;
              backdrop-filter: blur(14px);
              box-shadow: 0 8px 30px rgba(0, 0, 0, 0.25);
              border: 1px solid rgba(255, 255, 255, 0.18);
            "
          >
            <!-- Header Section -->
            <tr>
              <td
                align="center"
                style="
                  padding: 40px 30px 20px;
                  background: linear-gradient(
                    135deg,
                    rgba(255, 255, 255, 0.18),
                    rgba(255, 255, 255, 0.05)
                  );
                "
              >
                <h1
                  style="
                    margin: 0;
                    font-size: 30px;
                    color: #ffffff;
                    font-weight: bold;
                    letter-spacing: 1px;
                  "
                >
                  🍎 STUDENT MANAGEMENT TEAM
                </h1>
                <p
                  style="
                    margin: 12px 0 0;
                    font-size: 15px;
                    color: #dbeafe;
                  "
                >
                  Password Reset Request
                </p>
              </td>
            </tr>

            <!-- Content Section -->
            <tr>
              <td
                style="
                  padding: 35px 30px;
                  text-align: center;
                  background: rgba(255, 255, 255, 0.08);
                "
              >
                <h2
                  style="
                    margin: 0 0 12px;
                    font-size: 24px;
                    color: #ffffff;
                  "
                >
                  Reset Your Password
                </h2>

                <p
                  style="
                    margin: 0 0 25px;
                    font-size: 16px;
                    line-height: 1.7;
                    color: #e0f2fe;
                  "
                >
                  Hello,<br />
                  We received a request to reset your password. Click the button below to set up a new password for your account.
                </p>

                <!-- Action Button -->
                <div style="margin: 30px 0;">
                  <a
                    href="${resetLink}"
                    target="_blank"
                    style="
                      display: inline-block;
                      padding: 16px 36px;
                      font-size: 16px;
                      font-weight: bold;
                      color: #ffffff;
                      text-decoration: none;
                      background: linear-gradient(135deg, #3b82f6, #06b6d4);
                      border-radius: 12px;
                      box-shadow: 0 6px 20px rgba(59, 130, 246, 0.45);
                    "
                  >
                    Reset Password
                  </a>
                </div>

                <!-- Fallback URL Link -->
                <p
                  style="
                    margin: 25px 0 0;
                    font-size: 13px;
                    line-height: 1.6;
                    color: #cbd5e1;
                    word-break: break-all;
                  "
                >
                  If the button above doesn't work, copy and paste this link into your browser:<br />
                  <a href="${resetLink}" style="color: #60a5fa; text-decoration: underline;">${resetLink}</a>
                </p>

                <p
                  style="
                    margin: 28px 0 0;
                    font-size: 14px;
                    line-height: 1.7;
                    color: #cbd5e1;
                  "
                >
                  If you didn't request a password reset, you can safely ignore this email.
                </p>
              </td>
            </tr>

            <!-- Footer Section -->
            <tr>
              <td
                align="center"
                style="
                  padding: 22px 20px;
                  border-top: 1px solid rgba(255, 255, 255, 0.12);
                  background: rgba(15, 23, 42, 0.35);
                "
              >
                <p
                  style="
                    margin: 0;
                    font-size: 13px;
                    color: #bfdbfe;
                  "
                >
                  © 2026 codexmish. All rights reserved.
                </p>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
</html>`;
};

module.exports = { ResetPasswordMailTemp };