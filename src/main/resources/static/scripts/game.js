const game = document.getElementById("game");
var context = game.getContext("2d");

const height = 480; //Высота канваса
const width = 720; //Ширина канваса

game.height = height;
game.width = width;

//Ширина и высота обычных блоков
const BLOCK_SIZE_X = 40;
const BLOCK_SIZE_Y = 40;

//Сдвиг карты
var shiftMapX = 0;
var shiftMapY = 0;

class Person {
  constructor(xpos, ypos, moveSpeed, width, height, image) {
    this.x = xpos;
    this.y = ypos;
    this.width = width;
    this.height = height;
    this.moveSpeed = moveSpeed;
    this.image = new Image();
    this.image.src = image;
  }
  getCurrentPos() {
    return {
      x: Math.round(this.x / BLOCK_SIZE_X),
      y: Math.round(this.y / BLOCK_SIZE_Y),
    };
  }
}

class PersonHero extends Person {
  move() {
    if (keyW && !getCollision(this).W) {
      this.y -= this.moveSpeed;
      shiftMapY -= this.moveSpeed;
    }
    if (keyA && !getCollision(this).A) {
      this.x -= this.moveSpeed;
      shiftMapX -= this.moveSpeed;
    }
    if (keyS && !getCollision(this).S) {
      this.y += this.moveSpeed;
      shiftMapY += this.moveSpeed;
    }
    if (keyD && !getCollision(this).D) {
      this.x += this.moveSpeed;
      shiftMapX += this.moveSpeed;
    }
    for (let i = 0; i < Portals.length; i++) {
      if (simpleCollision(this, Portals[i]) && Portal.lastUse <= new Date() - Portal.CD) {
        mapInit(Portals[i].to, Portals[i].heroBlockX, Portals[i].heroBlockY);
        Portal.lastUse = new Date();
      }
    }
  }
}

class PersonEnemy extends Person {
  constructor(xpos, ypos, moveSpeed, width, height, image, direction) {
    super(xpos, ypos, moveSpeed, width, height, image);
    this.direction = direction;
  }
}

const Hero = new PersonHero(1 * BLOCK_SIZE_X, 1 * BLOCK_SIZE_Y, 4, 40, 40, "./images/Hero.png");

class MapBlock {
  constructor(xpos, ypos, width, height, code, collision = false) {
    this.x = xpos;
    this.y = ypos;
    this.width = width;
    this.height = height;
    this.code = code;
    this.collision = collision;
  }
}

class Portal {
  static CD = 3000;
  static lastUse = new Date() - this.CD;
  constructor(BlockX, BlockY, width, height, heroBlockX, heroBlockY, to) {
    this.x = BlockX * BLOCK_SIZE_X;
    this.y = BlockY * BLOCK_SIZE_Y;
    this.width = width;
    this.height = height;
    this.heroBlockX = heroBlockX;
    this.heroBlockY = heroBlockY;
    this.to = to;
    this.from = CurrentMapIndex;
  }
}

class Projectile {
  constructor(shooter, endX, endY, width, height) {
    this.shooter = shooter;
    this.startX = shooter.x + shooter.width / 2 - width / 2;
    this.startY = shooter.y + shooter.height / 2 - height / 2;
    this.x = this.startX;
    this.y = this.startY;
    this.endX = endX;
    this.endY = endY;
    this.width = width;
    this.height = height;
  }
  getCurrentPos() {
    return {
      x: Math.round(this.x / BLOCK_SIZE_X),
      y: Math.round(this.y / BLOCK_SIZE_Y),
    };
  }
}

//Картиночки
const BlocksImages = [];
BlocksImages.push(new Image());
BlocksImages[0].src = "./images/block0.png";
BlocksImages.push(new Image());
BlocksImages[1].src = "./images/block1.png";

const PortalImage = new Image();
PortalImage.src = "./images/portal.png";

const CursorImage = new Image();
CursorImage.src = "./images/cross.png";

