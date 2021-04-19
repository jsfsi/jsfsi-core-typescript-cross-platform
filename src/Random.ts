export class Random {
  public static number(min: number, max: number) {
    min = Math.ceil(min)
    max = Math.floor(max)
    // eslint-disable-next-line security-node/detect-insecure-randomness
    return Math.floor(Math.random() * (max - min + 1) + min)
  }
}
