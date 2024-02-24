import {suite, test} from "@testdeck/mocha";
import {expect} from "chai";
import Container from "typedi";
import {CreateEventInput} from "../../src/app/events/input/EventInput";
import {File} from "../../src/app/events/input/FileInput";
import {UpdateEventInput} from "../../src/app/events/input/UpdateEventInput";
import {EventService} from "../../src/app/events/services/EventService";
import {RoleEnum} from "../../src/common/enums/role.enums";
import {UnauthorizedError} from "../../src/common/errors/UnauthorizedError";
import {AWSFileUploaderMock} from "../mocks/AwsFileUploader";
import {UserFactoryInstance} from "../user/factories/UserFactory";
import {EventFactoryInstance} from "./factories/EventFactory";

@suite
export class EventServiceTests {
    private service!: EventService;
    private awsFileUploaderMock!: AWSFileUploaderMock;
    private file!: File;

    async before() {
        this.service = Container.get(EventService);
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

    @test async "should create an event if admin"() {
        const user = await UserFactoryInstance.create();

        const eventInput: CreateEventInput = {
            name: "Sample Event",
            description: "Sample description",
            dateOfEvent: new Date(),
            eventStartTime: new Date(),
            eventEndTime: new Date(),
            dateOfReminder: new Date(),
            location: "Kigali",
            user: user,
            userId: user.id,
        };

        const result = await this.service.createEvent(user, this.file, eventInput);
        expect(result.user?.role).to.equal(RoleEnum.ADMIN);
        expect(result.name).to.equal(eventInput.name);
        expect(result.userId).to.equal(user.id);
    }

    @test async "should get all events"() {
        const user = await UserFactoryInstance.create();
        const event1 = await EventFactoryInstance.create({user: user, userId: user.id});
        const event2 = await EventFactoryInstance.create({user: user, userId: user.id});
        const event3 = await EventFactoryInstance.create({user: user, userId: user.id});

        //pageNumber=1,get the 3rd event
        const result = await this.service.getAllEvents(1, 1);
        expect(result.length).to.equal(1);
        expect(result[0].user?.role).to.equal(RoleEnum.ADMIN);
        expect(result[0].id).to.equal(event3.id);

        // //pageNumber=2,get the second event
        const result1 = await this.service.getAllEvents(2, 1);
        expect(result1.length).to.equal(1);
        expect(result1[0].id).to.equal(event2.id);

        // //pageNumber=3,get the 1st event
        const result2 = await this.service.getAllEvents(3, 1);
        expect(result2.length).to.equal(1);
        expect(result2[0].id).to.equal(event1.id);
    }

    @test async "should get all admin events"() {
        const user = await UserFactoryInstance.create();
        const event1 = await EventFactoryInstance.create({user: user, userId: user.id});
        const event2 = await EventFactoryInstance.create({user: user, userId: user.id});
        const event3 = await EventFactoryInstance.create({user: user, userId: user.id});

        //pageNumber=1,get 3rd event
        const result = await this.service.getAdminAllEvents(user, 1, 1);
        expect(result.length).to.equal(1);
        expect(result[0].user?.role).to.equal(RoleEnum.ADMIN);
        expect(result[0].id).to.equal(event3.id);

        //pageNumber=2,get 2nd event
        const result1 = await this.service.getAdminAllEvents(user, 2, 1);
        expect(result1.length).to.equal(1);
        expect(result1[0].id).to.equal(event2.id);

        //pageNumber=3,get the 1st event
        const result2 = await this.service.getAdminAllEvents(user, 3, 1);
        expect(result2.length).to.equal(1);
        expect(result2[0].id).to.equal(event1.id);
    }

    @test async "should update event if the user is the owner"() {
        const user = await UserFactoryInstance.create();
        const event = await EventFactoryInstance.create({
            user: user,
            userId: user.id,
            imageUrl: "https://testbucket.s3.image",
        });

        const updateEventInput: UpdateEventInput = {
            name: "End of the Year Party",
            description: "Sample description test",
            dateOfEvent: new Date(),
        };

        const result = await this.service.updateEvent(user, event.id, updateEventInput, this.file);

        expect(result.name).to.equal(updateEventInput.name);
        expect(result.description).to.equal(updateEventInput.description);
        expect(result.dateOfEvent).to.equal(updateEventInput.dateOfEvent);
        expect(result.userId).to.equal(user.id).and.to.equal(event.userId);
    }

    @test async "should throw an error if the user who created an event is not the same as the logged in one"() {
        const user = await UserFactoryInstance.create();
        const user1 = await UserFactoryInstance.create();
        const event = await EventFactoryInstance.create({
            user: user,
            userId: user.id,
            imageUrl: "https://testbucket.s3.image",
        });

        const updateEventInput: UpdateEventInput = {
            name: "End of the Year Party",
            description: "Sample description test",
            dateOfEvent: new Date(),
        };

        await expect(this.service.updateEvent(user1, event.id, updateEventInput, this.file)).to.be.rejectedWith(
            UnauthorizedError,
        );
    }

    @test async "should get a single event"() {
        const user = await UserFactoryInstance.create();
        const event = await EventFactoryInstance.create({
            user: user,
            userId: user.id,
            imageUrl: "https://testbucket.s3.image",
        });

        const result = await this.service.getSingleEvent(event.id);

        expect(result?.id).to.equal(event.id);
        expect(result?.imageUrl).to.equal(event.imageUrl);
        expect(result?.userId).to.equal(event.userId);
    }

    @test async "should get upcoming events"() {
        const user = await UserFactoryInstance.create();
        const event1 = await EventFactoryInstance.create({
            user: user,
            userId: user.id,
            dateOfEvent: new Date(new Date().setDate(new Date().getDate() + 1)),
        });

        const event2 = await EventFactoryInstance.create({
            user: user,
            userId: user.id,
            dateOfEvent: new Date(new Date().setDate(new Date().getDate() + 2)),
        });
        const event3 = await EventFactoryInstance.create({
            user: user,
            userId: user.id,
            dateOfEvent: new Date(new Date().setDate(new Date().getDate() - 12)),
        });

        const event4 = await EventFactoryInstance.create({
            user: user,
            userId: user.id,
            dateOfEvent: new Date(new Date().setDate(new Date().getDate() + 3)),
        });

        //pageNumber=1 get the 3rd event
        const result = await this.service.getUpcomingEvents(1, 1);
        expect(result.length).to.equal(1);
        expect(result[0].id).to.equal(event1.id);

        //pageNumber=2 get the 1st event
        const result1 = await this.service.getUpcomingEvents(2, 1);
        expect(result1.length).to.equal(1);
        expect(result1[0].id).to.equal(event2.id);

        //pageNumber=3 get the 4th event
        const result2 = await this.service.getUpcomingEvents(3, 1);

        expect(result2.length).to.equal(1);
        expect(result2[0].id).to.equal(event4.id);
    }

    @test async "should search events by name"() {
        const user = await UserFactoryInstance.create();
        const event1 = await EventFactoryInstance.create({
            name: "Kigali AWS Marathon",
            user: user,
            userId: user.id,
            dateOfEvent: new Date(new Date().setDate(new Date().getDate())),
        });

        const event2 = await EventFactoryInstance.create({
            name: "Coding Competition",
            user: user,
            userId: user.id,
            dateOfEvent: new Date(new Date().setDate(new Date().getDate() + 1)),
        });
        const event3 = await EventFactoryInstance.create({
            name: "Shut up and Code",
            user: user,
            userId: user.id,
            dateOfEvent: new Date(new Date().setDate(new Date().getDate() + 3)),
        });

        const searchString = "Cod";

        const result = await this.service.searchEventsByName(searchString, 1, 1);
        expect(result.length).to.equal(1);
        expect(result[0].id).to.equal(event3.id);

        const result1 = await this.service.searchEventsByName(searchString, 2, 1);

        expect(result1.length).to.equal(1);
        expect(result1[0].id).to.equal(event2.id);
    }
    @test async "should filter events by location"() {
        const user = await UserFactoryInstance.create();
        const event1 = await EventFactoryInstance.create({
            location: "Kigali",
            user: user,
            userId: user.id,
            dateOfEvent: new Date(new Date().setDate(new Date().getDate())),
        });

        const event2 = await EventFactoryInstance.create({
            location: "Kigali",
            user: user,
            userId: user.id,
            dateOfEvent: new Date(new Date().setDate(new Date().getDate() + 1)),
        });
        const event3 = await EventFactoryInstance.create({
            location: "Lagos",
            user: user,
            userId: user.id,
            dateOfEvent: new Date(new Date().setDate(new Date().getDate() + 3)),
        });

        //pageNumber=1 get the 2nd event based in Kigali
        const result = await this.service.filterEventsByLocation("Kigali", 1, 1);
        expect(result.length).to.equal(1);
        expect(result[0].id).to.equal(event2.id);

        //pageNumber=2 get the 1st event based in Kigali
        const result1 = await this.service.filterEventsByLocation("Kigali", 2, 1);
        expect(result1.length).to.equal(1);
        expect(result1[0].id).to.equal(event1.id);

        //pageNumber=3 get no event based in Kigali
        const result2 = await this.service.filterEventsByLocation("Kigali", 3, 1);
        expect(result2.length).to.equal(0);

        const result3 = await this.service.filterEventsByLocation("Lagos", 1, 1);
        expect(result3.length).to.equal(1);
        expect(result3[0].id).to.equal(event3.id);
    }
}
