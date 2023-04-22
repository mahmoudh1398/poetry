export type PoemsModel = Array<PoemModel>;

export interface PoemModel {
  author: string;
  linecount: string;
  lines: Array<string>;
  title: string;
}
