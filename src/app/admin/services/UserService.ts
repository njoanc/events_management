import bcrypt, {hashSync} from "bcryptjs";
import {Service} from "typedi";
import {RoleEnum} from "../../../common/enums/role.enums";
import {BadRequestError} from "../../../common/errors/BadRequestError";
import {ConflictError} from "../../../common/errors/ConflictError";
import {NotFoundError} from "../../../common/errors/NotFoundError";
import {UnauthorizedError} from "../../../common/errors/UnauthorizedError";
import {JWTAuth} from "../../auth/JWTAuth";
import {User} from "../entities/Users";
import {CreateUserInput} from "../input/CreateUserInput";
import {LoginInput} from "../input/LoginInput";
import {LoginResponse} from "../output/LoginResponse";
import {UserRepository} from "../respositories/UserRepository";
@Service()
export class UserService {
    constructor(private readonly userRepository: UserRepository) {}

    async registerUser(input: CreateUserInput): Promise<User> {
        // Check if a user already exists
        const user = await this.userRepository.findOneByEmail(input.email);
        if (user) {
            throw new ConflictError("User already exists");
        }

        const domainRegex = /^(gmail\.com|hotmail\.com)$/i;
        const match = input.email.split("@")[1]?.match(domainRegex);

        if (!match) {
            throw new BadRequestError("Invalid email domain");
        }
        // Hash the password before creating the user
        const hashedPassword = hashSync(input.password, 10);

        // Create the user if all conditions are met
        const userToCreate = {
            ...input,
            password: hashedPassword,
        };

        return await this.userRepository.createUser(userToCreate);
    }

    async findOneByEmail(email: string): Promise<User> {
        const user = await this.userRepository.findOneByEmail(email);
        if (!user) {
            throw new NotFoundError("User not found");
        }
        return user;
    }

    async loginUser(input: LoginInput): Promise<LoginResponse> {
        // Check if the user with the provided email exists
        const user = await this.userRepository.findOneByEmail(input.email);

        // If the user doesn't exist  throw an error
        if (!user) {
            throw new NotFoundError("User not found");
        }

        if (user.role !== RoleEnum.ADMIN) {
            throw new UnauthorizedError("You have to be an Admin");
        }
        // Compare the provided password with the hashed password from the database
        const passwordMatches = bcrypt.compareSync(input.password, user.password);

        if (!passwordMatches) {
            throw new UnauthorizedError("Invalid password");
        }

        // Generate a JWT token and send it as a response
        const token = new JWTAuth().encodeSession({userId: user.id});

        return {user, token};
    }
}