const MapSetup = [
  [
    [1, 1, 1, 1, 1, 1, 1, 1, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 1, 1, 1, 1, 1, 1, 1, 1],
  ],
  [
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 2, 0, 0, 2, 0, 0, 2, 0, 0, 2, 0, 0, 2, 0, 2, 0, 2, 0, 2, 0, 2, 0, 2, 0, 2, 0, 2, 0, 2, 0, 2, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
  ],
];

var CurrentMap = [];
var CurrentMapIndex = 0;
var Enemies = [];
var Portals = [];
var Projectiles = [];

function mapInit(mapIndex = 0, heroPosX = 1, heroPosY = 1) {
  heroPosX *= BLOCK_SIZE_X;
  heroPosY *= BLOCK_SIZE_Y;
  CurrentMap = [];
  Enemies = [];
  Portals = [];
  Projectiles = [];
  for (let y = 0; y < MapSetup[mapIndex].length; y++) {
    const tempArr = [];
    for (let x = 0; x < MapSetup[mapIndex][y].length; x++) {
      switch (MapSetup[mapIndex][y][x]) {
        case 0:
          tempArr.push(new MapBlock(x * BLOCK_SIZE_X, y * BLOCK_SIZE_Y, BLOCK_SIZE_X, BLOCK_SIZE_Y, 0, false));
          break;
        case 1:
          tempArr.push(new MapBlock(x * BLOCK_SIZE_X, y * BLOCK_SIZE_Y, BLOCK_SIZE_X, BLOCK_SIZE_Y, 1, true));
          break;
        case 2:
          tempArr.push(new MapBlock(x * BLOCK_SIZE_X, y * BLOCK_SIZE_Y, BLOCK_SIZE_X, BLOCK_SIZE_Y, 0, false));
          Enemies.push(new PersonEnemy(x * BLOCK_SIZE_X, y * BLOCK_SIZE_Y, 4, 40, 40, "./images/tarakanus.png", null));
          break;
        default:
          break;
      }
    }
    CurrentMap.push(tempArr);
  }

  clearInterval();

  //Для каждой карты набор порталов должен быть разным
  switch (mapIndex) {
    case 0:
      Portals.push(new Portal(4, 1, 40, 40, 2, 9, 1));
      break;
    case 1:
      Portals.push(new Portal(2, 9, 40, 40, 4, 1, 0));
      break;
    default:
      break;
  }

  for (let i = 0; i < Enemies.length; i++) {
    setInterval(() => {
      if (Enemies[i]) {
        switch (Math.floor(Math.random() * 4) + 1) {
          case 1:
            Enemies[i].direction = "W";
            break;
          case 2:
            Enemies[i].direction = "A";
            break;
          case 3:
            Enemies[i].direction = "S";
            break;
          case 4:
            Enemies[i].direction = "D";
            break;
          default:
            break;
        }
      }
    }, (Math.random() + 1) * 1000);
  }

  //Позиция героя на новой карте
  Hero.x = heroPosX;
  Hero.y = heroPosY;

  //Это чтобы центр карты был равен позиции героя
  shiftMapX = Hero.x + Hero.width / 2 - width / 2;
  shiftMapY = Hero.y + Hero.height / 2 - height / 2;
}
mapInit(CurrentMapIndex, 4, 4);

var keyW = false;
var keyA = false;
var keyS = false;
var keyD = false;
var mouseX = width / 2;
var mouseY = height / 2;

document.addEventListener("keydown", (event) => {
  switch (event.code) {
    case "KeyW":
      keyW = true;
      break;
    case "KeyA":
      keyA = true;
      break;
    case "KeyS":
      keyS = true;
      break;
    case "KeyD":
      keyD = true;
      break;
    default:
      break;
  }
});

