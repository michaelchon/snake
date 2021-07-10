import { Snake } from "./snake";
import { snakeTestMoveData } from "./snake-test-move-data";
import { snakeTestEatData } from "./snake.test-eat-data";

describe("Snake", () => {
    let snake: Snake;

    beforeEach(() => {
        snake = new Snake();
    });

    describe("move", () => {
        it.each(snakeTestMoveData)(
            "direction=$direction, headPosition=$headPosition --> expectedTailPosition=$expectedTailPosition",
            ({ direction, headPosition, expectedTailPosition }) => {
                snake.direction = direction;
                snake.head.position = headPosition;
                const originalTail = snake.tail;

                snake.move();

                expect(snake.head.position).toEqual(expectedTailPosition);
                expect(snake.head).toBe(originalTail);
                expect(snake.tail).not.toBe(originalTail);
            }
        );
    });

    describe("eat", () => {
        it.each(snakeTestEatData)(
            "direction=$direction, tailPosition=$tailPosition --> expectedTailPosition=$expectedTailPosition",
            ({ direction, tailPosition, expectedTailPosition }) => {
                snake.direction = direction;
                snake.tail.position = tailPosition;

                snake.eat();

                expect(snake.tail.position).toEqual(expectedTailPosition);
            }
        );
    });
});
