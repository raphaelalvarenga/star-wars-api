function makeRequest(urlParam) {
    return fetch(`https://swapi.dev/api/${urlParam}`)
}

function createContent(res, ulID, aHref) {

    // Pegar minha <ul> no HTML pelo ID
    const ul = document.getElementById(ulID);

    for (let x = 0; x < res.results.length; x++) {
        // Criar uma <li>
        const li = document.createElement("li");

        // Criar <a>
        const a = document.createElement("a");

        const formattedHref = `${aHref}?id=${res.results[x].url.split("/")[5]}`;

        // Colocar HREF no <a>
        a.setAttribute("href", formattedHref);

        ulID === "list-films" ? a.innerHTML = res.results[x].title : a.innerHTML = res.results[x].name;

        li.appendChild(a);

        ul.appendChild(li);
    }
}

function getPeople() {
    makeRequest("people")
        .then(res => res.json())
        .then(res => createContent(res, "list-people", "./person.html"))
}

function getPlanets() {
    makeRequest("planets")
        .then(res => res.json())
        .then(res => createContent(res, "list-planets", "./planet.html"))
}

function getFilms() {
    makeRequest("films")
        .then(res => res.json())
        .then(res => createContent(res, "list-films", "./film.html"));
}

function getSpecies() {
    makeRequest("species")
        .then(res => res.json())
        .then(res => createContent(res, "list-species", "./specie.html"));
}

function getVehicles() {
    makeRequest("vehicles")
        .then(res => res.json())
        .then(res => createContent(res, "list-vehicles", "./vehicle.html"));
}

function getStarships() {
    makeRequest("starships")
        .then(res => res.json())
        .then(res => createContent(res, "list-starships", "./starship.html"));
}

function getPerson() {}
function getPlanet() {}
function getFilm() {}
function getSpecies() {}
function getVehicle() {}
function getStarship() {}