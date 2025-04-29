// backend/controllers/salaCine.controller.mjs
import * as salaCineService from '../services/salaCine.service.mjs';

// CREATE
export async function createSalaCine(req, res) {
  try {
    const salaCineData = req.body;
    if (!salaCineData || !salaCineData.nombre || salaCineData.estado === undefined) {
        return res.status(400).json({ message: 'Faltan datos para crear la sala de cine (nombre o estado)' });
    }

    const nuevaSala = await salaCineService.createSalaCine(salaCineData);

    res.status(201).json({
        message: 'Sala de cine creada con éxito!',
        sala: nuevaSala
    });

  } catch (error) {
    console.error('Error en el controlador createSalaCine:', error);
    res.status(500).json({ message: 'Error interno del servidor al crear sala de cine' });
  }
}

// READ ALL
export async function getAllSalasCine(req, res) {
  try {
    const salas = await salaCineService.getAllSalasCine();
    res.status(200).json(salas);
  } catch (error) {
    console.error('Error en el controlador getAllSalasCine:', error);
    res.status(500).json({ message: 'Error interno del servidor al obtener salas de cine' });
  }
}

// READ BY ID
export async function getSalaCineById(req, res) {
    try {
        const id_sala = parseInt(req.params.id);
        if (isNaN(id_sala)) {
            return res.status(400).json({ message: 'ID de sala invalido' });
        }

        const sala = await salaCineService.getSalaCineById(id_sala);

        if (sala) {
            res.status(200).json(sala);
        } else {
            res.status(404).json({ message: 'Sala de cine no encontrada' });
        }
    } catch (error) {
        console.error('Error en el controlador getSalaCineById:', error);
        res.status(500).json({ message: 'Error interno del servidor al obtener sala de cine por ID' });
    }
}


// UPDATE
export async function updateSalaCine(req, res) {
  try {
    const id_sala = parseInt(req.params.id);
    if (isNaN(id_sala)) {
        return res.status(400).json({ message: 'ID de sala invalido' });
    }

    const salaCineData = req.body;
    if (!salaCineData || !salaCineData.nombre || salaCineData.estado === undefined) {
        return res.status(400).json({ message: 'Faltan datos para actualizar la sala de cine (nombre o estado)' });
    }

    const updatedSala = await salaCineService.updateSalaCine(id_sala, salaCineData);

    if (updatedSala) {
      res.status(200).json({
          message: 'Sala de cine actualizada con éxito!',
          sala: updatedSala
      });
    } else {
      res.status(404).json({ message: 'Sala de cine no encontrada' });
    }

  } catch (error) {
    console.error('Error en el controlador updateSalaCine:', error);
    res.status(500).json({ message: 'Error interno del servidor al actualizar sala de cine' });
  }
}



// SEARCH BY NAME
export async function searchSalasCineByName(req, res) {
  try {
    const nombreBusqueda = req.query.nombre;
    if (!nombreBusqueda) {
        return res.status(400).json({ message: 'Falta el parametro de busqueda "nombre"' });
    }
    const salasEncontradas = await salaCineService.searchSalasCineByName(nombreBusqueda);
    res.status(200).json(salasEncontradas);
  } catch (error) {
    console.error('Error en el controlador searchSalasCineByName:', error);
    res.status(500).json({ message: 'Error interno del servidor al buscar salas de cine por nombre' });
  }
}


// GET STATUS endpoint (GET /api/salas/status/:id)
export async function getSalaCineStatus(req, res) {
    try {
        const id_sala = parseInt(req.params.id);
        if (isNaN(id_sala)) {
            return res.status(400).json({ message: 'ID de sala invalido' });
        }

        const salaStatus = await salaCineService.getSalaCineStatus(id_sala);

        if (salaStatus) {
             res.status(200).json(salaStatus); // Retorna el objeto con el estado calculado
        } else {
             res.status(404).json({ message: 'Sala de cine no encontrada o eliminada logicamente' });
        }

    } catch (error) {
        console.error('Error en el controlador getSalaCineStatus:', error);
        res.status(500).json({ message: 'Error interno del servidor al obtener el estado de la sala de cine' });
    }
}