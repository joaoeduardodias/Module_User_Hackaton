import { ICreateUserDTO } from "../../dtos/ICreateUserDTO";
import { User } from "../../entities/User";
import { IUserRepository } from "../IUserRepository";

class UserRepositoryInMemory implements IUserRepository {
  users: User[] = [];

  async create({ name, email, password }: ICreateUserDTO): Promise<void> {
    const user = new User();
    Object.assign(user, {
      name,
      email,
      password,
    });
    this.users.push(user);
  }
  async findByEmail(email: string): Promise<User> {
    const user = this.users.find((user) => user.email === email);
    return user;
  }
  async findById(id: string): Promise<User> {
    const user = this.users.find((user) => user.id === id);
    return user;
  }
}

export { UserRepositoryInMemory };
