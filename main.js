const prompt = require('prompt-sync')({ sigint: true });

class Character {
  constructor(){
  this.hat = '^'; 
  this.hole = '0'; 
  this.fieldCharacter = '░';
  this.pathCharacter = '*'; 
  }
}

class FieldGame {
  constructor(field) {
    this.field = field;
    this.y = 0; 
    this.x = 0;
    this.hardMode = false;
    this.character = new Character();
  }
  static generateField(width, height, percent, newCharacter, fieldGameOj) {
    fieldGameOj.field = [];
    for (let y = 0; y < height; y++) {
      fieldGameOj.field.push([]);
      for (let x = 0; x < width; x++) {
      let randomOj = percent < Math.random()? newCharacter.hole : newCharacter.fieldCharacter;
      fieldGameOj.field[y].push(randomOj);
      }
    }
    let pathX = Math.floor(Math.random() * width);
    let pathY = Math.floor(Math.random() * height);
    fieldGameOj.x = pathX;
    fieldGameOj.y = pathY;
    let hatX = Math.floor(Math.random() * width);
    let hatY = Math.floor(Math.random() * height);
    while (hatX === pathX && hatY === pathY) {
      hatX = Math.floor(Math.random() * width);
      hatY = Math.floor(Math.random() * height);
      break;
    }
    fieldGameOj.field[pathY][pathX] = newCharacter.pathCharacter;
    fieldGameOj.field[hatY][hatX] = newCharacter.hat;
    return fieldGameOj.field;
  }
  print() {
    for (let i = 0; i < this.field.length; i++) {
      console.log(this.field[i].join(''));
    }
  }
  isHat() {
    return this.field[this.y][this.x] === this.character.hat;
  }
  isHole() {
    return this.field[this.y][this.x] === this.character.hole;
  }
  isInBounds() {
    return (
      this.y >= 0 &&
      this.x >= 0 &&
      this.y < this.field.length &&
      this.x < this.field[0].length
    );
  }
  checkWin() {
    if (this.isHole()) {
      return false;
    }
    else if (this.isHat()) {
      return true;
    }
  }
  gameMode() {
    let mode = prompt('Choose your difficulty:normal or hard? ')
    if (mode === 'normal') {
      this.hardMode = false;
    }else if (mode === 'hard') {
      this.hardMode = true;
    }else {
      console.log('Please input normal or hard!!!')
      this.gameMode();
    }
  }
  holeLocation(){
    let holeY = Math.floor(Math.random() * this.field.length);
    let holeX = Math.floor(Math.random() * this.field[holeY].length);
    while (this.field[holeY][holeX] === this.character.hat || this.field[holeY][holeX] === this.character.hole || this.field[holeY][holeX] === this.character.pathCharacter) {
    holeY = Math.floor(Math.random() * this.field.length);
      holeX = Math.floor(Math.random() * this.field[holeY].length); 
    }
    this.field[holeY][holeX] = this.character.hole;
  }
  whichWay() {
    let move = prompt('Which way do you want to move to? (w for Up, s for down, a for left and d for right)');
      if (move === 'w') {
        this.y--;
      }
      else if (move === 's') {
        this.y++;
      }
      else if (move === 'd') {
        this.x++;
        if (this.hardMode == true) {
          this.holeLocation()
        }
      }
      else if (move === 'a') {
        this.x--;
        if (this.hardMode == true) {
          this.holeLocation()
        }
      }
      else {
        console.log('Enter w, s, a, d!');
      }
      this.whichWay;
  }
  runGame() {
    let currentlyPlaying = true;
    this.gameMode();
    while (currentlyPlaying === true) {
      this.print();
      this.whichWay();
      if (!this.isInBounds()) {
        console.log('You out of bounds instruction!');
        currentlyPlaying = false;
        break;
      } else if (this.isHole()) {
        console.log('You fell down to the hole!');
        currentlyPlaying = false;
        break;
      } else if (this.isHat()) {
        console.log('You found your hat!');
        currentlyPlaying = false;
        break;
      }
      this.field[this.y][this.x] = this.character.pathCharacter;
    }
  }
}

const newCharacter = new Character();
const newFieldGame = new FieldGame();
FieldGame.generateField(8, 8, 0.8, newCharacter, newFieldGame);
newFieldGame.runGame();

// Andison Edition 2021-01-03 14:28
