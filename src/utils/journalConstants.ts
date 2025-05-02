export const months = {
    '01': 'Jan',
    '02': 'Feb',
    '03': 'Mar',
    '04': 'Apr',
    '05': 'May',
    '06': 'Jun',
    '07': 'Jul',
    '08': 'Aug',
    '09': 'Sep',
    '10': 'Oct',
    '11': 'Nov',
    '12': 'Dec'
}

export const days = {
    0: 'Mon',
    1: 'Tue',
    2: 'Wed',
    3: 'Thu',
    4: 'Fri',
    5: 'Sat',
    6: 'Sun'
}

export const ColorOptions = ['#D1FAE5', '#FDE68A', '#FCA5A5', '#E0E7FF', '#A7F3D0'];
export const ColorLegend = [
    { color: '#D1FAE5', label: 'Great Day' },
    { color: '#FDE68A', label: 'Okay Day' },
    { color: '#FCA5A5', label: 'Tough Day' },
    { color: '#E0E7FF', label: 'Calm Day' },
    { color: '#A7F3D0', label: 'Creative Day' }
];

export const ColorLegends = {
    '#D1FAE5': 'Great Day',
    '#FDE68A': 'Okay Day',
    '#FCA5A5': 'Tough Day',
    '#E0E7FF': 'Calm Day',
    '#A7F3D0': 'Creative Day',
}

export type SingleTileData = {
    color: string;
    note?: string;
}

export type TileData = Record<string, SingleTileData>;
