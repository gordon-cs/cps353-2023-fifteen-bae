/**
 * Fifteen Puzzle Game
 * 
 * This game is for Assignment 5 from CPS 353
 * The game consists of a 4x4 grid, with 15 numbered tiles and one blank space
 * The objective is to arrange the tiles into numerical order
 * 
 * Student Author: Jay Bae
 */

"use strict";

document.addEventListener("DOMContentLoaded", function() {
    
    /**
     * Class representing the 15-puzzle game
     */
    class FifteenPuzzle {
        
        /**
         * Constructor to initialize the game state
         */
        constructor() {
            this.puzzleArea = document.getElementById("puzzlearea");
            this.squares = this.puzzleArea.querySelectorAll("div");
            this.emptyRow = 3, this.emptyCol = 3;
            this.setupGame();
            this.addEventListeners();
        }

        /**
         * Move a square
         * @param {HTMLElement} div - The square to move
         * @param {number} row - The target's row
         * @param {number} col - The target's column
         */
        moveSquare(div, row, col) {
            div.style.top = `${row * 100}px`;
            div.style.left = `${col * 100}px`;
            div.id = `square_${row}_${col}`;
        }

        /**
         * Find the square
         * @param {number} row - The target's row
         * @param {number} col - The target's col
         * @returns {HTMLElement} The square at the given row and col
         */
        findSquare(row, col) {
            return document.getElementById(`square_${row}_${col}`);
        }

        /**
         * Check if a square can move to the empty space
         * @param {number} row - The target's row
         * @param {number} col - The target's column
         * @returns {boolean} True if the square can move, otherwise false.
         */
        canMove(row, col) {
            return Math.abs(row - this.emptyRow) + Math.abs(col - this.emptyCol) === 1;
        }

        /**
         * Set up the initial state of the board with squares in their correct positions.
         */
        setupGame() {
            let index = 0;
            for (let i = 0; i < 4; i++) {
                for (let j = 0; j < 4; j++) {
                    if (index >= this.squares.length) break;
                    let square = this.squares[index];
                    square.style.backgroundPosition = `-${j * 100}px -${i * 100}px`;
                    this.moveSquare(square, i, j);
                    square.style.backgroundImage = "url('background.jpg')";
                    index++;
                }
            }
        }

        /**
         * Add click and hover event listeners to the squares
         */
        addEventListeners() {
            for (let square of this.squares) {
                square.addEventListener('click', (e) => {
                    let [row, col] = e.target.id.split("_").slice(1).map(str => parseInt(str, 10));
                    if (this.canMove(row, col)) {
                        this.moveSquare(e.target, this.emptyRow, this.emptyCol);
                        [this.emptyRow, this.emptyCol] = [row, col];
                    }
                });

                square.addEventListener('mouseover', (e) => {
                    let [row, col] = e.target.id.split("_").slice(1).map(str => parseInt(str, 10));
                    if (this.canMove(row, col)) {
                        e.target.classList.add('hovered');
                    }
                });

                square.addEventListener('mouseout', (e) => {
                    e.target.classList.remove('hovered');
                });
            }
        }
    }

    // Initialize the game
    new FifteenPuzzle();
});