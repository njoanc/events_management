import {GraphQLUpload} from "graphql-upload";
import {Arg, Int, Mutation, Query, Resolver, UseMiddleware} from "type-graphql";
import {Service} from "typedi";
import {CurrentUser, isAdmin} from "../../../graphql/decorators/currentUserDecorator";
import {User} from "../../admin/entities/Users";
import {Event} from "../entities/Events";
import {CreateEventInput} from "../input/EventInput";
import {File} from "../input/FileInput";
import {UpdateEventInput} from "../input/UpdateEventInput";
import {EventService} from "../services/EventService";
@Service()
@Resolver()
export class EventResolver {
    constructor(private readonly eventService: EventService) {}

    @Mutation((_returns) => Event, {description: "ADMIN creates Event"})
    @UseMiddleware(isAdmin)
    async createEvent(
        @CurrentUser() user: User,
        @Arg("file", () => GraphQLUpload, {nullable: true}) file: File,
        @Arg("input") input: CreateEventInput,
    ): Promise<Event> {
        return await this.eventService.createEvent(user, file, input);
    }

    @UseMiddleware(isAdmin)
    @Query((_returns) => [Event], {description: "Admin gets all events"})
    async getAllEvents(
        @Arg("page", () => Int, {defaultValue: 0}) page: number,
        @Arg("pageSize", () => Int, {defaultValue: 10}) pageSize: number,
    ): Promise<Event[]> {
        return await this.eventService.getAllEvents(page, pageSize);
    }

    @UseMiddleware(isAdmin)
    @Query((_returns) => [Event], {description: "Get Admin's events"})
    async getAdminAllEvents(
        @CurrentUser() user: User,
        @Arg("page", () => Int, {defaultValue: 0}) page: number,
        @Arg("pageSize", () => Int, {defaultValue: 10}) pageSize: number,
    ): Promise<Event[]> {
        return await this.eventService.getAdminAllEvents(user, page, pageSize);
    }

    @UseMiddleware(isAdmin)
    @Mutation((_returns) => Event, {description: "Admin updates an event"})
    async updateEvent(
        @CurrentUser() user: User,
        @Arg("eventId") eventId: string,
        @Arg("file", () => GraphQLUpload, {nullable: true})
        @Arg("input")
        input: UpdateEventInput,
        file: File,
    ): Promise<Event> {
        return await this.eventService.updateEvent(user, eventId, input, file);
    }

    @Query((_returns) => [Event], {description: "Users get upcoming events"})
    async getUpcomingEvents(
        @Arg("page", () => Int, {defaultValue: 0}) page: number,
        @Arg("pageSize", () => Int, {defaultValue: 10}) pageSize: number,
    ): Promise<Event[]> {
        return await this.eventService.getUpcomingEvents(page, pageSize);
    }

    @Query((_returns) => Event, {description: "Get a single event"})
    async getSingleEvent(@Arg("eventId") eventId: string): Promise<Event | undefined> {
        return await this.eventService.getSingleEvent(eventId);
    }

    @Query((_returns) => [Event], {description: "Search events by name"})
    async searchEventsByName(
        @Arg("name") name: string,
        @Arg("page", () => Int, {defaultValue: 0}) page: number,
        @Arg("pageSize", () => Int, {defaultValue: 10}) pageSize: number,
    ): Promise<Event[]> {
        return this.eventService.searchEventsByName(name, page, pageSize);
    }

    @Query((_returns) => [Event], {description: "Filter events by Location"})
    async filterEventsByLocation(
        @Arg("location") location: string,
        @Arg("page", () => Int, {defaultValue: 0}) page: number,
        @Arg("pageSize", () => Int, {defaultValue: 10}) pageSize: number,
    ): Promise<Event[]> {
        return this.eventService.filterEventsByLocation(location, page, pageSize);
    }
}
