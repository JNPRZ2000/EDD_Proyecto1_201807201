class Node {
    constructor(i, j, value) {
        this._i = i;
        this._j = j;
        this._value = value;
        this._up = null;
        this._down = null;
        this._next = null;
        this._prev = null;
    }
    getI() { return this._i; }
    getJ() { return this._j; }
    getValue() { return this._value; }
    getUp() { return this._up; }
    getDown() { return this._down; }
    getNext() { return this._next; }
    getPrev() { return this._prev; }
    setValue(val) { this._value = val; }
    setUp(up) { this._up = up; }
    setDown(down) { this._down = down; }
    setNext(next) { this._next = next; }
    setPrev(prev) { this._prev = prev; }
    toString() {
        return `${this._value}`;
    }
}
class SparceMatrix {
    constructor() {
        this._root = new Node(-1, -1, "ROOT");
        this.sizeI = 0;
        this.sizeJ = 0;
        this._months = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];

    }
    _findRow(i) {
        var current = this._root;
        while (true) {
            if (current.getI() < i) {
                if (current.getDown() != null) {
                    current = current.getDown();
                } else {
                    let newnode = new Node(i, -1, this._months[i]);
                    newnode.setUp(current);
                    current.setDown(newnode);
                    return newnode;
                }
            } else {
                if (current.getI() > i) {
                    let newnode = new Node(i, -1, this._months[i]);
                    newnode.setDown(current);
                    newnode.setUp(current.getUp());
                    current.getUp().setDown(newnode);
                    current.setUp(newnode);
                    return newnode;
                }
                return current;
            }
        }
    }
    _findCol(j) {
        var current = this._root;
        while (true) {
            if (current.getJ() < j) {
                if (current.getNext() != null) {
                    current = current.getNext();
                } else {
                    let newnode = new Node(-1, j, `${j}`);
                    newnode.setPrev(current);
                    current.setNext(newnode);
                    return newnode;
                }
            } else {
                if (current.getJ() > j) {
                    let newnode = new Node(-1, j, `${j}`);
                    newnode.setNext(current);
                    newnode.setPrev(current.getPrev());
                    current.getPrev().setNext(newnode);
                    current.setPrev(newnode);
                    return newnode;
                }
                return current;
            }
        }
    }
    _addOnRow(newnode, head) {
        let current = head;
        while (true) {
            if (current.getJ() < newnode.getJ()) {
                if (current.getNext() == null) {
                    newnode.setPrev(current);
                    current.setNext(newnode);
                    return newnode
                }
                current = current.getNext();
            } else {
                if (current.getJ() > newnode.getJ()) {
                    newnode.setNext(current);
                    newnode.setPrev(current.getPrev());
                    current.getPrev().setNext(newnode);
                    current.setPrev(newnode);
                    return newnode;
                }
                current.setValue(newnode.getValue());
                return current;
            }
        }
    }
    _addOnCol(newnode, head) {
        let current = head;
        while (true) {
            if (current.getI() < newnode.getI()) {
                if (current.getDown() == null) {
                    newnode.setUp(current);
                    current.setDown(newnode);
                    return newnode
                }
                current = current.getDown();
            } else {
                if (current.getI() > newnode.getI()) {
                    newnode.setDown(current);
                    newnode.setUp(current.getUp());
                    current.getUp().setDown(newnode);
                    current.setUp(newnode);
                    return newnode;
                }
                current.setValue(newnode.getValue());
                return current;
            }
        }
    }
    /**
     * Agrega un valor o reemplaza el valor previo en la forma (mes, dia)
     * @param {*} month 
     * @param {*} day 
     * @param {*} song 
     */
    add(month, day, song) {
        day = parseInt(day);
        let i = this._monthToNumber(month.toLowerCase());
        let col = this._findCol(day);
        let row = this._findRow(i);
        let newnode = new Node(i, day, song);
        newnode = this._addOnCol(newnode, col);
        newnode = this._addOnRow(newnode, row);
    }
    /**
     * Obtiene la canción programada en la forma (mes, día) si existe
     * @param {*} month 
     * @param {*} day 
     * @returns 
     */
    get(month, day) {
        let i = this._monthToNumber(month.toLowerCase());
        let current = this._root;
        while (current != null) {
            if (current.getI() == i) {
                let aux = current;
                while (aux != null) {
                    if (aux.getJ() == parseInt(day)) {
                        return aux.getValue();
                    }
                    aux = aux.getNext();
                }
            }
            current = current.getDown();
        }
        return null;
    }
    toGraphCalendar(nameGraph) {
        let g = "digraph g{"
        g += "\n\tnode [shape = box];"
        let current = this._root;
        let aux = current;
        //CREANDO LOS NODOS
        while (current != null) {
            aux = current;
            while (aux != null) {
                g += `\n\tnode[shape = box label = "${aux}"]"${aux.getI()}${aux.getJ()}"`;
                aux = aux.getNext();
            }
            current = current.getDown();
        }
        //ENLAZANDO NODOS
        current = this._root;
        while (current != null) {
            aux = current;
            while (aux != null) {
                if (aux.getNext() != null) {
                    g += `\n\t"${aux.getI()}${aux.getJ()}"->"${aux.getNext().getI()}${aux.getNext().getJ()}";`;
                }
                if (aux.getPrev() != null) {
                    g += `\n\t"${aux.getI()}${aux.getJ()}"->"${aux.getPrev().getI()}${aux.getPrev().getJ()}";`;
                }
                if (aux.getUp() != null) {
                    g += `\n\t"${aux.getI()}${aux.getJ()}"->"${aux.getUp().getI()}${aux.getUp().getJ()}";`;
                }
                if (aux.getDown() != null) {
                    g += `\n\t"${aux.getI()}${aux.getJ()}"->"${aux.getDown().getI()}${aux.getDown().getJ()}";`;
                }
                aux = aux.getNext();
            }
            current = current.getDown();
        }
        //asignando rangos
        current = this._root;
        while (current != null) {
            aux = current;
            g += `\n\t{rank = same; `;
            while (aux != null) {
                g += `"${aux.getI()}${aux.getJ()}";`
                aux = aux.getNext();
            }
            g += "}";
            current = current.getDown();
        }
        g += `\n\tlabel = "${nameGraph}"`;
        g += "\n}"
        return g;
    }
    _monthToNumber(month) {
        if (month == "enero" || month == "january") {
            return 0;
        } else if (month == "febrero" || month == "february") {
            return 1;
        } else if (month == "marzo" || month == "march") {
            return 2;
        } else if (month == "abril" || month == "april") {
            return 3;
        } else if (month == "mayo" || month == "may") {
            return 4;
        } else if (month == "junio" || month == "june") {
            return 5;
        } else if (month == "julio" || month == "july") {
            return 6;
        } else if (month == "agosto" || month == "august") {
            return 7;
        } else if (month == "septiembre" || month == "september") {
            return 8;
        } else if (month == "octubre" || month == "october") {
            return 9;
        } else if (month == "noviembre" || month == "november") {
            return 10;
        } else {
            return 11
        }
    }
} export default SparceMatrix;