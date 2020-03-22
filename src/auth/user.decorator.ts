import { createParamDecorator } from "@nestjs/common";
import { User } from "./user.entity";

export const GetUser = createParamDecorator(
  (_data, req): User => {
    if (req && req.args && req.args[0]) return req.args[0].user;
  },
);
