import Menu from './controller/menu';
import Scene from './controller/scene';

class PathlessGame {
  private playerAsset: any;
  private wrapper_element: HTMLElement;
  private menu: Menu;

  constructor({ wrapper_element }: { wrapper_element: string }) {
    this.wrapper_element = document.querySelector(wrapper_element) as HTMLElement;
    if (!this.wrapper_element) {
      throw new Error('Game wrapper does not exist!');
    }
    this.menu = new Menu(this);
  }

  get wrapper_size(): { width: number, height: number } {
    const { clientWidth: width, clientHeight: height } = this.wrapper_element;
    return { width, height };
  }

  start(): Promise<void> {
    return new Promise<void>((resolve) => {
      setTimeout(() => {
        console.info('game started!');
        new Scene(this.wrapper_element);

        console.log(11, this.playerAsset);
        resolve();
      }, 500);
    });
  }

  finish(): void {
    console.info('finish');
  }
}

(window as any).PathlessGame = PathlessGame;

export default PathlessGame;