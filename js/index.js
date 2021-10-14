function makeRequest(urlParam) {
    return fetch(`https://swapi.dev/api/${urlParam}`)
}

function getPeople() {
    makeRequest("people")
        .then(res => res.json())
        .then(res => {

            // Pegar minha <ul> no HTML pelo ID
            const ul = document.getElementById("list-people");

            for (let x = 0; x < res.results.length; x++) {
                // Criar uma <li>
                const li = document.createElement("li");

                // Criar <a>
                const a = document.createElement("a");

                // Colocar HREF no <a>
                a.setAttribute("href", "./person.html");
                a.innerHTML = res.results[x].name;

                li.appendChild(a);

                ul.appendChild(li);
            }
        })
}

function getPlanets() {
    makeRequest("planets")
        .then(res => res.json())
        .then(res => {

            // Pegar minha <ul> no HTML pelo ID
            const ul = document.getElementById("list-planets");

            for (let x = 0; x < res.results.length; x++) {
                // Criar uma <li>
                const li = document.createElement("li");

                // Criar <a>
                const a = document.createElement("a");

                // Colocar HREF no <a>
                a.setAttribute("href", "./planet.html");
                a.innerHTML = res.results[x].name;

                li.appendChild(a);

                ul.appendChild(li);
            }
        })
}

function getFilms() {
    makeRequest("films")
        .then(res => res.json())
        .then(res => {
            console.log(res);
            // Pegar minha <ul> no HTML pelo ID
            const ul = document.getElementById("list-films");

            for (let x = 0; x < res.results.length; x++) {
                // Criar uma <li>
                const li = document.createElement("li");

                // Criar <a>
                const a = document.createElement("a");

                // Colocar HREF no <a>
                a.setAttribute("href", "./film.html");
                a.innerHTML = res.results[x].title;

                li.appendChild(a);

                ul.appendChild(li);
            }
        });
}

function getSpecies() {
    makeRequest("species")
        .then(res => res.json())
        .then(res => {
            console.log(res);
            // Pegar minha <ul> no HTML pelo ID
            const ul = document.getElementById("list-species");

            for (let x = 0; x < res.results.length; x++) {
                // Criar uma <li>
                const li = document.createElement("li");

                // Criar <a>
                const a = document.createElement("a");

                // Colocar HREF no <a>
                a.setAttribute("href", "./specie.html");
                a.innerHTML = res.results[x].name;

                li.appendChild(a);

                ul.appendChild(li);
            }
        });
}

function getVehicles() {
    makeRequest("vehicles")
        .then(res => res.json())
        .then(res => {
            console.log(res);
            // Pegar minha <ul> no HTML pelo ID
            const ul = document.getElementById("list-vehicles");

            for (let x = 0; x < res.results.length; x++) {
                // Criar uma <li>
                const li = document.createElement("li");

                // Criar <a>
                const a = document.createElement("a");

                // Colocar HREF no <a>
                a.setAttribute("href", "./vehicle.html");
                a.innerHTML = res.results[x].name;

                li.appendChild(a);

                ul.appendChild(li);
            }
        });
}

function getStarships() {
    makeRequest("starships")
        .then(res => res.json())
        .then(res => {
            console.log(res);
            // Pegar minha <ul> no HTML pelo ID
            const ul = document.getElementById("list-starships");

            for (let x = 0; x < res.results.length; x++) {
                // Criar uma <li>
                const li = document.createElement("li");

                // Criar <a>
                const a = document.createElement("a");

                // Colocar HREF no <a>
                a.setAttribute("href", "./starship.html");
                a.innerHTML = res.results[x].name;

                li.appendChild(a);

                ul.appendChild(li);
            }
        });
}