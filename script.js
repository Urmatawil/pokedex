const poke_container = document.querySelector('.container')
const poke_count = 150

const fetchPokemons = async() => {
    for(let i = 1; i <= poke_count; i++) {
       await getPokemon(i)
    }
}

const getPokemon = async(id) =>{
    const url = `https://pokeapi.co/api/v2/pokemon/${id}`
    const result = await fetch(url)
    const poke = await result.json()
    createPokeCard(poke)
}

const createPokeCard = (pokemon) =>{
    const pokemonEl = document.createElement('div')
    pokemonEl.classList.add('pokemon')

    const name = pokemon.name[0].toUpperCase()+pokemon.name.slice(1)
    const id = pokemon.id.toString().padStart(3, '0')
    /* tipos de pokemon */
    const poke_types = pokemon.types.map(type => type.type.name)
    const [color1,color2]=poke_types;

    !color2?
    pokemonEl.style.backgroundColor = `var(--${color1})`: 
    pokemonEl.style.backgroundImage = `linear-gradient(to right, var(--${color1}), var(--${color2}))`

    const pokeInnerHTML = `
        <div class="img-container">
            <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.id}.png" alt="${name}" loading="lazy">
		</div>
		<div class="info">
			<span class="number">${id}</span>
			<h3>${name}</h3>
            <div class="color">
			<small class="type">Type:${poke_types}</small>
            </div>
		</div>
    `

    pokemonEl.innerHTML = pokeInnerHTML
    poke_container.appendChild(pokemonEl)

}

fetchPokemons()