// Faz a requisição quando chamada
function makeRequest(urlParam) {
    return fetch(`https://swapi.dev/api/${urlParam}`)
}

// Esta função cria o HTML para o escopo que está chamando ela (people, planets, etc)
function createContent(res, ulID, aHref) {

    // Pega a <ul> no HTML pelo ID
    const ul = document.getElementById(ulID);

    // Faz um loop pelos results
    for (let x = 0; x < res.results.length; x++) {
        // Cria uma <li>
        const li = document.createElement("li");

        // Cria uma <a>
        const a = document.createElement("a");

        // Formata o atributo HREF do <a> para ficar com o seguinte padrão de exemplo: "./person?id=1"
        const formattedHref = `${aHref}?id=${res.results[x].url.split("/")[5]}`;

        // Coloca HREF no <a> com o valor formatado
        a.setAttribute("href", formattedHref);

        // A API de filmes não retorna "name" e sim, "title". Tivemos que fazer uma condicional aqui
        ulID === "list-films" ? a.innerHTML = res.results[x].title : a.innerHTML = res.results[x].name;

        // Acrescenta o <a> dentro do <li>
        li.appendChild(a);

        // Acrescenta o <li> (que já possui o <a>) dentro do <ul>
        ul.appendChild(li);
    }
}

// Busca pessoas
function getPeople() {
    makeRequest("people")
        .then(res => res.json())
        .then(res => createContent(res, "list-people", "./person.html"))
}

// Busca planetas
function getPlanets() {
    makeRequest("planets")
        .then(res => res.json())
        .then(res => createContent(res, "list-planets", "./planet.html"))
}

// Busca filmes
function getFilms() {
    makeRequest("films")
        .then(res => res.json())
        .then(res => createContent(res, "list-films", "./film.html"));
}

// Busca espécies
function getSpecies() {
    makeRequest("species")
        .then(res => res.json())
        .then(res => createContent(res, "list-species", "./specie.html"));
}

// Busca veículos
function getVehicles() {
    makeRequest("vehicles")
        .then(res => res.json())
        .then(res => createContent(res, "list-vehicles", "./vehicle.html"));
}

// Busca naves
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