import axios from "axios";
import React, { useEffect, useState, useCallback } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";

const CharacterDetails = () => {
  const { characterId } = useParams();
  const [characters, setCharacters] = useState([]);
  const [characterIndex, setCharacterIndex] = useState(null);
  const navigate = useNavigate();

  const fetchCharacter = useCallback(async (characterId) => {
    try {
      const apiURL = `https://gateway.marvel.com:443/v1/public/characters/${characterId}?apikey=e5e5807f4a288debc2df241b27565591`;
      const res = await axios.get(apiURL);
      const data = res.data;
      const characterData = data?.data?.results[0];
      setCharacters((prevCharacters) => [...prevCharacters, characterData]);
    } catch (error) {
      console.log(error);
    }
  }, []);

  useEffect(() => {
    document.title = `Character | ${characterId}`;

    if (!characters[characterIndex]) {
      fetchCharacter(characterId);
    }
  }, [characterId, characters, characterIndex, fetchCharacter]);

  useEffect(() => {
    const index = characters.findIndex(
      (character) => character.id.toString() === characterId
    );
    setCharacterIndex(index);
  }, [characterId, characters]);

  const handleNextCharacter = useCallback(() => {
    const nextCharacterIndex = (characterIndex + 1) % characters.length;
    const nextCharacterId = characters[nextCharacterIndex].id;
    navigate(`/characters/${nextCharacterId}`);
  }, [characterIndex, characters, navigate]);

  const handlePreviousCharacter = useCallback(() => {
    const previousCharacterIndex =
      (characterIndex - 1 + characters.length) % characters.length;
    const previousCharacterId = characters[previousCharacterIndex].id;
    navigate(`/characters/${previousCharacterId}`);
  }, [characterIndex, characters, navigate]);

  const character = characters[characterIndex];

  if (!character) {
    return <div>Loading...</div>;
  }

  const { name, thumbnail, series } = character;
  const featuredSeries = series.items.slice(0, 4);

  return (
    <div className="character-details">
      <h4>Character Spotlight</h4>
      <Link className="back-link" to="/characters">
        <p>Go back</p>
      </Link>
      <div className="navigation-icons">
        <FaRegHandPointLeft
          onClick={handlePreviousCharacter}
          className="arrow-icon left-arrow"
        />
        <FaRegHandPointRight
          onClick={handleNextCharacter}
          className="arrow-icon right-arrow"
        />
      </div>
      <div className="details-list">
        <img src={`${thumbnail.path}.${thumbnail.extension}`} alt={name} />
        <div className="details-info">
          <h5>{name}</h5>
          <h6>Featured Series</h6>
          {featuredSeries.map((item) => (
            <ul className="list-items">
              <li key={item.name}>{item.name}</li>
            </ul>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CharacterDetails;
