var express = require('express');
var router = express.Router();

var quizController = require('../controllers/quiz_controller');

// home page
router.get('/', function(req, res) {
  res.render('index', { title: 'Quiz' });
});
// definicion de rutas de quizes
router.get('/quizes', quizController.index);
router.get('/quizes/:quizId(\\d+)',   quizController.show);
router.get('/quizes/:quizId(\\d+)/answer', quizController.answer);
router.get('/quizes/author',   quizController.author);

// Busqueda
router.get('/search', quizController.busqueda);

module.exports = router;
