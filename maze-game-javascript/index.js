const canvas = document.getElementById("mazeCanvas");
const WIDTH =800;
const HEIGHT = 500;

canvas.width = WIDTH;
canvas.height = HEIGHT;

const c = canvas.getContext('2d');

function draw_border(){
    c.beginPath();
    c.rect(0,0,WIDTH, HEIGHT);
    c.stroke();
}
draw_border();

var cell_size = 50;
let cell_number_columns = WIDTH/cell_size;
let cell_number_rows = HEIGHT/cell_size;


// draw_cells();

let arr_path = [];

function define_path(start_point, end_point){
    current_point = start_point;
    while(current_point.x!==end_point.x&&current_point.y!==end_point.y){
        let p = choose_next_point(current_point);
        if(!containsObject(p,arr_path)){
            current_point=p;
        }
    }
}

function containsObject(obj, list) {
    var i;
    for (i = 0; i < list.length; i++) {
        if (list[i].x === obj.x&&list[i].y===obj.y) {
            return true;
        }
    }

    return false;
}

class Cell{
    constructor(i,j){
        this.i=i;
        this.j=j;
        this.visited=false;
        this.north=true;
        this.east=true;
        this.west=true;
        this.south = true;
    }
    remove_border(direction){
        if(direction === 'north'){
            this.north=false;
        }else if(direction ==='east'){
            this.east=false;
        }else if(direction==='west'){
            this.west=false;
        }else{
            this.south =false;
        }
    }
    fill_cell(){
        c.strokeStyle = "red";
        c.fillRect(this.i*cell_size, this.j*cell_size, cell_size,cell_size)
    }
    get_direction(otherCell){
        if (otherCell.i<this.i){
            return 'west';
        }else if(otherCell.i>this.i){
            return 'east';
        }else if(otherCell.j>this.j){
            return 'south';
        }else{
            return 'north';
        }
    }
    draw(){
        c.strokeStyle = "#b6e3c2";
        if(this.north){
            c.beginPath();
            c.moveTo(this.i*cell_size, this.j*cell_size);
            c.lineTo((this.i+1)*cell_size, this.j*cell_size);
            c.stroke();
        }
        if(this.east){
            c.beginPath();
            c.moveTo((this.i+1)*cell_size, this.j*cell_size);
            c.lineTo((this.i+1)*cell_size, (this.j+1)*cell_size);
            c.stroke();
        }
        if (this.south){
            c.beginPath();
            c.moveTo((this.i+1)*cell_size, (this.j+1)*cell_size);
            c.lineTo(this.i*cell_size, (this.j+1)*cell_size);
            c.stroke();
        }
        if (this.west){
            c.beginPath();
            c.moveTo(this.i*cell_size, (this.j+1)*cell_size);
            c.lineTo(this.i*cell_size, this.j*cell_size);
            c.stroke(); 
        }
    }

}

let arr_cells=[];
function create_cells(){
    for(let i=0;i<cell_number_rows;i++){
        let cell_rows = [];
        for(let j=0;j<cell_number_columns;j++){
            cell_rows.push(new Cell(j,i));
        }
        arr_cells.push(cell_rows);
    }
}
function draw_cells(){
    for(let i=0;i<cell_number_rows;i++){
        for(let j=0;j<cell_number_columns;j++){
            arr_cells[i][j].draw();
        }
    }
}

create_cells();
// draw_cells();
path = [];
function next_cell(cell){
    let moves = choose_next_point(cell);
    moves = moves.sort(() => Math.random() - 0.5);
    for(let [i,j] of moves){
        if (!arr_cells[j][i].visited){
            let rand_cell = arr_cells[j][i];
            let dir1 = cell.get_direction(rand_cell);
            let dir2 = rand_cell.get_direction(cell);
            cell.remove_border(dir1);
            rand_cell.remove_border(dir2);
            rand_cell.visited=true;
            next_cell(rand_cell);
        }
    }
}

function makeMazeIteratively(){
    let stack = []
    let initial_cell = arr_cells[0][0]
    initial_cell.visited = true;
    while(stack.length!=0){
        let currentCell = stack.pop();
        let moves = choose_next_point(currentCell);
        if(move.length>0){
            stack.push(currentCell);
        }
        for(let [i,j] of moves) {
            let otherCell = arr_cells[j][i];


        }
    }
}

