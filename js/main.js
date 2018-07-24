'use strict';

(function () {
    let selector_inner = document.querySelectorAll(".selector-inner");
    let grade_pegs = document.querySelectorAll(".grade-peg");
    let guess_pegs = document.querySelectorAll(".guess-pegs");
    let guess_peg = document.querySelectorAll(".guess-peg");
    let answer_peg = document.querySelectorAll(".answer-peg");
    let active = document.querySelectorAll(".active");
    let submit = document.querySelector('.submit-btn');
    let selectedColor = "";
    let guessRow = 9;
    let answerArr = makeAnswer();
    submit.style.display = "none";



    submit.addEventListener("click", e => {
        guess_pegs[guessRow].querySelectorAll(".guess-peg").forEach(peg => {
            peg.classList.remove("active");
        });
        guessRow--;
        guess_pegs[guessRow].querySelectorAll(".guess-peg").forEach(peg => {
            peg.classList.add("active");
        });
        submit.style.display = "none";
    }, false);

    selector_inner.forEach(inner => {
        inner.addEventListener("click", (e) => {
            selector_inner.forEach(e => {
                e.parentElement.style.backgroundColor = "blue"
            });
            selectedColor = e.target.className.split(" ")[1];
            inner.parentElement.style.backgroundColor = selectedColor;
        }, false)
    });

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
                }else {
                    submit.style.display = "none";
                }
            }
        }, false)
    });

    function makeAnswer() {
        let colorArray = ["red", "yellow", "black", "white", "deeppink", "green"];
        const arr = [];
        for (let i = 0; i < 4 ; i++){
            let random = Math.floor(Math.random() * Math.floor(6));
            arr.push(colorArray[random])
        }

        answer_peg.forEach((e , i) => {
            e.classList.add(arr[i])
        });

        return arr
    }
    console.log(answerArr);

})();