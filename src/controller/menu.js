class Menu {
  constructor(gameObject) {
    this.gameObject = gameObject;
    this.menu_options = {
      backgroundColor: 'red',
    };
    this.createMenuScreen();
  }

  createMenuScreen() {
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
  }

  close() {
    const { wrapper_element } = this.gameObject;
    const { menuElement } = this;
    if (menuElement?.parentNode === wrapper_element) {
      wrapper_element.removeChild(menuElement);
    }
  }
}

export default Menu;
