import { PlayerOption } from '../model/playerOption';

class Player {
  scene: HTMLElement;
  player: HTMLDivElement;
  playerOptions: PlayerOption;

  constructor(scene: HTMLElement) {
    this.scene = scene;
    this.playerOptions = new PlayerOption({ size: 100, speed: 10 });
    this.init();
  }

  async init(): Promise<void> {
    await this.create();
    this.registerEventListeners();
  }

  registerEventListeners(): void {
    document.addEventListener('keydown', this.handleKeyDown.bind(this));
  }

  handleKeyDown(event: KeyboardEvent): void {
    const { size, speed } = this.playerOptions;
    const { player, scene } = this;
    const { width } = scene.getBoundingClientRect();
    const currentPosition = parseInt(player.style.left, 10);

    if (event.key === 'ArrowLeft') {
      const newPosition = currentPosition - speed;
      if (newPosition >= 0) {
        player.style.left = `${newPosition}px`;
      }
    } else if (event.key === 'ArrowRight') {
      const newPosition = currentPosition + speed;
      if (newPosition + size <= width) {
        player.style.left = `${newPosition}px`;
      }
    }
  }

  async create(): Promise<void> {
    const { scene } = this;
    const { width, height } = scene.getBoundingClientRect();
    const { size } = this.playerOptions;
    const playerBottomSpace = 20;

    const player = document.createElement('div');
    player.className = 'player';
    player.style.cssText = `
        background-image: url(${require('../assets/car.png')});
        width: ${size}px;
        height: ${size}px;
        left: ${(width - size) / 2}px;
        top: ${height - size - playerBottomSpace}px;
    `;
    scene.appendChild(player);
    this.player = player;
  }

  destroy(): void {}
}

export default Player;
