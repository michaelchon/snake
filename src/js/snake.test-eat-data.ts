import { Position } from "./position";
import { SnakeDirection } from "./snake-direction";

export const snakeTestEatData: {
    direction: SnakeDirection;
    tailPosition: Position;
    expectedTailPosition: Position;
}[] = [
    {
        direction: SnakeDirection.LEFT,
        tailPosition: new Position(2, 0),
        expectedTailPosition: new Position(3, 0),
    },
    {
        direction: SnakeDirection.LEFT,
        tailPosition: new Position(8, 1),
        expectedTailPosition: new Position(9, 1),
    },
    {
        direction: SnakeDirection.RIGHT,
        tailPosition: new Position(2, 3),
        expectedTailPosition: new Position(1, 3),
    },
    {
        direction: SnakeDirection.RIGHT,
        tailPosition: new Position(5, 0),
        expectedTailPosition: new Position(4, 0),
    },
    {
        direction: SnakeDirection.UP,
        tailPosition: new Position(2, 6),
        expectedTailPosition: new Position(2, 7),
    },
    {
        direction: SnakeDirection.UP,
        tailPosition: new Position(1, 4),
        expectedTailPosition: new Position(1, 5),
    },
    {
        direction: SnakeDirection.DOWN,
        tailPosition: new Position(3, 4),
        expectedTailPosition: new Position(3, 3),
    },
    {
        direction: SnakeDirection.DOWN,
        tailPosition: new Position(5, 2),
        expectedTailPosition: new Position(5, 1),
    },
];
