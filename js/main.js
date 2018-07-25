'use strict';

(function () {
    let selector_inner = document.querySelectorAll(".selector-inner");
    let grade_pegs = document.querySelectorAll(".grade-pegs");
    let guess_pegs = document.querySelectorAll(".guess-pegs");
    let guess_peg = document.querySelectorAll(".guess-peg");
    let answer_peg = document.querySelectorAll(".answer-peg");
    // let active = document.querySelectorAll(".active");
    let submit = document.querySelector('.submit-btn');
    let selectedColor = "";
    let guessRow = 9;
    submit.style.display = "none";
    let guessArr = [];
    let answerArr = makeAnswer();

/****************** submit button ***********************************************/
    submit.addEventListener("click", e => {
        let hintObj = checkAnswer(answerArr, guessArr);
        console.log(hintObj);

        guess_pegs[guessRow].querySelectorAll(".guess-peg").forEach(peg => {
            peg.classList.remove("active");
        });
          grade_pegs[guessRow].querySelectorAll(".grade-peg").forEach(peg => {
            peg.classList.remove("active");
        });

        // add background color to grade by hint
         for (let i = 0; i < hintObj.numberOfRightPosition; i++){
             grade_pegs[guessRow].children[i].classList.add("black")
         }
        for (let i = 0; i < hintObj.numberOfRightColor; i++){
            grade_pegs[guessRow].children[i+hintObj.numberOfRightPosition].classList.add("white")
        }



        guessRow--;
        guess_pegs[guessRow].querySelectorAll(".guess-peg").forEach(peg => {
            peg.classList.add("active");
        });
        grade_pegs[guessRow].querySelectorAll(".grade-peg").forEach(peg => {
            peg.classList.add("active");
        });

        console.log(answerArr);


        // if all colors position are right then player win
        if(hintObj.numberOfRightPosition === 4 ){
            answer_peg.forEach(( peg , i) => {
               peg.classList.add(answerArr[i]);
            });
            alert("You win");
        }



        submit.style.display = "none";
    }, false);

    /******************************* colors buttons***********************************/
    selector_inner.forEach(inner => {
        inner.addEventListener("click", (e) => {
            selector_inner.forEach(e => {
                e.parentElement.style.backgroundColor = "blue"
            });
            selectedColor = e.target.className.split(" ")[1];
            inner.parentElement.style.backgroundColor = selectedColor;
        }, false)
    });


    /*********************** guess color************************/
    guess_peg.forEach((peg, i, arr) => {
        arr[i].addEventListener("click", e => {
            if (arr[i].classList.contains("active")) {
                if (e.target.style.background === "" || e.target.style.background !== selectedColor) {
                    e.target.style.background = selectedColor;
                } else if (e.target.style.background === selectedColor) {
                    e.target.style.background = "";
                }

                // check if guess row is empty or full to show submit button
                let elements = Array.from(arr[i].parentElement.children);
                if (elements.every(function (e) {
                    return e.style.backgroundColor !== "";
                })) {
                    submit.style.display = "block";
                    guessArr = elements.map(function (element) {
                        return element.style.backgroundColor
                    });
                    // console.log(guessArray)
                } else {
                    submit.style.display = "none";
                }
            }
        }, false)
    });

    /******************** functions *********************************************/

    function makeAnswer() {
        let colorArray = ["red", "yellow", "black", "white", "deeppink", "green"];
        const arr = [];
        for (let i = 0; i < 4; i++) {
            let random = Math.floor(Math.random() * Math.floor(6));
            arr.push(colorArray[random])
        }
        return arr
    }

    function checkAnswer(answerArr, guessArr) {
        let hintObj = {
            numberOfRightPosition : 0,
            numberOfRightColor : 0
        };
        let aRay = [];

        for (let i = 0; i < 4; i++) {
            aRay[i] = answerArr[i];
        }

        for (let i = 0; i < 4; i++) {

            if (answerArr[i] === guessArr[i]){
                hintObj.numberOfRightPosition++
            }

            let index = aRay.indexOf(guessArr[i]);
            if(index >= 0){
                hintObj.numberOfRightColor++;
                aRay.splice(index, 1);
            }
        }
        // to see just number of right color but not right position
        hintObj.numberOfRightColor -= hintObj.numberOfRightPosition;
        return hintObj;
    }

})();