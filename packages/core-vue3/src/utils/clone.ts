/**
 * Clone a value deeply.
 * @param value Value to clone.
 */
export const clone = <TModel>(value: TModel): TModel => {
  if (value) {
    return JSON.parse(JSON.stringify(value)) as TModel;
  } else {
    return value;
  }
};
