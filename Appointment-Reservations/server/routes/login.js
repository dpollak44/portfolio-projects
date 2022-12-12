const express = require('express')
const {Provider,Patient} = require('../models/index.js');
const router = express.Router()

router.post('/', async(req, res) => {
    console.log(req.body);
    const {id, type} = req.body;
    try{
        if(type === 'Provider'){
            const provider = await Provider.findOne({
                where: {
                    id: +id
                }
            });
            console.log(provider);
            if(provider){
                req.session.provider = provider;
                res.status(200).send({message: 'Provider logged in successfully',status:'success'});
            }
            else{
                res.status(404).send({message: 'Provider not found',status:'fail'});
            }
        }
        else if(type === 'Patient'){
            const patient = await Patient.findOne({
                where: {
                    id: +id
                }
            });
            if(patient){
                req.session.patient = patient;
                res.status(200).send({message: 'Patient logged in successfully',status:'success'});
            }
            else{
                res.status(404).send({message: 'Patient not found',status:'fail'});;
            }
        }
        else{
            res.status(400).send({message: 'Invalid type',status:'fail'});
        }
    }
    catch(err){
        res
        .status(500)
        .send({message:"Internal server error", error: err});
    }
});

router.post('/logout', async(req, res) => {
    const {type} = req.body;
    try{
        if(type === 'Provider'){
            if(res.session.provider){
                req.session.provider = null;
                res.status(200).send({message: 'Provider logged out successfully',status:'success'});
            }
            else{
                res.status(400).send({message: 'Provider not logged in',status:'fail'});
            }
        }
        else if(type === 'Patient'){
            if(res.session.patient){
                req.session.patient = null;
                res.status(200).send({message: 'Patient logged out successfully',status:'success'});
            }
            else{
                res.status(400).send({message: 'Patient not logged in',status:'fail'});
            }
        }
        else{
            res.status(400).send({message: 'Invalid type',status:'fail'});
        }
    }
    catch(err){
        res
        .status(500)
        .send({message: 'Error logging out',status:'fail'});
    }
});

module.exports = router