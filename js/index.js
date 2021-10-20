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
        .then(res => {
                   
            createContent(res, "list-people", "./person.html")
            const h1 = document.getElementById('h1')
            const skip = document.getElementById('skip')
            const count = document.getElementById('counter')
            const li = document.createElement('li') 
            const li2 = document.createElement('li')
            li.addEventListener("click", next => console.log('clicou'))
            li2.innerHTML = `<p>Total: ${res.count}</p>`
            skip.appendChild(li)
            count.appendChild(li2) 
            if(res.previous == null ){
                li.innerHTML = ` `
                skip.appendChild(li)
            }else{
                li.innerHTML = `<p>prev</p>`
                skip.appendChild(li)
            }
            if(res.next == null){
                li.innerHTML = ` `
                skip.appendChild(li)
            }else{
                li.innerHTML = `<p>next</p>`
                skip.appendChild(li)
            }
        })
    } 

/*
if(res.previous == null ){
            
            li.innerHTML = ` `
            skip.appendChild(li)
             
        }else{
             
            li.innerHTML = `<p>prev</p>`
            skip.appendChild(li)
            
        }

        if(res.next == null){
            
            li.innerHTML = ` `
            skip.appendChild(li)
            
        }else{ 
            
            li.innerHTML = `<p><a href="">next</a></p>`
            skip.appendChild(li)
           
        }
*/





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
            const name = document.createElement('li')
            name.innerHTML = `<p><strong>Nome:</strong> ${res.name} </p>`
            const gender = document.createElement('li')
            gender.innerHTML = `<p><strong>Sexo:</strong> ${res.gender}</p>`
            const height = document.createElement('li')
            height.innerHTML = `<p><strong>Altura:</strong> ${res.height}cm</p>`
            const massa = document.createElement('li')
            massa.innerHTML = `<p><strong>Massa:</strong> ${res.mass}kg</p>`
            const hair = document.createElement('li')
            hair.innerHTML = `<p><strong>Cabelo:</strong> ${res.hair_color}</p>`
            const skin = document.createElement('li')
            skin.innerHTML = `<p><strong>Cor da pele:</strong> ${res.skin_color}</p>`
            const eye = document.createElement('li')
            eye.innerHTML = `<p><strong>Cor dos olhos:</strong> ${res.eye_color}</p>`
            const ano = document.createElement('li')
            ano.innerHTML = `<p><strong>Ano de nascimento:</strong> ${res.birth_year}</p>`

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
            
                        
           let planet = res.homeworld.split("/")[5]
            makeRequest(`planets/${planet}/`)
            .then(plt => plt.json())
             .then(plt => {
                
                const ul = document.getElementById('individual')
                const li = document.createElement('li')
                ul.appendChild(li)
                li.innerHTML = `<p><strong>Planeta de origem:</strong><a href="">${plt.name}</a></p>`
                }) 
                })
                }
            
 
