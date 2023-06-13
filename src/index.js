import Menu from './controller/menu';
import Scene from './controller/scene';

class PathlessGame {
  constructor({ wrapper_element }) {
    this.wrapper_element = document.querySelector(wrapper_element);
    if (!this.wrapper_element) {
      throw new Error('Game wrapper does not exist!');
    }
    this.menu = new Menu(this);
  }

  get wrapper_size() {
    const { clientWidth: width, clientHeight: height } = this.wrapper_element;
    return { width, height };
  }

  async start() {
    return new Promise((resolve) => {
      setTimeout(() => {
        console.info('game started!');
        this.scene = new Scene(this.wrapper_element);
        resolve();
      }, 500);
    });
  }

  finish() {
    console.info('finish');
  }
}
window.PathlessGame = PathlessGame;

export default PathlessGame;
