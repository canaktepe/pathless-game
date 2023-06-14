import { SceneOption } from '../model/SceneOption';
import '../style/game.scss';
import Player from './player';

class Scene {
  private wrapperElement: HTMLElement;
  private sceneOptions: SceneOption;
  private sceneElement: HTMLDivElement;
  private player: Player;

  constructor(wrapperElement: HTMLElement) {
    this.wrapperElement = wrapperElement;
    this.sceneOptions = new SceneOption({ backgroundColor: '#ffffff' });
    this.init();
  }

  private async init(): Promise<void> {
    await this.create();
    await this.createPlayer();
  }

  private create(): Promise<void> {
    console.log('x');
    return new Promise<void>((resolve) => {
      const { backgroundColor } = this.sceneOptions;

      const scene = document.createElement('div');
      scene.className = 'scene';
      scene.style.cssText = `
        background-color: ${backgroundColor};
      `;

      this.wrapperElement.appendChild(scene);
      this.sceneElement = scene;

      this.createRoad();
      resolve();
    });
  }

  private createRoad(): void {
    const roadContainer = document.createElement('div');
    roadContainer.className = 'scene__road';
    this.sceneElement.appendChild(roadContainer);
  }

  private async createPlayer(): Promise<void> {
    this.player = new Player(this.sceneElement);
  }
}

export default Scene;
