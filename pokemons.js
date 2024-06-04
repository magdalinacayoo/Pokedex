const API_POKEMONS = "https://pokeapi.co/api/v2/pokemon/? limit=20&0ffset=0";
const API_DE_IMAGENS = "https://raw.githubusercontent.com/pokeAPI/sprites/master/sprites/pokemon";

let apiPaginaProximo = "";
let apiPaginaAnterior = "";

let pokemons = [];

const loading = document.createElement("div");

loading.classList.add("loader");

document.addEventListener("DOMContentLoaded", function () {

    const caixaPokemons = document.getElementById("caixaPokemons"); 
    const btnAnterior = document.getElementById("btnAnterior");
    const btnProximo = document.getElementById("btnProximo");

    BuscarPokemons(API_POKEMONS);

    btnAnterior.addEventListener("click", () => {
        if (apiPaginaAnterior) BuscarPokemons(apiPaginaAnterior);
    });
    btnProximo.addEventListener("click", () => {
        if (apiPaginaProximo) BuscarPokemons(apiPaginaProximo);
    });

    function BuscarPokemons(url) {
        pokemons = [];

        caixaPokemons.innerText = "";
        caixaPokemons.append(loading);

        fetch(url, { headers: { Accept: "*" } })
            .then(resposta => resposta.json())
            .then(respostaApi => {

                caixaPokemons.innerText = "";
                const { count, next, previous, results } = respostaApi;

                if (previous) {
                    apiPaginaAnterior = previous;
                } else {
                    apiPaginaAnterior = "";
                }
                if (next) {
                    apiPaginaProximo = next;
                } else {
                    apiPaginaProximo = "";
                }

                if(results.length){
                    pokemons = results
                }

                pokemons.forEach(pokemon => {

                    const urlImagemPokemon = API_DE_IMAGENS + pokemon.url.split("pokemon")[1].slice(0, -1) + ".png"
                    const divDopokemon = document.createElement("div");
                    const nomeDopokemon = document.createElement("h3");
                    const imagemDoPokemon = document.createElement("img");
                    imagemDoPokemon.width = 96;
                    imagemDoPokemon.height = 96;
                    imagemDoPokemon.src = urlImagemPokemon;

                    nomeDopokemon.innerText = pokemon.name
                    divDopokemon.append(nomeDopokemon)
                    divDopokemon.append(imagemDoPokemon)

                    caixaPokemons.append(divDopokemon)
                })



            });

    }
});
