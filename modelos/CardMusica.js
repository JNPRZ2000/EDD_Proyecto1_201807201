
import Song from "./Song.js";
import User from "./User.js";
"use strict";
class CardMusica {
    constructor(song, user) {
        if (song instanceof Song && user instanceof User) {
            this.song = song;
            this.user = user;
            this.card = document.createElement("div");
            this.card.setAttribute("class", "card");
            this.card.setAttribute("style", "width: 18rem;");
            this.cardImgTop = document.createElement("img");
            this.cardImgTop.setAttribute("src", "...");
            this.cardImgTop.setAttribute("class", "card-img-top");
            this.cardImgTop.setAttribute("alt", "...");
            this.card.append(this.cardImgTop);
            this.cardbody = document.createElement("div");
            this.cardbody.setAttribute("class", "card-body");
            this.card.append(this.cardbody);
            this.btnAddToPlaylist = document.createElement("button");
            this.btnAddToPlaylist.setAttribute("class", "btn btn-primary")
            this.btnAddToPlaylist.textContent = "Agregar a la playlist";
            this.cardbody.appendChild(this.btnAddToPlaylist);
            this.cardtitle = document.createElement("h5");
            this.cardtitle.setAttribute("class", "card-title");
            this.cardtitle.textContent = this.song.getName();
            this.cardbody.appendChild(this.cardtitle);
            this.listgroup = document.createElement("ul");
            this.listgroup.setAttribute("class", "list-group list-group-flush");
            this.cardbody.appendChild(this.listgroup);
            this.listitemartist = document.createElement("li");
            this.listitemartist.setAttribute("class", "list-group-item");
            this.listitemartist.textContent = this.song.getArtist();
            this.listgroup.appendChild(this.listitemartist);
            this.listitemgender = document.createElement("li");
            this.listitemgender.setAttribute("class", "list-group-item");
            this.listitemgender.textContent = `${this.song.getGender()}`;
            this.listgroup.appendChild(this.listitemgender);
            this.btnAddToPlaylist.onclick = () => {
                console.log("Hola perro, que tal?")
                this.user.addToPlaylist(song);
            }

        }
    }
    getElement() {
        return this.card;
    }

}
export default CardMusica;