from ObjNode import ObjNode as Node


class Cola:
    def __init__(self) -> None:
        self._inicio: Node = None
        self._fin: Node = None
        self._size = 0

    def esVacia(self) -> bool:
        if (self._inicio == None):
            return True
        return False

    def agregar(self, valor):
        nuevo = Node(valor)
        if (self._inicio == None):
            self._inicio = self._fin = nuevo
            self._inicio.setSiguiente(self._fin)
            self._fin.setAnterior(self._inicio)
        else:
            nuevo.setAnterior(self._fin)
            self._fin.setSiguiente(nuevo)
            self._fin = nuevo
        self._size += 1

    def eliminar(self):
        if (self._inicio != None):
            self._inicio = self._inicio.getSiguiente()
            if (self._inicio != None):
                self._inicio.setAnterior(None)
            self._size -= 1

    def primero(self):
        '''RETORNA EL PRIMER ELEMENTO DE LA COLA(EL QUE ESTÁ MÁS PRÓXIMO A SALIR DE LA COLA)'''
        if self._inicio != None:
            return self._inicio.getValor()
        return None

    def ultimo(self):
        '''RETORNA EL ULTIMO VALOR AGREGADO A LA COLA'''
        if self._fin != None:
            return self._fin.getValor()
        return None

    def size(self):
        return self._size

    def iter(self):
        actual = self._inicio
        while (actual != None):
            yield actual.getValor()
            actual = actual.getSiguiente()
