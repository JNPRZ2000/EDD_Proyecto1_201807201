from ListaDobleEnlazada import ListaDobleEnlazada as Lista
from Pila import Pila
from Cola import Cola
from utils import XMLParser
from SparceMatrix import SparceMatrix


def main():
    """
    lista = Lista()
    lista.insertar(1)
    lista.insertar(2)
    lista.insertar(3)
    lista.insertar(4)
    lista.insertar(5)
    lista.insertar(6)
    for element in lista.iter():
        print(element)"""

    """pila = Pila()
    pila.apilar(1)
    pila.apilar(2)
    pila.apilar(3)
    pila.apilar(4)
    pila.apilar(5)
    pila.apilar(6)
    for i in pila.iter():
        print(i)
    print("DESAPILANDO: {}".format(pila.desapilar()))
    print("TOPE: {}".format(pila.tope()))
    pila.apilar(10)
    print("TOPE: {}".format(pila.tope()))
    for i in pila.iter():
        print(i)"""
    """cola = Cola()
    cola.agregar(0)
    cola.agregar(1)
    cola.agregar(2)
    cola.agregar(3)
    cola.agregar(4)
    cola.agregar(5)
    cola.agregar(6)
    for i in cola.iter():
        print(i)
    cola.eliminar()
    cola.eliminar()
    cola.eliminar()
    cola.eliminar()
    cola.eliminar()
    cola.eliminar()
    cola.eliminar()
    print("delete")
    for i in cola.iter():
        print(i)
    cola.agregar("a")
    cola.agregar("b")
    cola.agregar("c")
    for i in cola.iter():
        print(i)"""
    #parser = XMLParser("pyTDA\entrada.xml")
    # parser.parse()
    sparce = SparceMatrix()
    for i in range(0, 3):
        for j in range(0, 3):
            if ((i+j) % 2 == 0):
                sparce.agregar(i, j, "{}".format("v"))
            else:
                sparce.agregar(i, j, "{}".format("a"))
    print(sparce)
    print("\nPRUEBA:\n{}".format(sparce.toGraph("prueba")))


if __name__ == "__main__":
    main()
