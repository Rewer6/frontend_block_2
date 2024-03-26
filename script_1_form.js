// Функція для виводу результатів на веб-сторінку
function displayResults(results) {
    var resultsDiv = document.getElementById('results_form');
    resultsDiv.innerHTML = ''; // Очищаємо попередні результати
    results.forEach(function(result, index) {
      var resultDiv = document.createElement('div');
      resultDiv.textContent = 'Результат ' + (index + 1) + ': ' + JSON.stringify(result);
      resultsDiv.appendChild(resultDiv);
    });
  }

  // Фільтруємо дані за віком 18+
  document.getElementById('filter-by-age').addEventListener('click', function() {
    var allForms = JSON.parse(localStorage.getItem('FormData')) || [];
    var filteredForms = allForms.filter(function(form) {
      return form.age >= 18;
    });
    displayResults(filteredForms); 
    console.log(filteredForms);
  });

  // Фільтруємо дані за жанром бойовик
  document.getElementById('filter-by-genre').addEventListener('click', function() {
    var allForms = JSON.parse(localStorage.getItem('FormData')) || [];
    var filteredForms = allForms.filter(function(form) {
      return form.genre === 'action';
    });
    displayResults(filteredForms); 
    console.log(filteredForms);
  });

  // Фільтруємо дані за рейтингом 7+
  document.getElementById('filter-by-rating').addEventListener('click', function() {
    var allForms = JSON.parse(localStorage.getItem('FormData')) || [];
    var filteredForms = allForms.filter(function(form) {
      return form.rating >= 7;
    });
    displayResults(filteredForms); 
    console.log(filteredForms);
  });

  document.getElementById('survey-form').addEventListener('submit', function(event) {
    event.preventDefault();

    var FormData = {
        name: document.getElementById('name').value,
        email: document.getElementById('email').value,
        age: document.getElementById('age').value,
        favoriteMovie: document.getElementById('favorite-movie').value,
        rating: document.getElementById('rating').value,
        genre: document.getElementById('genre').value,
        comments: document.getElementById('comments').value,
        seenMovie: document.getElementById('seen-movie').checked,
        movieYear: document.getElementById('movie-year').value,
        movieTime: document.getElementById('movie-time').value
    };

    var allForms = JSON.parse(localStorage.getItem('FormData')) || [];
    allForms.push(FormData);
    localStorage.setItem('FormData', JSON.stringify(allForms));
  }); 