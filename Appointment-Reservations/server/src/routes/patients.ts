import express, {Request, Response} from 'express';
import { Patient } from '../models/index';
const router = express.Router()

router.post('/create', async(req: Request, res: Response) => {
    const {id, name} = req.body;
    try{
        await Patient.create({
            id: +id,
            name: name
        });
        res.status(200).send({message: 'Patient created successfully'});
    }
    catch(err:any){
        if(err.name === 'SequelizeUniqueConstraintError'){
            res.status(400).send({message: 'Patient already exists'});
        }
        else{
            res.status(500).send({message: 'Internal server error'});
        }
    }
});



export default router;