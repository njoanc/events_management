import {Service} from "typedi";
import {EntityRepository, Repository} from "typeorm";
import {InjectRepository} from "typeorm-typedi-extensions";
import {BaseRepository} from "../../../common/repositories/BaseRepository";
import {QuerySet} from "../../../common/repositories/QuerySet";
import {EventFeedback} from "../entities/EventFeedback";
import {EventFeedbackInput} from "../input/EventFeedbackInput";
@Service()
@EntityRepository(EventFeedback)
export class EventFeedbackRepository extends BaseRepository<EventFeedback> {
    constructor(@InjectRepository(EventFeedback) private repository: Repository<EventFeedback>) {
        super(repository);
    }
    getQuerySet(): QuerySet<EventFeedback> {
        return new QuerySet<EventFeedback>(this.repository.createQueryBuilder("eventFeedback"), "eventFeedback");
    }

    async eventFeedback(input: EventFeedbackInput): Promise<EventFeedback> {
        const eventFeedback = await EventFeedback.create(input);
        return await this.save(eventFeedback);
    }

    async getEventWithFeedback(eventId: string, page: number, pageSize: number): Promise<EventFeedback[]> {
        const skip = (page - 1) * pageSize;

        return this.repository.find({
            where: {eventId},
            skip: skip,
            take: pageSize,
            order: {createdAt: "DESC"},
            relations: ["event"],
        });
    }
}
