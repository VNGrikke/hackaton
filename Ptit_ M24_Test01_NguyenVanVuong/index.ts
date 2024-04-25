"use strict";
interface IPlayer {
    id: number;
    name: string;
    score: number;
}

let players: IPlayer[] = JSON.parse(localStorage.getItem("players") || "[]");

class Player implements IPlayer {
    constructor(public id: number, public name: string, public score: number) {}

    renderPlayer(): void {
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
        document.querySelector(".playerList")!.appendChild(player);
    }

    createPlayer(player: IPlayer): void {
        players.push(player);
        localStorage.setItem("players", JSON.stringify(players));
    }

    updatePlayer(id: number, newScore: number): void {
        players.forEach(player => {
            if (player.id === id) {
                player.score = newScore;
            }
        });
        localStorage.setItem("players", JSON.stringify(players));
    }

    deletePlayer(id: number): void {
        players.forEach((player, index) => {
            if (player.id === id) {
                players.splice(index, 1);
            }
        });
        localStorage.setItem("players", JSON.stringify(players));
        location.reload();
    }
}

let action: string = "create";

function savePlayer(): void {
    let id: number = Math.floor(Math.random() * 9999999999);
    let name: string = (document.getElementById("inpNamePlayer") as HTMLInputElement).value;
    if (!name) {
        alert("tên trống")
        return;
    }
    let newPlayer: Player = new Player(id, name, 0);
    if (action === "create") {
        newPlayer.createPlayer(newPlayer);
        newPlayer.renderPlayer();
    }
}

function del(id: number): void {
    console.log(id);
    let player: Player = new Player(id, "", 0);
    player.deletePlayer(id);
    render();
}

function render():void {
    document
    let list:string = ``
    players.forEach(player => {
        let newPlayer = new Player(player.id, player.name, player.score);
        list += newPlayer.renderPlayer();
    });
}
render();

function increase(id: number): void {
    let playerToUpdate = players.find(player => player.id === id);
    if (playerToUpdate) {
        playerToUpdate.score++;
        playerToUpdate.updatePlayer(id, playerToUpdate.score);
        render();
    }
}

function reduce(id: number): void {
    let playerToUpdate = players.find(player => player.id === id);
    if (playerToUpdate && playerToUpdate.score > 0) {
        playerToUpdate.score--;
        playerToUpdate.updatePlayer(id, playerToUpdate.score);
    }
    render();
}




