import { useEffect, useState } from "react";


const BrickBreaker = () => {
    const [canvas, setCanvas] = useState(null);
    const [ctx, setCtx] = useState(null);
    const [gamePaused, setGamePaused] = useState(false);
    const [ballRadius] = useState(10);
    const [x, setX] = useState();
    const [y, setY] = useState();
    const [dx, setDx] = useState(2);
    const [dy, setDy] = useState(-2);
    const [paddleHeight] = useState(10);
    const [paddleWidth] = useState(75);
    const [paddleX, setPaddleX] = useState();
    const [rightPressed, setRightPressed] = useState(false);
    const [leftPressed, setLeftPressed] = useState(false);
    const [brickRowCount] = useState(3);
    const [brickColumnCount] = useState(5);
    const [brickWidth] = useState(75);
    const [brickHeight] = useState(20);
    const [brickPadding] = useState(10);
    const [brickOffsetTop] = useState(30);
    const [brickOffsetLeft] = useState(30);
    const [bricks, setBricks] = useState([]);
    const [score, setScore] = useState(0);

    const createBricks = () => {
        const bricks = [];
        for (let c = 0; c < brickColumnCount; c++){
            bricks[c] = [];
            for (let r = 0; r < brickRowCount; r++){
                bricks[c][r] = { x: 0, y: 0, status: 1 };
            }
        }
        setBricks(bricks);
    }
    useEffect(() => {
        const canvas = document.getElementById('gameCanvas');
        const ctx = canvas.getContext('2d');
        setCanvas(canvas);
        setCtx(ctx);
        setX(canvas.width / 2);
        setY(canvas.height - 30);
        setPaddleX((canvas.width - paddleWidth) / 2);
        createBricks();
        const keyDownHandler = (evt) => {
            if (evt.key === "Right" || evt.key === "ArrowRight") {
                setRightPressed(true)
            } else if (evt.key === "Left" || evt.key === "ArrowLeft") {
                setLeftPressed(true)
            }
        }
        
             const keyUpHandler = (evt) => {
            if (evt.key === "Right" || evt.key === "ArrowRight") {
                setRightPressed(false)
            } else if (evt.key === "Left" || evt.key === "ArrowLeft") {
                setLeftPressed(false)
            }
             }
        
        document.addEventListener('keydown', keyDownHandler, false);
        document.addEventListener('keyup', keyUpHandler, false);

        return () => {
        document.removeEventListener('keydown', keyDownHandler);
        document.removeEventListener('keyup', keyUpHandler); 
        }

    }, [brickRowCount, brickColumnCount, paddleWidth])
    
    const drawBricks = () => {
        for (let c = 0; c < brickColumnCount; c++){
            for (let r = 0; r < brickRowCount; r++){
                if (bricks[c][r].status === 1) {
                    const brickX = c * (brickWidth + brickPadding) + brickOffsetLeft;
                    const brickY = c * (brickHeight + brickPadding) + brickOffsetTop;
                    bricks[c][r].x = brickX;
                    bricks[c][r].y = brickY;
                    ctx.beginPath();
                    ctx.rect(brickX, brickY, brickWidth, brickHeight);
                    ctx.fillStyle = "#009bcd";
                    ctx.fill();
                    ctx.closePath();

                }
            }
        }
    }

    const drawBall = () => {
        ctx.beginPath();
        ctx.arc(x, y, ballRadius, 0, Math.PI * 2);
        ctx.fillStyle = "#ffa500";
        ctx.fill();
        ctx.closePath();
    }

    const drawPaddle = () => {
        ctx.beginPath();
        ctx.rect(paddleX, canvas.height - paddleHeight, paddleWidth, paddleHeight);
        ctx.fillStyle = "#00ff00";
        ctx.fill();
        ctx.closePath();
    }

    const drawScore = () => {
        ctx.font = "16px Arial";
        ctx.fillStyle = "#ff0000";
        ctx.fillText('Score:' + score, 8, 20);
    }

    const collisionDetection = () => {
        let remainingBricks = 0;
        for (let c = 0; c < brickColumnCount; c++){
            for (let r = 0; r < brickRowCount; r++){
                const brick = bricks[c][r];
                if (brick.status === 1) {
                    remainingBricks++
                    if (x > brick.x && x < brick.x + brickWidth && y > brick.y && y < brick.y + brickHeight) {
                        setDy(-dy);
                        brick.status = 0;
                        setScore(score + 1);
                    }
                }
            }
        }
        if (remainingBricks === 0) {
            gameWon();
        }
    }

    const gameWon = () => {
        setGamePaused(true);
        alert('Congratulations! You win');
        window.location.reload();
    }

    const restartGame = () => {
        setGamePaused(false);
        setScore(0);
        createBricks();
    }

    const gameOver = () => {
        setGamePaused(true);
        alert('Game over. Your final score is' + score);
        window.location.reload();
    }

    useEffect(() => {
        if (!canvas || !ctx) return
        const interval = setInterval(() => {
            if (!gamePaused) {
                ctx.clearRect(0, 0, canvas.width, canvas.height)
                drawBricks();
                drawBall();
                drawPaddle();
                drawScore();
                collisionDetection();

                if (x + dx > canvas.width - ballRadius || x + dx < ballRadius) {
                    setDx(-dx)
                }
                if (y + dy < ballRadius) {
                    setDy(-dy);
                } else if (y + dy > canvas.height - ballRadius) {
                    if (x > paddleX && x < paddleX + paddleWidth) {
                        setDy(-dy);
                    } else {
                        gameOver();
                    }
                }
                if (rightPressed && paddleX < canvas.width - paddleWidth) {
                    setPaddleX(paddleX + 7)
                } else if (leftPressed && paddleX > 0) {
                    setPaddleX(paddleX -7)
                }
                setX(x + dx)
                setY(y + dy)
            }

        },10)
        return () =>  clearInterval(interval)
 

    }, [
        canvas,
        ctx,
        dx,
        dy,
        x,
        y,
        paddleX,
        rightPressed,
        leftPressed,
        paddleWidth,
        canvas,
        ctx,
        ballRadius,
        paddleHeight,
        paddleWidth,
        brickColumnCount,
        brickRowCount,
        brickHeight,
        brickWidth,
        brickPadding,
        brickOffsetTop, 
        brickOffsetLeft,
        bricks,
        score, 
        gamePaused
    ])

    return (
        <div><canvas
            id="gameCanvas"
            width="480"
            height="320"
            style={{ border: "1px solid black" }}>
        </canvas>
            {gamePaused && (
                <button onClick={restartGame} style={{marginTop: "10px"}}>Play game</button>
            )}
        </div>
    )

}

export default BrickBreaker;