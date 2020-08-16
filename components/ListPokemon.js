import React, { useState, useEffect } from "react";
import CardPokemon from "../components/CardPokemon";

const ListPokemon = ({ listPokemon }) => {
  const [search, setSearch] = useState("");
  const [filteredList, setFilteredList] = useState([]);

  useEffect(() => {
    setFilteredList(
      listPokemon.filter((pokemon) => {
        console.log(search);
        return pokemon.name.toLowerCase().includes(search.toLowerCase());
      })
    );
    return () => {};
  }, [search]);

  return (
    <div className="home">
      <form className="home-form">
        <input
          type="text"
          id="search"
          placeholder="Buscar Pokémon"
          className="form-input"
          onChange={(ev) => setSearch(ev.target.value)}
        />
        <img src="/loupe.svg" alt="" className="form-loupe_icon" />
      </form>

      <ul className="home-list">
        {filteredList?.map((pokemon) => {
          return <CardPokemon pokemonData={pokemon} key={pokemon.name} />;
        })}
      </ul>
    </div>
  );
};

export default ListPokemon;
