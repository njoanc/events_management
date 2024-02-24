import {suite, test} from "@testdeck/mocha";
import {expect} from "chai";
import Container from "typedi";
import {v4 as uuid} from "uuid";
import {AttendeeInput} from "../../src/app/attendees/input/AttendeeInput";
import {AttendeeService} from "../../src/app/attendees/services/AttendeeService";
import {File} from "../../src/app/events/input/FileInput";
import {Gender} from "../../src/common/enums/gender.enums";
import {ConflictError} from "../../src/common/errors/ConflictError";
import {NotFoundError} from "../../src/common/errors/NotFoundError";
import {EventFactoryInstance} from "../event/factories/EventFactory";
import {AWSFileUploaderMock} from "../mocks/AwsFileUploader";
import {AttendeeFactoryInstance} from "./factories/AttendeeFactory";

const randomId = uuid();

@suite
export class AttendeeServiceTests {
    private service!: AttendeeService;
    private awsFileUploaderMock!: AWSFileUploaderMock;
    private file!: File;

    async before() {
        this.service = Container.get(AttendeeService);
        this.awsFileUploaderMock = new AWSFileUploaderMock();
        this.file = this.file = {
            filename: "event.txt",
            originalname: "event",
            encoding: "utf-8",
            mimetype: "text/plain",
            buffer: Buffer.from("This is some fake file content."),
            size: 1024,
        };
    }

    @test async "should register to attend event"() {
        const event = await EventFactoryInstance.create();

        const attendeeInput: AttendeeInput = {
            firstName: "John",
            lastName: "Doe",
            email: "johnny@example.com",
            dob: new Date(),
            gender: Gender.MALE,
            organizationSchool: "Sample Organization",
            event: event,
            eventId: event.id,
        };

        const attendee = await this.service.attendeeRegistration(event.id, attendeeInput, this.file);
        expect(attendee.eventId).to.equal(event.id);
        expect(attendee.firstName).to.equal(attendeeInput.firstName);
    }

    @test async "should throw an error if the event is not found"() {
        const event = await EventFactoryInstance.create();

        const attendeeInput: AttendeeInput = {
            firstName: "John",
            lastName: "Doe",
            email: "johnny@example.com",
            dob: new Date(),
            gender: Gender.MALE,
            organizationSchool: "Sample Organization",
            event: event,
            eventId: event.id,
        };

        await expect(this.service.attendeeRegistration(randomId, attendeeInput, this.file)).to.be.rejectedWith(
            NotFoundError,
        );
    }

    @test async "should throw an error if a user try to register to a single event for the second time"() {
        const event = await EventFactoryInstance.create();

        await AttendeeFactoryInstance.create({event: event, email: "johnny@example.com"});

        const attendeeInput: AttendeeInput = {
            firstName: "John",
            lastName: "Doe",
            email: "johnny@example.com",
            dob: new Date(),
            gender: Gender.MALE,
            organizationSchool: "Sample Organization",
            event: event,
            eventId: event.id,
        };

        await expect(this.service.attendeeRegistration(event.id, attendeeInput, this.file)).to.be.rejectedWith(
            ConflictError,
        );
    }
}
