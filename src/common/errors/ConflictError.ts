import {ApolloError} from "apollo-server";
import {ErrorCode} from "./ErrorCode";

export class ConflictError extends ApolloError {
    constructor(message?: string) {
        super(message || "Conflict", ErrorCode.CONFLICT);
    }
}
