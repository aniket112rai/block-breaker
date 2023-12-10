const grid=document.querySelector('.grid')
const blockwidth=100
const blockheight=20
const boardwidth=790
const boardheight=500
const balldiameter=20
let xdirection=-2
let ydirection=2

const userPosition=[340,20]
let userCurrentPosition=userPosition

const ballPosition=[340,40]
let ballCurrentPosition=ballPosition

let timer

class Block{
    constructor(xaxis,yaxis){
        this.bottomLeft=[xaxis,yaxis]
        this.bottomRight=[xaxis+blockwidth,yaxis]
        this.topLeft=[xaxis,yaxis+blockheight]
        this.topRight=[xaxis+blockwidth,yaxis+blockheight]
    }
}

let blocks=[
    new Block(10,470),
    new Block(120,470),
    new Block(230,470),
    new Block(340,470),
    new Block(450,470),
    new Block(560,470),
    new Block(670,470),
    new Block(10,440),
    new Block(120,440),
    new Block(230,440),
    new Block(340,440),
    new Block(450,440),
    new Block(560,440),
    new Block(670,440),
    new Block(10,410),
    new Block(120,410),
    new Block(230,410),
    new Block(340,410),
    new Block(450,410),
    new Block(560,410),
    new Block(670,410),
    
]

function addBlocks(){
    for(let i=0;i<blocks.length;i++){
        const block=document.createElement('div')
        block.classList.add('block')
        block.style.left=blocks[i].bottomLeft[0]+'px'
        block.style.bottom=blocks[i].bottomLeft[1]+'px'
        grid.appendChild(block)
        
    }

}
addBlocks()


const user=document.createElement('div')
user.classList.add('user')
grid.appendChild(user)
intUser()

const ball=document.createElement('div')
ball.classList.add('ball')
grid.appendChild(ball)
intBall()

function intUser(){
    user.style.left=userCurrentPosition[0]+'px'
    user.style.bottom=userCurrentPosition[1]+'px'
    
}

function intBall(){
    ball.style.left=ballCurrentPosition[0]+'px'
    ball.style.bottom=ballCurrentPosition[1]+'px'
}

function moveBoard(e){
    switch (e.key) {
        case 'ArrowLeft':
            if(userCurrentPosition[0]>0){
                userCurrentPosition[0]-=10
                intUser()
            }
            break;
        
        case 'ArrowRight':
            if(userCurrentPosition[0]<(boardwidth-blockwidth)){
              userCurrentPosition[0]+=10
              intUser()  
            }
            break;
    
        
    }
}
document.addEventListener('keydown',moveBoard)

function moveBall() {
    ballCurrentPosition[0] += xdirection;
    ballCurrentPosition[1] += ydirection;
    
    // Check for left and right wall collisions
    if (ballCurrentPosition[0] <= 0 || ballCurrentPosition[0] >= boardwidth - balldiameter) {
        changeDirectionBySideWallCollision();
    }
    
    intBall();  
    collision(); 
}

timer=setInterval(moveBall,15)

function collision(){
    for(let i=0;i<blocks.length;i++){

        // block Collision
        if((ballCurrentPosition[0] >= blocks[i].bottomLeft[0] && ballCurrentPosition[0]< blocks[i].bottomRight[0]) 
        &&
        (ballCurrentPosition[1]+balldiameter)>blocks[i].bottomLeft[1] && ballCurrentPosition[1]<blocks[i].topLeft[1]){
            const allBlocks=Array.from(document.querySelectorAll('.block'))
            allBlocks[i].classList.remove('block')
            blocks.splice(i,1)
            changeDirectionByBlockCollision()
            if(blocks.length==0){
                clearInterval(timer)
                removeEventListener('keydown',moveBoard)
            }
        }

        // up wall collision
        if(ballCurrentPosition[1]+10>=boardheight){
            changeDirectionByUpWallCollision()
        }

        // down collision
        if(ballCurrentPosition[1]<=10){
            clearInterval(timer)
            document.removeEventListener('keydown',moveBoard)
        }

        // user collision
        if(
            (ballCurrentPosition[0]<=userCurrentPosition[0]+blockwidth && ballCurrentPosition[0]>=userCurrentPosition[0]) 
            && 
            (ballCurrentPosition[1]>userCurrentPosition[1]
            &&
            ballCurrentPosition[1]<userCurrentPosition[1]+blockheight)){
                changeDirectionByUserCollision()
        }
    }
}

function changeDirectionByBlockCollision(){
    
    if(xdirection===-2 && ydirection===2){
        ydirection=-2
        return
    }
    if(xdirection===2 && ydirection===2){
        ydirection=-2
        return
    }
}
function changeDirectionByUserCollision(){
    if(xdirection===-2 && ydirection===-2){
        ydirection=2
        
        return
    }
    if(xdirection===2 && ydirection===-2){
        ydirection=2
        return
    }
}
function changeDirectionBySideWallCollision() {
    xdirection = -xdirection;  // Change xdirection directly
}



function changeDirectionByUpWallCollision(){
    if(xdirection===-2 && ydirection===2){
        ydirection=-2
        return
    }
    if(xdirection===2 && ydirection===2){
        ydirection=-2
        return
    }
}