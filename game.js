let gamePattern=[];
let userClickedPattern=[];
const buttonColours = ["red","blue","green","yellow"];
let level=0;


// start game on keypress
let start = true;
$(document).keypress(function(){
    if(start)
    nextSequence();
    start=false;
})


// user clicks on button
$(".btn").on('click', function(){
    let userChosenColour= $(this).attr('id');
    // console.log(userChosenColour)
    userClickedPattern.push(userChosenColour);
    // console.log(userClickedPattern);
    playSound(userChosenColour);
    animatePress(userChosenColour);

    checkAnswer(userClickedPattern.length -1);
})


// check the answer
function checkAnswer(currentLevel){
    if(userClickedPattern[currentLevel]=== gamePattern[currentLevel])
    {
        if(userClickedPattern.length==gamePattern.length)
        {
            setTimeout(function(){
                nextSequence();

            },1000);
        }
    }
    else
    {
        console.log("wrong")
        playSound("wrong");
        $("body").addClass("game-over");
        $("#level-title").text("Game Over, Press Any Key to Restart");
        setTimeout(function(){
            $("body").removeClass("game-over");
        },200);
        startOver();
    }
}

// next sequence / level of game
function nextSequence(){
    // reset the array
    userClickedPattern=[];

    // range is 0-3
    let randomNumber = Math.random()*4;
    randomNumber= Math.floor(randomNumber);
    
    randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);

   // flash animation
   $(`#${randomChosenColour}`).fadeOut(100).fadeIn(100)

   // play sound
   playSound(randomChosenColour);

    // increse level by one
    level+=1;
    $("#level-title").text(`Level ${level}`);

    console.log(gamePattern)
}

// add animation on button press
function animatePress(currentColour){
    let self= $(`.${currentColour}`)
    self.addClass("pressed");
    setTimeout(function(){
        self.removeClass("pressed");
    }, 100);
}

// play sound
function playSound(name){
    let audio= new Audio(`sounds/${name}.mp3`);
    audio.play();
}

// restart the game
function startOver()
{
level=0;
gamePattern=[];
start=true;
}