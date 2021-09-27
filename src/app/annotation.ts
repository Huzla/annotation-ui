export interface Annotation {
    id: number;
    domain: number;
    url: string;
    group: number;
    classes: string[];
}

export type GroupedAnnotations = Array<Annotation[]>