import React, { useState, useEffect } from "react";
import ListPokemon from "../components/ListPokemon";
import PokeAPI from "../APIS/PokeAPI";

const api = new PokeAPI();

const Home = () => {
  const [searchPokemon, setSearctPokemon] = useState();

  useEffect(() => {
    api.getPokemonList().then((data) => {
      setSearctPokemon(data.results);
    });
  }, []);

  if (searchPokemon === undefined)
    return (
      <div className="home-loading_container">
        <img src="/loading.svg" alt="" className="home-loading" />
      </div>
    );

  return <ListPokemon listPokemon={searchPokemon} />;
};

export default Home;
