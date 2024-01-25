import { AddMeetingInput } from "../generated/graphql";
import Meeting from "../models/meeting";
import { GraphqlContextFunctionArgument } from "../types";
import { getTokenFromHeaders } from "../utils/auth";
import { addGoogleMeeting } from "../utils/meeting";

const getMeetings = async (context: GraphqlContextFunctionArgument) => {
  console.log("context", context);
  if (!context.auth) throw new Error("Unauthorized access");
  const meetings = await Meeting.find({ host: context.auth._id });
  return meetings;
};

const addMeeting = async (
  context: GraphqlContextFunctionArgument,
  data: AddMeetingInput
) => {
  if (!context.auth) throw new Error("Unauthorized access");
  console.log("context.auth", context.auth);
  const host = context.auth._id;
  const token = getTokenFromHeaders(context.req);
  console.log("data", { ...data, host });

  const meeting = await Meeting.create({ ...data, host });
  await addGoogleMeeting({ ...data, host }, token);
  return meeting;
};

export default {
  getMeetings,
  addMeeting,
};
