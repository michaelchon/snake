import { Position } from "./position";
import { SnakeDirection } from "./snake-direction";

export const snakeTestMoveData = [
    {
        direction: SnakeDirection.LEFT,
        headPosition: new Position(1, 0),
        expectedTailPosition: new Position(0, 0),
    },
    {
        direction: SnakeDirection.LEFT,
        headPosition: new Position(4, 1),
        expectedTailPosition: new Position(3, 1),
    },
    {
        direction: SnakeDirection.RIGHT,
        headPosition: new Position(1, 0),
        expectedTailPosition: new Position(2, 0),
    },
    {
        direction: SnakeDirection.RIGHT,
        headPosition: new Position(2, 1),
        expectedTailPosition: new Position(3, 1),
    },
    {
        direction: SnakeDirection.UP,
        headPosition: new Position(0, 2),
        expectedTailPosition: new Position(0, 1),
    },
    {
        direction: SnakeDirection.UP,
        headPosition: new Position(1, 4),
        expectedTailPosition: new Position(1, 3),
    },
    {
        direction: SnakeDirection.DOWN,
        headPosition: new Position(1, 2),
        expectedTailPosition: new Position(1, 3),
    },
    {
        direction: SnakeDirection.DOWN,
        headPosition: new Position(1, 4),
        expectedTailPosition: new Position(1, 5),
    },
];
