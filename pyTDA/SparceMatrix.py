from ObjNode import ObjNode


class Node(ObjNode):
    def __init__(self, i: int, j: int, valor):
        super().__init__(valor)
        self._arriba: Node = None
        self._abajo: Node = None
        self._i = i
        self._j = j

    def getArriba(self):
        return self._arriba

    def getAbajo(self):
        return self._abajo

    def setArriba(self, arriba):
        self._arriba = arriba

    def setAbajo(self, abajo):
        self._abajo = abajo

    def getI(self):
        return self._i

    def getJ(self):
        return self._j

    def setI(self, i):
        self._i = i

    def setJ(self, j):
        self._j = j


class SparceMatrix:
    def __init__(self) -> None:
        self._raiz: Node = Node(-1, -1, "ROOT")
        self._sizeI = 0
        self.sizeJ = 0

    def _encontrarFila(self, i) -> Node:
        actual = self._raiz
        while (True):
            if (actual.getI() < i):
                if (actual.getAbajo() != None):
                    actual = actual.getAbajo()
                else:
                    nuevo = Node(i, -1, "F")
                    nuevo.setArriba(actual)
                    actual.setAbajo(nuevo)
                    return nuevo
            else:
                if (actual.getI() > i):
                    nuevo = Node(i, -1, "F")
                    nuevo.setAbajo(actual)
                    nuevo.setArriba(actual.getArriba())
                    actual.getArriba().setAbajo(nuevo)
                    actual.setArriba(nuevo)
                    return nuevo
                return actual

    def _encontrarColumna(self, j) -> Node:
        actual = self._raiz
        while (True):
            if (actual.getJ() < j):
                if (actual.getSiguiente() != None):
                    actual = actual.getSiguiente()
                else:
                    nuevo = Node(-1, j, "C")
                    nuevo.setAnterior(actual)
                    actual.setSiguiente(nuevo)
                    return nuevo
            else:
                if (actual.getJ() > j):
                    nuevo = Node(-1, j, "C")
                    nuevo.setSiguiente(actual)
                    nuevo.setAnterior(actual.getAnterior())
                    actual.getAnterior().setSiguiente(nuevo)
                    actual.setAnterior(nuevo)
                    return nuevo
                return actual

    def _agregarEnFila(self, nuevo: Node, head: Node) -> Node:
        actual = head
        while (True):
            if (actual.getJ() < nuevo.getJ()):
                if (actual.getSiguiente() == None):
                    nuevo.setAnterior(actual)
                    actual.setSiguiente(nuevo)
                    return nuevo
                actual = actual.getSiguiente()
            else:
                if (actual.getJ() > nuevo.getJ()):
                    nuevo.setSiguiente(actual)
                    nuevo.setAnterior(actual.getAnterior())
                    actual.getAnterior().setSiguiente(nuevo)
                    actual.setAnterior(nuevo)
                    return nuevo
                actual.setValor(nuevo.getValor())
                return actual

    def _agregarEnColumna(self, nuevo: Node, head: Node) -> Node:
        actual = head
        while (True):
            if (actual.getI() < nuevo.getI()):
                if (actual.getAbajo() == None):
                    nuevo.setArriba(actual)
                    actual.setAbajo(nuevo)
                    return nuevo
                actual = actual.getAbajo()
            else:
                if (actual.getI() > nuevo.getI()):
                    nuevo.setAbajo(actual)
                    nuevo.setArriba(actual.getArriba())
                    actual.getArriba().setAbajo(nuevo)
                    actual.setArriba(nuevo)
                    return nuevo
                actual.setValor(nuevo.getValor())
                return actual

    def agregar(self,  i: int, j: int, valor: any) -> None:
        '''AGREGA UN ELEMENTO EN LAS COORDENADAS (i,j) SI ESTA COORDENADA YA EXISTE
        ENTONCES REEMPLAZA EL VALOR ANTERIOR POR EL NUEVO'''
        col = self._encontrarColumna(j)
        row = self._encontrarFila(i)
        nuevo = Node(i, j, valor)
        nuevo = self._agregarEnColumna(nuevo, col)
        nuevo = self._agregarEnFila(nuevo, row)

    def obtener(self, i: int, j: int) -> any:
        '''OBTIENE EL VALOR EN LAS COORDENADAS (i,j) SI EXISTE'''
        actual = self._raiz
        aux: Node = actual
        while (actual != None):
            aux = actual
            while (aux != None):
                if (aux.getI() == i and aux.getJ() == j):
                    return aux.getValor()
                aux = aux.getSiguiente()
            actual = actual.getAbajo()

    def toGraph(self, subg: str) -> str:
        '''RETORNA EL SUBGRAFO CORRESPONDIENTE A LA MATRIZ'''
        g = "subgraph {"
        g += "\n\tnode [shape = box];"
        actual = self._raiz
        aux: Node = actual
        # CONSTRUCCION DE LOS NODOS DE LA MATRIZ
        while (actual != None):
            aux = actual
            while (aux != None):
                g += "\n\t\"{}{},{}\" [label = \"{},{}".format(
                    subg, aux.getI(), aux.getJ(), aux.getI(), aux.getJ())
                c = aux.getValor()  # SUGIERO QUE EN EL VALOR QUE ALMACENES EN LOS NODOS DE LA MATRIZ SEA EL COLOR DEL ELEMENTO DE LA TABLA, PARA QUE SEA FACIL PINTAR EN GRAPHVIZ
                # aca tambien continua la estructuración del label
                if (c == "v"):
                    g += "\" style = filled group = {} fillcolor = blue];".format(
                        aux.getI()+2)
                else:
                    g += "\" style = filled group = {} fillcolor = red];".format(
                        aux.getI()+2)
                aux = aux.getSiguiente()
            actual = actual.getAbajo()
        # ENLAZANDO NODOS HORIZONTALMENTE
        actual = self._raiz
        while (actual != None):
            aux = actual
            while (aux != None):
                if aux.getSiguiente() != None:
                    g += "\n\t\"{}{},{}\"->\"{}{},{}\";".format(subg, aux.getI(), aux.getJ(
                    ), subg, aux.getSiguiente().getI(), aux.getSiguiente().getJ())
                if aux.getAnterior() != None:
                    g += "\n\t\"{}{},{}\"->\"{}{},{}\";".format(subg, aux.getI(
                    ), aux.getJ(), subg, aux.getAnterior().getI(), aux.getAnterior().getJ())
                aux = aux.getSiguiente()
            actual = actual.getAbajo()
        # ENLAZANDO NODOS VERTICALMENTE
        actual = self._raiz
        while (actual != None):
            aux = actual
            while (aux != None):
                if (aux.getAbajo() != None):
                    g += "\n\t\"{}{},{}\"->\"{}{},{}\";".format(subg, aux.getI(
                    ), aux.getJ(), subg, aux.getAbajo().getI(), aux.getAbajo().getJ())
                if (aux.getArriba() != None):
                    g += "\n\t\"{}{},{}\"->\"{}{},{}\";".format(subg, aux.getI(
                    ), aux.getJ(), subg, aux.getArriba().getI(), aux.getArriba().getJ())
                aux = aux.getAbajo()
            actual = actual.getSiguiente()
        # IGUALANDO RANGOS HORIZONTALES
        actual = self._raiz
        while (actual != None):
            aux = actual
            g += "\n\t{rank = same; "
            while (aux != None):
                g += "\"{}{},{}\";".format(subg, aux.getI(), aux.getJ())
                aux = aux.getSiguiente()
            g += "}"
            actual = actual.getAbajo()
        g += "\n\tlabel=\"Matriz Dispersa: {}\"\n".format(subg)
        g += "}"
        return g

    def __str__(self) -> str:
        '''REPRESENTACION EN CADENA DE LA MATRIZ DISPERSA, basta con realizar print(matriz)'''
        actual = self._raiz
        aux: Node = actual
        s = "SPARCE MATRIX:"
        while (actual != None):
            aux = actual
            s += "\n"
            while (aux != None):
                if (aux.getI() == -1 or aux.getJ() == -1):
                    s += "[{},{}]".format(aux.getI(), aux.getJ())
                else:
                    s += "[{}]".format(aux.getValor())
                aux = aux.getSiguiente()
            actual = actual.getAbajo()
        return s
