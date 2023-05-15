const pokedex = document.getElementById("pokedex");

// Generar un array con 20 números aleatorios entre 1 y 898
const randomNumbers = Array.from({ length: 8 }, () => Math.floor(Math.random() * 898) + 1);

// Obtener los datos de los Pokémon seleccionados
Promise.all(randomNumbers.map(number => fetch(`https://pokeapi.co/api/v2/pokemon/${number}`).then(response => response.json())))
    .then(pokemonData => {
        pokemonData.forEach(pokemon => {
            // Crear una tarjeta de Pokemon para cada resultado
            const card = document.createElement("div");
            card.className = "card";
            
            // Agregar la imagen del Pokemon a la tarjeta
            const image = document.createElement("img");
            image.src = pokemon.sprites.front_default;
            card.appendChild(image);

            // Agregar el nombre del Pokemon a la tarjeta
            const name = document.createElement("h2");
            name.innerHTML = pokemon.name;
            card.appendChild(name);

            // Agregar el botón "Mostrar más" a la tarjeta
            const button = document.createElement("button");
            button.innerHTML = "Mostrar más";
            button.addEventListener("click", function() {
                window.location.href = "pokemon.html?name=" + pokemon.name;
            });
            card.appendChild(button);

            // Agregar la tarjeta al contenedor de la pokedex
            pokedex.appendChild(card);
        });
    })
    .catch(error => console.log(error));
