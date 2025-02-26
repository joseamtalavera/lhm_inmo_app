require('dotenv').config();

const express = require('express');
const passport = require('passport');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const path = require('path');
const cookieParser = require('cookie-parser');
const jwt = require('jsonwebtoken');
const authRoutes = require('./routes/authRoutes');
const propertiesRoutes = require('./routes/propertiesRoutes');
const { stat } = require('fs');

const app = express();

app.use(helmet());
app.use(morgan('combined'));
app.use(cookieParser());

const port = process.env.PORT || 5010;

const allowedOrigins = [
  'http://localhost:3010',
  'http://13.53.38.238:3010',
  'http://13.53.38.238',
  'https://app.lhainmobiliaria.es',
  'https://lhainmobiliaria.es'
];

app.use(cors({
  origin: function (origin, callback) {
    if (!origin) return callback(null, true);
    if (allowedOrigins.indexOf(origin) === -1) {
      var msg = 'The CORS policy for this site does not ' +
        'allow access from the specified Origin.';
      return callback(new Error(msg), false);
    }
    return callback(null, true);
  },
  credentials: true,
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static files = images
app.use('/uploads', express.static(path.join(__dirname, 'uploads'), {
  setHeaders: (res, path, stat) =>{
    res.set('Cross-Origin-Resource-Policy', 'cross-origin'); // Allow image loading from other origins
    res.set('Access-Control-Allow-Origin', '*'); // Allows any domain to fetch the image
  }
}));

// Serve static files = documents
app.use('/documentos', express.static(path.join(__dirname, 'documentos'), {
  setHeaders: (res, filePath, stat) => {
    res.set('Cross-Origin-Resource-Policy', 'cross-origin');
    res.set('Access-Control-Allow-Origin', '*');
  }
}));

// Serve static files = videos
app.use('/videos', express.static(path.join(__dirname, 'videos'), {
  setHeaders: (res, filePath, stat) => {
    res.set('Cross-Origin-Resource-Policy', 'cross-origin');
    res.set('Access-Control-Allow-Origin', '*');
  }
}));

// Serve static files = planos
app.use('/planos', express.static(path.join(__dirname, 'planos'), {
  setHeaders: (res, filePath, stat) => {
    res.set('Cross-Origin-Resource-Policy', 'cross-origin');
    res.set('Access-Control-Allow-Origin', '*');
  }
}));

// Serve static files = certificados
app.use('/certificados', express.static(path.join(__dirname, 'certificados'), {
  setHeaders: (res, filePath, stat) => {
    res.set('Cross-Origin-Resource-Policy', 'cross-origin');
    res.set('Access-Control-Allow-Origin', '*');
  }
}));

// Check Image Serving in Dev
app.get('/test-image', (req, res) => {
  res.sendFile(path.join(__dirname, 'uploads', 'test.jpg'));
});

app.use('/api', authRoutes);
app.use('/api', propertiesRoutes);

app.use(passport.initialize()); // Initialize passport and restore authentication state, if any, from the session.
app.use(passport.session());

// Middleware to verify JWT token
const verifyToken = (req, res, next) => {
  const token = req.header('Authorization');

  if (!token) {
    return res.status(401).json({ message: 'No token, authorization denied' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    res.status(401).json({ message: 'Invalid token' });
  }
};

passport.serializeUser(function (user, done) { // This function is used to store the user object into the session
  done(null, user);
});
passport.deserializeUser(function (user, done) { // This function is used to retrieve the user object from the session
  done(null, user);
});

app.use(function (err, req, res, next) {
  console.error(err.stack);
  res.status(500).send('Something went wrong');
});

app.listen(port, () => {
  console.log(`Server is running on Port ${port}`);
});

module.exports = verifyToken;