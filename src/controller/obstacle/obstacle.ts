class Obstacle {
  public obstacleElement: HTMLDivElement;
  sceneElement: HTMLDivElement;
  constructor(sceneElement: HTMLDivElement) {
    this.sceneElement = sceneElement;
  }

  create(): void {
    this.obstacleElement = document.createElement('div');
    this.obstacleElement.classList.add('obstacle');
    this.setRandomAttributes();
    this.sceneElement.appendChild(this.obstacleElement);

    const duration = 5000;
    const distance =
      this.sceneElement.clientHeight + this.obstacleElement.clientHeight; // Engelin yüksekliği kadar daha fazla mesafe
    const startTime = Date.now();
    let destroyed = false;

    const animate = () => {
      if (destroyed) return;

      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const translateY =
        progress * distance - this.obstacleElement.clientHeight; // Engelin yüksekliği kadar geri çekme

      this.obstacleElement.style.transform = `translateY(${translateY}px)`;

      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        const obstacleRect = this.obstacleElement.getBoundingClientRect();
        const obstacleBottom = obstacleRect.top + obstacleRect.height;
        const sceneRect = this.sceneElement.getBoundingClientRect();
        const sceneBottom = sceneRect.top + sceneRect.height;

        if (obstacleBottom > sceneBottom) {
          this.destroy();
          setTimeout(() => {
            this.create();
          }, 500);
        }
      }
    };

    requestAnimationFrame(animate);
  }

  destroy(): void {
    if (this.obstacleElement) {
      this.obstacleElement.remove();
      this.obstacleElement = null;
    }
  }

  setRandomAttributes(): void {
    const width = Math.floor(Math.random() * 30 + 50) + 'px';
    const height = Math.floor(Math.random() * 30 + 50) + 'px';
    this.obstacleElement.style.width = width;
    this.obstacleElement.style.height = height;

    const maxWidth = this.sceneElement.clientWidth - parseInt(width);
    const left = Math.floor(Math.random() * maxWidth) + 'px';
    const top = -this.obstacleElement.clientHeight + 'px'; // Engelin yüksekliği kadar yukarıdan başlama
    this.obstacleElement.style.left = left;
    this.obstacleElement.style.top = top;
  }
}

export default Obstacle;
