import SimplyLinkedList from "../edd/SimplyLinkedList.js";
class Podcast {
    constructor(name, topic, invitados, duration) {
        this._name = name;
        this._topic = topic;
        this._invitados = invitados;
        this._duration = parseInt(duration);
    }
    setInvitados(list) {
        this._invitados = list;
    }
    getName() {
        return this._name;
    }
    getTopic() {
        return this._topic;
    }
    getInvitados() {
        return this._invitados;
    }
    getDuration() {
        return this._duration;
    }
    toString() {
        let inv = 0;
        if (this._invitados instanceof SimplyLinkedList) {
            inv = this._invitados.length;
        }
        return `Nombre: ${this._name}\nTópico: ${this._topic}\nInvitados: ${inv}`;
    }
}
export default Podcast;