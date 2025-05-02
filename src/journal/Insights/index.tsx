import React, { useEffect, useState } from 'react';
import { getStoredTileData } from '../../utils/storage';
import { TileData } from '../../utils/journalConstants';
import MoodPieChart from './MoodPieChart';
import MoodTreeMap from "./MoodTreeMap";

const Insights = () => {
    const [tileData, setTileData] = useState<TileData>({});
    const [notesSidebar, setNotesSidebar] = useState<{
        mood: string;
        notes: string[];
    } | null>(null);

    useEffect(() => {
        const data = getStoredTileData();
        setTileData(data);
    }, []);

    if (!Object.keys(tileData).length) {
        return <p>No data available to show insights.</p>;
    }

    return (
        <section>
            <h2 className="section-heading">Mood Insights</h2>
            <MoodPieChart tileData={tileData} />
            <MoodTreeMap tileData={tileData} onShowNotes={setNotesSidebar}/>
            {notesSidebar && (
                <aside style={{
                    position: 'fixed',
                    top: 0,
                    right: 0,
                    width: '300px',
                    height: '100%',
                    backgroundColor: 'white',
                    borderLeft: '1px solid #ccc',
                    padding: '16px',
                    boxShadow: '-2px 0 4px rgba(0,0,0,0.1)',
                    overflowY: 'auto',
                    zIndex: 1000,
                }}>
                    <button onClick={() => setNotesSidebar(null)} style={{ float: 'right' }}>×</button>
                    <h3>{notesSidebar.mood}</h3>
                    <ul>
                        {notesSidebar.notes.map((note, idx) => (
                            <li key={idx} style={{ marginBottom: '8px' }}>{note}</li>
                        ))}
                    </ul>
                </aside>
            )}
        </section>
    );
};

export default Insights;
