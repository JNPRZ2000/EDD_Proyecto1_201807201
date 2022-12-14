class ObjNode:
    def __init__(self, valor):
        self._siguiente = None
        self._anterior = None
        self._valor = valor

    def getValor(self):
        return self._valor

    def setValor(self, valor):
        self._valor = valor

    def getSiguiente(self):
        return self._siguiente

    def setSiguiente(self, siguiente):
        self._siguiente = siguiente

    def setAnterior(self, anterior):
        self._anterior = anterior

    def getAnterior(self):
        return self._anterior