document.addEventListener("keyup", (event) => {
  switch (event.code) {
    case "KeyW":
      keyW = false;
      break;
    case "KeyA":
      keyA = false;
      break;
    case "KeyS":
      keyS = false;
      break;
    case "KeyD":
      keyD = false;
      break;
    case "KeyT":
      //Это тестовая штука для просмотра всех карт
      if (CurrentMapIndex < MapSetup.length - 1) {
        CurrentMapIndex++;
      } else {
        CurrentMapIndex = 0;
      }
      mapInit(CurrentMapIndex);
      break;
    default:
      break;
  }
});

game.addEventListener("mousemove", (event) => {
  //Ну теперь оно "адаптивно"
  mouseX = Math.round((event.offsetX / game.clientWidth) * width);
  mouseY = Math.round((event.offsetY / game.clientHeight) * height);
});

game.addEventListener("click", (event) => {
  Projectiles.push(new Projectile(Hero, mouseX + shiftMapX, mouseY + shiftMapY, 10, 10));
});

//Переключение вкладки
window.onblur = function () {
  keyW = keyA = keyS = keyD = false;
};

//Вспомогательная функция для поиска коллизий
function setElCollision(el1, el2, coll) {
  el1.x = Math.round(el1.x);
  el1.y = Math.round(el1.y);
  el2.x = Math.round(el2.x);
  el2.y = Math.round(el2.y);
  if (el1.y == el2.y + el2.height && el2.x < el1.x + el1.width && el1.x < el2.x + el2.width) {
    coll.W = true;
  }
  if (el1.x == el2.x + el2.width && el2.y < el1.y + el1.height && el1.y < el2.y + el2.height) {
    coll.A = true;
  }
  if (el1.y + el1.height == el2.y && el2.x < el1.x + el1.width && el1.x < el2.x + el2.width) {
    coll.S = true;
  }
  if (el1.x + el1.width == el2.x && el2.y < el1.y + el1.height && el1.y < el2.y + el2.height) {
    coll.D = true;
  }
}

//Поиск коллизий
function getCollision(person) {
  let coll = {
    W: false,
    A: false,
    S: false,
    D: false,
    any: false,
  };

  //Коллизия с картой
  for (let y = person.getCurrentPos().y - 1; y < CurrentMap.length && y < person.getCurrentPos().y + person.height / BLOCK_SIZE_Y + 1; y++) {
    if (CurrentMap[y] != null) {
      for (let x = person.getCurrentPos().x - 1; x < CurrentMap[y].length && x < person.getCurrentPos().x + person.width / BLOCK_SIZE_X + 1; x++) {
        if (CurrentMap[y][x] != null && CurrentMap[y][x].collision) {
          setElCollision(person, CurrentMap[y][x], coll);
          // Отрисовать все читаемые блоки
          // context.fillStyle = "red";
          // context.fillRect(CurrentMap[y][x].x - shiftMapX, CurrentMap[y][x].y - shiftMapY, CurrentMap[y][x].width, CurrentMap[y][x].height);
        }
      }
    }
  }

  //Коллизия с врагами
  for (let i = 0; i < Enemies.length; i++) {
    setElCollision(person, Enemies[i], coll);
  }

  //Коллизия с героем
  if (!person.startX) {
    setElCollision(person, Hero, coll);
  }

  coll.any = coll.W || coll.A || coll.S || coll.D;
  console.log(coll.W, coll.A, coll.S, coll.D);
  return coll;
}

//Простая коллизия
function simpleCollision(el1, el2) {
  return el1.x < el2.x + el2.width && el1.x + el1.width > el2.x && el1.y < el2.y + el2.height && el1.height + el1.y > el2.y;
}

function EnemiesMove() {
  for (let i = 0; i < Enemies.length; i++) {
    switch (Enemies[i].direction) {
      case "W":
        if (!getCollision(Enemies[i]).W) {
          Enemies[i].y -= Enemies[i].moveSpeed;
        }
        break;
      case "A":
        if (!getCollision(Enemies[i]).A) {
          Enemies[i].x -= Enemies[i].moveSpeed;
        }
        break;
      case "S":
        if (!getCollision(Enemies[i]).S) {
          Enemies[i].y += Enemies[i].moveSpeed;
        }
        break;
      case "D":
        if (!getCollision(Enemies[i]).D) {
          Enemies[i].x += Enemies[i].moveSpeed;
        }
        break;
      default:
        break;
    }
  }
}

