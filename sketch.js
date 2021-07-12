var red_ball;
var position, database;

function setup(){
    database = firebase.database()
    console.log(database)

    createCanvas(500,500);

    red_ball = createSprite(250,250,10,10);
    red_ball.shapeColor = "red";

    var red_ballPosition = database.ref("ball/position")
    red_ballPosition.on("value", readPosition, showError)

}
function draw(){
    background("white");
    if(keyDown(LEFT_ARROW)){
        changePosition(-1,0);
    }
    else if(keyDown(RIGHT_ARROW)){
        changePosition(1,0);
    }
    else if(keyDown(UP_ARROW)){
        changePosition(0,-1);
    }
    else if(keyDown(DOWN_ARROW)){
        changePosition(0,+1);
    }
    drawSprites();
}

function changePosition(x,y){
    database.ref('ball/position').set({
        'x': position.x+x,
        'y': position.y+y
    })
}
function readPosition(data) {
    position = data.val()
    console.log(position.x)

    red_ball.x = position.x;
    red_ball.y = position.y;

}
function showError() {
    console.log("Error")
}