import kaplay from 'kaplay';
import Engine from './engine.js';

class KaboomEngine extends Engine {
  constructor() {
    super();
  }
  init() {
    super.init();

    const k = kaplay({
      background: [26, 26, 26],
      global: false,
      canvas: this.canvas,
      width: this.width,
      height: this.height,
      debugKey: 'u',
    });
    k.loadSprite('sprite', 'sprite.png');
    this.k = k;

    // Clear the canvas
    this.canvas.innerHTML = '';
    window.cancelAnimationFrame(this.request);

    // Particle creation
    //const particles = new Array(this.count);
    const rnd = [1, -1];
    for (let i = 0; i < this.count; i++) {
      const size = 10 + Math.random() * 80;
      const x = Math.random() * this.width;
      const y = Math.random() * (this.height - size);
      let [dx, dy] = [
        3 * Math.random() * rnd[Math.floor(Math.random() * 2)],
        3 * Math.random() * rnd[Math.floor(Math.random() * 2)],
      ];
      let circle;
      if (this.type === 'sprite') {
        circle = k.add([
          k.sprite('sprite'),
          k.pos(x, y),
          {
            dx,
            dy,
          },
        ]);
      } else {
        circle = k.add([
          k.pos(x, y),
          k.circle(size, { fill: this.type !== 'stroke' }),
          k.outline(
            1,
            this.type === 'stroke' ? k.rgb(255, 255, 255) : k.rgb(0, 0, 0)
          ),
          {
            dx,
            dy,
          },
        ]);
      }

      //particles[i] = { x, y, size: size, dx, dy, el: circle };

      circle.onUpdate(() => {
        circle.pos.x -= circle.dx;
        circle.pos.y -= circle.dy;
        if (circle.pos.x + size < 0) circle.dx *= -1;
        else if (circle.pos.y + size < 0) circle.dy *= -1;
        if (circle.pos.x > this.width) circle.dx *= -1;
        else if (circle.pos.y > this.height) circle.dy *= -1;
      });
    }
    //this.particles = particles;
  }
  render() {
    const k = this.k;
    k.onUpdate(() => {
      // Particle animation
      /* const particles = this.particles;
      for (let i = 0; i < this.count; i++) {
        const r = particles[i];
        r.x -= r.dx;
        r.y -= r.dy;
        if (r.x + r.size < 0) r.dx *= -1;
        else if (r.y + r.size < 0) r.dy *= -1;
        if (r.x > this.width) r.dx *= -1;
        else if (r.y > this.height) r.dy *= -1;
        r.el.pos.x = r.x;
        r.el.pos.y = r.y;
      } */
      this.fpsmeter.tick();
    });
  }
}

document.addEventListener('DOMContentLoaded', () => {
  const engine = new KaboomEngine();
  engine.render();
});
