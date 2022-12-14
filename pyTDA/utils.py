import xml.etree.ElementTree as ET


class XMLParser:
    def __init__(self, path: str) -> None:
        self._path = path

    def parse(self) -> None:
        root = ET.parse(self._path).getroot()
        # obteniendo jugadores
        for player in root.iter("jugador"):
            # obteniendo los datos personales del jugador y del puzzle
            for datospersonales, movimientoss, tamaños, figuras, puzzles, soluciones in zip(player.iter("datospersonales"), player.iter("movimientos"), player.iter("tamaño"), player.iter("figura"), player.iter("puzzle"), player.iter("solucion")):
                # obteniendo los datos personales
                for nombres, edades in zip(datospersonales.iter("nombre"), datospersonales.iter("edad")):
                    print("Nombre: {} --- Edad: {}".format(nombres.text, edades.text))
                # obteniendo los movimientos
                print("Movimientos: {}".format(movimientoss.text))
                # obteniendo el tamaño del tablero?
                print("Tamaño: {}".format(tamaños.text))
                # obteniendo la figura
                print("Figura: {}".format(figuras.text))
                # obteniendo las posiciones del puzzle
                print("PUZZLE:")
                for celda in puzzles.iter("celda"):
                    print("\tF: {} C: {}".format(
                        int(celda.attrib["f"]), int(celda.attrib["c"])))
                # obteniendo las posiciones de la solución
                print("SOLUCION:")
                for celda in soluciones.iter("celda"):
                    print("\tF: {} C: {}".format(
                        int(celda.attrib["f"]), int(celda.attrib["c"])))
