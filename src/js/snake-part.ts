import { Position } from "./position";

export class SnakePart {
    static readonly size = 40;

    constructor(public position: Position) {}

    calculatePosition() {
        return [
            this.position.x * SnakePart.size,
            this.position.y * SnakePart.size,
        ];
    }
}
