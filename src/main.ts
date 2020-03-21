import * as config from "config";

import { NestFactory } from "@nestjs/core";

import { AppModule } from "./app.module";

async function bootstrap(): Promise<void> {
  const app = await NestFactory.create(AppModule);
  const port: number = config.get("app.port");
  await app.listen(port);
}

bootstrap();
