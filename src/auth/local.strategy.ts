import { IStrategyOptions, Strategy } from "passport-local";
import { PassportStrategy } from "@nestjs/passport"
import { Injectable } from '@nestjs/common';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy, "local") {
  constructor() {
    super({
      usernameField: "username",
      passwordField: "password"
    } as IStrategyOptions)
  }

  async validate(username: string, password: string) {
    const user = { username } // 查询数据库
    return user;
  }
}