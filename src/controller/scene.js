import '../style/game.css';
import Player from './player';

class Scene {
  constructor(wrapper_element) {
    this.wrapper_element = wrapper_element;
    this.scene_options = {
      padding: 10,
      backgroundColor: '#ffffff',
    };

    this.init();
  }

  async init() {
    await this.create();
    await this.createPlayer();
  }

  async create() {
    return new Promise((resolve) => {
      const { backgroundColor, padding } = this.scene_options;

      this.scene = document.createElement('div');
      this.scene.style.cssText = `
      height: 100%;
      background-color: ${backgroundColor};
      box-sizing: border-box;
      position: relative; 
    `;

      this.createRoad();

      this.wrapper_element.appendChild(this.scene);
      resolve();
    });
  }

  createRoad() {
    const roadContainer = document.createElement('div');
    roadContainer.style.cssText = `
    width: 100%;
    height: 100%;
    overflow: hidden;
    background-image: url('${require('../assets/road.png')}');
    background-size:100% 650px;
    background-repeat:repeat-y;
    animation: slideAnimation 5s linear infinite;
  `;

    this.scene.appendChild(roadContainer);
  }

  async createPlayer() {
    this.player = new Player(this.scene);
  }
}

export default Scene;
