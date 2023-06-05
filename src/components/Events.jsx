import React, { useEffect, useState } from "react";
import axios from "axios";

const Events = () => {
  const [events, setEvents] = useState([]);

  const apiURL = `https://gateway.marvel.com:443/v1/public/events?limit=64&offset=20&apikey=e5e5807f4a288debc2df241b27565591`;

  const getMarvelEvents = async () => {
    try {
      const res = await axios.get(apiURL);
      const data = res.data;
      const eventsData = data?.data?.results;
      setEvents(eventsData);
      console.log(eventsData);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getMarvelEvents();
    document.title = "Events";
  }, []);

  return (
    <>
      <div className="events-list">
        {events.map((e) => {
          const { id, title, thumbnail, description } = e;

          return (
            <div className="event" key={id}>
              <img
                src={`${thumbnail.path}.${thumbnail.extension}`}
                alt={title}
              />
              <div className="event-info">
                <h5>Event Name: {title}</h5>
                <p>Description: {description}</p>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default Events;
