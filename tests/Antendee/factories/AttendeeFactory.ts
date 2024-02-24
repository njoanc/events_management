import {Factory, Sequence, SubFactory} from "@linnify/typeorm-factory";
import {Attendee} from "../../../src/app/attendees/entities/Attendees";
import {Gender} from "../../../src/common/enums/gender.enums";
import {CreateTestEvent} from "../../event/factories/EventFactory";

export class CreateTestAttendee extends Factory<Attendee> {
    entity = Attendee;

    firstName = new Sequence((i: number) => `Attendee${i}`);
    lastName = new Sequence((i) => `Attendee${i}`);
    email = new Sequence((i) => `email${i}@gmail.com`);
    dob = new Sequence(() => new Date());
    gender = new Sequence(() => Gender.FEMALE);
    organizationSchool = new Sequence((i) => `Company${i}`);
    avatar = new Sequence(() => "https://testbucket.s3.image");
    event = new SubFactory(CreateTestEvent);
}

export const AttendeeFactoryInstance = new CreateTestAttendee();
