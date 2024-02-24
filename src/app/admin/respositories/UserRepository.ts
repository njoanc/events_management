import {Service} from "typedi";
import {EntityRepository, Repository} from "typeorm";
import {InjectRepository} from "typeorm-typedi-extensions";
import {BaseRepository} from "../../../common/repositories/BaseRepository";
import {QuerySet} from "../../../common/repositories/QuerySet";
import {User} from "../entities/Users";
import {CreateUserInput} from "../input/CreateUserInput";

@Service()
@EntityRepository(User)
export class UserRepository extends BaseRepository<User> {
    constructor(@InjectRepository(User) private repository: Repository<User>) {
        super(repository);
    }
    getQuerySet(): QuerySet<User> {
        return new QuerySet<User>(this.repository.createQueryBuilder("user"), "user");
    }

    async createUser(userInput: CreateUserInput): Promise<User> {
        const user = await User.create(userInput);
        return await this.save(user);
    }

    async findOneByEmail(email: string): Promise<User | undefined> {
        return this.getQuerySet().whereField("email", email).getOne();
    }

    async findOneById(id: string): Promise<User | undefined> {
        return this.getQuerySet().whereField("id", id).getOne();
    }
}
