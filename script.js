document.getElementById('search-form').addEventListener('submit', async (e) => {
    e.preventDefault();
    const searchInput = document.getElementById('search-input');
    await getImageOfTheDay(searchInput.value);
    saveSearch(searchInput.value);
    addSearchToHistory();
});

(async () => {
    await getCurrentImageOfTheDay();
    addSearchToHistory();
})();

async function getCurrentImageOfTheDay() {
    const currentDate = new Date().toISOString().split("T")[0];
    const apiKey = 'UU66cYmBE4FfPeeDhkaZj68emy2Bcgraex1dKqCF';
    const response = await fetch(`https://api.nasa.gov/planetary/apod?date=${currentDate}&api_key=${apiKey}`);
    const data = await response.json();
    displayImage(data);
}

async function getImageOfTheDay(date) {
    const apiKey = 'UU66cYmBE4FfPeeDhkaZj68emy2Bcgraex1dKqCF';
    const response = await fetch(`https://api.nasa.gov/planetary/apod?date=${date}&api_key=${apiKey}`);
    const data = await response.json();
    displayImage(data);
}

function displayImage(data) {
    const imageContainer = document.getElementById('current-image-container');
    imageContainer.innerHTML = `
        <h2>${data.title}</h2>
        <img src="${data.url}" alt="${data.title}">
        <p>${data.explanation}</p>
    `;
}

function saveSearch(date) {
    const searches = JSON.parse(localStorage.getItem('searches')) || [];
    if (!searches.includes(date)) {
        searches.push(date);
        localStorage.setItem('searches', JSON.stringify(searches));
    }
}

function addSearchToHistory() {
    const searchHistory = document.getElementById('search-history');
    searchHistory.innerHTML = '';

    const searches = JSON.parse(localStorage.getItem('searches')) || [];
    searches.forEach((date) => {
        const listItem = document.createElement('li');
        listItem.innerHTML =` <a href="#"> ${date}</a>`
        listItem.addEventListener('click', async () => {
            await getImageOfTheDay(date);
        });
        searchHistory.appendChild(listItem);
    });
}