const express = require('express')
const app = express();
app.use(express.json());

const PORT = 3000;

let event = [{
    id: 'sxasxs131ds',
    name: 'Compra de ropa',
    description: 'HYM',
    amount: 300,
    date: '14-03-2025',
    type: 'Expense'
}];


let events = [];


// Entity: events 

app.post('/api/events', (req, res) => {
    console.log('POST /events:',req.body);
    const { name, description, amount, date, type } = req.body;

    if(!name||!description||!amount||!date||!type){
        return res.status(400).json({ code: 'PF', message: 'Missing values. The following values are required:name, description, amount, date, type'})
    }
    id= crypto.randomUUID();
    const newEvent = { id, name, description, amount, date, type};
    events.push(newEvent);
    res.json({ code: 'OK', message: 'Event created successfully!', data: {event: newEvent} })
});


app.get('/api/events', (req, res) => {
    res.json({code: 'OK', message: 'Events are available', data: {events}})
});

//app.get('/api/events/query', query('id').notEmpty().withMessage('ID is required'), (req, res) => {
app.get('/api/events/:id' , (req, res) => {
    const id =  req.params.id  ;  

    if(!id) {
        return res.status(400).json({ code: 'PF', message: 'event ID is required!'});
    }
    const event = events.find(event => event.id == id);
    if (!event) {
       return res.status(404).json({ code: 'NF', message: 'Event not found!'});
    }
    res.json({ code: 'OK', message: 'Event found!', data: { event}});
});





app.put('/api/events/:id', (req, res)=>{
    const id = req.params.id;

    if(!id){
        return res.status(400).json({ code: 'PF', message: 'ID is required'})
    }
    
    const event = events.find(event => event.id == id);
    if(!event){
        return res.status(404).json({ code: 'NF', message: 'Event not found!'});
    }
    console.log("body:", req.body);
    const { name, description, amount, date, type } = req.body;
    event.name = name || event.name;
    event.description = description || event.description;
    event.amount = amount || event.amount;
    event.date= date || event.date;
    event.type= type || event.type;
    return res.json({ code: 'OK', message: 'Event updated!', data: { event}});
    
});

app.delete('/api/events/:id', (req, res) => {
    const id = req.params.id;

    if(!id){
        return res.status(400).json({ code: 'PF', message: 'ID is required'})
    }

    const event = events.find(event => event.id == id);
    if(!event){
        return res.status(404).json({ code: 'NF', message: 'Event not found'});
    }
    
    events = events.filter(event => event.id != id);
    return res.json({ code: 'OK', message: 'Event deleted!', data: { event}})
    
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});




