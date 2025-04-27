import {months} from "../../utils/journalConstants";

type TileProps = {
    date: string;
    color: string;
    note?: string
    onClick: () => void;
}

export default  function Tile({date, color, onClick}: TileProps) {
    return (
        <div
            style={{
                backgroundColor: color,
                width: '80px',
                height: '80px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: '8px',
                cursor: 'pointer',
                userSelect: 'none',
                transition: 'background-color 0.5s ease'
            }}
            title={date}
            onClick={onClick}
        >
            {(months[date.split('-')[1]])+' '+date.split('-')[2]}
            <br/>
        </div>
    );
}