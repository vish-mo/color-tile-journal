
type TileProps = {
    date: string;
    color: string;
    onClick: () => void;
}

export default  function Tile({date, color, onClick}: TileProps) {
    return (
        <div
            style={{
                backgroundColor: color,
                width: '60px',
                height: '60px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: '8px',
                cursor: 'pointer',
                userSelect: 'none',
            }}
            title={date}
            onClick={onClick}
        >
            {date}
        </div>
    );
}