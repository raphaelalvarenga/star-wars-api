/* Vamos começar com o site index.html que possui uma funçao
on-load no <body>  - essa funçao carrega da API uma 
lista de ja utilizavel no projeto, na sessao PEOPLE.

Nesse index.html temos também links fixos para cada PAGINA do projeto.
nesse caso aparecem no menu: planetas, especies, e outras classes, menos PESSOAS pois HOME é a classe pessoas, o nome 'PESSOAS' APARECE ENORME no home.

abaixo da escrita pessoas está uma <ul> que foi criada apenas com js
e cada elemento criado é um link tambem formatado no JS que são carregados 
via funçao on-load dentro do body de cada página

sendo assim, TANTO nos menus em html que são permanentes, quando clicados,
direcionam pra uma pagina que ao carregar trazem informaçoes em forma de lista e em alguns casos, links prontos para sua continuidade dentro do assunto. QUANTO NOS elementos carregados abaixo do Titulo, que também geram links

agora abaixo seguem as definições comentadas em cada função.
vamos analisar, sabendo que no index temos on-load com getPeople que está 
mais abaixo.   (vou numerar a primeira com 1)
------------------------------------------------------




     2   makeRequest

Faz a requisição em todos 'makeRequest', retornando o 
o conteudo declarado entre () - makeRequest("conteudo") 
e aplicando em (urlParam)  pra pedir retorno na fetch .. dentro do ${urlParam} */
function makeRequest(urlParam) {
    return fetch(`https://swapi.dev/api/${urlParam}`)
}

