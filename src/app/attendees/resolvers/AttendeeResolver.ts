import {GraphQLUpload} from "graphql-upload";
import {Arg, Mutation, Resolver} from "type-graphql";
import {Service} from "typedi";
import {File} from "../../events/input/FileInput";
import {Attendee} from "../entities/Attendees";
import {AttendeeInput} from "../input/AttendeeInput";
import {AttendeeService} from "../services/AttendeeService";
@Service()
@Resolver()
export class AttendeeResolver {
    constructor(private readonly attendeeService: AttendeeService) {}

    @Mutation((_returns) => Attendee, {description: "Attendee registration"})
    async registerToAttendEvent(
        @Arg("eventId") eventId: string,
        @Arg("input") input: AttendeeInput,
        @Arg("file", () => GraphQLUpload, {nullable: true}) file?: File,
    ): Promise<Attendee> {
        return await this.attendeeService.attendeeRegistration(eventId, input, file);
    }
}
