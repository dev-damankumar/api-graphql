import meeting from "../../../controller/meeting.controller";
import { GraphqlContextFunctionArgument } from "../../../types";

const meetingQueries = {
  async getMeetings(
    _: any,
    args: any,
    context: GraphqlContextFunctionArgument
  ) {
    return await meeting.getMeetings(context);
  },
};

export default meetingQueries;
