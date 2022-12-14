from Queue import Queue
from Pila import Pila


def calcular_dia():
    K = 49684146
    A = [496848, 289520, 691734, 703532, 122612, 99685, 512670]
    i = 0

    while K > 0:
        if i > 6:
            i = 0
        K = K - A[i]
        i += 1

    print(i)


def funcion_cola(a, b):
    cola = []
    cola.append(a)
    removidos = 0
    agregados = 1
    while len(cola) != 0:
        print(cola)
        act = cola.pop(0)
        removidos += 1
        if act == b:
            print("cola: ", cola)
            print("valores en cola: ", len(cola))
            print("removidos: ", removidos)
            print("agregados: ", agregados)
            return None
        else:
            cola.append(act-1)
            cola.append(act+1)
            agregados += 2


def funcion_pila(a, b):
    pila = []
    pila.append(a)
    removidos = 0
    agregados = 1
    while len(pila) != 0:
        print(pila)
        act = pila.pop()
        removidos += 1
        if act == b:
            print("cola: ", cola)
            print("valores en cola: ", len(cola))
            print("removidos: ", removidos)
            print("agregados: ", agregados)
            return None
        else:
            pila.append(act+1)
            pila.append(act-1)
            agregados += 2


def r1(a, b):
    if a != 0:
        return b+r1(a-1, b-1)
    return 0


def r2(a, b):
    if a != 0:
        return b+r2(a-1, b)+r2(a-1, b)
    return 0


if __name__ == "__main__":
    # funcion_cola(1,2)
    calcular_dia()
    pass

# funcion_cola(4,2)
# calcular_dia()
# print(r1(3,0))
