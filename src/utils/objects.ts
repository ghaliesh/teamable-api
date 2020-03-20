import * as _ from "lodash";

export const deleteProperty = <T extends {}>(
  target: T,
  key: keyof T,
): Partial<T> => {
  const result: Partial<T> = _.omit<T>(target, key);
  return result;
};
