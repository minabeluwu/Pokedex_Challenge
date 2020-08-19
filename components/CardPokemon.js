import React, { useState, useEffect } from "react";
import Link from "next/link";

const CardPokemon = ({ pokemonData }) => {
  const [data, setData] = useState({});

  useEffect(() => {
    fetch(pokemonData.url)
      .then((res) => res.json())
      .then((json) => setData(json));
    return () => {};
  }, []);

  return (
    <Link href="/details/[name]" as={`/details/${data.name}`}>
      <li className="home-item">
        <img
          src={data.sprites ? data.sprites.front_default : "/pokeball.svg"}
          alt=""
          className="home-link_container-img"
        />
        <div className="home-link_container-background">
          <p className="home-link_container-name">
            {data.name}
            <br />
            <span>#{data?.id?.toString().padStart(3, "0")}</span>
          </p>
        </div>
      </li>
    </Link>
  );
};

export default CardPokemon;
