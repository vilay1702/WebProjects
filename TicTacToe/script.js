// var cellsList = document.querySelectorAll('table tr td')

var getCells = document.getElementsByTagName('td');

function start() {
    for (i in getCells) {
        getCells[i].innerHTML = "";
    }
    playerOne();
}

function playerOne() {
    document.getElementById('turnIndicator').innerHTML = "Player 1 Turn (X)";
    document.getElementById('turnIndicator').style.color = "red";
}

function playerTwo() {
    document.getElementById('turnIndicator').innerHTML = "Player 2 Turn (O)";
    document.getElementById('turnIndicator').style.color = "yellow";
    turn = false;
}

var turn = true;
start();
function changeOption(option) {
    if (option.innerHTML != "") {
        return;
    }
    if (turn) {
        option.innerHTML = "X";
        playerTwo();
        check();
        turn = false;
    }
    else {
        option.innerHTML = "O";
        playerOne();
        check();
        turn = true;
    }
}

function check() {
    if (getCells[0].innerHTML == getCells[1].innerHTML && getCells[1].innerHTML == getCells[2].innerHTML) {
        if (getCells[0].innerHTML == "X") {
            alert('Player 1 wins');
            start();
        }
        else if (getCells[0].innerHTML == "O") {
            alert("Player 2 wins");
            start();
        }
    }
}