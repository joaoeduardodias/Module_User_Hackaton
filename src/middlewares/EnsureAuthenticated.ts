import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";

import { AppError } from "../errors/AppError";
import { UserRepository } from "../modules/users/repositories/implementations/UserRepository";

interface IPayload {
  sub: string;
}

export async function ensureAuthenticated(
  request: Request,
  response: Response,
  next: NextFunction
): Promise<void> {
  const authHeader = request.headers.authorization;

  if (!authHeader) {
    throw new AppError("Token missing", 401);
  }
  const [, token] = authHeader.split(" ");
  // verifica se um token é valido
  try {
    const { sub: user_id } = verify(
      token,
      "b31723d2709edded5578130ed862e28f"
    ) as IPayload;
    const usersRepository = new UserRepository();
    const user = await usersRepository.findById(user_id);
    if (!user) {
      throw new AppError("User does not exist", 401);
    }
    request.user = {
      id: user_id,
    };
    next();
  } catch {
    throw new AppError("Invalid token !", 401);
  }
}