/*  getPlanet() 

essa função faz cria uma 'const id' para coletar especificamente um dado via
window.location.href    essa informação passou pelo famoso 'split' ..
essa funcção tem se mostrado muito útil. o elemento na posição 1 é o que queremos
https://swapi.dev/api/planet?id=1  - tirando o id=   temos um array com duas posições:   [ https://swapi.dev/api/planet? ,  1  ]  
entao dois elementos  -  o 0  que corresponde a httpblablabla... 
e o elemento 1   .  que nesse caso tem valor 1
isso monta a const id e vai pra makeRequest().
daih por diante segue o processo como ja vimos acima em outras funções.
Estes passos serão repetidos nas proximas funções portando serão comentados apenas variações significativas do código.

*/ 
            function getPlanet() {
    
            const id = window.location.href.split("id=")[1]
            
            makeRequest(`planets/${id}/`)
        
            .then(res => res.json())
            .then(res => {
            console.log(res)
            const ul = document.getElementById('individual')
            const li = document.createElement('li')
            const name = document.createElement('li')
            name.innerHTML = `<p><strong>Nome:</strong> ${res.name} </p>`
            const diameter = document.createElement('li')
            diameter.innerHTML = `<p><strong>Diâmetro:</strong> ${res.diameter} </p>`
            const climate = document.createElement('li')
            climate.innerHTML = `<p><strong>Clima:</strong> ${res.climate} </p>`
            const films = document.createElement('li')
            films.innerHTML = `<p><strong>Filmes:</strong> ${res.films} </p>`
            const gravity = document.createElement('li')
            gravity.innerHTML = `<p><strong>Gravidade:</strong> ${res.gravity} </p>`
            const orbit = document.createElement('li')
            orbit.innerHTML = `<p><strong>Período orbital:</strong> ${res.orbital_period} </p>`
            const pop = document.createElement('li')
            pop.innerHTML = `<p><strong>População:</strong> ${res.population} </p>`
            const resi = document.createElement('li')
            resi.innerHTML = `<p><strong>Residentes:</strong> ${res.residents} </p>`
            const rot = document.createElement('li')
            rot.innerHTML = `<p><strong>Período de rotação:</strong> ${res.rotation_period} </p>`
            const sw = document.createElement('li')
            sw.innerHTML = `<p><strong>Água na superfície:</strong> ${res.surface_water} </p>`
            const terrain = document.createElement('li')
            terrain.innerHTML = `<p><strong>Terreno:</strong> ${res.terrain} </p>`
            ul.appendChild(li)
            li.appendChild(name)
            ul.appendChild(li)
            li.appendChild(diameter)
            ul.appendChild(li)
            li.appendChild(climate)
            ul.appendChild(li)
            li.appendChild(films)
            ul.appendChild(li)
            li.appendChild(gravity)
            ul.appendChild(li)
            li.appendChild(orbit)
            ul.appendChild(li)
            li.appendChild(pop)
            ul.appendChild(li)
            li.appendChild(resi)
            ul.appendChild(li)
            li.appendChild(rot)
            ul.appendChild(li)
            li.appendChild(sw)
            ul.appendChild(li)
            li.appendChild(terrain)
        })
        }

function getFilm() {

    const id = window.location.href.split("id=")[1]
            
    makeRequest(`films/${id}/`)
    .then(res => res.json())
    .then(res => {
    
      const ul = document.getElementById('individual')
      const li = document.createElement('li')
      const title = document.createElement('li')
      title.innerHTML = `<p><strong>Título:</strong> ${res.title} </p>`
      const characters = document.createElement('li')
      characters.innerHTML = `<p><strong>**Personagens:</strong> 18 </p>`
      const director = document.createElement('director')
      director.innerHTML = `<p><strong>Diretor:</strong> ${res.director} </p>`
      const opening_crawl = document.createElement('opening_crawl')
      opening_crawl.innerHTML = `<p><strong>**Texto de abertura:</strong>"It is a period of civil war..." </p>`
      const episode_id = document.createElement('pisode_id')
      episode_id.innerHTML = `<p><strong>Id do episódio:</strong> ${res.episode_id} </p>`
      const planets = document.createElement('planets')
      planets.innerHTML = `<p><strong>**Planetas:</strong> 3 </p>`
      const producer = document.createElement('producer')
      producer.innerHTML = `<p><strong>Protudor:</strong> ${res.producer} </p>`
      const release_date = document.createElement('release_date')
      release_date.innerHTML = `<p><strong>Data de lançamento:</strong> ${res.release_date} </p>`
      const species = document.createElement('species')
      species.innerHTML = `<p><strong>**Espécies:</strong> 5</p>`     
      const starships = document.createElement('starships')
      starships.innerHTML = `<p><strong>**Naves Espaciais: 8 </p>`
      const vehicles = document.createElement('vehicles')
      vehicles.innerHTML = `<p><strong>**Veículos:</strong> 4</p>`

      ul.appendChild(li)
      li.appendChild(title)
      ul.appendChild(li)
      li.appendChild(characters)
      ul.appendChild(li)
      li.appendChild(director)
      ul.appendChild(li)
      li.appendChild(producer)
      ul.appendChild(li)
      li.appendChild(release_date)
      ul.appendChild(li)
      li.appendChild(opening_crawl)
      ul.appendChild(li)
      li.appendChild(episode_id)
      ul.appendChild(li)
      li.appendChild(planets)
      ul.appendChild(li)
      li.appendChild(species)
      ul.appendChild(li)
      li.appendChild(starships)
      ul.appendChild(li)
      li.appendChild(vehicles)      
 })
}


function getSpecie() {
   makeRequest(`species`)
   .then(res => res.json())
   .then(res => {
         
         for (let x = 0; x < res.results.length; x++){
            const ul = document.getElementById('individual')
            const li = document.createElement("li")
            const a = document.createElement("a")
            const formattedHref = `${aHref}?id=${res.results[x].url.split("/")[5]}`;
            a.setAttribute("href", formattedHref);
            li.appendChild(a)
            ul.appendChild(li)
         } 
        })
}
   
