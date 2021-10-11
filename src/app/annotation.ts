export interface Annotation {
    id: number;
    domain: number;
    url: string;
    group: number;
    document: string;
    classes: string[];
}

export interface AnnotationLoadRequest {
    group: number;
    start: number;
    rows: number;
}