import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom"; // Import the Link component
import CharacterDetails from "./CharacterDetails";

const Characters = () => {
  const [characters, setCharacters] = useState([]);
  const [selectedCharacter, setSelectedCharacter] = useState(null);

  const apiURL = `https://gateway.marvel.com:443/v1/public/characters?limit=50&offset=40&apikey=e5e5807f4a288debc2df241b27565591`;

  const getMarvelCharacters = async () => {
    try {
      const res = await axios.get(apiURL);
      const data = res.data;
      const charactersData = data?.data?.results;
      setCharacters(charactersData);
      console.log(charactersData);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getMarvelCharacters();
    document.title = "Characters";
  }, []);

  return (
    <div className="characters">
      <h4>Marvel Characters</h4>
      <div className="characters-list">
        {characters.map((character) => {
          const { id, name, thumbnail } = character;

          const handleCharacterClick = () => {
            setSelectedCharacter(character);
          };

          return (
            <div className="character" key={id}>
              <Link to={`/characters/${id}`}>
                <img
                  onClick={handleCharacterClick}
                  className="glitch-image"
                  src={`${thumbnail.path}.${thumbnail.extension}`}
                  alt={name}
                />
              </Link>
              <div className="character-info">
                <h5>Name: {name}</h5>
              </div>
            </div>
          );
        })}
      </div>
      {selectedCharacter && <CharacterDetails character={selectedCharacter} />}
    </div>
  );
};

export default Characters;
