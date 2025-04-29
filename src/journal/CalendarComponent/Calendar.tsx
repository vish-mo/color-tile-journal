import {getPastMonth} from "../../utils/calendarutils";
import {useEffect, useState, lazy, Suspense} from "react";
import {days} from "../../utils/journalConstants";
import './Calendar.css';

const Tile = lazy(()=> import('../TileComponent/Tile'));
const NoteModal = lazy(() => import('../NoteModalComponent/NoteModal'));

const colorLegend = [
    { color: '#D1FAE5', label: 'Great Day' },
    { color: '#FDE68A', label: 'Okay Day' },
    { color: '#FCA5A5', label: 'Tough Day' },
    { color: '#E0E7FF', label: 'Calm Day' },
    { color: '#A7F3D0', label: 'Creative Day' }
];

type SingleTileData = {
    color: string,
    note?: string,
}

type TileData = Record<string, SingleTileData>;

const colorOptions = ['#D1FAE5', '#FDE68A', '#FCA5A5', '#E0E7FF', '#A7F3D0'];

const sampleNotes = [
    'Walked by the river 🌊',
    'Good meeting today 💬',
    'Tough morning 🥲',
    'Felt creative 🎨',
    'Quiet day ☁️',
    'Lots of errands 🛒',
    'Relaxed at home 🛋️',
    'Learned something new 📚',
    'Celebrated a small win 🎉',
    'Struggled with work 🤯'
];

export default function Calendar() {
    const [tileData, setTileData] = useState<TileData>({});

    // For adding a note
    const [editedDate, setEditedDate] = useState<string|null>(null);
    const [noteText, setNoteText] = useState<string>('');

    const [sampleDataLoaded, setSampleDataLoaded] = useState<boolean>(false);

    const past30Days = getPastMonth();
    const firstDayOfWeekFromDate = new Date(past30Days[past30Days.length - 1]).getDay();
    const firstDayOfWeek = firstDayOfWeekFromDate === 0 ? 6 : firstDayOfWeekFromDate - 1;

    const loadSampleData = () => {
        const refreshedTileData: TileData = {};
        past30Days.forEach(date => {
            const randomColor = colorOptions[Math.floor(Math.random() * colorOptions.length)];
            const randomNotes = sampleNotes[Math.floor(Math.random() * sampleNotes.length)];
            refreshedTileData[date] = {
                color: randomColor,
                note: randomNotes
            };
        });
        setTileData(refreshedTileData);
        setSampleDataLoaded(true);
    }

    const resetData = () => {
        setTileData({});
        localStorage.removeItem('colorTileJournal');
        setSampleDataLoaded(false);
    }

    useEffect(() => {
        const savedData = localStorage.getItem('colorTileJournal');
        if(savedData && savedData !== "undefined") {
            try {
                const parsedData = JSON.parse(savedData);
                setTileData(parsedData);
            } catch (error) {
                console.error('Failed to parse localStorage data:', error);
                setTileData({});
            }
        } else {
            setTileData({});
        }
    }, []);

    useEffect(() => {
        localStorage.setItem('colorTileJournal', JSON.stringify(tileData));
    }, [tileData]);

    const openNoteEditor = (date: string) => {
        setEditedDate(date);
        setNoteText(tileData[date]?.note || '');
    }

    const handleTileClick = (date: string) => {
        const currentColor = tileData[date]?.color || '#E5E7EB';
        const nextColorIdx = (colorOptions.indexOf(currentColor)+1) % colorOptions.length;
        const nextColor = colorOptions[nextColorIdx];
        setTileData(prevState => ({
            ...prevState, [date] : {
                ...prevState[date],
                color: nextColor
            }
        }));
    };

    const saveNote = () => {
        if(!editedDate) return;
        setTileData((prev) => ({
            ...prev,
            [editedDate]: {
                ...prev[editedDate],
                note: noteText
            }
        }));
        setEditedDate(null);
        setNoteText('')
    }

    const cancelNote = () => {
        setEditedDate(null);
        setNoteText('');
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
                <div style={{
                    textAlign: 'center',
                    marginBottom: '1rem',
                    display: 'flex',
                    justifyContent: 'center',
                    gap: '10px' }}>
                    <button
                        className={'sample-data-button'}
                        onClick={resetData}
                    >
                        Reset Journal
                    </button>
                    <button
                        className={'sample-data-button'}
                        style={{
                            cursor: sampleDataLoaded ? 'not-allowed' : 'pointer',
                            backgroundColor: sampleDataLoaded ? '#9CA3AF' : 'cornflowerblue',
                        }}
                        onClick={loadSampleData}
                    >
                        {sampleDataLoaded ? 'Sample Loaded' : 'Load Sample Journal'}
                    </button>
                </div>
            </div>

            <section aria-labelledby="legend-heading" style={{ marginTop: '1rem' }}>
                <h2 id="legend-heading" style={{ fontSize: '1rem', textAlign: 'center', color: '#374151' }}>
                    Color Legend
                </h2>
                <div className={'color-legend-section'}>
                    {colorLegend.map((item) => (
                        <div key={item.color} className={'color-legend-container'}>
                            <div style={{backgroundColor: item.color,}} className={'color-legend-color-indicator'}/>
                            <span className={'color-legend-text'}>{item.label}</span>
                        </div>
                    ))}
                </div>
            </section>

            <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(7, 80px)', // 7 tiles per row, 60px each
                gap: '12px',
                width: '100%',
                margin: '0 auto',
                maxWidth: '600px',
            }}>
                {Array.from({length: 7}).map((_, idx) =>(
                    <div
                        key={'day-header-'+idx}
                        style={{
                            fontSize: '0.8rem',
                            backgroundColor: 'lavenderblush',
                            border: 'none',
                            borderRadius: '4px',
                            padding: '2px 4px',
                            fontWeight: 'bold',
                            width: '80px',
                        }}
                    >{days[idx as keyof typeof days]}</div>
                ))}
                {Array.from({length: firstDayOfWeek}).map((_, idx) =>(
                    <div key={'empty-'+idx}></div>
                ))}
            {past30Days.map(date =>
                 (<div key={date}>
                         <Suspense fallback={<div style={{fontSize: '0.8rem'}}>Loading Tile...</div>} key={date}>
                         <Tile
                    key={date}
                    date={date}
                    note={tileData[date]?.note}
                    color={tileData[date]?.color || '#E5E7EB'}
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
                            onClick={() => openNoteEditor(date)}
                        >+Note</button>
                     </div>
                 )
            )}
            </div>
            <NoteModal
                isOpen={editedDate !== null}
                date={editedDate}
                noteText={noteText}
                setNoteText={setNoteText}
                onSave={saveNote}
                onCancel={cancelNote}
            />
            <footer style={{ textAlign: 'center', marginTop: '2rem', fontSize: '0.8rem', color: '#6B7280' }}>
                Built with React + TypeScript | <a href="https://github.com/vish-mo/color-tile-journal" target="_blank" rel="noopener noreferrer" style={{ color: '#3B82F6' }}>View Source on GitHub</a>
            </footer>
        </div>
    )
}