const plan1 = "https://swapi.dev/api/planets/1/";
const plan8 = "https://swapi.dev/api/planets/8/";
/*     3   createContent 

Esta função cria o HTML para o escopo que está chamando ela (people, planets, etc)
Ela recebe 3 valores e ....  (siga os comentário abaixo)

*/
function createContent(res, ulID, aHref) {

    // Pega a <ul> no HTML pelo ID
    const ul = document.getElementById(ulID);

    /* Faz um loop pelos results ..Método importande onde X recebe valores de contagem pra nos exibir 'results' onde [x] irá contar os results até < res.results com incremento de x++   ... nos passos abaixo vemos que o que está acontecendo é a montagem de um link <a>    até aqui tá otimo!*/
    for (let x = 0; x < res.results.length; x++) {
        // Cria uma <li>
        const li = document.createElement("li");

        // Cria um link <a>
        const a = document.createElement("a");

        /* Formata o atributo HREF do <a> para ficar com o seguinte padrão de exemplo: "./person?id=1"
        pois é necessário que direcione o link para a pagina do indivíduo e nela informar os atributos dele.
        agora veja esse trecho que vem ativo, logo abaixo:

        ${aHref}?id=${res.results[x].url.split("/")[5]}


        o trecho ${aHref} vai vir preenchido..por exemplo "./person.html"
        ...  depois com padrao fixo '?id='  

        e depois com ${res.results[x].url.split("/")[5]}
        nisso aqui o valor de x (que é uma url), recebe um comando
        chamado 'url.split("condiçao de split")'[indice do objeto]'
        uma url de exemplo :https://www.youtube.com/watch  
        se aplicarmos o url.split com ("condiçao") porem ("/")
        isso REMOVERÁ TODOS OS "/" da url tornando o "/" como
        intervalo entre elementos de um objeto .. entao nosso exemplo ficaria como
           [https:, www.youtube.com, watch]  <- gerando um array/objeto com 3 elementos.
           esse é o split.
           e na sequencia dizemos desse split, qual é o indice que queremos o valor...  no nosso projeto abaixo queremos SEMPRE o valor que estiver na posição [5], pois este será o numero pra concluir a criação do link

        */
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








/*   1    Busca pessoas
        essa funçao começa dando um valor ("people")
        pra uma função chamada makeRequest  que joga o ("people")
        dentro de uma fetch (a makeRequest é a primeira funçao ativa, está lá no alto com o 2 )
        Reparamos que toda função terá uma makeRequest com um ("valor") que 
        será colocado na fetch - e os '.then' que dão retorno, serao usados 
        nas funcões 'getPeople, getPlanet'...etc

        como essa é a funçao getPeople, então ela prossegue:
        cria uma variável 'res' e o torna res.json() via arrow function.
        e  'res' ativa via arrow function createContent lhe dando 3 valores
        (res, "list-people", "./person.html")

        a createContent vai pegar esses tres valores,   
        esses 3 valores mudam dependendo da função getPeople, getPlanets etc...
        confira! 
        vamos ali no alto olhar entao o função 3 - createContent
        receber os valores e criar conteúdo com link!
*/
function getPeople() {
    makeRequest("people")
        .then(res => res.json())
        .then(res => createContent(res, "list-people", "./person.html"))
}

/* Busca planetas
   é uma funçao onLoad dentro de Planets.html
   essa pagina quando abrir carrega lista de planetas
   e cada planeta é um link para planeta individual com características
   que já nao serao mais links.

*/ 
function getPlanets() {
    makeRequest("planets")
        .then(res => res.json())
        .then(res => createContent(res, "list-planets", "./planet.html"))
}

// Busca filmes -onLoad dentro de films.html
function getFilms() {
    makeRequest("films")
        .then(res => res.json())
        .then(res => createContent(res, "list-films", "./film.html"));
}

// Busca espécies -onLoad dentro de species.html
function getSpecies() {
    makeRequest("species")
        .then(res => res.json())
        .then(res => createContent(res, "list-species", "./specie.html"));
}

// Busca veículos -onLoad dentro de vehicles.html
function getVehicles() {
    makeRequest("vehicles")
        .then(res => res.json())
        .then(res => createContent(res, "list-vehicles", "./vehicle.html"));
}

// Busca naves -onLoad dentro de starships.html
function getStarships() {
    makeRequest("starships")
        .then(res => res.json())
        .then(res => createContent(res, "list-starships", "./starship.html"));
}



/* getPerson()
--nesse projeto tivemos um problema nesta estapa, pois a makeRequest()
até neste momento trabalhou com valores unicos, tipo "especies" ou "people", e nao possuiam paginas subsequentes como ex.: "especies/1" "especies/2"..
porém neste nivel de construção do site, o conteúdo coletado na API passa a ser subdividido exatamente como descrito acima por ultimo. 
Essa problematica foi superada com um by-pass  simples...  uma variável 'id' que insere parte da declaração feita na makeRequest()

A funçao getPerson vai primeiramente criar a const id pra buscar uma informaçao de quem aciona ela, que nesse caso sera um valor url tipo exemplo: "https://swapi.dev/api/people/1"
e  ..  vai pegar isso lá em 'window.location.HREF' - é lá que tem essa informação,(e muito mais informações extras),  VAI APLICAR no href a regra SPLIT!
com o critério ("id="), ou seja , da informação que recolher no href, split vai remover "id=", e com isso gerar um array, desse array vamos coletar em nossa variável 'id' a informação contida no indice [1].

"-E como encontramos o que foi 'splitado' pra poder escolher o índice? "
(basta fazermos um console.log(window.location) e analizar o console, lá dentro 
estarão todos as interações possíveis com 'window')

escolhido o indice 1 temos o id pra função continuar com a makeRequest(),
e no valor declaramos (`exemplo/${id}`)
simplesmente infalível ... 
.then  cria 'res' como json()
'res' passa a ser nossa variável contenente das informações
à partir disso é questão apenas de passar dados via DOM para o HTML.
*/
function getPerson() {
    const id = window.location.href.split("id=")[1]
        
    makeRequest(`people/${id}`)
        .then(res => res.json())
        .then(res => {
            const ul = document.getElementById('individual')
            const li = document.createElement('li')
            const name = document.createElement('name')
            name.innerHTML = `<p><strong>Nome:</strong> ${res.name} </p>`
            const gender = document.createElement('gender')
            gender.innerHTML = `<p><strong>Sexo:</strong> ${res.gender} (masculino) </p>`
            const height = document.createElement('height')
            height.innerHTML = `<p><strong>Altura:</strong> ${res.height}cm</p>`
            const massa = document.createElement('massa')
            massa.innerHTML = `<p><strong>Massa:</strong> ${res.mass}kg</p>`
            const hair = document.createElement('hair')
            hair.innerHTML = `<p><strong>Cabelo:</strong> ${res.hair_color} (loiro) </p>`
            const skin = document.createElement('skin')
            skin.innerHTML = `<p><strong>Cor da pele:</strong> ${res.skin_color} (branca)</p>`
            const eye = document.createElement('eye')
            eye.innerHTML = `<p><strong>Cor dos olhos:</strong> ${res.eye_color} (azul)</p>`
            const ano = document.createElement('ano')
            ano.innerHTML = `<p><strong>Ano de nascimento:</strong> ${res.birth_year} (BBY-before Battle Yavin-antes da batalha de Yavin) </p>`

            ul.appendChild(li)
            li.appendChild(name)
            ul.appendChild(li)
            li.appendChild(gender)
            ul.appendChild(li)
            li.appendChild(height)
            ul.appendChild(li)
            li.appendChild(massa)
            ul.appendChild(li)
            li.appendChild(hair)
            ul.appendChild(li)
            li.appendChild(skin)
            ul.appendChild(li)
            li.appendChild(eye)
            ul.appendChild(li)
            li.appendChild(ano)  
            fetch (plan1)
            .then (planets => {
                planets.json()
            .then (plans => {
                const planeta = document.createElement('planeta')
            planeta.innerHTML = `<p><strong>Planeta natal:</strong> ${plans.name}</p>`
            ul.appendChild(li)
            li.appendChild(planeta)
        })
            })
        }).catch(err => console.error('error!', err ))
    }

    
   /* 
    */
function getPlanet() {}
function getFilm() {}
function getSpecies() {}
function getVehicle() {}
function getStarship() {}