function ProjectilesMove() {
  for (let i = 0; i < Projectiles.length; i++) {
    //Дистанция
    let dist = Math.sqrt(Math.pow(Projectiles[i].endX - Projectiles[i].startX, 2) + Math.pow(Projectiles[i].endY - Projectiles[i].startY, 2));
    //Изменения x b y за единицу времени
    let x = (Projectiles[i].endX - Projectiles[i].startX) / dist;
    let y = (Projectiles[i].endY - Projectiles[i].startY) / dist;
    Projectiles[i].x += x * 10;
    Projectiles[i].y += y * 10;
  }
}

//Функция рисования
function roundedRect(x, y, width, height, radius) {
  context.beginPath();
  context.moveTo(x, y + radius);
  context.arcTo(x, y + height, x + radius, y + height, radius);
  context.arcTo(x + width, y + height, x + width, y + height - radius, radius);
  context.arcTo(x + width, y, x + width - radius, y, radius);
  context.arcTo(x, y, x, y + radius, radius);
  context.fillStyle = "white";
  context.fill();
}

//Отрисовка
function Draw() {
  //Рисование карты
  for (let y = 0; y < CurrentMap.length; y++) {
    for (let x = 0; x < CurrentMap[y].length; x++) {
      // context.fillStyle = CurrentMap[y][x].color;
      // context.fillRect(CurrentMap[y][x].x - shiftMapX, CurrentMap[y][x].y - shiftMapY, CurrentMap[y][x].width, CurrentMap[y][x].height);
      context.drawImage(
          BlocksImages[CurrentMap[y][x].code],
          CurrentMap[y][x].x - shiftMapX,
          CurrentMap[y][x].y - shiftMapY,
          CurrentMap[y][x].width,
          CurrentMap[y][x].height
      );
    }
  }

  //Рисование порталов
  for (let i = 0; i < Portals.length; i++) {
    context.drawImage(PortalImage, Portals[i].x - shiftMapX, Portals[i].y - shiftMapY, Portals[i].width, Portals[i].height);
  }

  //Рисование вражин
  for (let i = 0; i < Enemies.length; i++) {
    // context.fillStyle = "black";
    // context.fillText("Памагите", Enemies[i].x - shiftMapX - 12, Enemies[i].y - shiftMapY - 6);
    // context.fillStyle = "blue";
    // context.fillRect(Enemies[i].x - shiftMapX, Enemies[i].y - shiftMapY, Enemies[i].width, Enemies[i].height);
    context.drawImage(Enemies[i].image, Enemies[i].x - shiftMapX, Enemies[i].y - shiftMapY, Enemies[i].width, Enemies[i].height);
  }

  //Рисование снарядов
  for (let i = 0; i < Projectiles.length; i++) {
    context.fillStyle = "brown";
    context.fillRect(Projectiles[i].x - shiftMapX, Projectiles[i].y - shiftMapY, Projectiles[i].width, Projectiles[i].height);
  }

  //Рисование персонажа
  context.drawImage(Hero.image, width / 2 - Hero.width / 2, height / 2 - Hero.height / 2, Hero.width, Hero.height);

  //Рисование курсора
  context.drawImage(CursorImage, mouseX - 20, mouseY - 20, 40, 40);
}

//Игровой цикл
function play() {
  //context.clearRect(0, 0, width, height);
  context.fillStyle = "rgb(86,57,35)";
  context.fillRect(0, 0, width, height);

  Draw();

  Hero.move();
  EnemiesMove();
  ProjectilesMove();

  requestAnimationFrame(play);
}
play();