function choose_next_point(cell){
    let possible_moves = [];
    let x_cord,y_cord;
    if(cell.i-1>=0){
        x_cord = cell.i-1;
        y_cord = cell.j;
        if(!arr_cells[y_cord][x_cord].visited){
            possible_moves.push([x_cord,y_cord]);
        }
    }
    if(cell.i+1<cell_number_columns){
        x_cord = cell.i+1;
        y_cord = cell.j;
        if(!arr_cells[y_cord][x_cord].visited){
            possible_moves.push([x_cord,y_cord]);
        }
    }
    if(cell.j-1>=0){
        x_cord = cell.i;
        y_cord = cell.j-1;
        if(!arr_cells[y_cord][x_cord].visited){
            possible_moves.push([x_cord,y_cord]);
        }
    }
    if(cell.j+1<cell_number_rows){
        x_cord = cell.i;
        y_cord = cell.j+1;
        if(!arr_cells[y_cord][x_cord].visited){
            possible_moves.push([x_cord,y_cord]);
        }
    }
    return possible_moves;
}

// let [i,j] = choose_next_point(arr_cells[4][4]);
// console.log(i,j);
// arr_cells[j][i].fill_cell();
// console.log(arr_cells[4][4].get_direction(arr_cells[j][i]));
// arr_cells[4][4].fill_cell();

// let dir1= arr_cells[4][4].get_direction(arr_cells[5][4]);
// let dir2 = arr_cells[5][4].get_direction(arr_cells[4][4]);
// console.log(dir1,dir2);
// arr_cells[4][4].remove_border(dir1);
// arr_cells[5][4].remove_border(dir2);
// console.log(arr_cells[4][4],arr_cells[5][4])

arr_cells[4][4].visited=true;
next_cell(arr_cells[4][4]);
draw_cells();

class Goal{
    constructor(finish_cell,color,radius){
        this.cell=finish_cell;
        this.color = color;
        this.radius = radius;
    }
    draw(){
        c.beginPath();
        c.arc(this.cell.i*cell_size+cell_size/2,this.cell.j*cell_size+cell_size/2, this.radius, 0, Math.PI*2, false);
        c.fillStyle=this.color;
        c.fill();
    }

}

class Player{
    constructor(start_cell,color,radius){
        this.cell=start_cell;
        this.color = color;
        this.radius = radius;
        this.finish_cell = arr_cells[cell_number_rows-1][cell_number_columns-1]
        console.log('asd')
    }
    changeCell(i,j){
        this.cell = arr_cells[j][i];
    }
    updatePosition(){
        this.x= this.cell.i*cell_size +cell_size/2;
        this.y = this.cell.j*cell_size+cell_size/2;
    }

    draw(){
        this.updatePosition();
        c.beginPath();
        c.arc(this.x,this.y, this.radius, 0, Math.PI*2, false);
        c.fillStyle=this.color;
        c.fill();
    }
    move_up(){
        let val = this.cell.north;
        if (!this.cell.north){
            this.changeCell(this.cell.i,this.cell.j-1)
        }
        return !val;
    }
    move_down(){
        let val = this.cell.soth;
        if (!this.cell.south){
            this.changeCell(this.cell.i,this.cell.j+1)
        }
        return !val
    }
    move_right(){
        let val = this.cell.east
        if (!this.cell.east){
            this.changeCell(this.cell.i+1,this.cell.j)
        }
        return !val;
    }
    move_left(){
        let val = this.cell.west
        if (!this.cell.west){
            this.changeCell(this.cell.i-1,this.cell.j)
        }
        return !val;
    }
    move(event){
        if (event.key==='w'){
            return this.move_up()
        }else if(event.key==='s'){
            return this.move_down()
        }else if(event.key === 'd'){
            return this.move_right()
        }else if(event.key === 'a'){
            return this.move_left()
        }else{
            return false;
        }
    }
    isReached(goal){
        if (this.cell.i === goal.cell.i&&this.cell.j ===goal.cell.j){
            return true;
        }else{
            return false;
        }
    }

}

const pl  = new Player(arr_cells[0][0],'red', 20);
pl.draw()
const g = new Goal(arr_cells[cell_number_rows-1][cell_number_columns-1],'green',20);
g.draw()

function animate(){
    c.clearRect(0,0,WIDTH,HEIGHT);
    pl.draw();
    g.draw();
    draw_cells();
}
window.addEventListener('keypress',(event)=>{
    let action = pl.move(event);
    if (action){
        let finish = pl.isReached(g);
        if(finish){
            console.log('finished');
        }
        animate();

    }
})