import {pool} from '../db.js';

export const getClientes = async (req,res) => {

    try {
        
        const [rows] = await pool.query('SELECT * FROM clientes');
        res.json(rows);

    } catch (error) {
        
        return res.status(500).json({

            mensaje:'EXISTIO UN ERROR AL CARGAR LOS CLIENTE'
        });
        
    }

};

export const getCliente = async (req,res) => {
    
    try {

        const [rows] = await pool.query('SELECT * FROM clientes WHERE idCliente = ?' , [req.params.id]);

        if(rows.length <= 0) return res.status(400).json ({

            mensaje:'NO SE LOCALIZO AL CLIENTE'

        });

        res.send(rows[0]);

    } catch (error) {
    
        res.status(500).json({

            mensaje:'EXISTIO UN ERROR AL TRATAR DE CARGAR AL CLIENTE'

        })
    }

};

export const postCliente = async (req,res) => {

    const {nombreCliente,paternoCliente,maternoCliente} = req.body;

    try {

        const [rows] = await pool.query('INSERT INTO clientes (nombreCliente,paternoCliente,maternoCliente) VALUES (?, ?, ?)', [nombreCliente,paternoCliente,maternoCliente]);

        res.send({rows});
        
    } catch (error) {
        
        return res.status(500).json({

            mensaje:'EXISTIO UN ERROR AL TRATAR DE CREAR AL NUEVO CLIENTE'

        })

    }

};

export const putCliente =  async (req,res) => {

    const {id} = req.params;

    const {nombreCliente,paternoCliente,maternoCliente} = req.body;

    try {

        const [result] = await pool.query('UPDATE clientes SET nombreCliente = ?, paternoCliente = ?, maternoCliente = ? WHERE idCliente = ?', [nombreCliente, paternoCliente, maternoCliente, id]);

        if(result.affectedRows === 0) return res.status(404).json({

            mensaje:'NO FUE POSIBLE ACTUALIZAR LOS DATOS DEL CLIENTE'
        
        });

        const [rows] = await pool.query('SELECT * FROM clientes WHERE idCliente = ?',[id]);

        res.json(rows[0]);
        
    } catch (error) {
        
        return res.status(500).json({

            mensaje:'EXISTIO UN ERROR AL TRATAR DE ACTUALIZAR LOS DATOS DEL CLIENTE'

        });

    }

};

export const deleteCliente = async (req,res) => {

    try {

        const [result] = await pool.query('DELETE FROM clientes WHERE idCliente = ?', [req.params.id]);

        if(result.affectedRows <= 0) return res.status(404).json({

            mensaje:'NO FUE POSIBLE LOCALIZAR EL CLIENTE PARA ELIMINARLO'

        });

        res.sendStatus(204);
        
    } catch (error) {
        
        return res.status(500).json({

            mensaje:'EXISTIO UN ERROR AL TRATAR DE ELIMINAR AL CLIENTE'

        })
    }

};