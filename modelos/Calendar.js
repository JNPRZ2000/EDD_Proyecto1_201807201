class Calendar {
    constructor(month, day, song, artist) {
        this._month = month;
        this._day = parseInt(day);
        this._song = song;
        this._artist = artist;
    }
    getMont() {
        return this._month;
    }
    getDay() {
        return this._day;
    }
    getSong() {
        return this._song;
    }
    getArtist() {
        return this._artist;
    }
    toString() {
        return `Mes: ${this._month}\nDía: ${this._day}\nCanción: ${this._song}\nArtista: ${this._artist}`;
    }
}
export default Calendar;