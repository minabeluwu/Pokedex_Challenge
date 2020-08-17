class PokeAPI {
  root = "https://pokeapi.co/api/v2/";

  getPokemonList() {
    return this.miFetchAcortado(`${this.root}pokemon/?limit=151`);
  }
  async getPokemonListAsync() {
    try {
      const response = await fetch(`${this.root}pokemon/?limit=151`);
      const json = await response.json();
      return json;
    } catch (error) {
      return error;
    }
  }
  getPokemonByName(name) {
    return this.miFetchAcortado(`${this.root}pokemon/${name}`);
  }

  async getNextPokemon(name) {
    const { results } = await this.getPokemonList();

    const idx = results.findIndex((item) => {
      return item.name === name;
    });

    const priorPokemon = results[idx - 1];
    const nextPokemon = results[idx + 1];

    return [priorPokemon, nextPokemon];
  }
  miFetchAcortado(url) {
    return new Promise((resolve, reject) => {
      fetch(url)
        .then((res) => res.json())
        .then((json) => resolve(json))
        .catch((err) => reject(err));
    });
  }
}

export default PokeAPI;
