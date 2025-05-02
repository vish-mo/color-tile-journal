// src/components/Insights/MoodPieChart.tsx
import React, { useMemo } from 'react';
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { ColorLegends, TileData} from '../../utils/journalConstants';

type Props = {
    tileData: TileData;
};

const MoodPieChart: React.FC<Props> = ({ tileData }) => {
    const pieData = useMemo(() => {
        const moodMap: Record<string, number> = {};
        Object.values(tileData).forEach(({ color }) => {
            moodMap[color] = (moodMap[color] || 0) + 1;
        });

        return Object.entries(moodMap).map(([color, count]) => ({
            name: ColorLegends[color as keyof typeof ColorLegends],
            value: count,
            color
        }));
    }, [tileData]);

    if (pieData.length === 0) {
        return <p>Not enough data to display the mood distribution.</p>;
    }

    return (
        <div style={{ width: '100%', height: 350, padding:'2rem' }}>
            <h3>Mood Distribution</h3>
            <ResponsiveContainer>
                <PieChart>
                    <Pie
                        data={pieData}
                        dataKey="value"
                        nameKey="name"
                        cx="50%"
                        cy="50%"
                        outerRadius={120}
                        label
                    >
                        {pieData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                    </Pie>
                    <Tooltip />
                            <Legend />
                </PieChart>
            </ResponsiveContainer>
        </div>
    );
};

export default MoodPieChart;
