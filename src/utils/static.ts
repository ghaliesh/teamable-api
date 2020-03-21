import * as messages from "static/masseges.json";

import { getProp } from ".";
import { InternalServerErrorException } from "@nestjs/common";

export const getMessage = (path: string): string => {
  try {
    const result: string = getProp<typeof messages, string>(messages, path);
    return result;
  } catch (error) {
    throw new InternalServerErrorException(error);
  }
};
