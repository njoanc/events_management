import {Service} from "typedi";
import {NotFoundError} from "../../../common/errors/NotFoundError";
import {UnauthorizedError} from "../../../common/errors/UnauthorizedError";
import {User} from "../../admin/entities/Users";
import {S3Service} from "../../aws/S3Service";
import {Event} from "../entities/Events";
import {CreateEventInput} from "../input/EventInput";
import {File} from "../input/FileInput";
import {UpdateEventInput} from "../input/UpdateEventInput";
import {EventRepository} from "../repositories/EventRepository";

@Service()
export class EventService {
    constructor(private readonly eventRepository: EventRepository, private s3Service: S3Service) {}

    async createEvent(user: User, file: File, input: CreateEventInput): Promise<Event> {
        const imageUrl = await this.s3Service.uploadFile(file);

        return await this.eventRepository.createEvent(user, imageUrl, input);
    }

    async getAllEvents(page: number, pageSize: number): Promise<Event[]> {
        return await this.eventRepository.getAllEvents(page, pageSize);
    }

    async getAdminAllEvents(user: User, page: number, pageSize: number): Promise<Event[]> {
        return await this.eventRepository.getAllAdminEvents(user.id, page, pageSize);
    }

    async updateEvent(user: User, eventId: string, input: UpdateEventInput, file?: File): Promise<Event> {
        const event = await this.eventRepository.getById(eventId);
        if (!event) {
            throw new NotFoundError("Event not found");
        }

        if (event.userId !== user.id) {
            throw new UnauthorizedError("Unauthorized");
        }

        if (file) {
            event.imageUrl = await this.s3Service.uploadFile(file);
        }

        return await this.eventRepository.updateEvent(event, input);
    }

    async getSingleEvent(eventId: string): Promise<Event | undefined> {
        return await this.eventRepository.getById(eventId);
    }

    async searchEventsByName(name: string, page: number, pageSize: number): Promise<Event[]> {
        return await this.eventRepository.searchEventsByName(name, page, pageSize);
    }

    async filterEventsByLocation(location: string, page: number, pageSize: number): Promise<Event[]> {
        return await this.eventRepository.filterEventsByLocation(location, page, pageSize);
    }

    async getUpcomingEvents(page: number, pageSize: number): Promise<Event[]> {
        return await this.eventRepository.getAllUpcomingEvents(page, pageSize);
    }
}
