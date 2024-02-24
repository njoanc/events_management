import {ApolloError} from "apollo-server";
import {ErrorCode} from "./ErrorCode";

export class UnauthorizedError extends ApolloError {
    constructor(message?: string) {
        super(message || "Unauthorized", ErrorCode.UNAUTHORIZED);
    }
}
