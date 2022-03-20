const fetchPokemon = () => {
    const pokeNameInput = document.getElementById("pokeName");
    let pokeName = pokeNameInput.value;
    pokeName = pokeName.toLowerCase();
    console.log(pokeName);
    const url = `https://pokeapi.co/api/v2/pokemon/${pokeName}`;
    fetch(url).then((res) => {
        if (res.status != "200") {
            console.log(res);
            pokeImage("./pokemon-sad.gif")
        } else {
            return res.json();
        }
    }).then((data) => {
        if (data) {
            console.log(data);
            pokeImage(data['id']);
            pokemonName(data['name']);
            pokemonTipo(data['types']);
            pokemonHabilidad(data['abilities']);
            pokemonEstadisticas(data['stats']);
            pokemonMovimiento(data['moves']);
        }
    });
}
let i = 0;
const nextPokemon = () => {
    i++;
    const url = `https://pokeapi.co/api/v2/pokemon/${i}`;
    fetch(url).then((res) => {
        if (res.status != "200") {
            console.log(res);
            pokeImage("./pokemon-sad.gif")
        } else {
            return res.json();
        }
    }).then((data) => {
        if (data) {
            console.log(data);
            pokeImage(data['id']);
            pokemonName(data['name']);
            pokemonTipo(data['types']);
            pokemonHabilidad(data['abilities']);
            pokemonEstadisticas(data['stats']);
            pokemonMovimiento(data['moves']);
        }
    });
}

const previosPokemon = () => {
    if (i > 0) {
        i--;
        const url = `https://pokeapi.co/api/v2/pokemon/${i}`;
        fetch(url).then((res) => {
            if (res.status != "200") {
                console.log(res);
                pokeImage("./pokemon-sad.gif")
            } else {
                return res.json();
            }
        }).then((data) => {
            if (data) {
                console.log(data);
                pokeImage(data['id']);
                pokemonName(data['name']);
                pokemonTipo(data['types']);
                pokemonHabilidad(data['abilities']);
                pokemonEstadisticas(data['stats']);
                pokemonMovimiento(data['moves']);
            }
        });
    }
}

const pokemonEstadisticas = (pokeEstadisticas) => {
    let ctx = document.getElementById('myChart').getContext('2d');
    if (window.grafica) {
        window.grafica.clear();
        window.grafica.destroy();
    }
    window.grafica = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: [
                'HP',
                'ATK',
                'DEF',
                'SP ATK',
                'SP DEF',
                'SPEED',
            ],
            datasets: [{
                label: 'Estadisticas',
                data: [
                    pokeEstadisticas[0]['base_stat'],
                    pokeEstadisticas[1]['base_stat'],
                    pokeEstadisticas[2]['base_stat'],
                    pokeEstadisticas[3]['base_stat'],
                    pokeEstadisticas[4]['base_stat'],
                    pokeEstadisticas[5]['base_stat']
                ],
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(153, 102, 255, 0.2)',
                    'rgba(255, 159, 64, 0.2)'
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 159, 64, 1)'
                ],
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });
}

const pokemonMovimiento = (pokeMove) => {
    let id_pokemonMovimiento = document.getElementById("pokemon-movimientos");
    id_pokemonMovimiento.innerHTML = "";
    for (movimiento in pokeMove) {
        id_pokemonMovimiento.innerHTML += `<span class="badge bg-danger me-2 mb-2">${pokeMove[movimiento].move['name']}</span>`;
    }
}

const pokemonHabilidad = (pokeHabilidad) => {
    let id_pokemonHabilidad = document.getElementById("pokemon-habilidad");
    id_pokemonHabilidad.innerHTML = "";
    for (habilidad in pokeHabilidad) {
        id_pokemonHabilidad.innerHTML += `<span class="badge bg-success me-2 mb-2">${pokeHabilidad[habilidad].ability['name']}</span>`;
    }
}

const pokemonTipo = (pokeTipos) => {
    let id_pokemonTipo = document.getElementById("pokemon-tipo");
    id_pokemonTipo.innerHTML = "";
    for (tipo in pokeTipos) {
        id_pokemonTipo.innerHTML += `<span class="badge bg-primary me-2 mb-2">${pokeTipos[tipo].type['name']}</span>`;
    }
}

const pokemonName = (pokemon) => {
    const id_pokename = document.getElementById("pokemon-name");
    id_pokename.innerText = pokemon.toUpperCase();
}

const pokeImage = (id) => {
    const pokePhoto = document.getElementById("pokeImg");
    if (id < 100) {
        id = "0" + id;
        if (id < 10)
            id = "0" + id;
    }
    let url = `https://assets.pokemon.com/assets/cms2/img/pokedex/full/${id}.png`;
    pokePhoto.src = url;
}