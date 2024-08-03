import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';

const EventDetails = () => {
  const {token} = useSelector((store)=>store.user);
  const { id } = useParams();
  const [event, setEvent] = useState(null);

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const response = await axios.get(`${process.env.BACKEND_URL}/api/events/${id}`,
        {headers: {Authorization: `Bearer ${token}`}});
        setEvent(response.data);
        console.log(response.data);
      } catch (error) {
        console.error('Error fetching event:', error);
      }
    };
    fetchEvent();
  }, [id,token]);

  useEffect(()=>{
    if (event !== null && event !== undefined) return <div>Loading...</div>;
  },[event]);

  return (
    <div>
      <h1>{event?.title}</h1>
      <p>{event?.description}</p>
      <p><strong>Start Time:</strong> {new Date(event?.start).toLocaleString()}</p>
      <p><strong>End Time:</strong> {new Date(event?.end).toLocaleString()}</p>
      <p><strong>Participants:</strong> {event?.participants}</p>
    </div>
  );
};

export default EventDetails;
