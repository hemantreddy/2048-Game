let grid;

function blankGrid(){
  return [
    [0,0,0,0],
    [0,0,0,0],
    [0,0,0,0],
    [0,0,0,0]
  ];
}

function setup(){
  createCanvas(400,400);
  grid = blankGrid();
  // console.table(grid);
  addNumber();
  addNumber();
  // console.table(grid);
}

function addNumber(){
    let options = []; //stores all the 16 possibilities in the grid
    for(let i = 0; i < 4; i++) {
      for(let j = 0; j < 4; j++){
        if (grid[i][j] == 0) {
          options.push({
            x : i,
            y : j
          });
        }
      }
    }
    if(options.length > 0);
    let spot = random(options);
    let r = random(1);
    grid[spot.x][spot.y] = r > 0.5 ? 2 : 4; //pushes either 2 or 4 if the space is empty
}

function slide(row){
  let arr = row.filter(val => val);
  let missing = 4 - arr.length;
  let zeros = Array(missing).fill(0);
  arr = zeros.concat(arr);
  return arr;
}

//operating on array itself
function combine(row){
  for(i = 3; i >=0; i--){
    let a = row[i];
    let b = row[i - 1];
    if(a == b) {
      row[i] = a + b;
      row[i-1] = 0;
    }
  }
  return row;
}

function compare(a, b){
  for(let i = 0; i < 4; i++) {
    for(let j = 0; j < 4; j++){
      if (a[i][j] !== b[i][j]) {
        return true;
      }
    }
  }
  return false;
}

function copyGrid(grid){

  let newGrid = blankGrid();
  for(let i = 0; i < 4; i++) {
    for(let j = 0; j < 4; j++){
      newGrid[i][j] = grid[i][j];
    }
  }
  return newGrid;
}

function flipGrid(grid){
  for(let i = 0; i < 4; i++){
    grid[i].reverse();
  }
  return grid;
}

function rotateGrid(grid){
  let newGrid = blankGrid();
  for(let i = 0; i < 4; i++){
    for(let j = 0; j < 4; j++){
      newGrid[i][j] = grid[j][i];
    }
  }
  return newGrid;
}

//one move
function keyPressed(){
  console.log(keyCode);
  let flipped = false;
  let rotated = false;
  let played = false;
  if (keyCode === DOWN_ARROW) {
    //Do nothing
    played = true;
  }
  else if (keyCode === UP_ARROW) {
    flipGrid(grid);
    flipped = true;
    played = true;
  }
  else if(keyCode == RIGHT_ARROW){
    grid = rotateGrid(grid);
    rotated = true;
    played = true;
  }
  else if(keyCode == LEFT_ARROW){
    grid = rotateGrid(grid);
    grid = flipGrid(grid);
    rotated = true;
    flipped = true;
    played = true;
  } else{
    played = false;
  }

  if(played){
    let past = copyGrid(grid);

    for(let i = 0; i < 4; i++){
      grid[i] = operate(grid[i]);
    }

    let changed = compare(past,grid);

    if(flipped){
      grid = flipGrid(grid);
    }

    if(rotated){
      grid = rotateGrid(grid);
      grid = rotateGrid(grid);
      grid = rotateGrid(grid);
    }

    if(changed){
      addNumber();
    }
  }
}





function operate(row){
  row = slide(row);
  row = combine(row);
  row = slide(row);
  return row;
}

function draw(){
  background(255);
  drawGrid();
}

function drawGrid() {
  let w = 100;
  for(let i = 0; i < 4; i++) {
    for(let j = 0; j < 4; j++){
      noFill();
      strokeWeight(2);
      stroke(0);
      rect(i*w, j*w, w, w);
      let val = grid[i][j];
      if (grid[i][j] !== 0) {
        textAlign(CENTER, CENTER);
        textSize(64);
        fill(0)
        noStroke();
        text(val, i*w + w/2, j * w + w / 2)
      }
    }
  }
}
