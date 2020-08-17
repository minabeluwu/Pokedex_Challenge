import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import PokeAPI from "../../APIS/PokeAPI";
import TypePokemon from "../../components/TypePokemon";
import AbilitiesPokemon from "../../components/AbilitiesPokemon";
const api = new PokeAPI();

const PokemonDetails = () => {
  const [data, setData] = useState({});
  const router = useRouter();
  const { name } = router.query;

  useEffect(() => {
    if (name) {
      api.getPokemonByName(name).then((data) => setData(data));
    }
    return () => {};
  }, []);

  return (
    <div className="details">
      <div className="details-aling">
        <form className="details-form">
          <button className="details-form_button">#001</button>

          <button className="details-form_button">#002</button>
        </form>

        <div className="details-container">
          <img
            src={data.sprites ? data.sprites.front_default : "/bulbasaur.svg"}
            alt=""
            className="details-container_img"
          />

          <div className="details-container_pokemon">
            <h1 className="details-container_pokemon-name">
              {data.name} <span className="span-number">#{data.id}</span>
            </h1>

            <div className="details-container_description">
              <div className="details-container_paragraph">
                <p className="details-container_pokemon-paragraph">Height</p>
                <p className="details-container_pokemon-paragraph">
                  {data.height}
                </p>
              </div>
              <div className="details-container_paragraph">
                <p className="details-container_pokemon-paragraph">Weight</p>
                <p className="details-container_pokemon-paragraph">
                  {data.weight}
                </p>
              </div>
            </div>

            <div className="details-container_description">
              <div className="details-container_paragraph">
                <p className="details-container_pokemon-paragraph">Type</p>
                {data?.types?.map((type) => (
                  <TypePokemon name={type.type.name} />
                ))}
              </div>

              <div className="details-container_paragraph">
                <p className="details-container_pokemon-paragraph">Abilities</p>
                {data?.abilities?.map((abilities) => (
                  <AbilitiesPokemon name={abilities.ability.name} />
                ))}
              </div>
            </div>
          </div>
        </div>

        <Link href="/">
          <a className="details-button">Back</a>
        </Link>
      </div>
    </div>
  );
};

export async function getStaticPaths() {
  const res = await api.getPokemonList();
  const paths = res.results.map((pokemon) => {
    return {
      params: {
        name: pokemon.name,
      },
    };
  });

  return { paths, fallback: false };
}
export async function getStaticProps({ params }) {
  console.log(params);
  return {
    props: { name: params.name },
  };
}

export default PokemonDetails;
