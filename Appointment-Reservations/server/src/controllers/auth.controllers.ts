import {Request, Response} from 'express';
import { Provider, Patient } from '../models/index';

const loginController = async(req: Request, res: Response) => {
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
                console.log(patient);
                req.session.patient = patient;
                console.log(req.session);
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
}

const logoutController = async(req:Request, res:Response) => {
    const {type} = req.body;
    try{
        if(type === 'Provider'){
            req.session.provider = undefined;
            res.status(200).send({message: 'Provider logged out successfully',status:'success'});
        }
        else if(type === 'Patient'){
            req.session.patient = undefined;
            res.status(200).send({message: 'Patient logged out successfully',status:'success'});
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
}

export {loginController, logoutController};