import {Field, ObjectType} from "type-graphql";
import {User} from "../../admin/entities/Users";

@ObjectType()
export class EventResponse {
    @Field(() => String)
    name!: string;

    @Field(() => String)
    description!: string;

    @Field(() => Date)
    dateOfEvent!: Date;

    @Field(() => Date)
    eventStartTime!: Date;

    @Field(() => Date)
    eventEndTime!: Date;

    @Field(() => Date)
    dateOfReminder!: Date;

    @Field(() => String)
    imageUrl?: string;

    @Field(() => User)
    user!: User;
}
