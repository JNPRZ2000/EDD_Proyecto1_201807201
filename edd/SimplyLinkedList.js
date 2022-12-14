"use strict";
import User from "../modelos/User.js";
class SimplyLinkedList {
    constructor() {
        this.length = 0;
        this.head = null;
    }
    add(value) {
        const new_node = new Node(value);
        if (this.head === null) {
            this.head = new_node;
        } else {
            let current = this.head;
            while (current.getNext() != null) {
                current = current.getNext();
            }
            current.setNext(new_node);
        }
        this.length += 1;
    }
    *iter() {
        let current = this.head
        while (current != null) {
            yield current.getValue();
            current = current.getNext();
        }

    }
    addAt(i, value) {
        if (i < 0 || i >= this.length) {
            alert("[SIMPLYLINKEDLIST]INDEX ERROR: INDEX OUT OF BOUNDS");
        } else {
            const new_node = new Node(value);
            if (i === 0) {
                new_node.setNext(this.head);
                this.head = new_node;
            } else {
                var cont = 0;
                var current = this.head;
                while (cont != i - 1) {
                    current = current.getNext();
                    cont += 1;
                }
                new_node.setNext(current.getNext());
                current.setNext(new_node);
            }
            this.length += 1;
        }
    }
    toGraph(nameGraph) {
        let graph = `\n\tsubgraph ${nameGraph}{`;
        graph += "\n\t\tstyle=filled;";
        graph += "\n\t\tcolor=lightgrey;";
        graph += "\n\t\tfillcolor=\"blue:yellow\";";
        graph += "\n\t\tgradientangle=90;";
        var current = this.head;
        let userG = null;
        var id = 0;
        while (current != null) {
            userG = current.getValue()
            if (userG instanceof User) {
                graph += `\n\t\tnode[shape = box label = "${userG}"]${nameGraph}${id}`
            }
            id += 1;
            current = current.getNext();
        }

    }
}
class Node {
    constructor(value) {
        this._value = value;
        this._next = null;
    }
    getNext() {
        return this._next;
    }
    setNext(next) {
        this._next = next;
    }
    getValue() {
        return this._value;
    }
    setValue(value) {
        this._value = value
    }
    toString() {
        return `${this._value}`;
    }
}
export default SimplyLinkedList;