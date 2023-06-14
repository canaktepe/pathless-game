import { SceneOption } from '../model/SceneOption';
import '../style/game.scss';
import Player from './player';

class Scene {
  private wrapper_element: HTMLElement;
  private scene_options: SceneOption;
  private sceneElement: HTMLDivElement;
  private player: Player;

  constructor(wrapper_element: HTMLElement) {
    this.wrapper_element = wrapper_element;
    this.scene_options = new SceneOption({ backgroundColor: '#ffffff' });
    this.init();
  }

  private async init(): Promise<void> {
    await this.create();
    await this.createPlayer();
  }

  private create(): Promise<void> {
    return new Promise<void>((resolve) => {
      const { backgroundColor } = this.scene_options;

      const scene = document.createElement('div');
      scene.className = 'scene';
      scene.style.cssText = `
        background-color: ${backgroundColor};
      `;

      this.wrapper_element.appendChild(scene);
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
