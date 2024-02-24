import {Field, InputType} from "type-graphql";

@InputType()
export class DateRange {
    @Field()
    startDate!: Date;

    @Field()
    endDate!: Date;
}

export enum Period {
    "YEAR" = "year",
    "MONTH" = "month",
}
