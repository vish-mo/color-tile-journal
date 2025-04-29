import './NoteModal.css';

type NoteModalProps = {
    isOpen: boolean;
    date: string | null;
    noteText: string;
    setNoteText: (text: string) => void;
    onSave: () => void;
    onCancel: () => void;
};

export default function NoteModal({isOpen, date, noteText, setNoteText, onSave, onCancel}: NoteModalProps) {
    if (!isOpen || !date) return null;
    return (
        <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="modal-title"
            className='modal-overlay'>
            <div className='modal-container'>
                <h3 id="modal-title">Add a note for {date}</h3>
                <textarea
                    value={noteText}
                    onChange={(e) => setNoteText(e.target.value)}
                    rows={4}
                    autoFocus
                />
                <div className='modal-buttons'>
                    <button onClick={onCancel}>Cancel</button>
                    <button onClick={onSave}>Submit</button>
                </div>
            </div>
        </div>
    )
}