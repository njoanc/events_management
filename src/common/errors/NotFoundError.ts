import {ApolloError} from "apollo-server";
import {ErrorCode} from "./ErrorCode";

export class NotFoundError extends ApolloError {
    constructor(message?: string) {
        super(message || "Not found", ErrorCode.NOT_FOUND);
    }
}
