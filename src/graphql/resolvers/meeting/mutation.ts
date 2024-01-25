import { AddMeetingInput } from "./../../../generated/graphql";
import meeting from "../../../controller/meeting.controller";
import { GraphqlContextFunctionArgument } from "../../../types";

const meetingMutations = {
  async addMeeting(
    _: any,
    args: { meeting: AddMeetingInput },
    context: GraphqlContextFunctionArgument
  ) {
    console.log("arg", args);
    return await meeting.addMeeting(context, args.meeting);
  },
};

export default meetingMutations;
