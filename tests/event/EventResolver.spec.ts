import {suite, test} from "@testdeck/mocha";
import {expect} from "chai";
import {deepEqual, instance, mock, when} from "ts-mockito";
import {User} from "../../src/app/admin/entities/Users";
import {Event} from "../../src/app/events/entities/Events";
import {CreateEventInput} from "../../src/app/events/input/EventInput";
import {File} from "../../src/app/events/input/FileInput";
import {UpdateEventInput} from "../../src/app/events/input/UpdateEventInput";
import {EventResolver} from "../../src/app/events/resolvers/EventResolver";
import {EventService} from "../../src/app/events/services/EventService";

@suite
export class EventResolverTests {
    private resolver!: EventResolver;
    private service!: EventService;
    private mockFile!: File;

    async before() {
        this.service = mock(EventService);
        this.resolver = new EventResolver(instance(this.service));
        this.mockFile = this.mockFile = {
            filename: "event.txt",
            originalname: "event",
            encoding: "utf-8",
            mimetype: "text/plain",
            buffer: Buffer.from("This is some fake file content."),
            size: 1024,
        };
    }

    @test async "should create an event"() {
        const mockUser = new User();

        const mockInput: CreateEventInput = {
            name: "Test Event",
            description: "This is a test event",
        } as CreateEventInput;

        const createdEvent = new Event();
        when(this.service.createEvent(mockUser, deepEqual(this.mockFile), deepEqual(mockInput))).thenResolve(
            createdEvent,
        );

        const result = await this.resolver.createEvent(mockUser, this.mockFile, mockInput);

        expect(result).to.equal(createdEvent);
    }

    @test async "should get all events"() {
        const mockedEvents: Event[] = [new Event(), new Event()];

        when(this.service.getAllEvents(1, 2)).thenResolve(mockedEvents);

        const result = await this.resolver.getAllEvents(1, 2);
        expect(result[0]).to.equal(mockedEvents[0]);
        expect(result[1]).to.equal(mockedEvents[1]);
    }

    @test async "should update the event"() {
        const mockUser = new User();

        const mockUpdateInput: UpdateEventInput = {
            name: "Test Event",
            description: "This is a test event",
        };

        const mockedEvent = new Event();

        when(
            this.service.updateEvent(mockUser, mockUser.id, deepEqual(mockUpdateInput), deepEqual(this.mockFile)),
        ).thenResolve(mockedEvent);

        const result = await this.resolver.updateEvent(mockUser, mockUser.id, mockUpdateInput, this.mockFile);
        expect(result).to.equal(mockedEvent);
    }

    @test async "should get event by id"() {
        const mockedEvent = new Event();

        when(this.service.getSingleEvent(mockedEvent.id)).thenResolve(mockedEvent);

        const result = await this.resolver.getSingleEvent(mockedEvent.id);

        expect(result).to.equal(mockedEvent);
    }

    @test async "should search event by name"() {
        const searchString = "Test";
        const mockedEvents = [new Event(), new Event()];

        when(this.service.searchEventsByName(searchString, 1, 2)).thenResolve(mockedEvents);

        const result = await this.resolver.searchEventsByName(searchString, 1, 2);

        expect(result[0]).to.equal(mockedEvents[0]);
        expect(result[1]).to.equal(mockedEvents[1]);
    }

    @test async "should filter events by location"() {
        const location = "Rwanda";
        const mockedEvents = [new Event(), new Event()];

        when(this.service.filterEventsByLocation(location, 1, 2)).thenResolve(mockedEvents);

        const result = await this.resolver.filterEventsByLocation(location, 1, 2);

        expect(result[0]).to.equal(mockedEvents[0]);
        expect(result[1]).to.equal(mockedEvents[1]);
    }
}
