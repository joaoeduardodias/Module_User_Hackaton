import { AppError } from "../../../../errors/AppError";
import { UserRepositoryInMemory } from "../../repositories/implementations/UserRepositoryInMemory";
import { CreateUserUseCase } from "./CreateUserUseCase";

let createUserUseCase: CreateUserUseCase;
let userRepositoryInMemory: UserRepositoryInMemory;

describe("Create User", () => {
  beforeEach(() => {
    userRepositoryInMemory = new UserRepositoryInMemory();
    createUserUseCase = new CreateUserUseCase(userRepositoryInMemory);
  });

  it("should be able to create a new user", async () => {
    const user = {
      name: "User test",
      email: "email@test.com",
      password: "123456",
    };
    await createUserUseCase.execute({
      name: user.name,
      email: user.email,
      password: user.password,
    });

    const userCreated = await userRepositoryInMemory.findByEmail(user.email);
    expect(userCreated).toHaveProperty("id");
  });

  it("should not be able to create a new user with name exists", async () => {
    expect(async () => {
      const user = {
        name: "User test",
        email: "email@test.com",
        password: "123456",
      };
      await createUserUseCase.execute({
        name: user.name,
        email: user.email,
        password: user.password,
      });
      await createUserUseCase.execute({
        name: user.name,
        email: user.email,
        password: user.password,
      });
    }).rejects.toBeInstanceOf(AppError);
  });
});
