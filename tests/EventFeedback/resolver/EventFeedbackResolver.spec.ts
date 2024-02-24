import {suite, test} from "@testdeck/mocha";
import {expect} from "chai";
import {deepEqual, instance, mock, when} from "ts-mockito";
import {EventFeedback} from "../../../src/app/eventFeedback/entities/EventFeedback";
import {EventFeedbackInput} from "../../../src/app/eventFeedback/input/EventFeedbackInput";
import {EventFeedbackResolver} from "../../../src/app/eventFeedback/resolvers/EventFeedbackResolver";
import {EventFeedbackService} from "../../../src/app/eventFeedback/services/EventFeedbackService";
import {Event} from "../../../src/app/events/entities/Events";

@suite
export class EventFeedbackResolverTests {
    private resolver!: EventFeedbackResolver;
    private service!: EventFeedbackService;

    async before() {
        this.service = mock(EventFeedbackService);
        this.resolver = new EventFeedbackResolver(instance(this.service));
    }

    @test async "should give feedback to an event"() {
        const mockEventFeedback = new EventFeedback();

        const mockedEvent = new Event();

        const attendeeInput: EventFeedbackInput = {
            name: "John Doe",
            email: "john@example.com",
            satisfaction: 5,
            inclusion: 4,
            likelihoodToAttend: 5,
            keyTakeAway: "Great event!",
            comment: "Keep up the good work!",
            event: mockedEvent,
            eventId: mockedEvent.id,
        };

        when(this.service.addEventFeedback(mockedEvent.id, deepEqual(attendeeInput))).thenResolve(mockEventFeedback);

        const result = await this.resolver.addEventFeedback(mockedEvent.id, attendeeInput);

        expect(result).to.equal(mockEventFeedback);
    }

    @test async "should get event with feedback"() {
        const mockEvent = new Event();
        const mockEventFeedback = [new EventFeedback(), new EventFeedback(), new EventFeedback()];

        when(this.service.getEventWithFeedback(mockEvent.id, 1, 2)).thenResolve(mockEventFeedback);

        const result = await this.resolver.getEventWithFeedback(mockEvent.id, 1, 2);

        expect(result).to.equal(mockEventFeedback);
    }
}
