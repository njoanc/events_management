import {Field, ObjectType} from "type-graphql";
import {Column, Entity, Unique} from "typeorm";
import {BaseEntity} from "../../../common/entities/BaseEntity";
import {RoleEnum} from "../../../common/enums/role.enums";
import {CreateUserInput} from "../input/CreateUserInput";

@Entity()
@ObjectType()
@Unique(["email", "phoneNumber"])
export class User extends BaseEntity {
    @Field()
    @Column()
    firstName!: string;

    @Field()
    @Column()
    lastName!: string;

    @Field()
    @Column()
    email!: string;

    @Field()
    @Column()
    phoneNumber!: string;

    @Column()
    password!: string;

    @Field()
    @Column()
    location!: string;

    @Field(() => RoleEnum)
    @Column({type: "simple-enum", enum: RoleEnum, default: RoleEnum.ADMIN})
    role!: RoleEnum;

    static create(input: CreateUserInput): User {
        const user = new User();
        user.firstName = input.firstName;
        user.lastName = input.lastName;
        user.email = input.email;
        user.password = input.password;
        user.phoneNumber = input.phoneNumber;
        user.location = input.location;

        return user;
    }
}
