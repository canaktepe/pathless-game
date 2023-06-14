import PathlessGame from "..";
import { MenuOption } from "../model/MenuOption";

class Menu {
  gameObject: PathlessGame;
  menu_options: {
    backgroundColor: string,
  };
  menuElement: HTMLDivElement;

  constructor(gameObject: PathlessGame) {
    this.gameObject = gameObject;
    this.menu_options = new MenuOption({ backgroundColor:'grey'});
    this.createMenuScreen();
  }

  createMenuScreen(): void {
    const {  wrapper_element } = this.gameObject;
    const { backgroundColor } = this.menu_options;

    const menu = document.createElement('div');
    menu.className = 'menu';
    menu.style.cssText = `
      background-color: ${backgroundColor};
    `;

    const startButton = document.createElement('button');
    startButton.textContent = 'Start';
    startButton.addEventListener('click', async () => {
      console.log('game starting...');
      await this.gameObject.start();
      this.close();
    });

    menu.appendChild(startButton);
    wrapper_element.appendChild(menu);
    this.menuElement = menu;

    this.createPlayerSelectionBox();
  }

  createPlayerSelectionBox(): void {
    const list = document.createElement('div');
    list.className = 'menu__player-box';

    const playerObject = document.createElement('div');
    playerObject.className = 'player-item'
    playerObject.style.cssText = `
        background-image: url(${require('../assets/car.png')});
      `;

    playerObject.addEventListener('click', () => {
      this.gameObject.playerAsset = '../assets/car.png';
    });

    list.appendChild(playerObject);

    this.menuElement?.appendChild(list);
  }

  close(): void {
    const { wrapper_element } = this.gameObject;
    const { menuElement } = this;
    if (menuElement?.parentNode === wrapper_element) {
      wrapper_element.removeChild(menuElement);
    }
  }
}

export default Menu;
