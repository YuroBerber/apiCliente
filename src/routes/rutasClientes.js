import {Router} from 'express';
import { deleteCliente, getCliente, getClientes, postCliente, putCliente } from '../controller/controllerClientes.js';

const router = Router();

router.get('/clientes' , getClientes);

router.get('/clientes/:id', getCliente);

router.post('/clientes', postCliente);

router.put('/clientes/:id', putCliente);

router.delete('/clientes/:id', deleteCliente);

export default router;