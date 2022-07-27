const getPokemonUrl = id => `https://pokeapi.co/api/v2/pokemon/${id}`;

const fetchPokemon = () => {
    const pokemonPromises = [];

    for(let i =1; i <= 151; i++) {
        pokemonPromises.push(
            fetch(getPokemonUrl(i)).then((response) => response.json())
        );
    }

    Promise.all(pokemonPromises).then((pokemons) => {
        const listPokemons = pokemons.reduce((accumulator, pokemon) => {
            const types = pokemon.types.map((typeInfo) => typeInfo.type.name)

            accumulator += `
                            <li class="card ${types[0]}">
                            <img class="card-image" alt="${pokemon.name}"
                            src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.id}.png">
                            <h2 class="card-title">${pokemon.id}. ${pokemon.name}</h2>
                            <p class="card-subtitle">${types.join(" | ")}</p>
                            </li>`;
            return accumulator;
        }, 
        "");

        const ul = document.querySelector('[data="pokedex"]');
        ul.innerHTML = listPokemons;
    })
};

fetchPokemon();

//Desafio

//Dividir a responsabilidade pra várias funções. Por exemplo, esse código tem uma função que faz tudo e não
//é uma boa prática. Uma boa prática seria quebrar a função em várias outras pois fica mais fácil de dar
//manutenção no código.

//Atribuir mais funcionalidades para a pokedex. Por exemplo, clicar no pokemon e aparecer mais informações
//Essas informações tem na API e já foi feita a requisição pelo fetch. A questão é colocar elas.
