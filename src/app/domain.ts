import { Annotation } from "./annotation";

export interface Domain {
    id: number;
    name: string;
    index_page: string;
    groups: number;
    annotations: number;
}

export interface PopulatedDomain {
    id: number;
    name: string;
    index_page: string;
    groups: number;
    annotations: Annotation[];
}