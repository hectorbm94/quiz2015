var models = require('../models/models.js');

exports.datos = function(req, res) {
	models.Quiz.findAll().then(function(quizes){
		models.Comment.findAll().then(function(comments) {
			var preguntas = quizes.length;
			var comentarios = 0;
			var media=0;
			var i;
			var aux = false;
			var j;
			var con_comentarios=0;
			var sin_comentarios=0;
			for(i=0; i<comments.length; i++){
				if(comments[i].publicado == true){comentarios++;};
			}
			for(i=0; i<quizes.length; i++){
				aux = false;
				for(j=0; j<comments.length; j++){
					if(comments[j].publicado && !aux && comments[j].QuizId == i+1){
						con_comentarios++;
						aux = true;
					};
				}
			}
			media = comentarios/preguntas;
			sin_comentarios = preguntas - con_comentarios;
			res.render('quizes/stadistics', {preguntas:preguntas, comentarios:comentarios, media:media, conc:con_comentarios, sinc:sin_comentarios, errors: []});
		}).catch(function(error){next(error);})
	}).catch(function(error){next(error);})
};
