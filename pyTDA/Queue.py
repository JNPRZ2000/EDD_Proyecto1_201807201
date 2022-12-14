from ObjNode import ObjNode


class Queue:
    def __init__(self) -> None:
        self.head = None
        self.last = None

    def encolar(self, value):
        nuevo = ObjNode(value)
        if self.head == None:
            self.head = self.last = nuevo
            self.head.setSiguiente(self.last)
            self.last.setAnterior(self.head)
        else:
            nuevo.setSiguiente(self.head)
            self.head.setAnterior(nuevo)
            self.head = nuevo

    def desencolar(self):
        if (self.last != None):
            self.last = self.last.getAnterior()
            if (self.last != None):
                self.last.setSiguiente(None)
        if (self.last == self.head):
            self.last = self.head = None

    def primero(self):
        if self.last != None:
            return self.last.getValor()
        return None

    def isEmpty(self):
        if self.last == None:
            return True
        return False
