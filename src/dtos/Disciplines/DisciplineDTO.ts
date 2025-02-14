export class DisciplineDTO {
    public cod: string;
    public name: string;
    public teacher: string;

    constructor(cod: string, name: string, teacher: string) {
        this.cod = cod;
        this.name = name;
        this.teacher = teacher;
    }
}