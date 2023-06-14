class Player {
  scene: HTMLElement;
  player_options: {
    size: number;
    speed: number;
  };
  player: HTMLDivElement | null;

  constructor(scene: HTMLElement) {
    this.scene = scene;
    this.player_options = {
      size: 100,
      speed: 10,
    };
    this.player = null;
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
    const { size, speed } = this.player_options;
    const { player, scene } = this;
    const { width } = scene.getBoundingClientRect();
    const currentPosition = parseInt(player!.style.left);

    if (event.key === 'ArrowLeft') {
      const newPosition = currentPosition - speed;
      if (newPosition >= 0) {
        player!.style.left = `${newPosition}px`;
      }
    } else if (event.key === 'ArrowRight') {
      const newPosition = currentPosition + speed;
      if (newPosition + size <= width) {
        player!.style.left = `${newPosition}px`;
      }
    }
  }

  async create(): Promise<void> {
    const { scene } = this;
    const {
      width,
      height,
      
    } = scene.getBoundingClientRect() ;
    const { size } = this.player_options;
    const player_bottom_space = 20

    const player = document.createElement('div');
    player.style.cssText = `
        width: ${size}px;
        height: ${size}px;
        position: absolute;
        left: ${(width - size) / 2}px;
        top: ${height - size - player_bottom_space}px;
        transition: left 0.3s ease-out;
        border-radius: 50%;
        z-index: 999;
        background-image: url(${require('../assets/car.png')});
        background-size: contain;
    `;

    scene.appendChild(player);
    this.player = player;
  }

  destroy(): void {}
}

export default Player;