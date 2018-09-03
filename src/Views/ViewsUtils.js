export const minutize = number => number < 10 ? `0${number}` : number

export const weekize = week => week === 'A' ? 'Week A' : week === 'B' ? 'Week B' : 'Week A and B'
