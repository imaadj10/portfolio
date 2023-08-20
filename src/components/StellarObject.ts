class StellarObject {
    public size: number;
    public model: string;
    public scale: number;
    public orbiters: StellarObject[];

    public constructor(size: number, model: string, scale: number = 1, orbiters: StellarObject[]) {
        this.size = size;
        this.model = model;
        this.scale = scale;
        this.orbiters = orbiters;
    }
}

export default StellarObject;