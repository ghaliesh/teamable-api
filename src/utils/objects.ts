import * as _ from "lodash";

export const deleteProperty = <T extends {}>(
  target: T,
  key: [keyof T] | keyof T,
): any => {
  const result: Partial<T> = _.omit<T>(target, key);
  return result;
};

export const getProp = <T extends {}, Y extends {} | string>(
  target: T,
  path: string,
): Y => {
  const result: Y = _.get(target, path);
  return result;
};
