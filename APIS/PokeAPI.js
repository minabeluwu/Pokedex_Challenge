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

    //metodo largo, pero mas amigable al performance
    const priorPokemon = results[idx - 1];
    const nextPokemon = results[idx + 1];
    return [priorPokemon, nextPokemon];

    //tambien puedo devolver el mismo objeto de la siguiente manera
    return [results[idx - 1], results[idx + 1]];

    //hetero el que lo lea
    //metodo "corto" pero itera por todo el array
    return results.filter(
      (item, index) => index === idx - 1 || index === idx + 1
    );

    //la idea es iterar en la lista devuelta por la API, conseguir donde esta ubicado el nombre de nuestro pokemon
    // despues de ubicar en que parte del array nuestro pokemon esta ubicado, vamos a devolver los items que vienen antes y despues
    // por ejemplo: digamos que que tenemos a charmander, y el objeto que nos devuelve la api es asi
    // [
    //   ...
    //   {
    //     "name": "venusaur",
    //     "url": "https://pokeapi.co/api/v2/pokemon/3/"
    //   },
    //   {
    //     "name": "charmander",
    //     "url": "https://pokeapi.co/api/v2/pokemon/4/"
    //   },
    //   {
    //     "name": "charmeleon",
    //     "url": "https://pokeapi.co/api/v2/pokemon/5/"
    //   },
    //   ...
    // ]
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
