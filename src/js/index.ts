import "../css/index.css";
import { Canvas } from "./canvas";
import EatSound from "./eat.wav";
import { Position } from "./position";
import { Snake } from "./snake";
import { SnakePart } from "./snake-part";

class Game {
    private readonly canvas = new Canvas();
    private readonly snake = new Snake();
    private renderInterval: NodeJS.Timeout;
    private foodGenerationInterval: NodeJS.Timeout;
    private foodPosition = new Position(this.randomCoord(), this.randomCoord());
    private score = 0;
    private canTurn = true;

    constructor() {
        this.bindButtons();
    }

    bindButtons() {
        window.addEventListener("keydown", (e: KeyboardEvent) => {
            if (this.canTurn) {
                this.snake.turn(e.code);
                this.canTurn = false;
            }
        });
    }

    start() {
        this.drawSnake();
        this.drawFood();

        this.renderInterval = setInterval(() => {
            try {
                this.canTurn = true;
                this.snake.move();
            } catch (e) {
                this.stop();
            } finally {
                this.canvas.clear();
                this.drawSnake();
                this.drawFood();
            }
        }, Snake.speedMs);

        this.foodGenerationInterval = setInterval(() => {
            this.generateFood();
        }, 6000);
    }

    stop() {
        if (!this.renderInterval || !this.foodGenerationInterval) {
            return;
        }

        clearInterval(this.renderInterval);
        clearInterval(this.foodGenerationInterval);

        document.querySelector(".close-btn").addEventListener("click", () => {
            location.reload();
        });
        document.getElementById("toast").style.display = "flex";
    }

    drawSnake() {
        try {
            this.snake.parts.forEach((part, i) => this.drawSnakePart(part, i));
        } catch (e) {
            this.stop();
        }
    }

    drawSnakePart(part: SnakePart, i: number) {
        const [x, y] = part.calculatePosition();

        if (this.isSnakeOutOfBoundaries(x, y)) {
            throw new Error("out of boundaries");
        }

        if (this.isSnakeOnFood(part, x, y)) {
            this.snake.eat();
            this.foodPosition = new Position(-100, -100);
            this.score++;
            document.getElementById("score").textContent =
                this.score.toString();
            const audio = new Audio(EatSound);
            audio.play();
        }

        this.canvas.setColor(this.snake.getPartColor(i));

        this.canvas.drawRect({
            x,
            y,
            width: SnakePart.size,
            height: SnakePart.size,
        });
    }

    isSnakeOutOfBoundaries(x: number, y: number) {
        const crossedLeftBoundary = x < 0;
        const crossedRightBoundary = x + SnakePart.size > Canvas.size;
        const crossedTopBoundary = y < 0;
        const crossedBottomBoundary = y + SnakePart.size > Canvas.size;

        return (
            crossedLeftBoundary ||
            crossedRightBoundary ||
            crossedTopBoundary ||
            crossedBottomBoundary
        );
    }

    isSnakeOnFood(part: SnakePart, x: number, y: number) {
        if (!Object.is(part, this.snake.head)) {
            return false;
        }

        const doesXIntersect =
            this.foodPosition.x >= x &&
            this.foodPosition.x + SnakePart.size <= x + SnakePart.size;
        const doesYIntersect =
            this.foodPosition.y >= y &&
            this.foodPosition.y + SnakePart.size <= y + SnakePart.size;

        return doesXIntersect && doesYIntersect;
    }

    generateFood() {
        this.foodPosition = new Position(
            this.randomCoord(),
            this.randomCoord()
        );
    }

    drawFood() {
        this.canvas.setColor("#1f4068");
        this.canvas.drawRect({
            x: this.foodPosition.x,
            y: this.foodPosition.y,
            width: SnakePart.size,
            height: SnakePart.size,
        });
    }

    randomCoord() {
        return (
            Math.floor(Math.random() * (Canvas.size / SnakePart.size - 1) + 1) *
            SnakePart.size
        );
    }
}

const game = new Game();
game.start();
