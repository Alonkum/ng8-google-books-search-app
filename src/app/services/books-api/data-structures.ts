export class InputData {
    constructor(public title: string = '') {}

    public toString(): string {
      return `title:${this.title}`;
    }
  }
  
export interface KeywordParams {
    intitle?: string;
}


export enum InfoType {
  NONE = 'none',
  ERROR = 'error',
  WARNING = 'warning',
  SUCCESS = 'success'
}

export interface FormResult {
  type?: InfoType;
  message?: string;
}