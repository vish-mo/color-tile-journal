import Tile from "../TileComponent/Tile";
import {getPastMonth} from "../../utils/calendarutils";
import {useState} from "react";

export default function Calendar() {
    const past30Days = getPastMonth();
    const [tileColors, setTileColors] = useState<Record<string, string>>({});

    const handleTileClick = (date: string) => {
        const currentColor = tileColors[date] || '#E5E7EB';
        const colorOptions = ['#D1FAE5', '#FDE68A', '#FCA5A5', '#E0E7FF', '#A7F3D0'];
        const nextColorIdx = (colorOptions.indexOf(currentColor)+1) % colorOptions.length;
        const nextColor = colorOptions[nextColorIdx];
        setTileColors(prevState => ({
            ...prevState, [date] : nextColor
        }));
    }
    return (
        <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(7, 60px)', // 7 tiles per row, 60px each
            gap: '10px',
            width: 'fit-content',
            margin: '0 auto'
        }}>
        {past30Days.map(date => {
            return (<Tile
                key={date}
                date={date}
                color={tileColors[date] || '#E5E7EB'}
                onClick={() => handleTileClick(date)}/>);
        })}
        </div>
    )
}