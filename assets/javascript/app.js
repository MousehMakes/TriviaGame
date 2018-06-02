//Question arrays
var questions = [
    [
        "What is the closest planet to the Sun?", "1: Earth", "2: Neptune", "3: Mercury", "4: Saturn"
    ],
    [
        "What is the hottest planet in our solar system?", "1: Venus", "2: Mars", "3: Uranus", "4: Earth"
    ],
    [
        "Earth is located in which galaxy?", "1: The Snickers", "2: The Butterfinger", "3: The Milky Way", "4: The Three Muskateers"
    ],
    [
        "Ganymede is a moon of which planet?", "1: Mercury", "2: Earth", "3: Saturn", "4: Jupiter"
    ],
    [
        "What is the Sun?", "1: A Planet", "2: A Star", "3: A Giant Fireball Of Death", "4: A Galaxy"
    ],
    [
        "What is the name of Saturn’s largest moon?", "1: Goliath", "2: Titan", "3: Bob", "4: Hermes"
    ],
    [
        "What planet is famous for its big red spot on it?", "1: Jupiter", "2: Mars", "3: Neptune", "4: Uranus"
    ],
    [
        "What planet is known as the red planet?", "1: Venus", "2: The Sun", "3: Jupiter", "4: Mars"
    ],
    [
        "What planet is famous for the beautiful rings that surround it?", "1: Mercury", "2: Neptune", "3: Saturn", "4: Earth"
    ],
    ["What is the name of the 2nd biggest planet in our solar system?", "1: Saturn", "2: Neptune", "3: Earth", "4: Venus"]
];
var solutions = [
    "3: Mercury",
    "1: Venus",
    "3: The Milky Way",
    "4: Jupiter",
    "2: A Star",
    "2: Titan",
    "1: Jupiter",
    "4: Mars",
    "3: Saturn",
    "1: Saturn"
];

var correctGuesses = 0;
var incorrectGuesses = 0;
var currentQuestion = 0;
var timer = 0;
var timer2 = 0;
var timer3 = 0;
var timer4 = 0;


//Boolean to check if game is over
var gameOver = false;

function reset () {
    //Reset Variables
    correctGuesses = 0;
    incorrectGuesses = 0;
    currentQuestion = 0;
    console.log("timer: " + timer);
    console.log("timer2: " + timer2);
    console.log("timer3: " + timer3);
    console.log("timer4: " + timer4);
    timer = 0; 
    timer2 = 0;
    timer3 = 0;
    timer4 = 0;
    clearInterval(timer);
    clearInterval(timer2);
    clearInterval(timer3);
    clearInterval(timer4);
    $(".outOfTimeDisplay").css("display", "none");
    $("#timeDisplay").css("display", "none");
    $(".activeQuestion").css("display", "none");
    $("#guessDisplay").css("display", "none");
    $(".correctGuessDisplay").css("display", "none");
    $(".incorrectGuessDisplay").css("display", "none");
    $(".reset-button").css("display", "none");
}


function runTimer() {
    $("#timeDisplay").css("display", "block");
    time = 11;/*seconds in the timer*/
    timer = setInterval(function () {
        time--;

        var minutes = Math.floor(time / 60);
        var seconds = time - (minutes * 60);

        if (seconds < 10) {
            seconds = "0" + seconds;
        }
        if (minutes === 0) {
            minutes = "0";
        } else if (minutes < 10) {
            minutes = minutes;
        }

        //console.log(time);


        $('#timeDisplay').html(minutes + ":" + seconds);
        if (time === 0) {
            //console.log("Current Question " + currentQuestion);
            //console.log("Length: " + solutions.length);


            if (currentQuestion === solutions.length - 1) {
                $(".outOfTimeDisplay").css("display", "block");
                $(".outOfTimeText").html("");
                $(".outOfTimeText")
                    .append("You made " + correctGuesses + " correct guesses.")
                    .append('<br/>')
                    .append("You made " + incorrectGuesses + " incorrect guesses.")
                    .append('<br/>');
                    
                    $(".reset-button").css("display", "block");
                //$(".outOfTimeText").addClass("reset-button");
                    

            } else {


                clearInterval(timer);
                $(".outOfTimeDisplay").css("display", "block");
                $(".outOfTimeText").html("You ran out of time!!");
                $(".outOfTimeText")
                .append('<br/>')
                .append("The correct answer is: " + solutions[currentQuestion]);

                timer2 = setTimeout(function () {

                    $(".outOfTimeDisplay").css("display", "none");
                    runTimer();
                    currentQuestion++;
                    showQuestion(".activeQuestion", questions[currentQuestion]);
                    //console.log("in runTimer()");

                }, 5000);
            }

        }
        //console.log(gameOver);
    }, 1000);
}









