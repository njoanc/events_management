import {Field, InputType} from "type-graphql";

@InputType()
export class CreateUserInput {
    @Field()
    firstName!: string;

    @Field()
    lastName!: string;

    @Field()
    email!: string;

    @Field()
    password!: string;

    @Field()
    phoneNumber!: string;

    @Field()
    location!: string;
}
