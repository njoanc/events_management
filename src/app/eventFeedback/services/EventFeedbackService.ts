import {Service} from "typedi";
import {NotFoundError} from "../../../common/errors/NotFoundError";
import {UnauthorizedError} from "../../../common/errors/UnauthorizedError";
import {AttendeeRepository} from "../../attendees/repositories/AttendeeRepository";
import {EventRepository} from "../../events/repositories/EventRepository";
import {EventFeedback} from "../entities/EventFeedback";
import {EventFeedbackInput} from "../input/EventFeedbackInput";
import {EventFeedbackRepository} from "../repositories/EventFeedbackRepository";

@Service()
export class EventFeedbackService {
    constructor(
        private readonly eventFeedBackRepository: EventFeedbackRepository,
        private readonly eventRepository: EventRepository,
        private readonly attendeeRepository: AttendeeRepository,
    ) {}

    async addEventFeedback(eventId: string, input: EventFeedbackInput): Promise<EventFeedback> {
        const currentDate = new Date();
        const foundEvent = await this.eventRepository.getById(eventId);
        if (!foundEvent) {
            throw new NotFoundError("Event not found");
        }

        const eventEndTimeUTC = new Date(foundEvent.eventEndTime);
        if (eventEndTimeUTC >= currentDate) {
            throw new UnauthorizedError("Feedbacks are not allowed at this time");
        }
        input.event = foundEvent;
        input.eventId = foundEvent.id;
        return await this.eventFeedBackRepository.eventFeedback(input);
    }

    async getEventWithFeedback(eventId: string, page: number, pageSize: number): Promise<EventFeedback[]> {
        const findEvent = await this.eventRepository.getById(eventId);
        if (!findEvent) {
            throw new NotFoundError("Event not found");
        }
        return await this.eventFeedBackRepository.getEventWithFeedback(findEvent.id, page, pageSize);
    }
}
