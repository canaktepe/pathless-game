export class PlayerOption {
  constructor({ size, speed }: { size: number; speed: number }) {
    this.size = size;
    this.speed = speed;
  }

  size: number;
  speed: number;
}
