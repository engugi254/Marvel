import axios from "axios";
import React, { useEffect, useState } from "react";

const Comics = () => {
  const [comics, setComics] = useState([]);

  const apiURL = `https://gateway.marvel.com:443/v1/public/comics?format=digital%20comic&formatType=comic&noVariants=true&hasDigitalIssue=true&limit=64&offset=20&apikey=e5e5807f4a288debc2df241b27565591`;

  const getMarvelCharacters = async () => {
    try {
      const res = await axios.get(apiURL);
      const data = res.data;
      const comicsData = data?.data?.results;
      setComics(comicsData);
      console.log(comicsData);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getMarvelCharacters();
    document.title = "Comics";
  }, []);

  return (
    <>
      <div className="comics-list">
        {comics.map((comic) => {
          const { id, name, thumbnail, title } = comic;
          return (
            <div className="comic" key={id}>
              <img
                src={`${thumbnail.path}.${thumbnail.extension}`}
                alt={name}
              />
              <div className="comic-info">
                <h5>{title}</h5>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default Comics;