function showQuestion(el, obj) {
    //Variable below is meant to be used in the case that I randomize the order of the shown answers
    var displayCount = 0;

    $(el).html("");
    $(el).append("<div class='question'>" + obj[0] + "</div>")
        .append("<div class='question'>" + obj[1] + "</div>")
        .append("<div class='question'>" + obj[2] + "</div>")
        .append("<div class='question'>" + obj[3] + "</div>")
        .append("<div class='question'>" + obj[4] + "</div>");

}

$(document).ready(function () {


    /*new Tether({
        element: $('.reset-button'),
        target: $('.outOfTimeText'),
        attachment: 'top center',
        targetAttachment: 'bottom center'
    });*/

    $(".start-button").on("click", function () {
        //Overall timer:
        $("#timeDisplay").css("display", "block");
        $(".activeQuestion").css("display", "block");
        runTimer();


        showQuestion(".activeQuestion", questions[currentQuestion]);

        $(".activeQuestion").on("click", ".question", function () {
            if ($(this).text() === solutions[currentQuestion]) {
                //console.log("In correct if");
                correctGuesses++;
                clearInterval(timer);
                $(".correctGuessDisplay").css("display", "block");
                //DISPLAY WIN SCREEN, ACTIVATE 5 SEC TIMER IN BETWEEN QUESTIONS

                timer3 = setTimeout(function () {

                    $(".correctGuessDisplay").css("display", "none");
                    if (currentQuestion === solutions.length - 1) {
                        $(".outOfTimeDisplay").css("display", "block");
                        $(".outOfTimeText").html("");
                        $(".outOfTimeText")
                            .append("You made " + correctGuesses + " correct guesses.")
                            .append('<br/>')
                            .append("You made " + incorrectGuesses + " incorrect guesses.")
                            .append('<br/>');

                            $(".reset-button").css("display", "block");
                    } else {
                        currentQuestion++;
                        runTimer();
                        showQuestion(".activeQuestion", questions[currentQuestion]);
                    }
                    //console.log("After DISPLAY WIN SCREEN");
                }, 5000);


            } else if ($(this).text() !== solutions[currentQuestion]) {
                //console.log("In incorrect if");
                incorrectGuesses++;
                clearInterval(timer);
                $(".incorrectGuessText").html("");
                $(".incorrectGuessText").html("You guessed an incorrect answer.");
                $(".incorrectGuessText")
                    .append('<br/>')
                    .append("The correct answer is: " + solutions[currentQuestion]);

                $(".incorrectGuessDisplay").css("display", "block");
                //DISPLAY LOSE SCREEN, ACTIVATE 5 SEC TIMER IN BETWEEN QUESTIONS

                timer4 = setTimeout(function () {
                    if (currentQuestion === solutions.length - 1) {
                        $(".outOfTimeDisplay").css("display", "block");
                        $(".outOfTimeText").html("");
                        $(".outOfTimeText")
                            .append("You made " + correctGuesses + " correct guesses.")
                            .append('<br/>')
                            .append("You made " + incorrectGuesses + " incorrect guesses.")
                            .append('<br/>');

                            //$(".outOfDisplay").addClass(".reset-button");

                            $(".reset-button").css("display", "block");
                    } else {
                        $(".incorrectGuessDisplay").css("display", "none");
                        currentQuestion++;
                        runTimer();
                        showQuestion(".activeQuestion", questions[currentQuestion]);
                    }
                    //console.log("After DISPLAY LOSE SCREEN");
                }, 5000);


            }
        });



    });

    $(".reset-button").on("click", function () {
        reset();
    });

});
