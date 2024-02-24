import {suite, test} from "@testdeck/mocha";
import {expect} from "chai";
import "reflect-metadata";
import {instance, mock, when} from "ts-mockito";
import {User} from "../../src/app/admin/entities/Users";
import {UserResolver} from "../../src/app/admin/resolvers/UserResolver";
import {UserService} from "../../src/app/admin/services/UserService";

@suite
export class UserResolverTests {
    private resolver!: UserResolver;
    private service!: UserService;

    async before() {
        this.service = mock(UserService);
        this.resolver = new UserResolver(instance(this.service));
    }

    @test async "should create a user successfully"() {
        const userDto = {
            firstName: "test",
            lastName: "test1",
            email: "test@gmail.com",
            location: "Kigali",
            phoneNumber: "+250789345678",
            password: "Password@12",
        };

        const mockUser = new User();
        when(this.service.registerUser(userDto)).thenResolve(mockUser);

        //     // Execute the mutation
        const result = await this.resolver.registerUser(userDto);

        //     // Assert the result
        expect(result).to.deep.equal(mockUser);
    }

    @test async "should log in if a user successfully"() {
        const mockUser = new User();
        const loginResponse = {
            user: mockUser,
            token: "K389TP0PYOIGFDKJ",
        };

        const loginInput = {
            email: mockUser.email,
            password: "CcEvents@12",
        };
        when(this.service.loginUser(loginInput)).thenResolve(loginResponse);

        const result = await this.resolver.loginUser(loginInput);

        expect(result).to.deep.equal(loginResponse);
    }
}
