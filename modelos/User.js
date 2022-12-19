import CircularDoublyLinkedList from "../edd/CircularDoublyLinkedList.js";
"use strict";
class User {
    constructor(dpi, name, username, password, phone) {
        this.dpi = dpi;
        this.name = name;
        this.username = username;
        this.password = password;
        this.phone = phone;
        this.admin = false;
        this.playlist = new CircularDoublyLinkedList();
    }
    getDPI() {
        return this.dpi;
    }
    getName() {
        return this.name;
    }
    getUsername() {
        return this.username;
    }
    getPassword() {
        return this.password;
    }
    getPhone() {
        return this.phone;
    }
    setDPI(dpi) {
        this.dpi = dpi;
    }
    setName(name) {
        this.name = name;
    }
    setUsername(username) {
        this.username = username;
    }
    setPassword(password) {
        this.password = password;
    }
    setPhone(phone) {
        this.phone = phone;
    }
    toString() {
        return `${this.dpi}\n${this.name}\n${this.username}\n${this.password}\n${this.phone}\n${this.admin}`;
    }
    setAdmin(flag) {
        this.admin = flag;
    }
    isAdmin() {
        return this.admin
    }
    getPlaylist() {
        return this.playlist;
    }
    addToPlaylist(song) {
        this.playlist.add(song);
    }
}

export default User;