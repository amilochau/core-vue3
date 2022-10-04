export function clone<TModel>(value: TModel): TModel {
  return JSON.parse(JSON.stringify(value)) as TModel
}
