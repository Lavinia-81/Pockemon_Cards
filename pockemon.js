document.querySelector("#find").addEventListener("click", fetchPokemon);

function capitalize(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

function toLowerCase(string) {
    return string.toLowerCase();
}

function fetchPokemon() {
    const name = document.querySelector("#pokeName").value.trim();
    if (!name) {
        displayError("Please enter a Pokemon name.");
        return;
    }

    const pokemonName = toLowerCase(name);

    fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`)
        .then(response => {
            if (!response.ok) {
                throw new Error("Pokemon not found");
            }
            return response.json();
        })
        .then(data => {
            displayPokemon(data);
        })
        .catch(err => {
            displayError(err.message);
        });
}

function displayPokemon(data) {
    document.querySelector(".resultContainer").innerHTML = `
        <div>
            <img src="${data.sprites.other["official-artwork"].front_default}" alt="${capitalize(data.name)}">
        </div>
        <div class="info">
            <h1>${capitalize(data.name)}</h1>
            <p>Weight: ${data.weight}</p>
        </div>`;
}

function displayError(message) {
    document.querySelector(".resultContainer").innerHTML = `<h4>${message} 😞</h4>`;
}
