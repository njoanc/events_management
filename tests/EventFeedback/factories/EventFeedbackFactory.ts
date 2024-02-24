import {Factory, Sequence, SubFactory} from "@linnify/typeorm-factory";
import {EventFeedback} from "../../../src/app/eventFeedback/entities/EventFeedback";
import {CreateTestEvent} from "../../event/factories/EventFactory";

export class CreateTestEventFeedback extends Factory<EventFeedback> {
    entity = EventFeedback;

    name = new Sequence((i: number) => `John${i}`);
    email = new Sequence((i) => `email${i}@gmail.com`);
    satisfaction = new Sequence((i: number) => 5);
    inclusion = new Sequence(() => 4);
    likelihoodToAttend = new Sequence(() => 5);
    keyTakeAway = new Sequence((i: number) => `Great event${i}!`);
    comment = new Sequence((i: number) => `Keep up the good work${i}!`);
    event = new SubFactory(CreateTestEvent);
}

export const EventFeedbackFactoryInstance = new CreateTestEventFeedback();
