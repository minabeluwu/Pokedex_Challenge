API_URL = "https://pokeapi.co/api/v2/pokemon/";

class PokeAPI {
  getPokemonList() {
    return this.miFetchAcortado(
      "https://pokeapi.co/api/v2/pokemon/?limit=10000"
    );
  }
  async getPokemonListAsync() {
    try {
      const response = await fetch(
        "https://pokeapi.co/api/v2/pokemon/?limit=10000"
      );
      const json = await response.json();
      return json;
    } catch (error) {
      return error;
    }
  }
  getPokemonByName(name) {
    return this.miFetchAcortado(`${API_URL + name}`);
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
