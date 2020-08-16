import React from "react";
import Link from "next/link";

const details = () => {
  return (
    <div className="details">
      <div className="details-aling">
        <form className="details-form">
          <button className="details-form_button">#000</button>
          <button className="details-form_button">#002</button>
        </form>

        <div className="details-container">
          <img src="/bullbasaur.svg" alt="" className="details-container_img" />

          <div className="details-container_pokemon">
            <h1 className="details-container_pokemon-name">
              Pokemon <span className="span-number">#001</span>
            </h1>

            <div className="details-container_description">
              <p className="details-container_pokemon-paragraph">
                height <br /> 1'12´´(0.6m)
              </p>
              <p className="details-container_pokemon-paragraph">
                Weight <br /> 18.73 lbs (8.5kg)
              </p>
            </div>

            <div className="details-container_description">
              <p className="details-container_pokemon-paragraph">
                type <br />
                <span>Herb</span>
              </p>

              <p className="details-container_pokemon-paragraph">
                Abilities <br /> Blaze
              </p>
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

export default details;
