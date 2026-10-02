export class TypeSafeMap {
  private store: Record<string, unknown> = {};

  set<T>(key: string, value: T): void {
    this.store[key] = value;
  }

  get<T>(key: string): T | undefined {
    return this.store[key] as T | undefined;
  }
}