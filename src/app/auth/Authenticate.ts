import {getRepository} from "typeorm";
import {UnauthorizedError} from "../../common/errors/UnauthorizedError";
import {User} from "../admin/entities/Users";
import {JWTAuth} from "./JWTAuth";

export type ApiContext = {
    params: {[key: string]: string | undefined};
    headers: {[key: string]: string | undefined};
    user: User;
};

type AuthToken = {
    type: "Bearer";
    token: string;
};

export class UserAuthenticator {
    async authenticate(context: ApiContext): Promise<User> {
        const token = UserAuthenticator.getAuthTokenFromContext(context);

        if (!token) throw new UnauthorizedError();

        const user = await this.authenticateJWT(token.token);

        if (!user) {
            throw new UnauthorizedError();
        }

        return user;
    }

    static getAuthTokenFromContext(context: ApiContext): AuthToken | undefined {
        const authToken =
            context.headers.Authorization || context.headers.authorization || `Bearer ${context.params.token}`;

        if (authToken?.startsWith("Bearer ")) {
            return {
                type: "Bearer",
                token: authToken.replace("Bearer ", ""),
            };
        }

        return undefined;
    }

    private async getUser(userId: string): Promise<User | undefined> {
        return await getRepository(User).findOne(userId);
    }

    private async authenticateJWT(token: string) {
        const auth = new JWTAuth().decodeSession(token);

        if (!auth.isSuccessful()) {
            throw new UnauthorizedError();
        }

        const userId = auth.getData().userId;
        return await this.getUser(userId);
    }
}
