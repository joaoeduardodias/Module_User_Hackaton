import { AppError } from "../../../../errors/AppError";
import { ICreateUserDTO } from "../../dtos/ICreateUserDTO";
import { UserRepositoryInMemory } from "../../repositories/implementations/UserRepositoryInMemory";
import { CreateUserUseCase } from "../createUser/CreateUserUseCase";
import { AuthenticateUserUseCase } from "./AuthenticateUserUseCase";

let authenticateUserUseCase: AuthenticateUserUseCase;
let userRepositoryInMemory: UserRepositoryInMemory;
let createUserUseCase: CreateUserUseCase;
describe("Authenticate User", () => {
  beforeEach(() => {
    userRepositoryInMemory = new UserRepositoryInMemory();
    authenticateUserUseCase = new AuthenticateUserUseCase(
      userRepositoryInMemory
    );
    createUserUseCase = new CreateUserUseCase(userRepositoryInMemory);
  });

  it("should be able to authenticate an user", async () => {
    const user: ICreateUserDTO = {
      email: "user@test.com",
      password: "12345",
      name: "user test",
    };
    await createUserUseCase.execute(user);
    const result = await authenticateUserUseCase.execute({
      email: user.email,
      password: user.password,
    });
    expect(result).toHaveProperty("token");
  });

  it("should notbe able to authenticate an nonexistent user", async () => {
    expect(async () => {
      await authenticateUserUseCase.execute({
        email: "test@email",
        password: "123456",
      });
    }).rejects.toBeInstanceOf(AppError);
  });

  it("should not  be able to authenticate with incorrect password", async () => {
    expect(async () => {
      const user: ICreateUserDTO = {
        email: "user@test.com",
        password: "12345",
        name: "user test",
      };
      await createUserUseCase.execute(user);
      await authenticateUserUseCase.execute({
        email: user.email,
        password: "123",
      });
    }).rejects.toBeInstanceOf(AppError);
  });
});
