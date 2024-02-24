import {Field, InputType} from "type-graphql";
import {Event} from "../../events/entities/Events";

@InputType()
export class EventFeedbackInput {
    @Field()
    name!: string;

    @Field()
    email!: string;

    @Field()
    satisfaction!: number;

    @Field()
    inclusion!: number;

    @Field()
    likelihoodToAttend!: number;

    @Field()
    keyTakeAway?: string;

    @Field()
    comment?: string;

    @Field({nullable: true})
    eventId!: string;

    event!: Event;
}
