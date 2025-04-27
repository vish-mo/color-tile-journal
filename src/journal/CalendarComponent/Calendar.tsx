import {getPastMonth} from "../../utils/calendarutils";
import {useEffect, useState, lazy, Suspense} from "react";

const Tile = lazy(()=> import('../TileComponent/Tile'));

const past30Days = getPastMonth();
export default function Calendar() {
    const [tileColors, setTileColors] = useState<Record<string, string>>({});
    useEffect(() => {
        const savedData = localStorage.getItem('colorTileJournal');
        if(savedData) {
            const parsedData = JSON.parse(savedData);
            setTileColors(parsedData);
            // parsedData.forEach((date) => {
            //     setTileColors(prevState => ({
            //         ...prevState, [date] : parsedData[date]
            //     }))
            // })

        } else {
            setTileColors({});
        }
    }, []);

    useEffect(() => {
        localStorage.setItem('colorTileJournal', JSON.stringify(tileColors));
    }, [tileColors]);

    const handleTileClick = (date: string) => {
        const currentColor = tileColors[date] || '#E5E7EB';
        const colorOptions = ['#D1FAE5', '#FDE68A', '#FCA5A5', '#E0E7FF', '#A7F3D0'];
        const nextColorIdx = (colorOptions.indexOf(currentColor)+1) % colorOptions.length;
        const nextColor = colorOptions[nextColorIdx];
        setTileColors(prevState => ({
            ...prevState, [date] : nextColor
        }));
    }
    const handleAddNote = (date: string) => {
        const note = prompt(`Add a note for this ${date}`);
        console.log(note);
        console.log(date);
    }
    if (tileColors === null) {
        return <div>Loading...</div>;
    }
    return (
        <div>
            <div style={{ textAlign: 'center', marginTop: '2rem' }}>
                <h1 style={{ fontSize: '2rem', marginBottom: '1rem' }}>
                    Color Tile Journal
                </h1>
                <p style={{ fontSize: '1rem', color: '#6B7280' }}>
                    A soft space to track your mood with color ✨
                </p>
            </div>
            <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(7, 80px)', // 7 tiles per row, 60px each
                gap: '10px',
                width: 'fit-content',
                margin: '0 auto'
            }}>
            {past30Days.map(date =>
                 (<div key={date}>
                         <Suspense fallback={'<div style={{fontSize: \'0.8rem\'}}>Loading Tile...</div>'} key={date}>
                         <Tile
                    key={date}
                    date={date}
                    color={tileColors[date] || '#E5E7EB'}
                    onClick={() => handleTileClick(date)}/>
                         </Suspense>

                        <button
                            style={{
                                bottom: '-25px',
                                left: '50%',
                                fontSize: '0.7rem',
                                background: '#E0E7FF',
                                border: 'none',
                                borderRadius: '4px',
                                padding: '2px 4px',
                                cursor: 'pointer'
                            }}
                            onClick={() => handleAddNote(date)}
                        >+Note</button>
                     </div>
                 )
            )}
            </div>
        </div>
    )
}