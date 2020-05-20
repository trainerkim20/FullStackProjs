import { Ingredinet } from '../shared/ingredient.model';

export class Recipe {
    public name: string;
    public description: string;
    public imagePath: string;
    public ingredients: Ingredinet[];

    constructor(name: string, desc: string, imagePath: string, ingredients: Ingredinet[]) {
        this.name = name;
        this.description = desc;
        this.imagePath = imagePath;
        this.ingredients = ingredients;

    }
}
