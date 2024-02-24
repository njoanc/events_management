import {Service} from "typedi";
import {ConflictError} from "../../../common/errors/ConflictError";
import {NotFoundError} from "../../../common/errors/NotFoundError";
import {S3Service} from "../../aws/S3Service";
import {File} from "../../events/input/FileInput";
import {EventRepository} from "../../events/repositories/EventRepository";
import {Attendee} from "../entities/Attendees";
import {AttendeeInput} from "../input/AttendeeInput";
import {AttendeeRepository} from "../repositories/AttendeeRepository";

@Service()
export class AttendeeService {
    constructor(
        private readonly attendeeRepository: AttendeeRepository,
        private readonly eventRepository: EventRepository,
        private s3Service: S3Service,
    ) {}

    async attendeeRegistration(eventId: string, input: AttendeeInput, file?: File): Promise<Attendee> {
        const foundEvent = await this.eventRepository.getById(eventId);
        if (!foundEvent) {
            throw new NotFoundError("Event not found");
        }
        const existingAttendee = await this.attendeeRepository.getAttendeeEvent(input.email, input.eventId);
        if (existingAttendee) {
            throw new ConflictError("Already registered to this event");
        }
        if (file) {
            input.avatar = await this.s3Service.uploadFile(file);
        }
        input.eventId = foundEvent.id;
        input.event = foundEvent;

        return await this.attendeeRepository.attendeeRegistration(input);
    }
}
