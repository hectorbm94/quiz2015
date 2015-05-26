var models = require('../models/models.js');

// Autoload :id
exports.load = function(req, res, next, userId,quizId) {
	models.User.find({
		where: {
			id: Number(userId)
		}
	}).then(function(user) {
		if (user) {
			req.user = user;
		
			next();
		} else{next(new Error('No existe userId=' + userId))}
	}).catch(function(error){next(error)});	
};

// GET /users/:userId/favourites
exports.index = function(req, res) {  
  var options = {};
  if (req.session.user) {
    options.where = {UserId:req.user.id}
  }
   models.Favourites.findAll(options).then(
     function(quizes) {
       res.render('quizes/index.ejs', {quizes: quizes, errors: []})});
};

// DELETE
exports.delete = function(req, res){
	models.Favourites.destroy({where:{ UserId: Number(req.user.id), QuizId: Number(req.quiz.id) }});
	res.redirect("/quizes");
};

//FAV
exports.fav = function(req, res){
     var options = {};
     options.where = {id:req.quiz.id}
     models.Quiz.findAll(options).then(
     function(quiz) {
	var fav = models.Favourites.build(	//crea objeto fav
    	{UserId: req.user.id, QuizId:quiz[0].id, pregunta: quiz[0].pregunta}
     );
  fav.save().then( function(){res.redirect('/quizes')})
     });
};
