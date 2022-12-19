class Artist {
    constructor(name, age, country) {
        this._name = name;
        this._age = parseInt(age);
        this._country = country;
    }
    getName() {
        return this._name;
    }
    getAge() {
        return this._age;
    }
    getCountry() {
        return this._country;
    }
    toString() {
        return `Nombre: ${this._name}\nEdad: ${this._age}\nPais: ${this._country}`;
    }
} export default Artist;