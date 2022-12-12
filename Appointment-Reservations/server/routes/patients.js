const express = require('express')
const {Patient} = require('../models/index.js');
const router = express.Router()

router.post('/create', async(req, res) => {
    const {id, name} = req.body;
    try{
        await Patient.create({
            id: +id,
            name: name
        });
        res.status(200).send({message: 'Patient created successfully'});
    }
    catch(err){
        if(err.name === 'SequelizeUniqueConstraintError'){
            res.status(400).send({message: 'Patient already exists'});
        }
        else{
            res.status(500).send({message: 'Internal server error'});
        }
    }
});



module.exports = router