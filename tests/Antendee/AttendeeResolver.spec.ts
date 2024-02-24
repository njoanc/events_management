import {suite, test} from "@testdeck/mocha";
import {expect} from "chai";
import {deepEqual, instance, mock, when} from "ts-mockito";
import {Attendee} from "../../src/app/attendees/entities/Attendees";
import {AttendeeInput} from "../../src/app/attendees/input/AttendeeInput";
import {AttendeeResolver} from "../../src/app/attendees/resolvers/AttendeeResolver";
import {AttendeeService} from "../../src/app/attendees/services/AttendeeService";
import {Event} from "../../src/app/events/entities/Events";
import {File} from "../../src/app/events/input/FileInput";
import {Gender} from "../../src/common/enums/gender.enums";

@suite
export class AttendeeResolverTests {
    private resolver!: AttendeeResolver;
    private service!: AttendeeService;
    private mockFile!: File;

    async before() {
        this.service = mock(AttendeeService);
        this.resolver = new AttendeeResolver(instance(this.service));
        this.mockFile = {
            filename: "event.txt",
            originalname: "event",
            encoding: "utf-8",
            mimetype: "text/plain",
            buffer: Buffer.from("This is some fake file content."),
            size: 1024,
        };
    }

    @test async "should register to attend an event"() {
        const mockAttendee = new Attendee();
        const mockedEvent = new Event();

        const attendeeInput: AttendeeInput = {
            firstName: "John",
            lastName: "Doe",
            email: "johnny@example.com",
            dob: new Date(),
            gender: Gender.MALE,
            organizationSchool: "Sample Organization",
            event: mockedEvent,
            eventId: mockedEvent.id,
        };

        when(
            this.service.attendeeRegistration(mockedEvent.id, deepEqual(attendeeInput), deepEqual(this.mockFile)),
        ).thenResolve(mockAttendee);

        const result = await this.resolver.registerToAttendEvent(mockedEvent.id, attendeeInput, this.mockFile);

        expect(result).to.equal(mockAttendee);
    }
}
