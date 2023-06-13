class Player {
  constructor(scene) {
    this.scene = scene;
    this.player_options = {
      size: 100,
      speed: 20,
    };
    this.init();
  }

  async init() {
    await this.create();
    this.registerEventListeners();
  }

  registerEventListeners() {
    document.addEventListener('keydown', this.handleKeyDown.bind(this));
  }

  handleKeyDown(event) {
    const { size, speed } = this.player_options;
    const { player, scene } = this;
    const { width } = scene.getBoundingClientRect();
    const currentPosition = parseInt(player.style.left);

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

  async create() {
    const { scene } = this;
    const {
      width,
      height,
      player_bottom_space = 20,
    } = scene.getBoundingClientRect();
    const { size } = this.player_options;

    const player = document.createElement('div');
    player.style.cssText = `
        width: ${size}px;
        height: ${size}px;
        position: absolute;
        left: ${(width - size) / 2}px;
        top: ${height - size - player_bottom_space}px;
        transition: left 0.3s ease-out;
        border-radius:50%;
        z-index:999;
        background-image: url(${require('../assets/car.png')});
        background-size:contain;
    `;

    scene.appendChild(player);
    this.player = player;
  }

  destroy() {}
}

export default Player;
