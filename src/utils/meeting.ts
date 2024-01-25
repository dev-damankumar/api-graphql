import {
  googleMeetCalenderId,
  googleMeetClientEmail,
  googleMeetPrivateKey,
} from "../constants";
import { AddMeetingInput } from "../generated/graphql";
import { google } from "googleapis";
const { JWT } = require("google-auth-library");

import path from "path";
import process from "process";

const SCOPES = ["https://www.googleapis.com/auth/calendar"];
const CREDENTIALS_PATH = path.join(
  process.cwd(),
  "google-meet-credentials.json"
);
const serviceAccountKey = require(CREDENTIALS_PATH);

const GOOGLE_CALENDAR_ID = googleMeetCalenderId;

const jwtClient = new JWT(
  googleMeetClientEmail,
  null,
  googleMeetPrivateKey,
  SCOPES,
  "daman@theartific.com"
);

export async function getGoogleMeetings() {
  const result = await calendar.events.list({
    calendarId: GOOGLE_CALENDAR_ID,
    timeMin: new Date().toISOString(),
    maxResults: 10,
    singleEvents: true,
    orderBy: "startTime",
  });
  const meetings = result.data.items;
  console.log("meetings", meetings);

  return meetings;
}
export async function addGoogleMeeting(
  details: AddMeetingInput,
  token: string
) {
  const auth = await jwtClient.authorize();
  console.log("auth", auth);
  const attendees = details.users.map((user) => ({ email: user }));
  const event = {
    summary: "My first event!",
    location: "Hyderabad,India",
    description: "First event with nodeJS!",
    start: {
      dateTime: "2024-01-25T09:00:00-07:00",
      timeZone: "Asia/Dhaka",
    },
    end: {
      dateTime: "2024-01-25T17:00:00-07:00",
      timeZone: "Asia/Dhaka",
    },
    attendees,
    reminders: {
      useDefault: false,
      overrides: [
        { method: "email", minutes: 24 * 60 },
        { method: "popup", minutes: 10 },
      ],
    },
    conferenceData: {
      createRequest: {
        conferenceSolutionKey: {
          type: "hangoutsMeet",
        },
        requestId: "coding-calendar-demo",
      },
    },
  };
  const accessToken = auth.access_token;

  const calendar = google.calendar({ version: "v3", auth: jwtClient });

  try {
    const response = await calendar.events.insert({
      calendarId: GOOGLE_CALENDAR_ID,
      resource: event,
    });
    console.log("Event created:", response.data);
  } catch (error) {
    console.log("There was an error contacting the Calendar service: " + error);
  }
}
