import {Factory, PostGeneration, Sequence} from "@linnify/typeorm-factory";
import {hashSync} from "bcryptjs";
import {User} from "../../../src/app/admin/entities/Users";
import {RoleEnum} from "../../../src/common/enums/role.enums";

export class CreateTestUser extends Factory<User> {
    entity = User;

    firstName = new Sequence((i: number) => `Event${i}`);
    lastName = new Sequence((i: number) => `Event${i}`);
    email = new Sequence((i) => `email${i}@gmail.com`);
    password = new Sequence(() => "CcEvents@12");
    phoneNumber = new Sequence(() => `+250784567839`);
    location = new Sequence((i) => `Country${i}`);
    role = new Sequence(() => RoleEnum.ADMIN);

    @PostGeneration()
    async hashPassword(user: User) {
        user.password = hashSync(user.password, 10);
    }
}

export const UserFactoryInstance = new CreateTestUser();