function getSpeciel() {
    const id = window.location.href.split("id=")[1]
    makeRequest(`species/${id}/`)
    .then(res => res.json())
    .then(res =>{
        const ul = document.getElementById('individual')
        const li = document.createElement('li')
        const name = document.createElement('li')
        name.innerHTML = `<p><strong>Nome:</strong> ${res.name} </p>`
        const language = document.createElement('li')
        language.innerHTML = `<p><strong>Língua:</strong> ${res.language} </p>`
        const average_height = document.createElement('li')
        average_height.innerHTML = `<p><strong>Altura média:</strong> ${res.average_height} </p>`
        const average_lifespan = document.createElement('li')
        average_lifespan.innerHTML = `<p><strong>Longevidade média:</strong> ${res.average_lifespan} </p>`
        const classification = document.createElement('li')
        classification.innerHTML = `<p><strong>Classificação:</strong> ${res.classification} </p>`
        const designation = document.createElement('li')
        designation.innerHTML = `<p><strong>Designação:</strong> ${res.designation} </p>`
        const eye_colors = document.createElement('li')
        eye_colors.innerHTML = `<p><strong>Cor dos olhos:</strong> ${res.eye_colors} </p>`
        const films = document.createElement('li')
        films.innerHTML = `<p><strong>**Filmes:</strong> 6 </p>`
        const hair_colors = document.createElement('li')
        hair_colors.innerHTML = `<p><strong>Cor dos cabelos:</strong> ${res.hair_colors} </p>`
        const homeworld = document.createElement('li')
        homeworld.innerHTML = `<p><strong>**Planeta de origem:</strong> Terra </p>`
        const people = document.createElement('li')
        people.innerHTML = `<p><strong>**Pessoas:</strong> 4 </p>`
        const skin_colors = document.createElement('li')
        skin_colors.innerHTML = `<p><strong>Cores de pele:</strong> ${res.skin_colors} </p>`

        ul.appendChild(li)
        li.appendChild(name)
        ul.appendChild(li)
        li.appendChild(language)
        ul.appendChild(li)
        li.appendChild(average_height)
        ul.appendChild(li)
        li.appendChild(average_lifespan)
        ul.appendChild(li)
        li.appendChild(classification)
        ul.appendChild(li)
        li.appendChild(designation)
        ul.appendChild(li)
        li.appendChild(eye_colors)
        ul.appendChild(li)
        li.appendChild(films)
        ul.appendChild(li)
        li.appendChild(hair_colors)
        ul.appendChild(li)
        li.appendChild(homeworld)
        ul.appendChild(li)
        li.appendChild(people)
        ul.appendChild(li)
        li.appendChild(skin_colors)
    })
}


function getVehicle() {
    makeRequest(`vehicles`)
    .then(res => res.json())
    .then(res => {
          
        for (let x = 0; x < res.results.length; x++){
            const ul = document.getElementById('individual')
            const li = document.createElement("li")
            const a = document.createElement("a")
            const formattedHref = `${aHref}?id=${res.results[x].url.split("/")[5]}`;
            a.setAttribute("href", formattedHref);
            li.appendChild(a)
            ul.appendChild(li)
          } 
         })

}

