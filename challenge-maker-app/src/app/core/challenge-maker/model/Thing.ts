export class Thing {
  public static readonly _resource: string = 'things';
  get _resource(): string { return Thing._resource; };

  id: string;
  name: string;
}

