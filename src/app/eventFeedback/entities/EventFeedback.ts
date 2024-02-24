import {Field, ObjectType} from "type-graphql";
import {Column, Entity, ManyToOne} from "typeorm";
import {BaseEntity} from "../../../common/entities/BaseEntity";
import {Event} from "../../events/entities/Events";
import {EventFeedbackInput} from "../input/EventFeedbackInput";

@Entity()
@ObjectType()
export class EventFeedback extends BaseEntity {
    @Column({nullable: true})
    eventId!: string;

    @Field(() => Event, {nullable: true})
    @ManyToOne(() => Event, {nullable: true})
    event?: Event;

    @Field()
    @Column()
    name!: string;

    @Field()
    @Column()
    email!: string;

    @Field()
    @Column({type: "int"})
    satisfaction!: number;

    @Field()
    @Column({type: "int"})
    inclusion!: number;

    @Field()
    @Column({type: "int"})
    likelihoodToAttend!: number;

    @Field({nullable: true})
    @Column({type: "text", nullable: true})
    keyTakeAway?: string;

    @Field({nullable: true})
    @Column({type: "text", nullable: true})
    comment?: string;

    static async create(input: EventFeedbackInput): Promise<EventFeedback> {
        const eventFeedback = new EventFeedback();

        eventFeedback.eventId = input.eventId;
        eventFeedback.event = input.event;
        eventFeedback.name = input.name;
        eventFeedback.email = input.email;
        eventFeedback.satisfaction = input.satisfaction;
        eventFeedback.inclusion = input.inclusion;
        eventFeedback.likelihoodToAttend = input.likelihoodToAttend;
        eventFeedback.keyTakeAway = input.keyTakeAway;
        eventFeedback.comment = input.comment;

        return eventFeedback;
    }
}
