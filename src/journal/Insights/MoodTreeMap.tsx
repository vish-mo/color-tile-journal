import {ColorLegends, SingleTileData, TileData} from "../../utils/journalConstants";
import {useMemo} from "react";
import {Treemap, ResponsiveContainer, Tooltip, XAxis, YAxis} from "recharts";
type Props = {
    tileData: TileData;
    onShowNotes: (entry: { mood: string; notes: string[] }) => void;
};

type TreemapDataItem = {
    name: string; // mood label (e.g., "Great Day")
    color: string; // hex color (e.g., "#D1FAE5")
    size: number; // count of days
};

export default function MoodTreeMap({tileData, onShowNotes} : Props) {
    const chartData = useMemo(() => {
        const moodCountMap: Record<string, { name: string; fill: string; size: number, notes: string[] }> = {};

        Object.values(tileData).forEach(({ color, note }) => {
            const colorCode = color.toUpperCase();
            const moodLabel = ColorLegends[colorCode as keyof typeof ColorLegends] || colorCode;

            if (moodCountMap[moodLabel]) {
                moodCountMap[moodLabel].size += 1;
                if (note) moodCountMap[moodLabel].notes.push(note);
            } else {
                moodCountMap[moodLabel] = {
                    name: moodLabel,
                    fill: colorCode, // ✅ Add fill here instead of relying on payload.color
                    size: 1,
                    notes: note ? [note] : [],
                };
            }
        });
        return Object.values(moodCountMap).sort((a, b) => b.size - a.size);
    }, [tileData]);


    if (!chartData.length) return <p>No data to display.</p>;

    return (
        <div style={{ width: '100%', height: 350, padding: '1rem', maxWidth: '500px', margin: '0 auto' }}>
            <h3>Mood Distribution (Treemap)</h3>
            <p style={{ fontSize: '0.85rem', color: '#555', marginTop: '0.5rem' }}>
                <em>Tip:</em> Click on a mood tile to view all associated notes.
            </p>
            <ResponsiveContainer>
                <Treemap
                    data={chartData}
                    dataKey="size"
                    stroke="#fff"
                    onClick={(entry: any) => {
                        if (entry && entry.notes && entry.notes.length > 0) {
                            onShowNotes({ mood: entry.name, notes: entry.notes });
                        }
                    }}
                >
                    <Tooltip
                        content={({ active, payload }) => {
                            if (active && payload && payload.length > 0) {
                                const entry = payload[0].payload;
                                return (
                                    <div style={{ background: 'white', border: '1px solid #ccc', padding: '8px' }}>
                                        <strong>{entry.name}</strong>
                                        <br />
                                        Days: {entry.size}
                                        {entry.notes && entry.notes.length > 0 && (
                                            <div style={{ marginTop: '6px', fontSize: '0.85rem' }}>
                                                <u>Notes:</u>
                                                <ul style={{ paddingLeft: '16px', margin: 0 }}>
                                                    {entry.notes.slice(0, 3).map((note: string, index: number) => (
                                                        <li key={index}>{note}</li>
                                                    ))}
                                                    {entry.notes.length > 3 && <li>...and more</li>}
                                                </ul>
                                            </div>
                                        )}
                                    </div>
                                );
                            }
                            return null;
                        }}
                    />
                    <p style={{ fontSize: '0.75rem', color: '#888' }}>
                        Click any mood tile to explore full notes.
                    </p>
                </Treemap>
            </ResponsiveContainer>
        </div>
    )
}