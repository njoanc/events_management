export enum ErrorCode {
    UNAUTHORIZED = "UNAUTHORIZED", // User is not logged in
    FORBIDDEN = "FORBIDDEN", // User has no permission
    NOT_FOUND = "NOT_FOUND", // Resource not found
    BAD_REQUEST = "BAD_REQUEST", // The request has errors
    BAD_USER_INPUT = "BAD_USER_INPUT", // GraphQL error when calling endpoint with wrong schema
    CONFLICT = "CONFLICT", // Conflict - Duplicate resources
}
