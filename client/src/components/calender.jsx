import React, { useState, useEffect } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import axios from 'axios';
import EventForm from './EventForm';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { backendUrl } from '../App.js';

const localizer = momentLocalizer(moment);

const MyCalendar = () => {
    const [events, setEvents] = useState([]);
    const [showEventForm, setShowEventForm] = useState(false);
    const [selectedStart, setSelectedStart] = useState(null);
    const [selectedEnd, setSelectedEnd] = useState(null);
    const navigate = useNavigate();
    const {token} = useSelector((store)=>store.user);

    const isLoggedIn = useSelector((state) => state.user.isLoggedIn);

    useEffect(() => {
        if (isLoggedIn) {
            navigate('/');
        }else{
            navigate('/login');
        }
        axios.get(`${backendUrl}/api/events`,
          {headers: {Authorization: `Bearer ${token}`}})
          .then(response => setEvents(response.data));
    }, [isLoggedIn,navigate,token]);
    
    const handleSelectSlot = ({ start, end }) => {
      setShowEventForm(true);
      setSelectedStart(start);
      setSelectedEnd(end);
    };
    const handleSelectEvent = (event) => {
        navigate(`/events/${event._id}`);
    };
  
    const handleAddEvent = (newEvent) => {
      setEvents(prevEvents => [...prevEvents, newEvent]);
      setShowEventForm(false); // Hide the form after adding event
    };
  
    return (
      <>
        {showEventForm && (
          <EventForm
            selectedStart={selectedStart}
            selectedEnd={selectedEnd}
            onAddEvent={handleAddEvent}
            onClose={() => setShowEventForm(false)}
          />
        )}
        <Calendar
          localizer={localizer}
          events={events}
          selectable
          onSelectSlot={handleSelectSlot}
          onSelectEvent={handleSelectEvent}
          startAccessor={(event) => { return new Date(event.start) }}
          endAccessor={(event) => { return new Date(event.end) }}
          style={{ height: 500 }}
        />
      </>
    );
};

export default MyCalendar;