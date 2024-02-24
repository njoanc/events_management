import {Arg, Mutation, Query, Resolver} from "type-graphql";
import {Service} from "typedi";
import {User} from "../entities/Users";
import {CreateUserInput} from "../input/CreateUserInput";
import {LoginInput} from "../input/LoginInput";
import {LoginResponse} from "../output/LoginResponse";
import {UserService} from "../services/UserService";

@Service()
@Resolver()
export class UserResolver {
    constructor(private userService: UserService) {}

    @Mutation((_returns) => User, {description: "Create user"})
    async registerUser(@Arg("input", () => CreateUserInput) input: CreateUserInput): Promise<User> {
        return await this.userService.registerUser(input);
    }

    @Mutation((_returns) => LoginResponse, {description: "User login"})
    async loginUser(@Arg("input", () => LoginInput) input: LoginInput): Promise<LoginResponse> {
        return await this.userService.loginUser(input);
    }

    @Query(() => String)
    async helloWorld() {
        return "Hello world";
    }
}
