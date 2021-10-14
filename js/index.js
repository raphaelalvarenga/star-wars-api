function getPeople() {
    fetch("https://swapi.dev/api/people/")
        .then(res => res.json())
        .then(res => {

            console.log(res);

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