function getHistory() {
    const history = JSON.parse(localStorage.getItem("history"));
    if (!history) {
        history = [];
        localStorage.setItem("history", JSON.stringify(history));
    }
    return history;
}

function setHistory(history) {
    localStorage.setItem("history", JSON.stringify(history));
}

function generateBoard() {
    const teams = ["red", "blue"];
    const startingTeam = Math.floor(Math.random() * 2);

    const width = 5,
        height = 5,
        startingTeamCardCount = 9;

    const board = (new Array(width)).fill().map(_ => new Array(height).fill());

    const positions = new Array(width * height).fill().map((_, i) => i);

    const moreCards = [],
        fewerCards = [];

    for (let i = 0; i < startingTeamCardCount; i++) {
        moreCards.push(positions.splice(Math.floor(Math.random() * positions.length), 1)[0]);
    }

    for (let i = 0; i < startingTeamCardCount - 1; i++) {
        fewerCards.push(positions.splice(Math.floor(Math.random() * positions.length), 1)[0]);
    }

    const blackCard = positions.splice(Math.floor(Math.random() * positions.length), 1)[0];

    moreCards.forEach(i => board[Math.floor(i / width)][(i % width)] = teams[startingTeam]);

    fewerCards.forEach(i => board[Math.floor(i / width)][(i % width)] = teams[(startingTeam + 1) % 2]);

    positions.forEach(i => board[Math.floor(i / width)][(i % width)] = "neutral");

    board[Math.floor(blackCard / width)][(blackCard % width)] = "black";

    return {
        startingTeam: teams[startingTeam],
        moreCards,
        positions,
        board,
    }
}

function generateCards(tableEl, game) {
    game.board.forEach(row => {
        const rowEl = document.createElement("tr");
        tableEl.appendChild(rowEl);

        row.forEach(cell => {
            const cellEl = document.createElement("td");
            cellEl.style = `width: ${100/row.length}%; height: ${100/game.board.length}%`;
            const innerDiv = document.createElement("div");
            cellEl.appendChild(innerDiv);
            innerDiv.classList.add(cell);

            rowEl.appendChild(cellEl);
        })

        tableEl.appendChild(rowEl);
    });

    Array.from(document.querySelectorAll(".start-indicator")).forEach(el => {
        el.classList.remove("red", "blue");
        el.classList.add(game.startingTeam);
    });
}

function generateMainGame(){
    generateCards(document.querySelector(".board__wrapper table"), generateBoard());
}

///////////////////7

generateMainGame();

window.onbeforeunload = function (e) {
    return "Don't leave";
};