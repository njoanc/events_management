import {Field, InputType, Int} from "type-graphql";

@InputType()
export class PaginationInput {
    @Field(() => Int, {description: "Amount of items to return"})
    count!: number;

    @Field({description: "Last retrieved item id"})
    lastRetrievedId!: string;
}
