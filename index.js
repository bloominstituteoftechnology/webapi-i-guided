const express = require ('express'); // this is similar to the import in react

const server = express();//this creates a new http server

server.use(express.json());

const db = require ('./data/db')


// Handle retrieving the database
server.get('/hubs',(req,res)=>{
   db.hubs.find().
   then((hubs)=>{
    res.status(200).json({success:true,hubs})
  })
  .catch(({code, message}) =>{
    res.status(code).json({success:false,message})
  })
})

// Handle create

server.post('/hubs',(req,res) =>{
const hub = req.body;

  db.hubs
  .add(hub)
  .then(hub =>{
    res.status(201).json({success:true,hub})
    console.log(posting)
  })
  .catch(({code, message}) =>{
    res.status(code).json({success:false,message})
  })
})

//Handle Delete 

server.delete('/hubs/:id',(req,res) =>{
  const hubId = req.params.id;

  db.hubs

  .remove(hubId)

  .then(delID =>{res.status(200).json(delID);})

  .catch(({code, message}) =>{
    res.status(code).json({success:false,message})
  })
})
// Handle Update
server.put('/hubs/:id',(req,res) =>{
  const { id } = req.params;
  const updates = req.body;

  db.hubs
  
  .update(id,updates)

  .then (upd =>{
    console.log (upd)
    upd?res.status(200).json({success:true,upd})
    : res.status(404).json({success:false, message:'invalid hub does not exist as requested'})
  }) // checks to see if reffered data is an existing entree


  .catch(({code, message}) =>{
    res.status(code).json({success:false,message})
  })
})


server.listen(5000,()=> console.log ('/Running on port 5000'));