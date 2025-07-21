const player1 = document.getElementById("player1");
const player2 = document.getElementById("player2");
const gameArea = document.getElementById("gameArea");
const winnerText = document.getElementById("winnerText");

let p1Top = 180;
let p2Top = 180;
let p1Hits = 0;
let p2Hits = 0;

function movePlayer(player, amount) {
  if (player === 1) {
    p1Top = Math.max(0, Math.min(360, p1Top + amount));
    player1.style.top = p1Top + "px";
  } else {
    p2Top = Math.max(0, Math.min(360, p2Top + amount));
    player2.style.top = p2Top + "px";
  }
}

function shootBullet(fromPlayer) {
  const bullet = document.createElement("div");
  bullet.classList.add("bullet");
  gameArea.appendChild(bullet);

  let left, top, speed;
  if (fromPlayer === 1) {
    left = 50;
    top = p1Top + 15;
    speed = 5;
  } else {
    left = 750;
    top = p2Top + 15;
    speed = -5;
  }

  bullet.style.left = left + "px";
  bullet.style.top = top + "px";

  const interval = setInterval(() => {
    left += speed;
    bullet.style.left = left + "px";

    const hit = checkHit(left, top, fromPlayer);
    if (hit || left < 0 || left > 800) {
      clearInterval(interval);
      bullet.remove();
    }
  }, 20);
}

function checkHit(x, y, fromPlayer) {
  const target = fromPlayer === 1 ? player2 : player1;
  const targetTop = fromPlayer === 1 ? p2Top : p1Top;
  const targetLeft = fromPlayer === 1 ? 750 : 10;

  if (x >= targetLeft && x <= targetLeft + 40 && y >= targetTop && y <= targetTop + 40) {
    if (fromPlayer === 1) {
      p1Hits++;
      if (p1Hits >= 3) {
        winnerText.textContent = "🔥 Player 1 Wins!";
        document.removeEventListener("keydown", control);
      }
    } else {
      p2Hits++;
      if (p2Hits >= 3) {
        winnerText.textContent = "🔥 Player 2 Wins!";
        document.removeEventListener("keydown", control);
      }
    }
    return true;
  }
  return false;
}

function control(e) {
  switch (e.key) {
    case "w": movePlayer(1, -20); break;
    case "s": movePlayer(1, 20); break;
    case "d": shootBullet(1); break;

    case "ArrowUp": movePlayer(2, -20); break;
    case "ArrowDown": movePlayer(2, 20); break;
    case "ArrowLeft": shootBullet(2); break;
  }
}

document.addEventListener("keydown", control);
