import Podcast from "../modelos/Podcast.js"
class Nodo {
    constructor(valor) {
        this.valor = valor;
        this.izquierda = null;
        this.derecha = null;
        this.altura = 0;
    }
    getValor() {
        return this.valor;
    }

    getIzquierda() {
        return this.izquierda;
    }

    getDerecha() {
        return this.derecha;
    }
    getAltura() {
        return this.altura;
    }

    setValor(valor) {
        this.valor = valor;
    }
    setIzquierda(izquierda) {
        this.izquierda = izquierda;
    }
    setDerecha(derecha) {
        this.derecha = derecha;
    }

    setAltura(altura) {
        this.altura = altura;
    }

    toString() {
        return `${this.valor}`;
    }
}
class BSTree {

    constructor() {
        this.raiz = null;
    }
    insertar(podcast) {
        if (podcast instanceof Podcast) {
            let nuevo = new Nodo(podcast);
            if (this.raiz == null) {
                this.raiz = nuevo;
            } else {
                let actual = this.raiz;
                let previo = null;
                while (actual != null) {
                    previo = actual;
                    if (podcast.getName().localeCompare(actual.getValor().getName()) < 0) {
                        actual = actual.getIzquierda();
                    } else {
                        actual = actual.getDerecha();
                    }
                }
                if (podcast.getName().localeCompare(previo.getValor().getName()) < 0) {
                    previo.setIzquierda(nuevo);
                } else {
                    previo.setDerecha(nuevo);
                }
            }
        }
    }

    Buscar(valor) {
        return this.Buscar(valor, this.raiz);
    }

    BuscarI(valor, nodo) {
        if (nodo == null) {
            return null;
        }
        if (nodo.getValor().getName() == valor) {
            return nodo.getValor();
        } else if (nodo.getValor() < valor) {
            return this.BuscarI(valor, nodo.getIzquierda());
        } else {
            return this.BuscarI(valor, nodo.getDerecha());
        }
    }

    inorder() {
        this.inorderI(this.raiz);
    }

    preorder() {
        this.preorderI(this.raiz);
    }

    posorder() {
        this.posorderI(this.raiz);
    }

    inorderI(nodo) {
        if (nodo != null) {
            this.inorderI(nodo.getIzquierda());
            console.log(`${nodo},`);
            this.inorderI(nodo.getDerecha());
        }
    }

    preorderI(nodo) {
        if (nodo != null) {
            console.log(`${nodo},`);
            this.preorderI(nodo.getIzquierda());
            this.preorderI(nodo.getDerecha());
        }
    }

    posorderI(nodo) {
        if (nodo != null) {
            this.posorderI(nodo.getIzquierda());
            this.posorderI(nodo.getDerecha());
            console.log(`${nodo},`);
        }
    }

    getRaiz() {
        return raiz;
    }

    toDotI(nodo) {
        let s = "";
        if (nodo.getIzquierda() != null) {
            s += `\n\t"${nodo.getValor()}":sw->"${nodo.getIzquierda().getValor()}";`;
            s += this.toDotI(nodo.getIzquierda());
        }
        if (nodo.getDerecha() != null) {
            s += `\n\t"${nodo.getValor()}":se->"${nodo.getDerecha().getValor()}";`;
            s += this.toDotI(nodo.getDerecha());
        }
        return s;
    }

    toGraph(name, tipo) {
        let g = "digraph " + name + "{";
        g += "\n\tsplines=false;";
        g += this.toDotI(this.raiz);
        g += "\n\tlabel = \"Árbol " + tipo + ": " + name + "\";";
        g += "\n}";
        return g;

    }
}
export default BSTree;