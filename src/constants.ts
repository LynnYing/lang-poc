export enum Tokens {
  OpenInterpolation = 'OpenInterpolation',
}

export const templateOptions: Record<string, string>[] = [
  {
    label: 'Avg +- StdDev(Count)',
    value: "[Avg] & '+-' & [StdDev] & '(' + & [Count] & ')']",
  },
  {
    label: 'Avg +- StdDev(Unit)',
    value: "[Avg] & '+-' & [StdDev] & '(' + & [Unit] & ')']",
  },
]
