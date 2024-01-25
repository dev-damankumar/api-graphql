export const _prod_ = process.env.NODE_ENV === "production";
export const mockSMTP = process.env.MOCK_SMTP === "true";
export const _dev_ = process.env.NODE_ENV === "development";
export const db = process.env.DB!;
export const port = process.env.PORT!;
export const jwtSecret = process.env.JWT_SECRET!;
export const siteurl = process.env.WEB_URL!;
export const googleMeetClientEmail = process.env.GOOGLE_MEET_CLIENT_EMAIL!;
export const googleMeetProjectNumber = process.env.GOOGLE_PROJECT_NUMBER!;
export const googleMeetCalenderId = process.env.GOOGLE_CALENDER_ID!;
export const googleMeetPrivateKey = process.env
  .GOOGLE_MEET_PRIVATE_KEY!.split(String.raw`\n`)
  .join("\n");
export const email = {
  from: process.env.FROM_EMAIL,
};
