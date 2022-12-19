"use strict";
class Node {
    constructor(value, id) {
        this._previous = null;
        this._next = null;
        this._value = value;
        this._id = id;
    }
    getId() {
        return this._id;
    }
    getPrevious() {
        return this._previous;
    }
    getNext() {
        return this._next;
    }
    getValue() {
        return this._value
    }
    setPrevious(prev) {
        this._previous = prev;
    }
    setNext(next) {
        this._next = next;
    }
    setValue(value) {
        this._value = value;
    }
}
class CircularDoublyLinkedList {
    constructor() {
        this._head = null;
        this._last = null;
        this.size = 0;
        this._ids = 0;
    }
    add(value) {
        let newnode = new Node(value, this._ids);
        if (this._head == null) {
            this._head = this._last = newnode;
            this._circular()
        } else {
            newnode.setPrevious(this._last);
            this._last.setNext(newnode);
            this._last = newnode;
            this._circular();
        }
        this._ids += 1;
        this.size += 1;
    }
    *iter() {
        let current = this._head;
        do {
            if (this._head == null)
                break;
            yield current.getValue()
            current = current.getNext()
        } while (current != this._head);
    }
    toGraph(name) {
        let graph = `\n\tdigraph ${name}{`;
        graph += "\n\t\trankdir = LR";
        graph += "\n\t\tstyle=filled;";
        graph += "\n\t\tcolor=lightgrey;";
        graph += "\n\t\tfillcolor=\"blue:yellow\";";
        graph += "\n\t\tgradientangle=90;";
        if (this._head != null) {
            let current = this._head;
            do {
                graph += `\n\t\tnode[shape = box label = "${current.getValue()}"]"${current.getId()}"`;
                current = current.getNext();
            } while (current != this._head);
            current = this._head;
            do {
                graph += `\n\t"${current.getId()}"->"${current.getNext().getId()}";`;
                graph += `\n\t"${current.getId()}"->"${current.getPrevious().getId()}";`;
                current = current.getNext();
            } while (current != this._head)
        }
        graph += `\n\tlabel = "${name}"\n}`;
        return graph;
    }
    _circular() {
        this._head.setPrevious(this._last);
        this._last.setNext(this._head);
    }

}
export default CircularDoublyLinkedList;