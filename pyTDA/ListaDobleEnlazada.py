from ObjNode import ObjNode as Node


class ListaDobleEnlazada:
    def __init__(self):
        self._size = 0
        self._raiz: Node = None
        self._fin: Node = None

    def insertar(self, valor):
        nuevo = Node(valor)
        if (self._raiz == None):
            self._raiz = self._fin = nuevo
            self._raiz.setSiguiente(self._fin)
            self._fin.setAnterior(self._raiz)
        else:
            nuevo.setAnterior(self._fin)
            self._fin.setSiguiente(nuevo)
            self._fin = nuevo
        self._size += 1

    def insertarEn(self, i, valor):
        '''Se agrega el elemento en la posición (i)
        Si esta posición no existe, se agrega al final'''
        if (self._raiz == None or i < 0 or i >= self._size):
            self.insertar(valor)
            print("fffff")
        else:
            if (i == 0):
                nuevo = Node(valor)
                nuevo.setSiguiente(self._raiz)
                self._raiz.setAnterior(nuevo)
                self._raiz = nuevo
            else:
                actual = self._raiz
                cont = 0
                while (cont != i):
                    actual = actual.getSiguiente()
                    cont += 1
                nuevo = Node(valor)
                nuevo.setAnterior(actual.getAnterior())
                actual.getAnterior().setSiguiente(nuevo)
                actual.setAnterior(nuevo)
                nuevo.setSiguiente(actual)
            self._size += 1

    def eliminar(self):
        '''Elimina el Último valor de la lista'''
        if (self._fin != None):
            if (self._fin == self._raiz):
                self._fin = self._raiz = None
            else:
                self._fin = self._fin.getAnterior()
                self._fin.setSiguiente(None)
            self._size -= 1

    def eliminarEn(self, i):
        '''Se elimina el elemento en la posición (i)
        Si esta posición no existe, se elimina el ultimo'''
        if (self._raiz == None or i < 0 or i >= self._size):
            self.eliminar()
            print("fffff")
        else:
            if (i == 0):
                self._raiz = self._raiz.getSiguiente()
                if (self._raiz != None):
                    self._raiz.setAnterior(None)
            else:
                actual = self._raiz
                cont = 0
                while (cont != i):
                    actual = actual.getSiguiente()
                    cont += 1
                if (actual == self._fin):
                    self._fin = self._fin.getAnterior()
                    self._fin.setSiguiente(None)
                else:
                    if (actual.getSiguiente() != None):
                        actual.getSiguiente().setAnterior(actual.getAnterior())
                    if (actual.getAnterior() != None):
                        actual.getAnterior().setSiguiente(actual.getSiguiente())
            self._size -= 1

    def obtener(self, i: int):
        '''Devuelve el valor en la posición (i), si esta posición no existe se imprimirá un error'''
        if (i < 0 or i >= self._size):
            print("<<<LISTADOBLEENLAZADA: INDEX OUT OF BOUNDS>>>")
        else:
            actual = self._raiz
            cont = 0
            while (cont != i):
                actual = actual.getSiguiente()
                cont += 1
            return actual.getValor()

    def size(self) -> int:
        return self._size

    def iter(self):
        actual = self._raiz
        while (actual != None):
            yield actual.getValor()
            actual = actual.getSiguiente()
