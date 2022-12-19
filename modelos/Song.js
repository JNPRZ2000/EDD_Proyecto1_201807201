"use strict";
class Song {
    constructor(artist, name, duration, gender) {
        this._artist = artist;
        this._name = name;
        this._duration = duration;
        this._gender = gender;
    }
    getArtist() {
        return this._artist;
    }
    getName() {
        return this._name;
    }
    getDuration() {
        return this._duration;
    }
    getGender() {
        return this._gender;
    }
    toString() {
        return `Artista: ${this._artist}\nTítulo: ${this._name}\nGénero: ${this._gender}\nDuración: ${this._duration}`
    }
}
export default Song;