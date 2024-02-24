import {Field, InputType} from "type-graphql";
import {User} from "../../admin/entities/Users";

@InputType()
export class CreateEventInput {
    @Field()
    name!: string;

    @Field()
    description!: string;

    @Field()
    dateOfEvent!: Date;

    @Field()
    eventStartTime!: Date;

    @Field()
    eventEndTime!: Date;

    @Field()
    dateOfReminder!: Date;

    @Field()
    location!: string;

    @Field({nullable: true})
    imageUrl?: string;

    @Field({nullable: true})
    userId!: string;

    user!: User;
}
