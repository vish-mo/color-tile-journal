import { TileData } from './journalConstants';

export const getStoredTileData = (): TileData => {
    try {
        const raw = localStorage.getItem('colorTileJournal');
        return raw ? JSON.parse(raw) : {};
    } catch (e) {
        console.error('Failed to parse tile data:', e);
        return {};
    }
};
