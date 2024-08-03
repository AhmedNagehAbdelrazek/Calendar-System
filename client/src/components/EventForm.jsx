import React, { useState, useEffect } from 'react';
import { TextField, Button, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { backendUrl } from '../App';

const EventForm = ({ selectedStart, selectedEnd, onAddEvent, onClose }) => {
  const {token} = useSelector((store)=>store.user);
  const [eventData, setEventData] = useState({
    title: '',
    description: '',
    start: formatDateForInput(selectedStart),
    end: formatDateForInput(selectedEnd),
    participants: '',
  });

  useEffect(() => {
    if (selectedStart && selectedEnd) {
      setEventData(prevState => ({
        ...prevState,
        start: formatDateForInput(selectedStart),
        end: formatDateForInput(selectedEnd),
      }));
    }
  }, [selectedStart, selectedEnd]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEventData(prevState => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${backendUrl}/api/events`, eventData,
        {headers: {Authorization: `Bearer ${token}`}});
      const newEvent = response.data;
      onAddEvent(newEvent);
      onClose();
    } catch (error) {
      console.error('Error adding event:', error);
      alert('Error adding event. Please try again.');
    }
  };

  return (
    <Dialog open onClose={onClose}>
      <DialogTitle>Add New Event</DialogTitle>
      <DialogContent>
        <TextField
          label="Title"
          name="title"
          value={eventData.title}
          onChange={handleChange}
          fullWidth
          margin="normal"
          required
        />
        <TextField
          label="Description"
          name="description"
          value={eventData.description}
          onChange={handleChange}
          fullWidth
          margin="normal"
          multiline
          rows={4}
        />
        <TextField
          label="Start Time"
          name="start"
          type="datetime-local"
          value={eventData.start}
          onChange={handleChange}
          fullWidth
          margin="normal"
          required
        />
        <TextField
          label="End Time"
          name="end"
          type="datetime-local"
          value={eventData.end}
          onChange={handleChange}
          fullWidth
          margin="normal"
          required
        />
        <TextField
          label="Participants"
          name="participants"
          value={eventData.participants}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={handleSubmit} color="primary">Add Event</Button>
      </DialogActions>
    </Dialog>
  );
};

const formatDateForInput = (date) => {
  if (!date) return '';
  return date.toISOString().slice(0, 16);
};

export default EventForm;
