'use strict';

(function () {
    let selector_inner = document.querySelectorAll(".selector-inner");
    let grade_pegs = document.querySelectorAll(".grade-pegs");
    let guess_pegs = document.querySelectorAll(".guess-pegs");
    let guess_peg = document.querySelectorAll(".guess-peg");
    let answer_peg = document.querySelectorAll(".answer-peg");
    let submit = document.querySelector('.submit-btn');
    let modal = document.querySelector(".modal");
    let selectedColor = "";
    let guessRow = 9;
    let guessArr = [];
    let answerArr = functions.makeAnswer();

    // hide submit button when begin
    submit.style.display = "none";

/****************** submit button ***********************************************/
    submit.addEventListener("click", e => {
        let hintObj = functions.checkAnswer(answerArr, guessArr);

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

        // get next row
        guessRow--;

        guess_pegs[guessRow].querySelectorAll(".guess-peg").forEach(peg => {
            peg.classList.add("active");
        });
        grade_pegs[guessRow].querySelectorAll(".grade-peg").forEach(peg => {
            peg.classList.add("active");
        });

        // if all colors position are right then player win
        if(hintObj.numberOfRightPosition === 4 ){
            answer_peg.forEach(( peg , i) => {
               peg.classList.add(answerArr[i]);
            });
            modal.style.display = "block";
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
                } else {
                    submit.style.display = "none";
                }
            }
        }, false)
    });
})();