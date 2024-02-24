import {Factory, Sequence, SubFactory} from "@linnify/typeorm-factory";
import {Event} from "../../../src/app/events/entities/Events";
import {CreateTestUser} from "../../user/factories/UserFactory";

export class CreateTestEvent extends Factory<Event> {
    entity = Event;

    name = new Sequence((i: number) => `Event${i}`);
    description = new Sequence((i) => `Event${i}`);
    dateOfEvent = new Sequence(() => new Date());
    eventStartTime = new Sequence(() => new Date());
    dateOfReminder = new Sequence(() => new Date());
    eventEndTime = new Sequence(() => new Date());
    location = new Sequence((i) => `Country${i}`);
    imageUrl = new Sequence(() => "https://testbucket.s3.image");

    user = new SubFactory(CreateTestUser);
}

export const EventFactoryInstance = new CreateTestEvent();
