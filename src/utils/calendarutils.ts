export const getPastMonth = () => {
    const dates: string[] = [];
    const today = new Date();
    const pstDate = new Date(today.toLocaleString("en-US", { timeZone: "America/Los_Angeles" }));
    for (let i = 29; i >= 0; i--) {
        const date = new Date(pstDate);
        date.setDate(date.getDate() - i);
        dates.push(date.toISOString().split('T')[0]); // get YYYY-MM-DD
    }
    return dates;
}