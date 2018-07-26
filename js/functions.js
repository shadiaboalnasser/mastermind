let functions = function () {


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

    return{
        makeAnswer : makeAnswer,
        checkAnswer : checkAnswer
    }
}();
