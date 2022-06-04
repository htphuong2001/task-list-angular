export class Task {
  constructor(
    public id: number = Date.now(),
    public content: string = '',
    public isCompleted: boolean = false
  ) {}
}
