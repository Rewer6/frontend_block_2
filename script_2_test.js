//Загрузка питань про кіно
function loadQuiz(quizData) {
    var quizDiv = document.getElementById('quiz');
    quizData.questions.forEach(function(q, i) {
        var questionDiv = document.createElement('div');
        questionDiv.className = 'question';
        questionDiv.innerHTML = '<p>' + q.question + '</p>';
        q.answers.forEach(function(a, j) {
            questionDiv.innerHTML += '<input type="radio" name="q' + i + '" value="' + a.isCorrect + '"> ' + a.answer + '<br>';
        });
        quizDiv.appendChild(questionDiv);
    });
}
//перевірка відповідей
function checkAnswers() {
    var correctCount = 0;
    var inputs = document.getElementsByTagName('input');
    for (var i = 0; i < inputs.length; i++) {
        if (inputs[i].checked && inputs[i].value === 'true') {
            correctCount++;
        }
    }
    document.getElementById('results_test').innerText = 'Ви правильно відповіли на ' + correctCount + ' питань.';
}
//завантажую дані із JSON файлу
fetch('test_film.json')
    .then(response => response.json())
    .then(data => loadQuiz(data))
    .catch(error => console.error('Error:', error));