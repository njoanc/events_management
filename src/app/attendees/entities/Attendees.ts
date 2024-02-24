import {Field, ObjectType} from "type-graphql";
import {Column, CreateDateColumn, Entity, ManyToOne, Unique} from "typeorm";
import {BaseEntity} from "../../../common/entities/BaseEntity";
import {Gender} from "../../../common/enums/gender.enums";
import {Event} from "../../events/entities/Events";
import {AttendeeInput} from "../input/AttendeeInput";

@Entity()
@ObjectType()
@Unique(["email"])
export class Attendee extends BaseEntity {
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
    @CreateDateColumn()
    dob!: Date;

    @Field(() => Gender)
    @Column({type: "simple-enum", enum: Gender})
    gender!: Gender;

    @Field()
    @Column()
    organizationSchool!: string;

    @Field()
    @Column({nullable: true})
    avatar?: string;

    @Column({nullable: true})
    eventId!: string;

    @Field(() => Event, {nullable: true})
    @ManyToOne(() => Event, {nullable: true})
    event?: Event;

    static async create(input: AttendeeInput): Promise<Attendee> {
        const attendee = new Attendee();
        attendee.firstName = input.firstName;
        attendee.lastName = input.lastName;
        attendee.email = input.email;
        attendee.dob = input.dob;
        attendee.gender = input.gender;
        attendee.organizationSchool = input.organizationSchool;
        attendee.avatar = input.avatar;
        attendee.eventId = input.eventId;
        attendee.event = input.event;

        return attendee;
    }
}
