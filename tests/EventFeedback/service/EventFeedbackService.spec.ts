import {suite, test} from "@testdeck/mocha";
import {expect} from "chai";
import Container from "typedi";
import {v4 as uuid} from "uuid";
import {EventFeedbackInput} from "../../../src/app/eventFeedback/input/EventFeedbackInput";
import {EventFeedbackService} from "../../../src/app/eventFeedback/services/EventFeedbackService";
import {NotFoundError} from "../../../src/common/errors/NotFoundError";
import {UnauthorizedError} from "../../../src/common/errors/UnauthorizedError";
import {AttendeeFactoryInstance} from "../../Antendee/factories/AttendeeFactory";
import {EventFactoryInstance} from "../../event/factories/EventFactory";
import {EventFeedbackFactoryInstance} from "../factories/EventFeedbackFactory";

const randomId = uuid();

@suite
export class EventFeedbackServiceTests {
    private service!: EventFeedbackService;

    async before() {
        this.service = Container.get(EventFeedbackService);
    }

    @test async "should give feedback to an event if the event end time is less than the current time"() {
        const event = await EventFactoryInstance.create({
            eventEndTime: new Date(new Date().setDate(new Date().getDate() - 12)),
        });

        //a user should attend an event to be allowed to give feedback
        await AttendeeFactoryInstance.create({event: event});

        const eventFeedbackInput: EventFeedbackInput = {
            name: "John Doe",
            email: "john@example.com",
            satisfaction: 5,
            inclusion: 4,
            likelihoodToAttend: 5,
            keyTakeAway: "Great event!",
            comment: "Keep up the good work!",
            event: event,
            eventId: event.id,
        };

        const eventFeedback = await this.service.addEventFeedback(event.id, eventFeedbackInput);
        expect(eventFeedback.eventId).to.equal(event.id);
    }

    @test async "should throw an error if the event end time is greater than the current time"() {
        const event = await EventFactoryInstance.create({
            eventEndTime: new Date(new Date().setDate(new Date().getDate() + 1)),
        });

        //a user should attend an event to be allowed to give feedback
        await AttendeeFactoryInstance.create({event: event});

        const eventFeedbackInput: EventFeedbackInput = {
            name: "John Doe",
            email: "john@example.com",
            satisfaction: 5,
            inclusion: 4,
            likelihoodToAttend: 5,
            keyTakeAway: "Great event!",
            comment: "Keep up the good work!",
            event: event,
            eventId: event.id,
        };

        await expect(this.service.addEventFeedback(event.id, eventFeedbackInput)).to.be.rejectedWith(UnauthorizedError);
    }

    @test async "should throw an error if the event is not found"() {
        const event = await EventFactoryInstance.create();

        //a user should attend an event to be allowed to give feedback
        await AttendeeFactoryInstance.create({event: event});

        const eventFeedbackInput: EventFeedbackInput = {
            name: "John Doe",
            email: "john@example.com",
            satisfaction: 5,
            inclusion: 4,
            likelihoodToAttend: 5,
            keyTakeAway: "Great event!",
            comment: "Keep up the good work!",
            event: event,
            eventId: event.id,
        };
        await expect(this.service.addEventFeedback(randomId, eventFeedbackInput)).to.be.rejectedWith(NotFoundError);
    }

    @test async "should get event with feedback"() {
        const event = await EventFactoryInstance.create();

        const feedback1 = await EventFeedbackFactoryInstance.create({event: event});
        const feedback2 = await EventFeedbackFactoryInstance.create({event: event});
        const feedback3 = await EventFeedbackFactoryInstance.create({event: event});

        //pageNumber=1 get the 1st feedback
        const eventWithFeedback = await this.service.getEventWithFeedback(event.id, 1, 1);
        expect(eventWithFeedback.length).to.equal(1);
        expect(eventWithFeedback[0].keyTakeAway).to.equal(feedback1.keyTakeAway);
        expect(eventWithFeedback[0].comment).to.equal(feedback1.comment);

        //pageNumber=2 get the 2nd feedback
        const eventWithFeedback1 = await this.service.getEventWithFeedback(event.id, 2, 1);
        expect(eventWithFeedback1.length).to.equal(1);
        expect(eventWithFeedback1[0].keyTakeAway).to.equal(feedback2.keyTakeAway);
        expect(eventWithFeedback1[0].comment).to.equal(feedback2.comment);

        //pageNumber=3 get the 3nd feedback
        const eventWithFeedback2 = await this.service.getEventWithFeedback(event.id, 3, 1);
        expect(eventWithFeedback2.length).to.equal(1);
        expect(eventWithFeedback2[0].keyTakeAway).to.equal(feedback3.keyTakeAway);
        expect(eventWithFeedback2[0].comment).to.equal(feedback3.comment);
    }
}
