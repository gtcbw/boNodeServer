export interface ResultElement {
    option: string;
    percentage: number;
}
export interface Result {
    surveyId: string;
    elements: ResultElement[];
}