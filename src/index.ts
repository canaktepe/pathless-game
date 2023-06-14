import Menu from './controller/menu';
import Scene from './controller/scene';

class PathlessGame {
  public playerAsset: string;
  public wrapperElement: HTMLElement;
  private menu: Menu;

  constructor({ wrapperElement }: { wrapperElement: string }) {
    this.wrapperElement = document.querySelector(wrapperElement) as HTMLElement;
    if (!this.wrapperElement) {
      throw new Error('Game wrapper does not exist!');
    }
    this.menu = new Menu(this);
  }

  start(): Promise<void> {
    return new Promise<void>((resolve) => {
      setTimeout(() => {
        console.info('game started!');
        new Scene(this.wrapperElement);
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
