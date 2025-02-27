export class DisciplineDTO {
    public cod: string;
    public name: string;
    public teacher: string;
    public id?: number | undefined;

    constructor(cod: string, name: string, teacher: string, id?: number) {
        if(id) {
            this.id = id;
        }
        this.cod = cod;
        this.name = name;
        this.teacher = teacher;
    }
}