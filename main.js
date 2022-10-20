questionCount = 1;
expressions = ['+', '-', '*', '/', '%'];
let counter = null;
time = 0;
let num1 = 0;
let num2 = 0;
let exp = '';
resultSheet = [];
let answer = 0;
startGame = () => {
    cleanUi();
    generateQuestion();
}
generateQuestion = () => {
    document
        .getElementById('questionId')
        .innerHTML = questionCount;
    questionCount++;
    num1 = getRandomNumber(101);
    num2 = getRandomNumber(101);
    exp = getExpression();
    console.log(`${num1} ${exp} ${num2}`);
    document.getElementById('question')
        .innerHTML = `${num1} ${exp} ${num2} = ?`;
    startCount();
}
getRandomNumber = (pointer) => {
    return Math.floor(Math.random() * pointer);
}
getExpression = () => {
    let rand = getRandomNumber(5);
    return expressions[rand];
}
startCount = () => {
    cleanUi();
    counter = setInterval(() => {
        time++;
        document.getElementById('time')
            .innerHTML = time;
        if (time == 60) {
            finalize();
            cleanUi();
        }
    }, 1000);
}
submitAnswer = () => {
    let el = document.getElementById('inputAnswer');
    el.style.borderColor = 'black';
    if (isNaN(
        document.getElementById('inputAnswer').value
    ) || num1 === 0
    ) {
        let el = document.getElementById('inputAnswer');
        el.style.borderColor = 'red';
        alert('Click start now button OR type correct answer');
        return;
    }
    let finalAnswer = executeAnswer();
    console.log('final Answer : ', finalAnswer);
    let result = {
        questionNumber: questionCount,
        isCorrect: finalAnswer,
        question: `${num1} ${exp} ${num2}`,
        requestedAnswer:
        document.getElementById('inputAnswer')
            .value,
        actualAnswer: answer
    }
    resultSheet.push(result);
    if (questionCount === 11) {
        finalize();
        return;
    }
    generateQuestion();
}
executeAnswer = () => {
    if (exp === '') return false;
    answer = 0;
    let isCorrect = false;
    switch (exp) {
        case "+":
            answer = num1 + num2;
            isCorrect = checkAnswer(answer);
            break;
        case "-":
            answer = num1 - num2;
            isCorrect = checkAnswer(answer);
            break;
        case "*":
            answer = num1 * num2;
            isCorrect = checkAnswer(answer);
            break;
        case "/":
            answer = num1 / num2;
            isCorrect = checkAnswer(answer);
            break;
        case "%":
            answer = num1 % num2;
            isCorrect = checkAnswer(answer);
    }
    return isCorrect;
}
checkAnswer = (answer) => {
    let tempAnswer = Number(
        document.getElementById('inputAnswer')
            .value
    );
    return answer === tempAnswer ? true : false;
}
finalize = () => {
    questionCount = 1;
    document
        .getElementById('questionId')
        .innerHTML = questionCount;

    cleanUi();
    document.getElementById('question')
        .innerHTML = 'To start, Hit the start now button!';
    alert('DONE!');
    console.log(resultSheet);

    for (const tempData of resultSheet) {
        let row =<tr><td>${tempData.questionNumber}</td><td>${tempData.question}</td> <td>${tempData.requestedAnswer}</td> <td>${tempData.actualAnswer}</td> <td>${tempData.isCorrect?'☺':'😥'}</td></tr>
        let tableRef = document.getElementById('table')
            .getElementsByTagName('tbody')[0];
        let newRow = tableRef.insertRow(tableRef.rows.length);
        newRow.innerHTML = row;
    }

}
cleanUi = () => {
    time = 0;
    clearInterval(counter);

    document.getElementById('table')
        .getElementsByTagName('tbody')[0].innerHTML='';

}