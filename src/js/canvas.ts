export class Canvas {
    static readonly size = 800;

    private readonly element = document.getElementById(
        "canvas"
    ) as HTMLCanvasElement;
    private readonly ctx = this.element.getContext("2d");

    constructor() {
        this.element.width = Canvas.size;
        this.element.height = Canvas.size;
    }

    clear() {
        this.ctx.clearRect(0, 0, Canvas.size, Canvas.size);
    }

    setColor(color: string) {
        this.ctx.fillStyle = color;
    }

    drawRect(options: { x: number; y: number; width: number; height: number }) {
        this.ctx.fillRect(options.x, options.y, options.width, options.height);
    }
}
