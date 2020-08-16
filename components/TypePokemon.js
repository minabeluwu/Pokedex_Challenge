import React from "react";
import TypeColor from "../APIS/TypeColor";

const TypePokemon = ({ name }) => {
  const color = TypeColor.typeColorList.find((type) => {
    return Object.keys(type)[0] === name;
  });

  return (
    <p className="details-container_pokemon-paragraph">
      <span
        className="span-type"
        style={{
          background: color[name],
        }}
      >
        {name}
      </span>
    </p>
  );
};

export default TypePokemon;
