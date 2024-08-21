// backend/controllers/itemController.js
const accounts = require('../models/accounts');
const bcrypt = require('bcryptjs');
const {createToken, validateToken} = require('../JWT');
const { decode, verify } = require('jsonwebtoken');
const jwt = require('jsonwebtoken');
const { signedCookie } = require('cookie-parser');

// Obtener todos los registros de una coleccion
exports.getItems = async (req, res) => {
    console.log('Cookies recibidas:', req.cookies);

    try {
        const accessToken = req.cookies['access-token'];

        if (!accessToken) {
            return res.status(400).json({ error: 'No se encontró el token' });
        }

        // Verificar y decodificar el token
        verify(accessToken, process.env.ACCESS_TOKEN_SECRET, async (err, decoded) => {
            if (err) {
                return res.status(403).json({ error: 'Token inválido' });
            }

            const user = decoded.user.user; // Suponiendo que el token contiene el nombre de usuario
            console.log('Usuario decodificado del token:', user);

            if (!user) {
                return res.status(400).json({ error: 'Faltan datos de usuario en el token' });
            }

            const account = await accounts.findOne({ user: user });
            if (!account) {
                return res.status(404).json({ error: 'Usuario no encontrado' });
            }
            console.log(account);
            res.json({
                user: account.user,
                email: account.email,
                name: account.name,
                // Agrega más campos según sea necesario
            });
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
};

// Obtener un registro por su ID
exports.getItemById = async (req, res) => {
  try {
    const account = await accounts.findById(req.params.id);
    if (!account) {
      return res.status(404).json({ mensaje: 'Registro no encontrado' });
    }
    res.json(account);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Error del servidor');
  }
};

//Iniciar Sesion
exports.login = async (req, res) => {
  try {
    const { user, password } = req.body;

    if (!user || !password) {
      return res.status(400).json({ error: 'Faltan datos de usuario o contraseña' });
    }

    const account = await accounts.findOne({ user: user });

    if (!account) {
      return res.status(404).json({ error: 'Usuario no encontrado' });
    }

    const bdPassword = account.password;

    bcrypt.compare(password, bdPassword).then((match) => {
      if (!match) {
        return res.status(400).json({ error: 'Usuario o contraseña incorrectos' });
      } else {
        const accessToken = createToken(account);
        console.log('Token de acceso:', accessToken);
        res.cookie('access-token', accessToken, {
          httpOnly: true,
          maxAge: 86400000,
          //path: '/profile',
        });
        //const setCookieHeader = res.getHeader('Set-Cookie');
        res.json({
          redirectURL: '/profile',
          aToken: accessToken
        });
      }
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
};

//Cerrar sesion
exports.logout = async (req, res) => {
  const token = req.params.token; 
  console.log('Recibo el token:', token);

  if (!token) {
    return res.status(400).json({ message: 'Token no proporcionado' });
  }

  try {
    // Verifica el token y encuentra al usuario, si es necesario
    const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET); // Reemplaza 'tu_clave_secreta' con tu clave real
    // Borra la cookie
    res.clearCookie('access-token');
    console.log('Sesion cerrada');
    res.status(200).json({ message: 'Sesión cerrada con éxito' });
  } catch (error) {
    res.status(401).json({ message: 'Token inválido' });
  }
};

exports.getProfile = async (req, res) => { 
  const user = req.user.user.user;
  const account = await accounts.findOne({ user: user });
  if (!account) {
      return res.status(404).json({ error: 'Usuario no encontrado' });
  }
  console.log(account);
  res.json({
      id: account._id,
      user: account.user,
      email: account.email,
      name: account.name,
      // Agrega más campos según sea necesario
  }); 
};

exports.GGP = async (req, res) => {
  try {
    const id = req.user.user._id;
    console.log('si se obtiene el id', id);
    const { amount } = req.body;
    console.log('amount recibido: ', amount);

    const updatedAccount = await accounts.findByIdAndUpdate(
      id,
      { $inc: { 'wallet.totalggp': amount } },
      { new: true }
    );

    if (!updatedAccount) {
      return res.status(404).json({ mensaje: 'Registro no encontrado' });
    }
    res.json(updatedAccount);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Error del servidor');
  }
};

exports.checkAuth = async (req, res) => {
  res.status(200).json({mesagge: 'Authenticated'});
};

// Crear una nuevo registro
exports.createItem = async (req, res) => {
  try {
    const {
      name, lastName, email, user, password
    } = req.body;

    const existingUser = await accounts.findOne({ $or: [{ email: email }, { user: user }] });
    if (existingUser) {
      return res.status(400).json({ error: 'El usuario o email ya existen' });
    }
    const hash = await bcrypt.hash(password, 10);
    console.log(hash);
    const newAccount = new accounts({
      name: name,
      lastName: lastName,
      email: email,
      user: user,
      password: hash
    });
    await newAccount.save();
    res.json(newAccount);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Error del servidor');
  }
};

// Actualizar una registro
exports.updateItem = async (req, res) => {
  try {
    const {
      user, password
    } = req.body;
    const updatedAccount = await accounts.findByIdAndUpdate(
      req.params.id,
      {
        user, password
      },
      { new: true }
    );
    if (!updatedAccount) {
      return res.status(404).json({ mensaje: 'Registro no encontrado' });
    }
    res.json(updatedAccount);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Error del servidor');
  }
};

// Ganar o perder puntos (Se esta usando en la App Movil)
exports.updateTotalGGP = async (req, res) => {
  try {
    const { totalggp } = req.body; // Extrae el ID y el valor de totalggp del cuerpo de la solicitud
    console.log('Datos recibidos:', req.body);
    // Asegúrate de que totalggp sea un número válido
    if (typeof totalggp !== 'number') {
      return res.status(400).json({ mensaje: 'El valor de totalggp debe ser un número' });
    }

    // Actualiza el campo wallet.totalggp del documento con el ID proporcionado
    const updatedAccount = await accounts.findByIdAndUpdate(
      req.params.id, // Usa el ID proporcionado
      { $set: { 'wallet.totalggp': totalggp } }, // Actualiza el campo wallet.totalggp
      { new: true, runValidators: true } // Devuelve el documento actualizado y aplica validaciones
    );

    // Maneja el caso en que no se encuentra el documento
    if (!updatedAccount) {
      return res.status(404).json({ mensaje: 'Registro no encontrado' });
    }

    // Envía la respuesta con el documento actualizado
    res.json(updatedAccount);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Error del servidor');
  }
};

// Eliminar un registro
exports.deleteItem = async (req, res) => {
  try {
    const deletedAccount = await accounts.findByIdAndDelete(req.params.id);
    if (!deletedAccount) {
      return res.status(404).json({ mensaje: 'Registro no encontrado' });
    }
    res.json({ mensaje: 'Registro eliminada exitosamente' });
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Error del servidor');
  }
};

//Verificar token en app movil
exports.authenticateToken = (req, res) => {
  const token = req.params.token;
  console.log('Recibo el token: ', token);
  
  if (token == null) {
    return res.status(401).json({ success: false, message: 'Token no proporcionado' });
  }

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    if (err) {
      console.log('Token no válido 😕');
      return res.status(403).json({ isValid: false, message: 'Token no válido' });
    }

    req.user = user;
    console.log('Token válido 😎');
    return res.json({ isValid: true, message: 'Token válido' });
  });
};