function getVehiclel() {
    const id = window.location.href.split("id=")[1]
    makeRequest(`vehicles/${id}/`)
    .then(res => res.json())
    .then(res => {
       
        const ul = document.getElementById('individual')
        const li = document.createElement('li')
        const name = document.createElement('li')
        name.innerHTML = `<p><strong>Nome:</strong> ${res.name} </p>`
        const passengers = document.createElement('li')
        passengers.innerHTML = `<p><strong>Passageiros:</strong> ${res.passengers} </p>`
        const crew = document.createElement('li')
        crew.innerHTML = `<p><strong>Tripulação:</strong> ${res.crew} </p>`
        const pilots = document.createElement('li')
        pilots.innerHTML = `<p><strong>Pilotos:</strong> ${res.pilots} </p>`
        const vehicle_class = document.createElement('li')
        vehicle_class.innerHTML = `<p><strong>Classe de Veículo:</strong> ${res.vehicle_class} </p>`
        const length = document.createElement('li')
        length.innerHTML = `<p><strong>Comprimento:</strong> ${res.length} </p>`
        const manufacturer = document.createElement('li')
        manufacturer.innerHTML = `<p><strong>Fabricante:</strong> ${res.manufacturer} </p>`
        const max_atmosphering_speed = document.createElement('li')
        max_atmosphering_speed.innerHTML = `<p><strong>Velocidade máxima em atmosfera:</strong> ${res.max_atmosphering_speed}km/h </p>`
        const model = document.createElement('li')
        model.innerHTML = `<p><strong>Modelo:</strong> ${res.model} </p>`
        const cargo_capacity = document.createElement('li')
        cargo_capacity.innerHTML = `<p><strong>Capacidade de carga:</strong> ${res.cargo_capacity}kg </p>`
        const consumables = document.createElement('li')
        consumables.innerHTML = `<p><strong>Autonomia de estoque:</strong> ${res.consumables} </p>`
        const cost_in_credits = document.createElement('li')
        cost_in_credits.innerHTML = `<p><strong>Valor em créditos:</strong> ${res.cost_in_credits} </p>`
        const films = document.createElement('li')
        films.innerHTML = `<p><strong>**Filmes:</strong> 2 </p>`
        
        ul.appendChild(li)
        li.appendChild(name)
        ul.appendChild(li)
        li.appendChild(cost_in_credits)
        ul.appendChild(li)
        li.appendChild(passengers)
        ul.appendChild(li)
        li.appendChild(crew)
        ul.appendChild(li)
        li.appendChild(pilots)
        ul.appendChild(li)
        li.appendChild(vehicle_class)
        ul.appendChild(li)
        li.appendChild(length)
        ul.appendChild(li)
        li.appendChild(manufacturer)
        ul.appendChild(li)
        li.appendChild(max_atmosphering_speed)
        ul.appendChild(li)
        li.appendChild(model)
        ul.appendChild(li)
        li.appendChild(cargo_capacity)
        ul.appendChild(li)
        li.appendChild(consumables)
        ul.appendChild(li)
        li.appendChild(films)

    })
}
function getStarship() {
    makeRequest(`starships`)
    .then(res => res.json())
    .then(res => {
     
        for (let x = 0; x < res.results.length; x++){
            const ul = document.getElementById('individual')
            const li = document.createElement("li")
            const a = document.createElement("a")
            const formattedHref = `${aHref}?id=${res.results[x].url.split("/")[5]}`;
            a.setAttribute("href", formattedHref);
            li.appendChild(a)
            ul.appendChild(li)
        }
    })
    } 

function getStarshipel() {
    const id = window.location.href.split("id=")[1]
    makeRequest(`starships/${id}/`)
    .then(res => res.json())
    .then(res => {
        const ul = document.getElementById('individual')
        const li = document.createElement('li')
        const name = document.createElement('li')
        name.innerHTML = `<p><strong>Nome:</strong> ${res.name} </p>`
        const model = document.createElement('li')
        model.innerHTML = `<p><strong>Modelo:</strong> ${res.model} </p>`
        const cost = document.createElement('li')
        cost.innerHTML = `<p><strong>Custo em créditos:</strong> ${res.cost_in_credits} </p>`
        const speed = document.createElement('li')
        speed.innerHTML = `<p><strong>Velocidade máxima em atmosfera:</strong> ${res.max_atmosphering_speed}km/h </p>`
        const passengers = document.createElement('li')
        passengers.innerHTML = `<p><strong>Passageiros:</strong> ${res.passengers} </p>`
        const crew = document.createElement('li')
        crew.innerHTML = `<p><strong>Tripulação:</strong> ${res.crew} </p>`
        const hyper = document.createElement('li')
        hyper.innerHTML = `<p><strong>Força do Hyperdrive:</strong> ${res.hyperdrive_rating} </p>`
        const length = document.createElement('li')
        length.innerHTML = `<p><strong>Comprimento:</strong> ${res.length}m </p>`
        const pilots = document.createElement('li')
        pilots.innerHTML = `<p><strong>Pilotos:</strong> ${res.pilots} </p>`
        const sclass = document.createElement('li')
        sclass.innerHTML = `<p><strong>Classe de espaçonave:</strong> ${res.starship_class} </p>`
        const manufacturer = document.createElement('li')
        manufacturer.innerHTML = `<p><strong>Fabricante:</strong> ${res.manufacturer} </p>`
        const MGLT = document.createElement('li')
        MGLT.innerHTML = `<p><strong>MGLT:</strong> ${res.MGLT} </p>`
        const cargo = document.createElement('li')
        cargo.innerHTML = `<p><strong>Capacidade de carga:</strong> ${res.cargo_capacity}kg </p>`
        const consumables = document.createElement('li')
        consumables.innerHTML = `<p><strong>Autonomia de consumíveis:</strong> ${res.consumables} </p>`
        const films = document.createElement('li')
        films.innerHTML = `<p><strong>**Filmes:</strong> 3</p>`
        
        ul.appendChild(li)
        li.appendChild(name)
        ul.appendChild(li)
        li.appendChild(model)
        ul.appendChild(li)
        li.appendChild(cost)
        ul.appendChild(li)
        li.appendChild(speed)
        ul.appendChild(li)
        li.appendChild(passengers)
        ul.appendChild(li)
        li.appendChild(crew)
        ul.appendChild(li)
        li.appendChild(hyper)
        ul.appendChild(li)
        li.appendChild(length)
        ul.appendChild(li)
        li.appendChild(pilots)
        ul.appendChild(li)
        li.appendChild(sclass)
        ul.appendChild(li)
        li.appendChild(manufacturer)
        ul.appendChild(li)
        li.appendChild(MGLT)
        ul.appendChild(li)
        li.appendChild(cargo)
        ul.appendChild(li)
        li.appendChild(consumables)
        ul.appendChild(li)
        li.appendChild(films)

        
    })
}

