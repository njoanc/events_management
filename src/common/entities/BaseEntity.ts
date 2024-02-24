import {Field, ID, ObjectType} from "type-graphql";
import {CreateDateColumn, PrimaryGeneratedColumn, UpdateDateColumn} from "typeorm";

@ObjectType()
export abstract class BaseEntity {
    @Field(() => ID)
    @PrimaryGeneratedColumn()
    readonly id!: string;

    @Field()
    @CreateDateColumn()
    createdAt!: Date;

    @Field()
    @UpdateDateColumn()
    updatedAt!: Date;
}
