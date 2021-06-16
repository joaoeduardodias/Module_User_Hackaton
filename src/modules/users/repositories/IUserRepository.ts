import { ICreateUserDTO } from "../dtos/ICreateUserDTO";
import { User } from "../entities/User";

interface IUserRepository {
  create({ name, email, password, avatar }: ICreateUserDTO): Promise<void>;
  findByEmail(email: string): Promise<User>;
}

export { IUserRepository };
