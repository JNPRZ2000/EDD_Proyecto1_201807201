"use strict";
class Nodo {
    constructor(valor) {
        this.valor = valor;
        this.arriba = null;
        this.abajo = null;
    }
}
class Pila {
    constructor() {
        this.fondo = null;
        this.tope = null;
        this.size = 0;
    }
    apilar(valor) {
        let nuevo = new Nodo(valor);
        if (this.tope == null) {
            this.tope = this.fondo = nuevo;
            this.tope.abajo = this.fondo;
            this.fondo.arriba = this.tope;
        } else {
            nuevo.abajo = this.tope;
            this.tope.arriba = nuevo;
            this.tope = nuevo;
        }
        this.size += 1;
    }
    desapilar() {
        if (this.tope != null) {
            const valu = this.tope.valor;
            this.tope = this.tope.abajo
            if (this.tope != null)
                this.tope.arriba = null;
            return valu;
        }
        return null;
    }
    *iter() {
        let actual = this.tope;
        while (actual != null) {
            yield actual.valor;
            actual = actual.abajo;
        }
    }

} export default Pila;