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
const pokemonUrl = "https://pokeapi-proxy.freecodecamp.rocks/api/pokemon";
let pokemonData = [];

const fetchAllData = async () =>{
  try {
    const response = await fetch(pokemonUrl);
    const data = await response.json();
    data.results.forEach(obj => pokemonData.push(obj)); //store each pokemon object in pokemonData array
  } catch (err) {
    console.log(err);
  }
}

const fetchPokemonData = async (str) => {
  try {
    const response = await fetch(pokemonUrl.concat(`/${str}`));
    const data = await response.json();
    showPokemonData(data);
  } catch (err) {
    console.log(err);
  }
}

const showPokemonData = (data) => {
  const { name, id, weight, height, stats, types, sprites } = data;
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

const parseData = () => {
  const userInput = textInput.value.toLowerCase();  //get user input from text field in lowercase
  let searchResults = pokemonData.find(obj => obj.name === userInput || obj.id === Number(userInput));  //find the id or name the user enters
  if (!searchResults) {   //if not found
    alert("Pokemon not found!");
  } else {
    fetchPokemonData(userInput);
  }
}

fetchAllData();
searchBtn.addEventListener("click", parseData);