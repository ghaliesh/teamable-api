import { Repository } from "typeorm";

import { User } from "./user.dto";

export class UserRepository extends Repository<User> {}
