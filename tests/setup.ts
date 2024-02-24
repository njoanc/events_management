import chai from "chai";
import chaiAsPromised from "chai-as-promised";
import "dotenv/config";
import MockDate from "mockdate";
import {getConnection} from "typeorm";
import {TransactionalTestContext} from "typeorm-transactional-tests";
import {createDB} from "../src/database/databaseConnection";

chai.use(chaiAsPromised);

let transactionalContext: TransactionalTestContext;

export const mochaHooks = {
    async beforeAll() {
        try {
            await createDB();
        } catch (error) {
            console.error("Error creating connection:", error);
        }
    },

    async beforeEach() {
        const connection = getConnection();
        transactionalContext = new TransactionalTestContext(connection);
        await transactionalContext.start();
    },

    async afterEach() {
        await transactionalContext.finish();
        MockDate.reset();
    },

    async afterAll() {
        const connection = getConnection();
        await connection.close();
    },
};