/*
função counter() 
essa funçao serve para aproveitar uma informação da API
que tras a contagem total de  itens de determinada categoria.
assim que, não foi aplicada ao HTML de itens individuais, apenas aos 
HTML das categorias.
counter()    reconhece elemento h1 no HTML
em seguida captura o texto inserido no h1 e leva para minúsculas
em seguida aplica esse resultado na makeRequest()
esse resultado tras no array a informação  "count"
que é inserida em um objeto 'p'  de volta no HTML
*/

function counter() {
    const h1 = document.getElementById('h1')
    const h1ready = h1.innerText.toLowerCase()
    makeRequest(h1ready) 
     
    .then(res => res.json())
    .then(res => {
    
     const count = document.querySelector('h2')
     const p = document.createElement('p')
     p.innerHTML = `Total: ${res.count}`
     count.appendChild(p)


    })
}

function skip() {
    
    makeRequest("people")
    .then(res => res.json())
    .then(res => {
        
        const skip = document.getElementById('skip')
        const li = document.createElement('li')
 
        /* */
        if(res.previous == null ){
            
            li.innerHTML = ` `
            skip.appendChild(li)
             
        }else{
             
            li.innerHTML = `<p>prev</p>`
            skip.appendChild(li)
            
        }

        if(res.next == null){
            
            li.innerHTML = ` `
            skip.appendChild(li)
            
        }else{
             
            const page =
 
            
            li.innerHTML = `<p><a href="">next</a></p>`
            skip.appendChild(li)
           
        }
       
    })
}

function nextPage(){ 

const h1 = document.getElementById('h1')
const categ = h1.innerHTML.toLowerCase()
let x = 2
 
makeRequest(`${categ}/?page=${x}`)
.then(res => res.json())
.then(res => {
    console.log(res.results)
    


 
})
}


/*

const skip = document.getElementById('skip')
    const next = document.createElement('li')
    const ul = document.getElementById('list-people')

    for (let y = 0; y < res.results.length; y++) {
    const li = document.createElement('li')    
    const a = document.createElement("a");
    const formattedHref = `${aHref}?id=${x}`
    a.setAttribute("href", formattedHref);









next: 'https://swapi.dev/api/people/?page=2'

function nextPage(){ }

const skip = document.getElementById('skip')
const category = skip.innerText.toLowercase
let x = 1


makeRequest("${category}/?page=${x}")

const nextPage = res.results.next 

const formattedHref = `${aHref}?page=${res.next.split("/")[1]}`;
cons
people/?page=2


        // Coloca HREF no <a> com o valor formatado
        a.setAttribute("href", formattedHref);
        a.setAttribute("onclick", nextPage())
function getPeople() {
    makeRequest("people")
        .then(res => res.json())
        .then(res => createContent(res, "list-people", "./'person'.html"))
        const formattedHref = `${aHref}?id=${res.results[x].url.split("/")[5]}`;
}

function getPeople2() {
    makeRequest(`${categ}/${x}`)
        .then(res => res.json())
        .then(res => createContent(res, "list-people", "./person.html"))

${categ}/?page=${x}
*/
 




 

