class StellarObject {
    public orbiters: StellarObject[];

    public constructor(orbiters: StellarObject[]) {
        this.orbiters = orbiters
    }
}

export default StellarObject;