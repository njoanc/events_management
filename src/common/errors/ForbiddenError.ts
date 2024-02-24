import {ApolloError} from "apollo-server";
import {ErrorCode} from "./ErrorCode";

export class ForbiddenError extends ApolloError {
    constructor(message?: string) {
        super(message || "Forbidden", ErrorCode.FORBIDDEN);
    }
}
