import {Field, ObjectType} from "type-graphql";
import {Column, CreateDateColumn, Entity, ManyToOne} from "typeorm";
import {BaseEntity} from "../../../common/entities/BaseEntity";
import {User} from "../../admin/entities/Users";
import {CreateEventInput} from "../input/EventInput";
import {UpdateEventInput} from "../input/UpdateEventInput";

@Entity()
@ObjectType()
export class Event extends BaseEntity {
    @Field()
    @Column()
    name!: string;

    @Field()
    @Column({type: "text"})
    description!: string;

    @Field()
    @CreateDateColumn()
    dateOfEvent!: Date;

    @Field()
    @CreateDateColumn()
    eventStartTime!: Date;

    @Field()
    @CreateDateColumn()
    eventEndTime!: Date;

    @Field()
    @CreateDateColumn()
    dateOfReminder!: Date;

    @Field()
    @Column()
    location!: string;

    @Field({nullable: true})
    @Column()
    imageUrl?: string;

    @Column()
    userId!: string;

    @Field(() => User, {nullable: true})
    @ManyToOne(() => User, {nullable: true})
    user?: User;

    static create(input: CreateEventInput): Event {
        const event = new Event();
        event.name = input.name;
        event.description = input.description;
        event.dateOfEvent = input.dateOfEvent;
        event.eventStartTime = input.eventStartTime;
        event.eventEndTime = input.eventEndTime;
        event.imageUrl = input.imageUrl;
        event.dateOfReminder = input.dateOfReminder;
        event.location = input.location;
        event.user = input.user;

        event.userId = input.userId;

        return event;
    }

    update(input: UpdateEventInput) {
        this.name = input.name ?? this.name;
        this.description = input.description ?? this.description;
        this.dateOfEvent = input.dateOfEvent ?? this.dateOfEvent;
        this.eventStartTime = input.eventStartTime ?? this.eventStartTime;
        this.eventEndTime = input.eventEndTime ?? this.eventEndTime;
        this.imageUrl = input.imageUrl ?? this.imageUrl;
        this.dateOfReminder = input.dateOfReminder ?? this.dateOfReminder;
        this.location = input.location ?? this.location;
    }
}
