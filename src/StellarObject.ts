class StellarObject {
    public size: number;
    public orbiters: StellarObject[];

    public constructor(size: number, orbiters: StellarObject[]) {
        this.size = size;
        this.orbiters = orbiters;
    }
}

export default StellarObject;