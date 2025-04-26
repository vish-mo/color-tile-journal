export const getPastMonth = () => {
    const days = [];
    const today = new Date();
    for(let i = 0; i < 30; i++) {
        const date = new Date();
        date.setDate(today.getDate() - i);
        days.push(date.toISOString().split('T')[0]);
    }
    return days;
}