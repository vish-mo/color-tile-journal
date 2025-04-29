import {months} from "../../utils/journalConstants";

type TileProps = {
    date: string;
    color: string;
    note?: string
    onClick: () => void;
}

export default  function Tile({date, color, note, onClick}: TileProps) {
    return (
        <div
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    onClick();
                }
            }}
            style={{
                fontSize: '0.8rem',
                backgroundColor: color,
                width: '80px',
                height: '80px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: '8px',
                cursor: 'pointer',
                userSelect: 'none',
                transition: 'background-color 0.5s ease',
                padding: '4px',
                overflow: 'hidden',
                textAlign: 'center',
                flexDirection: 'column',
                fontWeight: '500'

            }}
            aria-label={`Journal entry for ${date}. ${note ? 'Note: ' + note : 'No note yet.'}`}
            title={note ? note : date}
            onClick={onClick}
        >
            {(months[date.split('-')[1] as keyof typeof months])+' '+date.split('-')[2]}
            {note && (
                <div style={{
                    fontSize: '0.6rem',
                    marginTop: '4px',
                    color: '#374151',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    whiteSpace: 'nowrap',
                    maxWidth: '70px'
                }}>
                    {note}
                </div>
            )}
        </div>
    );
}