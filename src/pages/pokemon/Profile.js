import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { getPokemonData, searchPokemon } from "../../api";

function Profile() {
  let params = useParams();
  const [loading, setLoading] = useState(true);
  const [details, setDetails] = useState({});
  const [activeTab, setActiveTab] = useState("Stats");
  const [speciesData, setSpeciesData] = useState({});

  const fetchDetails = async (name) => {
    try {
      const data = await searchPokemon(name);
      setDetails(data);
      setLoading(false);
      console.log(data);

      fecthPokemonData(data.species.url, `https://pokeapi.co/api/v2/type/${data.id}`);
    } catch (error) {
      console.log(error);
    }
  };

  const fecthPokemonData = async (url1, url2) => {
    try {
      let results = await Promise.all([getPokemonData(url1), getPokemonData(url2)]);
      console.log(results);
      setSpeciesData(results);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchDetails(params.name);
  }, [params.name]);

  const addZerosToNumber = (number, length) => {
    let num = "" + number;
    while (num.length < length) {
      num = "0" + num;
    }
    return num;
  };

  return (
    <>
      {loading && <p>loading...</p>}
      {!loading && details && (
        <div className={`profile bg-${details.types[0].type.name}`}>
          <Link to={"/"}>
            <svg width="60" height="60" viewBox="0 0 21 21" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M19.2165 9.22309H4.87986L11.1433 2.95963C11.6439 2.45907 11.6439 1.63763 11.1433 1.13707C11.0246 1.01808 10.8835 0.923686 10.7283 0.859279C10.573 0.794871 10.4065 0.761719 10.2385 0.761719C10.0704 0.761719 9.90391 0.794871 9.74864 0.859279C9.59337 0.923686 9.45233 1.01808 9.33359 1.13707L0.875351 9.59531C0.756366 9.71405 0.661968 9.85509 0.597561 10.0104C0.533153 10.1656 0.5 10.3321 0.5 10.5002C0.5 10.6683 0.533153 10.8347 0.597561 10.99C0.661968 11.1453 0.756366 11.2863 0.875351 11.405L9.33359 19.8633C9.45242 19.9821 9.59349 20.0764 9.74874 20.1407C9.904 20.205 10.0704 20.2381 10.2385 20.2381C10.4065 20.2381 10.5729 20.205 10.7282 20.1407C10.8834 20.0764 11.0245 19.9821 11.1433 19.8633C11.2621 19.7444 11.3564 19.6034 11.4207 19.4481C11.485 19.2929 11.5181 19.1265 11.5181 18.9584C11.5181 18.7904 11.485 18.624 11.4207 18.4687C11.3564 18.3134 11.2621 18.1724 11.1433 18.0535L4.87986 11.7901H19.2165C19.9224 11.7901 20.5 11.2125 20.5 10.5066C20.5 9.80066 19.9224 9.22309 19.2165 9.22309Z"
                fill="white"
              />
            </svg>
          </Link>
          <div className="header_invisible">
            <h1 className={`font-${details.types[0].type.name}`}>{details.name}</h1>
          </div>

          <div className="container is-widescreen">
            <div className="columns is-multiline is-mobile is-gapless is-align-items-center	">
              <div className="column is-half profile-img">
                <img
                  className="profile-img"
                  src={details.sprites.other["official-artwork"].front_default}
                  alt={`Pokemon ${details.name}`}
                />
              </div>
              <div className="column is-half">
                <div className="info">
                  <span className="pokemon-number">#{addZerosToNumber(details.id, 3)}</span>
                  <span className="pokemon-name">{details.name}</span>
                  <div className="types">
                    {details.types.map((type) => (
                      <div className={`type ${type.type.name}`} key={type.type.name}>
                        <img src={`../img/${type.type.name}.svg`} alt="type" className="" />
                        <span className="pokemon-type-text">{type.type.name}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="btns-profile">
            <button type="button" className="dHOUei" onClick={() => setActiveTab("About")}>
              About
              {activeTab === "About" && (
                <svg width="60" height="50" viewBox="0 0 75 75" fill="none">
                  <path
                    d="M37.5 0C56.798 0 72.7167 14.361 75 32.9032H56.6974C54.6135 24.298 46.8091 17.9032 37.5 17.9032C28.1909 17.9032 20.3865 24.298 18.3026 32.9032H0C2.28333 14.361 18.202 0 37.5 0Z"
                    fill="rgb(255, 255, 255, 0.2)"
                  ></path>
                  <path
                    d="M56.6974 42.0968H75C72.7167 60.639 56.798 75 37.5 75C18.202 75 2.28333 60.639 0 42.0968H18.3026C20.3865 50.702 28.1909 57.0968 37.5 57.0968C46.8091 57.0968 54.6135 50.702 56.6974 42.0968Z"
                    fill="rgb(255, 255, 255, 0.2)"
                  ></path>
                  <path
                    d="M37.5 49.8387C44.3655 49.8387 49.9312 44.3145 49.9312 37.5C49.9312 30.6855 44.3655 25.1613 37.5 25.1613C30.6345 25.1613 25.0688 30.6855 25.0688 37.5C25.0688 44.3145 30.6345 49.8387 37.5 49.8387Z"
                    fill="rgb(255, 255, 255, 0.2)"
                  ></path>
                </svg>
              )}
            </button>
            <button type="button" className="dHOUei" onClick={() => setActiveTab("Stats")}>
              Stats
              {activeTab === "Stats" && (
                <svg width="60" height="50" viewBox="0 0 75 75" fill="none">
                  <path
                    d="M37.5 0C56.798 0 72.7167 14.361 75 32.9032H56.6974C54.6135 24.298 46.8091 17.9032 37.5 17.9032C28.1909 17.9032 20.3865 24.298 18.3026 32.9032H0C2.28333 14.361 18.202 0 37.5 0Z"
                    fill="rgb(255, 255, 255, 0.2)"
                  ></path>
                  <path
                    d="M56.6974 42.0968H75C72.7167 60.639 56.798 75 37.5 75C18.202 75 2.28333 60.639 0 42.0968H18.3026C20.3865 50.702 28.1909 57.0968 37.5 57.0968C46.8091 57.0968 54.6135 50.702 56.6974 42.0968Z"
                    fill="rgb(255, 255, 255, 0.2)"
                  ></path>
                  <path
                    d="M37.5 49.8387C44.3655 49.8387 49.9312 44.3145 49.9312 37.5C49.9312 30.6855 44.3655 25.1613 37.5 25.1613C30.6345 25.1613 25.0688 30.6855 25.0688 37.5C25.0688 44.3145 30.6345 49.8387 37.5 49.8387Z"
                    fill="rgb(255, 255, 255, 0.2)"
                  ></path>
                </svg>
              )}
            </button>
            <button type="button" className="dHOUei" onClick={() => setActiveTab("Evolution")}>
              Evolution
              {activeTab === "Evolution" && (
                <svg width="60" height="50" viewBox="0 0 75 75" fill="none">
                  <path
                    d="M37.5 0C56.798 0 72.7167 14.361 75 32.9032H56.6974C54.6135 24.298 46.8091 17.9032 37.5 17.9032C28.1909 17.9032 20.3865 24.298 18.3026 32.9032H0C2.28333 14.361 18.202 0 37.5 0Z"
                    fill="rgb(255, 255, 255, 0.2)"
                  ></path>
                  <path
                    d="M56.6974 42.0968H75C72.7167 60.639 56.798 75 37.5 75C18.202 75 2.28333 60.639 0 42.0968H18.3026C20.3865 50.702 28.1909 57.0968 37.5 57.0968C46.8091 57.0968 54.6135 50.702 56.6974 42.0968Z"
                    fill="rgb(255, 255, 255, 0.2)"
                  ></path>
                  <path
                    d="M37.5 49.8387C44.3655 49.8387 49.9312 44.3145 49.9312 37.5C49.9312 30.6855 44.3655 25.1613 37.5 25.1613C30.6345 25.1613 25.0688 30.6855 25.0688 37.5C25.0688 44.3145 30.6345 49.8387 37.5 49.8387Z"
                    fill="rgb(255, 255, 255, 0.2)"
                  ></path>
                </svg>
              )}
            </button>
          </div>
          <section className="hero is-medium is-white informations-section">
            {activeTab === "About" && (
              <div className="hero-body">
                <div className="columns is-multiline">
                  <div className="column is-12-mobile is-12-tablet is-6-desktop">
                    <h3 className={`font-${details.types[0].type.name}`}>Pokedéx Data</h3>
                    <ul>
                      <li>
                        <strong>Species</strong> <span>{speciesData[0].name}</span>
                      </li>
                      <li>
                        <strong>Height</strong> <span>{details.height / 10} m</span>
                      </li>
                      <li>
                        <strong>Weight</strong> <span>{details.weight / 10} kg</span>
                      </li>
                      <li>
                        <strong>Weaknesses</strong>
                        {speciesData[1].damage_relations.double_damage_from.map((weakness) => (
                          <div className={`small-type-icon bg-${weakness.name}`} key={weakness.name}>
                            <img src={`./img/${weakness.name}.svg`} alt="type" />
                          </div>
                        ))}
                      </li>
                    </ul>
                  </div>
                  <div className="column is-12-mobile is-12-tablet is-6-desktop">
                    <h3 className={`font-${details.types[0].type.name}`}>Training</h3>
                    <ul>
                      <li>
                        <strong>Habitat</strong> <span>{speciesData[0].habitat.name}</span>
                      </li>
                      <li>
                        <strong>Capture Rate</strong> <span>{speciesData[0].capture_rate}</span>
                      </li>
                      <li>
                        <strong>Base Happiness</strong> <span>{speciesData[0].base_happiness}</span>
                      </li>
                      <li>
                        <strong>Growth Rate</strong> <span>{speciesData[0].growth_rate.name}</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            )}
            {activeTab === "Stats" && (
              <div className="hero-body">
                <div className="stats-hero">
                  {details.stats.map((stat, index) => (
                    <div className="single-stat" key={index}>
                      <strong>{stat.stat.name}</strong>
                      <span>{stat.base_stat}</span>
                      <div className="wrapper">
                        <span
                          className={`progress-bar-fill bg-${details.types[0].type.name}`}
                          style={{ width: `${stat.base_stat}%` }}
                        ></span>
                      </div>
                      <span>100</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
            {activeTab === "Evolution" && (
              <div className="hero-body">
                <h1>Work in progress...</h1>
              </div>
            )}
          </section>
        </div>
      )}
    </>
  );
}

export default Profile;
