export interface Annotation {
    id: number;
    domain: number;
    url: string;
    group: number;
    classes: string[];
}

export interface AnnotationLoadRequest {
    group: number;
    start: number;
    rows: number;
}