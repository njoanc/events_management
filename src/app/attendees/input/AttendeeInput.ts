import {Field, InputType} from "type-graphql";
import {Gender} from "../../../common/enums/gender.enums";
import {Event} from "../../events/entities/Events";

@InputType()
export class AttendeeInput {
    @Field()
    firstName!: string;

    @Field()
    lastName!: string;

    @Field()
    email!: string;

    @Field()
    dob!: Date;

    @Field(() => Gender)
    gender!: Gender;

    @Field()
    organizationSchool!: string;

    @Field({nullable: true})
    avatar?: string;

    @Field({nullable: true})
    eventId!: string;

    event!: Event;
}
