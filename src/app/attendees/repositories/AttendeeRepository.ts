import {Service} from "typedi";
import {EntityRepository, Repository} from "typeorm";
import {InjectRepository} from "typeorm-typedi-extensions";
import {BaseRepository} from "../../../common/repositories/BaseRepository";
import {QuerySet} from "../../../common/repositories/QuerySet";
import {Attendee} from "../entities/Attendees";
import {AttendeeInput} from "../input/AttendeeInput";
@Service()
@EntityRepository(Attendee)
export class AttendeeRepository extends BaseRepository<Attendee> {
    constructor(@InjectRepository(Attendee) private repository: Repository<Attendee>) {
        super(repository);
    }
    getQuerySet(): QuerySet<Attendee> {
        return new QuerySet<Attendee>(this.repository.createQueryBuilder("attendee"), "attendee");
    }

    async attendeeRegistration(input: AttendeeInput): Promise<Attendee> {
        const attendee = await Attendee.create(input);
        return await this.save(attendee);
    }

    async getAttendeeEvent(email: string, eventId: string): Promise<Attendee | undefined> {
        return await this.repository.findOne({
            where: [{email}, {eventId}],
        });
    }
}
