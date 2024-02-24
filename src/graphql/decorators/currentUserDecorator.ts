import {createParamDecorator, MiddlewareFn} from "type-graphql";
import {User} from "../../app/admin/entities/Users";
import {ApiContext, UserAuthenticator} from "../../app/auth/Authenticate";
import {RoleEnum} from "../../common/enums/role.enums";

/* Middleware to ensure that the current user is authenticated */
export const isAdmin: MiddlewareFn<ApiContext> = async ({context}, next) => {
    const userAuthenticator = new UserAuthenticator();
    const user = await userAuthenticator.authenticate(context);

    if (user) {
        context.user = user;
    }
    // Check if the user has the "ADMIN" role
    if (user.role !== RoleEnum.ADMIN) {
        throw new Error("Access denied! You don't have permission for this action!");
    }

    // Call the next middleware or resolver in the chain
    return next();
};

/* Gets current user from Graphql context */
export function CurrentUser() {
    return createParamDecorator<ApiContext>(async ({context}): Promise<User> => {
        return new UserAuthenticator().authenticate(context);
    });
}
