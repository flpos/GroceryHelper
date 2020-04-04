import { RequestHandler } from 'express'
import UsuarioModel, { UsuarioDoc } from '../models/usuario'
import { MongooseFilterQuery } from 'mongoose';

export class usuarioController {
    static create: RequestHandler = async (req, res) => {
        await UsuarioModel.create(req.body);
        return res.status(201).send('Ok');
    }
    static read: RequestHandler = async (req, res) => {
        let query: MongooseFilterQuery<Pick<UsuarioDoc, "_id">>
        if (req.params['userId']) {
            query = { _id: req.params['userId'] }
        } else {
            query = {}
        }
        const result = await UsuarioModel.find(query);
        res.json(result)
    }
    static update: RequestHandler = (req, res) => {
        //
    }
    static delete: RequestHandler = (req, res) => {
        //
    }
}
