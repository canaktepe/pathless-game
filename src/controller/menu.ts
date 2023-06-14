class Menu {
  gameObject: any;
  menu_options: {
    backgroundColor: string,
  };
  menuElement: HTMLDivElement | null;

  constructor(gameObject: any) {
    this.gameObject = gameObject;
    this.menu_options = {
      backgroundColor: 'grey',
    };
    this.menuElement = null;
    this.createMenuScreen();
  }

  createMenuScreen(): void {
    const { wrapper_size, wrapper_element } = this.gameObject;
    const { backgroundColor } = this.menu_options;

    const menu = document.createElement('div');
    menu.style.cssText = `
      width: ${wrapper_size.width}px;
      height: ${wrapper_size.height}px;
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
    list.style.cssText = `
            display: flex;
            justify-content: center;
            gap: 1em;
        `;

    const playerObject = document.createElement('div');
    playerObject.style.cssText = `
        width: 100px;
        height: 100px;
        background-size: contain;
        background-image: url(${require('../assets/car.png')});
        border: 5px solid #fff;
        background-size: 80%;
        background-repeat: no-repeat;
        background-position: center;
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
