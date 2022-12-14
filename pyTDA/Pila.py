from ObjNode import ObjNode as Node


class Pila:
    def __init__(self):
        self._inicio = None
        self._fin = None
        self._size = 0

    def apilar(self, valor):
        nuevo = Node(valor)
        if (self._inicio == None):
            self._inicio = self._fin = nuevo
            self._inicio.setSiguiente(self._fin)
            self._fin.setAnterior(self._inicio)
        else:
            self._fin.setSiguiente(nuevo)
            nuevo.setAnterior(self._fin)
            self._fin = nuevo
        self._size += 1

    def desapilar(self):
        if (self._inicio != None):
            if (self._fin == self._inicio):
                copia = self._fin.getValor()
                self._inicio = self._fin = None
                self._size -= 1
                return copia
            else:
                copia = self._fin.getValor()
                self._fin = self._fin.getAnterior()
                self._fin.setSiguiente(None)
                self._size -= 1
                return copia
        return None

    def tope(self):
        if (self._fin != None):
            return self._fin.getValor()
        return None

    def esVacia(self) -> bool:
        if (self._inicio == None):
            return True
        return False

    def size(self):
        return self._size

    def iter(self):
        actual = self._fin
        if (actual != None):
            while (True):
                yield actual.getValor()
                if (actual == self._inicio):
                    break
                actual = actual.getAnterior()
