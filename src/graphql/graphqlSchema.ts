import "reflect-metadata";

import {DateTimeResolver} from "graphql-scalars";
import {GraphQLUpload, Upload} from "graphql-upload";
import {buildSchema, registerEnumType} from "type-graphql";
import {Container} from "typedi";
import {UserResolver} from "../app/admin/resolvers/UserResolver";
import {AttendeeResolver} from "../app/attendees/resolvers/AttendeeResolver";
import {EventFeedbackResolver} from "../app/eventFeedback/resolvers/EventFeedbackResolver";
import {EventResolver} from "../app/events/resolvers/EventResolver";
import {Gender} from "../common/enums/gender.enums";
import {RoleEnum} from "../common/enums/role.enums";
import {ErrorCode} from "../common/errors/ErrorCode";
import {Period} from "../common/inputs/DateRange";
import {SortType} from "../common/queries/Sort";

const resolvers = [UserResolver, EventResolver, AttendeeResolver, EventFeedbackResolver] as const;

export const graphqlSchema = async (emitSchema = false) => {
    registerEnumType(ErrorCode, {name: "ErrorCode", description: "Api error codes"});
    registerEnumType(SortType, {name: "SortType"});
    registerEnumType(RoleEnum, {name: "RoleEnum"});
    registerEnumType(Period, {name: "Period"});
    registerEnumType(Gender, {name: "Gender"});

    return buildSchema({
        resolvers: resolvers,
        validate: true,
        container: Container,
        emitSchemaFile: emitSchema ? {sortedSchema: false} : false,
        scalarsMap: [
            {type: Date, scalar: DateTimeResolver},
            {type: Upload, scalar: GraphQLUpload},
        ],
    });
};
