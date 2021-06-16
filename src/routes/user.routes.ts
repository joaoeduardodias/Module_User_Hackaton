import { Router } from "express";
import multer from "multer";

import uploadConfig from "../config/upload";
import { ensureAuthenticated } from "../middlewares/EnsureAuthenticated";
import { UpdateUserAvatarController } from "../modules/uploadUserAvatar/UploadUserAvatarController";
import { CreateUserController } from "../modules/users/useCases/createUser/CreateUserController";

const createUserController = new CreateUserController();
const updateUserAvatar = new UpdateUserAvatarController();
const updloadAvatar = multer(uploadConfig.upload("./tmp"));

const userRoutes = Router();

userRoutes.post("/", createUserController.handle);
userRoutes.patch(
  "/avatar",
  ensureAuthenticated,
  updloadAvatar.single("avatar"),
  updateUserAvatar.handle
);

export { userRoutes };
