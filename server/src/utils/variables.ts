const { env } = process as { env: { [key: string]: string } };

export const {
  MONGO_URI,
  MAILTRAP_USER,
  MAILTRAP_PASS,
  VERIFICARIONEMAIL,
  PASSWORD_RESET_LINK,
} = env;
