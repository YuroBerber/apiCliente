import express from 'express';
import rutasClientes from './routes/rutasClientes.js';
import {PORT} from './config.js';

const app = express();

app.use(express.json());
app.use('/api',rutasClientes);

app.use((req,res,next) => {

    res.status(404).json({

        mensaje:'NO EXISTE LA PÁGINA'

    });

});

app.listen(PORT);
console.log('ESCUCHANDO EN EL PUERTO: ' , PORT);
