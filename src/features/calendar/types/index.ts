export interface IClassTime {
    name: string;
    timeStart: string;
    timeEnd: string;
}

export interface IStudentClass {
    fullName: string;
    kyu: number;
    status: boolean;
}

export interface IClass {
    group: string;
    teacher: string;
    start: string;
    end: string;
    students: IStudentClass[];
}
