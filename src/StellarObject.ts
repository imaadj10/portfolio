class StellarObject {
    public model: string;
    public scale?: number;
    public orbiters: StellarObject[];

    public constructor(model: string, scale: number = 1, orbiters: StellarObject[]) {
        this.model = model;
        this.scale = scale;
        this.orbiters = orbiters;
    }
}

export default StellarObject;