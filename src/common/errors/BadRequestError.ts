import {ApolloError} from "apollo-server";
import {ErrorCode} from "./ErrorCode";

export class BadRequestError extends ApolloError {
    constructor(message?: string) {
        super(message || "Bad Request", ErrorCode.BAD_REQUEST);
    }
}
