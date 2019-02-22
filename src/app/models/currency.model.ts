
export class CurrencyModel {
  constructor(
    public code: string,
    public name: string,
    public rate?: number,
    public rateTo?: string,
  ) {}
}
