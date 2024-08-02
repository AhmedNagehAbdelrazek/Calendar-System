const Event  = require('../models/event');


exports.getallEvents = async (req, res) => {
    const user = req.user;
    const events = await Event.find({userId:user._id});
    res.json(events);
}

exports.getEvent = async (req, res) => {
    const { id } = req.params;
    console.log(`event id: ${id}`);
    const user = req.user;
    const event = await Event.findOne({_id:id, userId:user._id});
    if(event === null){
        return res.status(404).json({message: 'Event not found'});
    }
    res.json(event);
}

exports.createEvent = async (req, res) => {
    const user = req.user;
    const eventData = req.body;
    try {
        const event = new Event({...eventData, userId:user._id});
        await event.save();
        res.status(201).json(event);
    } catch (error) {
        console.error('Error saving event:', error);
        res.status(500).json({ message: 'Failed to save event' });
    }
}

exports.updateEvent = async (req, res) => {
    const user = req.user;
    const event = await Event.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
      });
      res.json(event);
}

exports.deleteEvent = async (req, res) => {
    const user = req.user;
    await Event.findByIdAndDelete(req.params.id);
    res.status(204).send();
} 
