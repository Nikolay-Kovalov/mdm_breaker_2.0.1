import { useState, useEffect } from "react";
import Ball from "./Ball";
import Paddle from "./Paddle";
import Bricks from "./Bricks";

const Game = () => {
    const canvasWidth = 800;
    const canvasHeight = 600;

    const paddleWidth = 100;
    const ballRadius = 10;

    const brickRowCount = 5;
    const brickColumnCount = 10;
    const brickWidth = 75;
    const brickHeight = 20;
    const brickPadding = 10;
    const brickOffsetTop = 30;
    const brickOffsetLeft = 30;

    const [x, setX] = useState((canvasWidth - paddleWidth) / 2);
    const [ballX, setBallX] = useState(canvasWidth / 2);
    const [ballY, setBallY] = useState(canvasHeight - 30);
    const [dX, setDX] = useState(2);
    const [dY, setDY] = useState(-2);
    const [rightPressed, setRightPressed] = useState(false);
    const [leftPressed, setLeftPressed] = useState(false);

    useEffect(() => {
        const keyDownHandler = (evt) => {
            if (evt.key === "Right" || evt.key === "ArrowRight") {
                setRightPressed(true);    
            } else if (evt.key === "Left" || evt.key === "ArrowLeft") {
                setLeftPressed(true);
            } 
        }

        const keyUpHandler = (evt) => {
            if (evt.key === "Right" || evt.key === "ArrowRight") {
                setRightPressed(false)
            } else if (evt.key === "Left" || evt.key === "ArrowLeft") {
                setLeftPressed(false)
            }
        }

        document.addEventListener('keydown', keyDownHandler);
        document.addEventListener('keyup', keyUpHandler);


    }, [])
    
    useEffect(() => {
        const canvas = document.getElementById('gameCanvas');
        const ctx = canvas.getContext('2d');

        const draw = () => {
            ctx.clearRect(0, 0, canvasWidth, canvasHeight);
            const paddle = <Paddle x={x} canvasWidth={canvasWidth} paddleWidth={paddleWidth} />;
            const ball = <Ball x={ballX} y={ballY} ballRadius={ballRadius} />;
            const bricks = [];

            for (let c = 0; c < brickColumnCount; c++){
                for (let r = 0; r < brickRowCount; r++){
                    const brickX = c * (brickWidth + brickPadding) + brickOffsetLeft;
                    const brickY = r * (brickHeight + brickPadding) + brickOffsetTop;
                    bricks.push(<Bricks key={`${c}-${r}`} x={brickX} y={brickY} brickWidth={brickWidth} brickHeight={brickHeight} />) 
                }
            }
            ctx.fillStyle = "#00954d";
            ctx.fillRect(0, canvasWidth - 20, canvasHeight - 20);
            document.getElementById('paddle').style.left = `${x}px`;
            document.getElementById('ball').style.left = `${ballX}px`;
            document.getElementById('ball').style.top = `${ballY}px`;
            requestAnimationFrame(draw);
        }
        draw();
    }, [x,ballX,ballY])
}

export default Game;