import {suite, test} from "@testdeck/mocha";
import {expect} from "chai";
import Container from "typedi";
import {CreateUserInput} from "../../src/app/admin/input/CreateUserInput";
import {UserService} from "../../src/app/admin/services/UserService";
import {RoleEnum} from "../../src/common/enums/role.enums";
import {BadRequestError} from "../../src/common/errors/BadRequestError";
import {ConflictError} from "../../src/common/errors/ConflictError";
import {NotFoundError} from "../../src/common/errors/NotFoundError";
import {UnauthorizedError} from "../../src/common/errors/UnauthorizedError";
import {UserFactoryInstance} from "./factories/UserFactory";

@suite
export class UserServiceTests {
    private service!: UserService;

    async before() {
        this.service = Container.get(UserService);
    }

    @test async "should create a new user"() {
        const userInput = {
            firstName: "test",
            lastName: "test1",
            email: "test@gmail.com",
            location: "Kigali",
            phoneNumber: "+250789345678",
            password: "Password@12",
        } as CreateUserInput;

        const response = await this.service.registerUser(userInput);

        expect(response.email).to.equal(userInput.email);
    }

    @test async "should throw an error if user already exists"() {
        const existingUser = await UserFactoryInstance.create();

        const userInput = {
            firstName: existingUser.firstName,
            lastName: existingUser.lastName,
            email: existingUser.email,
            role: existingUser.role,
            location: existingUser.location,
            phoneNumber: existingUser.phoneNumber,
            password: "Password@12",
        };

        await expect(this.service.registerUser(userInput)).to.be.rejectedWith(ConflictError);
    }

    @test async "should throw an error if email contains wrong domain name"() {
        const userInput = {
            firstName: "test",
            lastName: "test1",
            email: "test@gmail.com",
            location: "Kigali",
            phoneNumber: "+250789345678",
            password: "Password@12",
        } as CreateUserInput;

        await expect(this.service.registerUser(userInput)).to.be.rejectedWith(BadRequestError);
    }

    @test async "should login and return a user, and token"() {
        const user = await UserFactoryInstance.create();

        const loginInput = {
            email: user.email,
            password: "CcEvents@12",
        };

        const response = await this.service.loginUser(loginInput);

        expect(response.token).to.be.string;
        expect(response.user).to.include({
            id: user.id,
            email: user.email,
            phoneNumber: user.phoneNumber,
        });
    }

    @test async "should throw an error if the email is not found"() {
        const loginInput = {
            email: "test1@gmail.com",
            password: "CcEvents@12",
        };
        await expect(this.service.loginUser(loginInput)).to.be.rejectedWith(NotFoundError);
    }

    @test async "should throw an error if the password is not correct"() {
        const userDto = {
            email: "test1@gmail.com",
            password: "CcEvents@12",
        };

        await UserFactoryInstance.create(userDto);

        const loginInput = {
            email: userDto.email,
            password: "CyEvents@12",
        };
        await expect(this.service.loginUser(loginInput)).to.be.rejectedWith(UnauthorizedError);
    }

    @test async "should throw an error if a user is not ADMIN"() {
        const user = await UserFactoryInstance.create({role: RoleEnum.USER});
        const loginInput = {
            email: user.email,
            password: "CcEvents@12",
        };

        await expect(this.service.loginUser(loginInput)).to.be.rejectedWith(UnauthorizedError);
    }
}
