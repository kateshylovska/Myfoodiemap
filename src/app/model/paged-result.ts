export class PagedResult<T> {
  total: number;
  result: T[];
  lastEvaluatedKey: string;
}
