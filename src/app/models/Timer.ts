export class Timer<T> {

  constructor(public duration: number, public started: Date, public model: T = null) {
  }

}
