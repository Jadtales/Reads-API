export class NotecardCreationEvent {
  constructor(
    public readonly userId: string,
    public readonly username: string,
    public readonly notecardId: number,
    public readonly notecardTitle: string,
  ) {}
}

export interface NotecardCreationEventInterface {
  readonly userId: string;
  readonly username: string;
  readonly notecardId: number;
  readonly notecardTitle: string;
}
