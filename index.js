const textInput = document.getElementById("search-input");
const searchBtn = document.getElementById("search-button");
const pokemonName = document.getElementById("pokemon-name");
const pokemonId = document.getElementById("pokemon-id");
const pokemonHeight = document.getElementById("height");
const pokemonWeight = document.getElementById("weight");
const pokemonSprite = document.getElementById("sprite");
const pokemonTypes = document.getElementById("types");
const pokemonHP = document.getElementById("hp");
const pokemonAttack = document.getElementById("attack");
const pokemonDefense = document.getElementById("defense");
const pokemonSpecialAttack = document.getElementById("special-attack");
const pokemonSpecialDefense = document.getElementById("special-defense");
const pokemonSpeed = document.getElementById("speed");
const allPokemonUrl = "https://pokeapi-proxy.freecodecamp.rocks/api/pokemon"

const fetchAllData = async () =>{
  try {
    const response = await fetch(allPokemonUrl);
    const data = await response.json();
    parseData(data);
  } catch (err) {
    console.log(err);
  }
}

const fetchPokemonData = async (str) => {
  try {
    const response = await fetch(allPokemonUrl.concat(`/${str}`));
    const pokemonData = await response.json();
    showPokemonData(pokemonData);
  } catch (err) {
    console.log(err);
  }
}

const showPokemonData = (data) => {
  const { name, id, weight, height, stats, types, sprites } = data;
  console.log("types: ", types);
  const sprite = sprites.front_default;
  const health = stats[0].base_stat;
  const attack = stats[1].base_stat;
  const defense = stats[2].base_stat;
  const specialAttack = stats[3].base_stat;
  const specialDefense = stats[4].base_stat;
  const speed = stats[5].base_stat;

  pokemonName.textContent = `${name.toUpperCase()}`;
  pokemonId.textContent = `#${id}`;
  pokemonWeight.textContent = `Weight: ${weight}`;
  pokemonHeight.textContent = `Height: ${height}`;
  pokemonSprite.src = sprite;
  pokemonHP.textContent = health;
  pokemonAttack.textContent = attack;
  pokemonDefense.textContent = defense;
  pokemonSpecialAttack.textContent = specialAttack;
  pokemonSpecialDefense.textContent = specialDefense;
  pokemonSpeed.textContent = speed;
  pokemonTypes.innerHTML = types.map((obj) => `<span class="pokemon-type ${obj.type.name}">${obj.type.name.toUpperCase()}</span>`).join("");

  
}

const parseData = (data) => {
  const userInput = textInput.value.toLowerCase();
  const results = data.results;
  const name = results.map((obj) => obj.name);
  const ids = results.map((obj) => obj.id);

  if (!name.includes(userInput) && !ids.includes(Number(userInput))) {
    alert("Pokémon not found");
  } else {
    fetchPokemonData(userInput);
  }
}

searchBtn.addEventListener("click", fetchAllData);