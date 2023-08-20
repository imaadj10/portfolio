class StellarObject {
    public page_name: string;
    public size: number;
    public model: string;
    public scale: number;
    public orbiters: StellarObject[];

    public constructor(page_name: string, size: number, model: string, scale: number = 1, orbiters: StellarObject[]) {
        this.page_name = page_name;
        this.size = size;
        this.model = model;
        this.scale = scale;
        this.orbiters = orbiters;
    }
}

export default StellarObject;