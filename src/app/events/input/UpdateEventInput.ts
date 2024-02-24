import {Field, InputType} from "type-graphql";

@InputType()
export class UpdateEventInput {
    @Field({nullable: true})
    name?: string;

    @Field({nullable: true})
    description?: string;

    @Field({nullable: true})
    dateOfEvent?: Date;

    @Field({nullable: true})
    eventStartTime?: Date;

    @Field({nullable: true})
    eventEndTime?: Date;

    @Field({nullable: true})
    dateOfReminder?: Date;

    @Field({nullable: true})
    location?: string;

    @Field({nullable: true})
    imageUrl?: string;
}
