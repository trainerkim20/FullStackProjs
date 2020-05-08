export class Document {
    public id: number;
    public name: string;
    public description: string;
    public url: string;
    public children: Document[];
    
    constructor(id: number, name: string, description: string, url: string, children: Document[]) {
        this.name = name;
        this.id = id;
        this.url = url;
        this.description = description;
        this.children = children;
    }

}