import {Service} from "typedi";
import {EntityRepository, Like, MoreThanOrEqual, Repository} from "typeorm";
import {InjectRepository} from "typeorm-typedi-extensions";
import {BaseRepository} from "../../../common/repositories/BaseRepository";
import {QuerySet} from "../../../common/repositories/QuerySet";
import {User} from "../../admin/entities/Users";
import {Event} from "../entities/Events";
import {CreateEventInput} from "../input/EventInput";
import {UpdateEventInput} from "../input/UpdateEventInput";

@Service()
@EntityRepository(Event)
export class EventRepository extends BaseRepository<Event> {
    constructor(@InjectRepository(Event) private repository: Repository<Event>) {
        super(repository);
    }
    getQuerySet(): QuerySet<Event> {
        return new QuerySet<Event>(this.repository.createQueryBuilder("event"), "event");
    }

    async createEvent(user: User, file: string, eventInput: CreateEventInput): Promise<Event> {
        const event = Event.create({
            imageUrl: file,
            ...eventInput,
        });
        event.user = user;
        event.userId = user.id;
        return await this.save(event);
    }

    async updateEvent(event: Event, updateEventInput: UpdateEventInput): Promise<Event> {
        event.update(updateEventInput);
        return await this.save(event);
    }

    async getAllEvents(page: number, pageSize: number): Promise<Event[]> {
        const skip = (page - 1) * pageSize;

        return this.repository.find({
            skip: skip,
            take: pageSize,
            order: {dateOfEvent: "DESC"},
            relations: ["user"],
        });
    }

    async getAllAdminEvents(userId: string, page: number, pageSize: number): Promise<Event[]> {
        const skip = (page - 1) * pageSize;

        return this.repository.find({
            where: {user: {id: userId}},
            skip: skip,
            take: pageSize,
            order: {dateOfEvent: "DESC"},
            relations: ["user"],
        });
    }

    async getEventById(eventId: string): Promise<Event | undefined> {
        return this.getQuerySet().whereField("id", eventId).getOne();
    }

    async searchEventsByName(name: string, page: number, pageSize: number): Promise<Event[]> {
        const skip = (page - 1) * pageSize;

        return this.repository.find({
            where: {
                name: Like(`%${name}%`),
            },
            skip: skip,
            take: pageSize,
            order: {dateOfEvent: "DESC"},
            relations: ["user"],
        });
    }

    async filterEventsByLocation(location: string, page: number, pageSize: number): Promise<Event[]> {
        const skip = (page - 1) * pageSize;

        return this.repository.find({
            where: {location},
            skip: skip,
            take: pageSize,
            order: {dateOfEvent: "DESC"},
            relations: ["user"],
        });
    }

    async getAllUpcomingEvents(page: number, pageSize: number): Promise<Event[]> {
        const currentDate = new Date().toISOString();

        const skip = (page - 1) * pageSize;

        return this.repository.find({
            where: {
                dateOfEvent: MoreThanOrEqual(currentDate),
            },
            skip: skip,
            take: pageSize,
            order: {dateOfEvent: "ASC"},
            relations: ["user"],
        });
    }
}
