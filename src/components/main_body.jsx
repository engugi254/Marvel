import { useState, useEffect } from "react";
import Movies from "./movies";
import axios from "axios";

import { Route, Routes } from "react-router-dom";
import Characters from "../components/Characters";
import Comics from "./Comics";
import Events from "./Events";
import Creators from "./Creators";
import Series from "./Series";

export default function MainBody() {
  const [items, setResults] = useState([]);

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    const res = await axios
      .get
      // "https://fakestoreapi.com/products"
      // "https://gateway.marvel.com:443/v1/public/characters?limit=50&offset=0&apikey=e5e5807f4a288debc2df241b27565591"
      ();
    setResults(res.data);
    console.log(res.data);
  };

  return (
    <>
      <div className="body-container">
        <Routes>
          <Route path="/characters" element={<Characters />} />

          <Route path="/" element={<Movies />} />
          <Route path="/comics" element={<Comics />} />
          <Route path="/creators" element={<Creators />} />
          <Route path="/events" element={<Events />} />
          <Route path="/series" element={<Series />} />
        </Routes>
      </div>
    </>
  );
}
