import {Arg, Int, Mutation, Query, Resolver, UseMiddleware} from "type-graphql";
import {Service} from "typedi";
import {isAdmin} from "../../../graphql/decorators/currentUserDecorator";
import {EventFeedback} from "../entities/EventFeedback";
import {EventFeedbackInput} from "../input/EventFeedbackInput";
import {EventFeedbackService} from "../services/EventFeedbackService";
@Service()
@Resolver()
export class EventFeedbackResolver {
    constructor(private readonly eventFeedbackService: EventFeedbackService) {}

    @Mutation((_returns) => EventFeedback, {description: "Attendee gives feedback"})
    async addEventFeedback(
        @Arg("eventId") eventId: string,
        @Arg("input") input: EventFeedbackInput,
    ): Promise<EventFeedback> {
        return await this.eventFeedbackService.addEventFeedback(eventId, input);
    }

    @UseMiddleware(isAdmin)
    @Query((_returns) => [EventFeedback], {description: "get event with feedback"})
    async getEventWithFeedback(
        @Arg("eventId") eventId: string,
        @Arg("page", () => Int, {defaultValue: 0}) page: number,
        @Arg("pageSize", () => Int, {defaultValue: 10}) pageSize: number,
    ): Promise<EventFeedback[]> {
        return this.eventFeedbackService.getEventWithFeedback(eventId, page, pageSize);
    }
}
