const searchInput = document.getElementById('search');
const pokemonContainer = document.querySelector('.pokemon-container');

// Función para cargar los datos de la PokeAPI
async function fetchPokemonData() {
  try {
    const response = await fetch('https://pokeapi.co/api/v2/pokemon/?limit=150');
    const data = await response.json();
    const pokemonList = data.results;

    pokemonContainer.innerHTML = '';

    pokemonList.forEach(async (pokemon) => {
      const response = await fetch(pokemon.url);
      const data = await response.json();

      const pokemonDiv = document.createElement('div');
      pokemonDiv.classList.add('pokemon');

      const pokemonName = document.createElement('h3');
      pokemonName.textContent = data.name;

      const pokemonImage = document.createElement('img');
      pokemonImage.src = data.sprites.front_default;
      pokemonImage.alt = data.name;

      const pokemonTypes = document.createElement('p');
      pokemonTypes.textContent = `Tipo(s): ${data.types.map((type) => type.type.name).join(', ')}`;

      const pokemonAbilities = document.createElement('p');
      pokemonAbilities.textContent = `Habilidad: ${data.abilities[0].ability.name}`;

      const pokemonHeight = document.createElement('p');
      pokemonHeight.textContent = `Altura: ${data.height / 10} m`;

      const pokemonWeight = document.createElement('p');
      pokemonWeight.textContent = `Peso: ${data.weight / 10} kg`;

      const pokemonSpeed = document.createElement('p');
      pokemonSpeed.textContent = `Velocidad: ${data.stats.find((stat) => stat.stat.name === 'speed').base_stat}`;

      const pokemonMoves = document.createElement('p');
      pokemonMoves.textContent = `Movimientos: ${data.moves
        .map((move) => move.move.name)
        .slice(0, 5)
        .join(', ')}`;

      pokemonDiv.appendChild(pokemonName);
      pokemonDiv.appendChild(pokemonImage);
      pokemonDiv.appendChild(pokemonTypes);
      pokemonDiv.appendChild(pokemonAbilities);
      pokemonDiv.appendChild(pokemonHeight);
      pokemonDiv.appendChild(pokemonWeight);
      pokemonDiv.appendChild(pokemonSpeed);
      pokemonDiv.appendChild(pokemonMoves);

      pokemonContainer.appendChild(pokemonDiv);
    });
  } catch (error) {
    console.error('Error fetching data:', error);
  }
}

// Cargar los datos al cargar la página
fetchPokemonData();
