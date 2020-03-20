import * as _ from "lodash";

export const deleteProperty = <T extends {}>(
  target: T,
  key: [keyof T] | keyof T,
): any => {
  const result: Partial<T> = _.omit<T>(target, key);
  return result;
};
