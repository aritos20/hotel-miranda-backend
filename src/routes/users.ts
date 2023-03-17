import { Router } from "express";
import { getUser, getUsers, postUser, updateUser, deleteUser } from '../controllers/users'

const routerUsers = Router();

routerUsers.get('/', getUsers);
routerUsers.get("/:userid", getUser);
routerUsers.post("/", postUser);
routerUsers.put("/:userid", updateUser);
routerUsers.delete("/:userid", deleteUser);

export { routerUsers };