export type FormattedData = {
  title: string
  subtitle?: string
  icon?: string
  color?: string
  disabled?: boolean
  hidden?: boolean
}

export type FormattedDataWithValue<K> = { value: K } & FormattedData

const entries = Object.entries as <K extends number | string, T>(o: Record<K, T>) => ([K, T])[];
const formattedData: <K extends number | string, T extends FormattedData>(o: Record<K, T>) => FormattedDataWithValue<K>[] = <K extends number | string, T extends FormattedData>(o: Record<K, T>) => entries(o).map(([k, v]) => ({ value: k, ...v }))

export {
  entries,
  formattedData,
}

