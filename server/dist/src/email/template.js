// Brand colors
const COLORS = {
    primary: "#16a34a", // green
    accent: "#f59e0b", // orange
    bg: "#f3f4f6", // light background
    card: "#ffffff", // light card
    text: "#111827", // dark text
    muted: "#6b7280", // gray text
};
export const emailVerification = (name, email, url, SITE_NAME) => {
    return `

<!doctype html>
<html lang="en">
  <head>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
    <meta name="color-scheme" content="light dark" />
    <meta name="supported-color-schemes" content="light dark" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>Verify your ${SITE_NAME} email</title>
    <style>
      /* Some clients support dark mode media query */
      @media (prefers-color-scheme: dark) {
        body, .email-bg { background: #0b0f0c !important; }
        .card { background: #111827 !important; border-color: #1f2937 !important; }
        .text { color: #e5e7eb !important; }
        .muted { color: #9ca3af !important; }
        .brand { color: ${COLORS.primary} !important; }
        .btn { background: ${COLORS.primary} !important; color: #ffffff !important; }
        a { color: ${COLORS.accent} !important; }
        .divider { border-top-color: #1f2937 !important; }
      }
      /* Mobile tweaks */
      @media only screen and (max-width: 600px) {
        .container { width: 100% !important; padding: 0 16px !important; }
        .card { padding: 20px !important; }
      }
    </style>
  </head>
  <body class="email-bg" style="margin:0; padding:0; background:${COLORS.bg};">
    <table role="presentation" width="100%" border="0" cellspacing="0" cellpadding="0" style="background:${COLORS.bg};">
      <tr>
        <td align="center">
          <table role="presentation" width="600" class="container" border="0" cellspacing="0" cellpadding="0" style="width:600px; max-width:600px; margin:0 auto; padding:24px;">
            <tr>
              <td align="left" style="padding: 8px 0 16px;">
                <div class="text" style="font-family: system-ui, -apple-system, Segoe UI, Roboto, Arial; font-size: 14px; color:${COLORS.muted};">
                  <span class="brand" style="display:inline-block; font-weight:700; color:${COLORS.primary}; font-size:18px;">
                    ${SITE_NAME}
                  </span>
                  <span style="display:inline-block; margin-left:8px; padding:2px 8px; border-radius:999px; background:${COLORS.accent}; color:#111827; font-weight:600; font-size:12px;">
                    Action Required
                  </span>
                </div>
              </td>
            </tr>

            <tr>
              <td>
                <table role="presentation" width="100%" class="card" border="0" cellspacing="0" cellpadding="0"
                  style="background:${COLORS.card}; border:1px solid #e5e7eb; border-radius:12px; padding:28px; font-family: system-ui, -apple-system, Segoe UI, Roboto, Arial;">
                  <tr>
                    <td class="text" style="color:${COLORS.text};">
                      <h1 style="margin:0 0 12px; font-size:22px; line-height:1.3; color:${COLORS.text};">
                        Verify your ${SITE_NAME} email
                      </h1>
                      <p style="margin:0 0 12px; color:${COLORS.text};">
                        Hi ${name},
                      </p>
                      <p style="margin:0 0 16px; color:${COLORS.text};">
                        Thanks for signing up for ${SITE_NAME}. Click the button below to confirm your email and activate your account.
                      </p>

                      <table role="presentation" border="0" cellspacing="0" cellpadding="0" style="margin: 20px 0;">
                        <tr>
                          <td>
                            <a class="btn"
                               href="${url}"
                               style="background:${COLORS.primary}; color:#ffffff; text-decoration:none; padding:12px 18px; border-radius:8px; display:inline-block; font-weight:600;">
                              Verify Email
                            </a>
                          </td>
                        </tr>
                      </table>

                      <p class="muted" style="margin: 16px 0 8px; color:${COLORS.muted};">
                        If the button doesn’t work, paste this link into your browser:
                      </p>
                      <p style="margin:0 0 16px;">
                        <a href="${url}" style="color:${COLORS.accent}; text-decoration:underline; word-break:break-all;">${url}</a>
                      </p>

                      <hr class="divider" style="margin:24px 0; border:0; border-top:1px solid #e5e7eb;" />

                      <p class="muted" style="margin:0; color:${COLORS.muted}; font-size:12px;">
                        You received this email because a sign-up was requested for ${email}. If this wasn’t you, you can ignore this email.
                      </p>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>

            <tr>
              <td align="center" style="padding: 16px 8px 0;">
                <p class="muted" style="margin:0; font-family: system-ui, -apple-system, Segoe UI, Roboto, Arial; color:${COLORS.muted}; font-size:12px;">
                  © ${new Date().getFullYear()} ${SITE_NAME}. All rights reserved.
                </p>
              </td>
            </tr>

          </table>
        </td>
      </tr>
    </table>
  </body>
</html>
        `;
};
//# sourceMappingURL=template.js.map