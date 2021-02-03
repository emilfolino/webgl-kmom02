(function IIFE() {
    var a = 9;

    // pass by value
    var b = a;

    console.log(a, b);

    a = 12;

    console.log(a, b);

    var board = Array(9).fill(null);

    board[2] = "X";

    // pass by reference
    var board2 = board;

    var board3 = board.slice();

    console.log(board, board2, board3);

    board[1] = "O";

    console.log(board, board2, board3);


    var game = {
        board: Array(9).fill(null),
        history: [],
        currentPlayer: true,
        getMarker: function getMarker() {
            return game.currentPlayer ? "X" : "0";
        },
        drawBoard: function drawBoard() {
            var boardElement = document.getElementById("board");

            boardElement.innerHTML = "";

            for (let i = 0; i < game.board.length; i++) {
                var square = document.createElement("div");

                square.className = "square";
                square.textContent = game.board[i];

                square.addEventListener("click", function() {
                    game.place(i);
                });

                boardElement.appendChild(square);
            }
        },
        place: function place(square) {
            if (game.board[square] === null) {
                game.history.push(game.board.slice());

                game.board[square] = game.getMarker();

                game.currentPlayer = !game.currentPlayer;

                var winnerMarker = game.winner(game.board);
                if (winnerMarker) {
                    game.history.push(game.board.slice());
                    game.drawWinner(winnerMarker);
                } else {
                    game.drawBoard();
                }
            }
        },
        winner: function calculateWinner(squares) {
            var lines = [
                [0, 1, 2],
                [3, 4, 5],
                [6, 7, 8],
                [0, 3, 6],
                [1, 4, 7],
                [2, 5, 8],
                [0, 4, 8],
                [2, 4, 6],
            ];

            for (var i = 0; i < lines.length; i++) {
                var a = lines[i][0];
                var b = lines[i][1];
                var c = lines[i][2];

                if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
                    return squares[a];
                }
            }

            return null;
        },
        drawWinner: function drawWinner(winner) {
            var boardElement = document.getElementById("board");

            boardElement.innerHTML = "Player " + winner + " won!";


            console.log(game.history);
        }
    };

    game.drawBoard();
})();
