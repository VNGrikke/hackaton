"use strict";
let players = JSON.parse(localStorage.getItem("players") || "[]");
class Player {
    constructor(id, name, score) {
        this.id = id;
        this.name = name;
        this.score = score;
    }
    renderPlayer() {
        let player = document.createElement("tr");
        player.classList.add("player");
        player.innerHTML = `
            <tr>
                <td>
                    <span onclick="del(${this.id})" class="material-symbols-outlined">close</span>
                    <span onclick="update(${this.id})" class="material-symbols-outlined">trophy</span>
                </td>
                <td><div id="namePlayer">${this.name}</div></td>
                <td><button onclick="reduce(${this.id})">-</button></td>
                <td id="score">${this.score}</td>
                <td><button onclick="increase(${this.id})">+</button></td>
            </tr>
        `;
        document.querySelector(".playerList").appendChild(player);
    }
    createPlayer(player) {
        players.push(player);
        localStorage.setItem("players", JSON.stringify(players));
    }
    updatePlayer(id, newScore) {
        players.forEach(player => {
            if (player.id === id) {
                player.score = newScore;
            }
        });
        localStorage.setItem("players", JSON.stringify(players));
    }
    deletePlayer(id) {
        players.forEach((player, index) => {
            if (player.id === id) {
                players.splice(index, 1);
            }
        });
        localStorage.setItem("players", JSON.stringify(players));
        location.reload();
    }
}
let action = "create";
function savePlayer() {
    let id = Math.floor(Math.random() * 9999999999);
    let name = document.getElementById("inpNamePlayer").value;
    if (!name) {
        alert("tên trống");
        return;
    }
    let newPlayer = new Player(id, name, 0);
    if (action === "create") {
        newPlayer.createPlayer(newPlayer);
        newPlayer.renderPlayer();
    }
}
function del(id) {
    console.log(id);
    let player = new Player(id, "", 0);
    player.deletePlayer(id);
    render();
}
function render() {
    document;
    let list = ``;
    players.forEach(player => {
        let newPlayer = new Player(player.id, player.name, player.score);
        list += newPlayer.renderPlayer();
    });
}
render();
function increase(id) {
    let playerToUpdate = players.find(player => player.id === id);
    if (playerToUpdate) {
        playerToUpdate.score++;
        playerToUpdate.updatePlayer(id, playerToUpdate.score);
        render();
    }
}
function reduce(id) {
    let playerToUpdate = players.find(player => player.id === id);
    if (playerToUpdate && playerToUpdate.score > 0) {
        playerToUpdate.score--;
        playerToUpdate.updatePlayer(id, playerToUpdate.score);
    }
    render();
}
