import {Field, ObjectType} from "type-graphql";
import {DeleteDateColumn} from "typeorm";
import {BaseEntity} from "./BaseEntity";

@ObjectType()
export abstract class SoftDeleteEntity extends BaseEntity {
    @Field(() => String)
    @DeleteDateColumn()
    deletedAt?: Date;

    isDeleted(): boolean {
        return Boolean(this.deletedAt);
    }
}
