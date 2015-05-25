var express = require('express');
var router = express.Router();

var quizController = require('../controllers/quiz_controller');

// home page
router.get('/', function(req, res) {
  res.render('index', { title: 'Quiz' });
});

// Autoload de comandos con :quizId
router.param('quizId', quizController.load);  // autoload :quizId

// definicion de rutas de quizes
router.get('/quizes', quizController.index);
router.get('/quizes/:quizId(\\d+)',   quizController.show);
router.get('/quizes/:quizId(\\d+)/answer', quizController.answer);
router.get('/quizes/author',   quizController.author);
router.get('/quizes/new',   quizController.new);
router.post('/quizes/create',  quizController.create);

// Busqueda
router.get('/search', quizController.busqueda);

module.exports = router;
