import { Position } from "./position";
import { SnakeDirection } from "./snake-direction";
import { SnakePart } from "./snake-part";

export class Snake {
    static readonly normalColor = "#e43f5a";
    static readonly headColor = "#5e8b7e";
    static readonly speedMs = 150;

    direction = SnakeDirection.RIGHT;

    parts = [
        new SnakePart(new Position(0, 0)),
        new SnakePart(new Position(1, 0)),
    ];

    get head() {
        return this.parts[this.parts.length - 1];
    }

    get tail() {
        return this.parts[0];
    }

    getPartColor(i: number) {
        return i !== this.parts.length - 1
            ? Snake.normalColor
            : Snake.headColor;
    }

    turn(code: string) {
        if (code === "ArrowLeft" && this.direction !== SnakeDirection.RIGHT) {
            this.direction = SnakeDirection.LEFT;
        } else if (
            code === "ArrowRight" &&
            this.direction !== SnakeDirection.LEFT
        ) {
            this.direction = SnakeDirection.RIGHT;
        } else if (
            code === "ArrowUp" &&
            this.direction !== SnakeDirection.DOWN
        ) {
            this.direction = SnakeDirection.UP;
        } else if (
            code === "ArrowDown" &&
            this.direction !== SnakeDirection.UP
        ) {
            this.direction = SnakeDirection.DOWN;
        }
    }

    move() {
        switch (this.direction) {
            case SnakeDirection.LEFT:
                this.moveLeft();
                break;
            case SnakeDirection.RIGHT:
                this.moveRight();
                break;
            case SnakeDirection.UP:
                this.moveUp();
                break;
            case SnakeDirection.DOWN:
                this.moveDown();
                break;
        }

        this.isOnSnake(this.tail.position);
        this.parts.push(this.tail);
        this.parts.shift();
    }

    private moveLeft() {
        this.tail.position = new Position(
            this.head.position.x - 1,
            this.head.position.y
        );
    }

    private moveRight() {
        this.tail.position = new Position(
            this.head.position.x + 1,
            this.head.position.y
        );
    }

    private moveUp() {
        this.tail.position = new Position(
            this.head.position.x,
            this.head.position.y - 1
        );
    }

    private moveDown() {
        this.tail.position = new Position(
            this.head.position.x,
            this.head.position.y + 1
        );
    }

    private isOnSnake(position: Position) {
        for (const part of this.parts.slice(1)) {
            if (this.intersects(position, part.position)) {
                throw new Error("snake intersection");
            }
        }
    }

    private intersects(position1: Position, position2: Position) {
        const doesXIntersect =
            position1.x >= position2.x &&
            position1.x + SnakePart.size <= position2.x + SnakePart.size;
        const doesYIntersect =
            position1.y >= position2.y &&
            position1.y + SnakePart.size <= position2.y + SnakePart.size;

        return doesXIntersect && doesYIntersect;
    }

    eat() {
        switch (this.direction) {
            case SnakeDirection.LEFT:
                this.eatLeft();
                break;
            case SnakeDirection.RIGHT:
                this.eatRight();
                break;
            case SnakeDirection.UP:
                this.eatUp();
                break;
            case SnakeDirection.DOWN:
                this.eatDown();
                break;
        }
    }

    private eatLeft() {
        this.parts.unshift(
            new SnakePart(
                new Position(this.tail.position.x + 1, this.tail.position.y)
            )
        );
    }

    private eatRight() {
        this.parts.unshift(
            new SnakePart(
                new Position(this.tail.position.x - 1, this.tail.position.y)
            )
        );
    }

    private eatUp() {
        this.parts.unshift(
            new SnakePart(
                new Position(this.tail.position.x, this.tail.position.y + 1)
            )
        );
    }

    private eatDown() {
        this.parts.unshift(
            new SnakePart(
                new Position(this.tail.position.x, this.tail.position.y - 1)
            )
        );
    }
}
