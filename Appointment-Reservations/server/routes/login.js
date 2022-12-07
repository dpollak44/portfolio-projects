const express = require('express')
const {Provider,Patient} = require('../models/index.js');
const router = express.Router()

router.get('/', async(req, res) => {
    const {id, type} = req.query;
    try{
        if(type === 'Provider'){
            const provider = await Provider.findOne({
                where: {
                    id: +id
                }
            });
            if(provider){
                res.status(200).send(provider);
            }
            else{
                res.status(404).send({message: 'Provider not found'});
            }
        }
        else if(type === 'Patient'){
            const patient = await Patient.findOne({
                where: {
                    id: +id
                }
            });
            if(patient){
                res.status(200).send(patient);
            }
            else{
                res.status(404).send({message: 'Patient not found'});
            }
        }
        else{
            res.status(400).send({message: 'Invalid type'});
        }
    }
    catch(err){
        res
        .status(500)
        .send({message: 'Error logging in', error: err});
    }
});

module.exports = router