from Cola import Cola
from Queue import Queue
from Pila import Pila


def rowMajor2D():
    m = [[1, 10, 100], [20, 2, 200], [300, 30, 3]]
    a = [None]*9
    for i in range(len(m)):
        for j in range(len(m[i])):
            #print("|{}|".format(m[i][j]), end="")
            a[i*3+j] = m[i][j]
        # print("\n")
    for i in range(len(a)):
        print(a[i])


def colMajor2D():
    m = [[0, 1, 2, 3], [4, 5, 6, 7], [8, 9, 10, 11], [12, 13, 14, 15]]
    a = [None]*16
    for i in range(len(m)):
        for j in range(len(m[i])):
            a[i+j*4] = m[i][j]
    for i in range(len(a)):
        print(a[i])


def rowMajor3D():
    m = [[[0, 4], [1, 5]], [[2, 6], [3, 7]]]
    a = [None]*8
    for i in range(len(m)):
        for j in range(len(m[i])):
            for k in range(len(m[i][j])):
                a[k+2*(j+2*i)] = m[i][j][k]
    for i in range(len(a)):
        print(a[i])


def colMajor3D():
    m = [[[0, 4], [1, 5]], [[2, 6], [3, 7]]]
    a = [None]*8
    for i in range(len(m)):
        for j in range(len(m[i])):
            for k in range(len(m[i][j])):
                a[i+2*(j+2*k)] = m[i][j][k]
    for i in range(len(a)):
        print(a[i])


def r1(a, b):
    if (a != 0):
        return b+r1(a-1, b-1)
    return 0


def r2(a, b):
    if (a != 0):
        return b+r2(a-1, b)+r2(a-1, b)
    return 0


def tema1(a, b, iteraciones):
    print("Iteraciones: {}".format(iteraciones))
    cola = Queue()
    # se agrega
    for i in range(a+1):
        cola.encolar(i)
        print("i: {}".format(i))
    actual = int()
    while (cola.isEmpty() != True):
        actual = cola.primero()
        print("actual: {}".format(actual))
        cola.desencolar()
        if (actual == b):
            print("Iteraciones: {}".format(iteraciones))
            return actual
    tema1(actual-1, b, iteraciones + 1)
    tema1(actual+1, b, iteraciones + 1)


def tema1pila(a, b, iteraciones):
    pila = Pila()
    for i in range(a+1):
        pila.apilar(i)
        print("i: {}".format(i))
    actual = int()
    while (pila.esVacia() != True):
        actual = pila.desapilar()
        if (actual == b):
            print("Iteraciones: {}".format(iteraciones))
            return actual

    tema1pila(actual-1, b, iteraciones + 1)
    tema1pila(actual+1, b, iteraciones + 1)


def ks(k, lista: list()):
    dias = lista
    i = 0
    while (k >= 0):
        k = k-dias[i]
        i += 1
        if (i == 6):
            i = 0
    print("I: {} K: {}".format(i, k))


def ord_burbuja(arreglo, inii, inij):
    n = len(arreglo)

    for i in range(inii, n-1):       # <-- bucle padre
        for j in range(inij, n-1-i):  # <-- bucle hijo
            if arreglo[j] > arreglo[j+1]:
                arreglo[j], arreglo[j+1] = arreglo[j+1], arreglo[j]


if __name__ == "__main__":
    #a = r2(1, 0)
    # print(a)
    #tema_1 = tema1(2,2,0)
    #b = r1(4, 3)
    #print("b: {}".format(b))
    #tema1pil = tema1(2, 5, 0)
    #print("cola: {}".format(tema1pil))
    ks(865583003, [39, 33, 43, 23, 28, 36, 38])
    #elementos = [17, 10, 12, 7, 11]
    #ord_burbuja(elementos, 1, 4)
    # print(elementos)
