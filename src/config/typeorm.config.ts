import { TypeOrmModuleOptions } from "@nestjs/typeorm";

const config: TypeOrmModuleOptions = {
  type: "postgres",
  host: "localhost",
  port: 5432,
  username: "postgres",
  password: "1234",
  database: "teamable",
  entities: ["dist/**/*.entity.js"],
  synchronize: true,
};

export default config;
