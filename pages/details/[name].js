import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import PokeAPI from "../../APIS/PokeAPI";
import TypePokemon from "../../components/TypePokemon";
import AbilitiesPokemon from "../../components/AbilitiesPokemon";
import Convert from "convert-units";
import Head from "next/head";
import useSWR from "swr";

const api = new PokeAPI();

const PokemonDetails = () => {
  const router = useRouter();
  const { name } = router.query;

  const [nextAndBack, setNextAndBack] = useState([]);
  const { data: SWRData, error } = useSWR(`details/${name}`, () =>
    api.getPokemonByName(name)
  );

  const {
    data: SWRButtonsData,
    error: buttonsError,
  } = useSWR(`prior-and-next/${name}`, () => api.getNextPokemon(name));

  const heightCalulo = SWRData?.height / 10;
  const heightIn = Convert(heightCalulo).from("m").to("ft").toFixed(2);

  const weightCalculo = SWRData?.weight / 10;
  const weightIn = Convert(weightCalculo).from("kg").to("lb").toFixed(2);

  if (error || buttonsError) return <div>failed to load</div>;
  if (!SWRData || !SWRButtonsData)
    return (
      <div className="details">
        <img src="/loading.svg" alt="" className="home-loading" />
      </div>
    );

  console.log(SWRButtonsData);

  return (
    <>
      <Head>
        <title> Pokedex details: {name} </title>
      </Head>
      <div className="details">
        <div className="details-aling">
          <form className="details-form">
            {SWRButtonsData.map((obj, idx) => {
              const flexDirection = idx === 0 ? "flex-start" : "flex-end";
              if (typeof obj === "undefined") {
                return null;
              }
              return (
                <Link href={`/details/${obj.name}`}>
                  <button className={`details-form_button ${flexDirection}`}>
                    {obj.name}
                  </button>
                </Link>
              );
            })}
          </form>

          <div className="details-container">
            <img
              src={
                SWRData?.sprites
                  ? SWRData.sprites.front_default
                  : "/pokeball.svg"
              }
              alt=""
              className="details-container_img"
            />

            <div className="details-container_pokemon">
              <h1 className="details-container_pokemon-name">
                {SWRData?.name}{" "}
                <span className="span-number">
                  #{SWRData?.id.toString().padStart(3, "0")}
                </span>
              </h1>

              <div className="details-container_description">
                <div className="details-container_paragraph">
                  <p className="details-container_pokemon-paragraph">Height</p>
                  <p className="details-container_pokemon-paragraph">
                    {heightIn}" ({heightCalulo}m)
                  </p>
                </div>
                <div className="details-container_paragraph">
                  <p className="details-container_pokemon-paragraph">Weight</p>
                  <p className="details-container_pokemon-paragraph">
                    {weightIn} lbs ({weightCalculo}kg)
                  </p>
                </div>
              </div>

              <div className="details-container_description">
                <div className="details-container_paragraph">
                  <p className="details-container_pokemon-paragraph">Type</p>
                  {SWRData?.types?.map((type) => (
                    <TypePokemon name={type.type.name} key={type.type.name} />
                  ))}
                </div>

                <div className="details-container_paragraph">
                  <p className="details-container_pokemon-paragraph">
                    Abilities
                  </p>
                  {SWRData?.abilities?.map((abilities) => (
                    <AbilitiesPokemon
                      name={abilities.ability.name}
                      key={abilities.ability.name}
                    />
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
    </>
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
