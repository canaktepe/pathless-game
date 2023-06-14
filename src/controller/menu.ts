import PathlessGame from '..';
import { MenuOption } from '../model/MenuOption';

class Menu {
  gameObject: PathlessGame;
  menuOptions: {
    backgroundColor: string;
  };
  menuElement: HTMLDivElement;

  constructor(gameObject: PathlessGame) {
    this.gameObject = gameObject;
    this.menuOptions = new MenuOption({ backgroundColor: 'grey' });
    this.createMenuScreen();
  }

  createMenuScreen(): void {
    const { wrapperElement: wrapperElement } = this.gameObject;
    const { backgroundColor } = this.menuOptions;

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
    wrapperElement.appendChild(menu);
    this.menuElement = menu;

    this.createPlayerSelectionBox();
  }

  createPlayerSelectionBox(): void {
    const list = document.createElement('div');
    list.className = 'menu__player-box';

    const playerObject = document.createElement('div');
    playerObject.className = 'player-item';
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
    const { wrapperElement } = this.gameObject;
    const { menuElement } = this;
    if (menuElement?.parentNode === wrapperElement) {
      wrapperElement.removeChild(menuElement);
    }
  }
}

export default Menu;
