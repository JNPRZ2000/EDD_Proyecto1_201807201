import Artist from "../modelos/Artist.js"
import Song from "../modelos/Song.js"
class NodeA {
    constructor(artist) {
        this._artist = artist;
        this._up = null;
        this._down = null;
        this._rigth = null;
    }
    getArtist() {
        return this._artist;
    }
    getUp() {
        return this._up;
    }
    getDown() {
        return this._down;
    }
    getRight() {
        return this._rigth;
    }
    setArtist(artist) {
        if (artist instanceof Artist) {
            this._artist = artist;
        }
    }
    setUp(up) {
        this._up = up;
    }
    setDown(down) {
        this._down = down;
    }
    setRight(right) {
        this._rigth = right;
    }
}
class NodeS {
    constructor(song) {
        this._song = song;
        this._next = null;
        this._prev = null;
    }
    getSong() {
        return this._song;
    }
    getNext() {
        return this._next;
    }
    getPrev() {
        return this._prev;
    }
    setSong(song) {
        if (song instanceof Song) {
            this._song = song;
        }
    }
    setNext(next) {
        this._next = next;
    }
    setPrev(prev) {
        this._prev = prev;
    }
}
class ArtistStruct {
    constructor() {
        this._root = null;
        this._last = null;
    }
    addArtist(artist) {
        if (artist instanceof Artist) {
            let newArtist = new NodeA(artist);
            if (this._root == null) {
                this._root = this._last = newArtist;
                this._root.setDown(this._last);
                this._last.setUp(this._root);
            } else {
                newArtist.setUp(this._last);
                this._last.setDown(newArtist);
                this._last = newArtist;
            }
        }
        else {
            console.log("NO ES ARTISTA")
        }
    }
    addSong(nameA, song) {
        let currentA = this._root;
        while (currentA != null) {
            if (currentA.getArtist() instanceof Artist) {
                if (currentA.getArtist().getName() == nameA) {
                    let newSong = new NodeS(song);
                    if (currentA.getRight() == null) {
                        currentA.setRight(newSong);
                        newSong.setPrev(currentA);
                    } else {
                        let cs = currentA.getRight();
                        while (cs.getNext() != null) {
                            cs = cs.getNext();
                        }
                        cs.setNext(newSong)
                        newSong.setPrev(cs);
                    }
                    return;
                }
            }
            currentA = currentA.getDown();
        }
    }
    getSong(nameA, nameS) {
        let currentA = this._root;
        while (currentA != null) {
            if (currentA.getArtist().getName() == nameA) {
                let currentS = currentA.getRight();
                while (currentS != null) {
                    if (currentS.getSong().getName() == nameS) {
                        return currentS.getSong();
                    }
                    currentS = currentS.getNext();
                }
            }
            currentA = currentA.getDown();
        }
        return null;
    }
    *iter() {
        let currentA = this._root;
        let currentS = null;
        while (currentA != null) {
            currentS = currentA.getRight();
            while (currentS != null) {
                yield currentS.getSong();
                currentS = currentS.getNext();
            }
            currentA = currentA.getDown();
        }
    }
    toGraph(nameGraph) {
        let graph = `\n\tsubgraph ${nameGraph}{`;
        graph += "\n\t\tstyle=filled;";
        graph += "\n\t\tcolor=lightgrey;";
        graph += "\n\t\tfillcolor=\"blue:yellow\";";
        graph += "\n\t\tgradientangle=90;";
        var currentA = this._root;
        var currentS = currentA.getRight();
        //creando los nodos
        while (currentA != null) {
            graph += `\n\t\tnode[shape = box label = "${currentA.getArtist()}"]"${currentA.getArtist().getName()}";`;
            currentS = currentA.getRight();
            while (currentS != null) {
                graph += `\n\t\tnode[shape = box label = "${currentS.getSong()}"]"${currentS.getSong().getName()}";`;
                currentS = currentS.getNext();
            }
            currentA = currentA.getDown();
        }
        //enlazando
        currentA = this._root;
        currentS = null;
        while (currentA != null) {
            if (currentA.getDown() != null) {
                graph += `\n\t\t"${currentA.getArtist().getName()}"->"${currentA.getDown().getArtist().getName()}";`;
            }
            if (currentA.getUp() != null) {
                graph += `\n\t\t"${currentA.getArtist().getName()}"->"${currentA.getUp().getArtist().getName()}";`;
            }
            currentS = currentA.getRight();
            if (currentS != null) {
                graph += `\n\t\t"${currentA.getArtist().getName()}"->"${currentS.getSong().getName()}";`;
            }
            while (currentS != null) {
                if (currentS.getPrev() instanceof NodeS) {
                    graph += `\n\t\t"${currentS.getSong().getName()}"->"${currentS.getPrev().getSong().getName()}";`;
                } else {
                    graph += `\n\t\t"${currentS.getSong().getName()}"->"${currentS.getPrev().getArtist().getName()}";`;
                }
                if (currentS.getNext() != null) {
                    graph += `\n\t\t"${currentS.getSong().getName()}"->"${currentS.getNext().getSong().getName()}";`;
                }
                currentS = currentS.getNext();
            }
            currentA = currentA.getDown();
        }
        //rangos
        currentA = this._root;
        currentS = null;
        while (currentA != null) {
            graph += `{rank = same; ${currentA.getArtist().getName()}; `;
            currentS = currentA.getRight();
            while (currentS != null) {
                graph += `${currentS.getSong().getName()}; `;
                currentS = currentS.getNext();
            }
            graph += "}\n";
            currentA = currentA.getDown();
        }
        graph += `\n\t\tlabel = "${nameGraph}";\n\t}`;
        console.log(graph);
        return graph;
    }
}
export default ArtistStruct;