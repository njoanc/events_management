import {Field, ObjectType} from "type-graphql";
import {User} from "../entities/Users";

@ObjectType()
export class LoginResponse {
    @Field(() => User)
    user!: User;

    @Field(() => String)
    token!: string;
}
