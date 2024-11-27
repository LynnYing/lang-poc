export enum Tokens {
  OpenInterpolation = 'OpenInterpolation',
  Interpolation = 'Interpolation'
}

export const templateOptions: Record<string, string>[] = [
  {
    label: 'Avg +- StdDev(Count)',
    value: "[Avg] & '+-' & [StdDev] & '(' & [Count] & ')'",
  },
  {
    label: 'Avg +- StdDev(Unit)',
    value: "[Avg] & '+-' & [StdDev] & '(' & [Unit] & ')'",
  },
]

export const columnOptions: Record<string, string>[] = [
  {
    label: 'IC50 Avg',
    value: "[IC50 Avg]",
  },
  {
    label: 'IC50 StdDev',
    value: "[IC50 StdDev]",
  },
]

