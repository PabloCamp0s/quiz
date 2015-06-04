var models = require( '../models/models.js' );

// Autoload - factoriza el código si ruta incluye :quizId
exports.load = function ( req , res , next , quizId )
{
  models.Quiz.findById( quizId ).then(
    function ( quiz )
    {
      if ( quiz )
      {
        req.quiz = quiz;
        next();
      }
      else
      {
        next( new Error( 'No existe quizId=' + quizId ) );
      }
    }
  );
}

// GET /quizes
exports.index = function ( req , res )
{
  models.Quiz.findAll(
    {
      where : (
        (
          (
            req.query.search
          ) && (
            req.query.search !== ''
          )
        )
          ? [ "pregunta like ?" , '%' + req.query.search.replace( /%/g , '\\%' ).replace( /\s+/g , '%' ) + '%' ]
          : null
      )
    }
  ).then(
    function ( quizes )
    {
      res.render( 'quizes/index' , { quizes : quizes , errors : [] } );
    }
  ).catch(
    function ( error )
    {
      next( error );
    }
  );
}

// GET /quizes/:quizId
exports.show = function ( req , res )
{
  res.render( 'quizes/show' , { quiz : req.quiz , errors : [] } );
}

// GET /quizes/:quizId/answer
exports.answer = function ( req , res )
{
  models.Quiz.findById( req.params.quizId ).then(
    function ( quiz )
    {
      res.render(
        'quizes/answer' ,
        {
          quiz : req.quiz ,
          respuesta : (
            (
              req.query.respuesta === req.quiz.respuesta
            ) ? 'Correcto' : 'Incorrecto'
          ) , errors : []
        }
      );
    }
  );
}

// GET /quizes/new
exports.new = function ( req , res )
{
  var quiz = models.Quiz.build(
    { pregunta : "Pregunta" , respuesta : "Respuesta" }
  );
  res.render( 'quizes/new' , { quiz : quiz , errors : [] } );
}

// POST /quizes
exports.create = function ( req , res )
{
  var quiz = models.Quiz.build( req.body.quiz );

  quiz.validate().then(
    function ( err )
    {
      if ( err )
      {
        res.render( 'quizes/new' , { quiz : quiz , errors : err.errors } );
      }
      else
      {
        // guarda en DB los campos pregunta y respuesta de quiz
        quiz.save( { fields : [ 'pregunta' , 'respuesta' , 'tema' ] } ).then(
          function ()
          {
            // Redirección http (url relativo) a la lista de preguntas
            res.redirect( '/quizes' );
          }
        );
      }
    }
  );
}

// GET /quizes/:quizId/edit
exports.edit = function ( req , res )
{
  var quiz = req.quiz; // autoload de instancia de quiz
  res.render( 'quizes/edit' , { quiz : quiz , errors : [] } );
}

// PUT /quizes/:quizId
exports.update = function ( req , res )
{
  req.quiz.pregunta = req.body.quiz.pregunta;
  req.quiz.respuesta = req.body.quiz.respuesta;
  req.quiz.tema = req.body.quiz.tema;

  req.quiz.validate().then(
    function ( err )
    {
      if ( err )
      {
        res.render( 'quizes/edit' , { quiz : req.quiz , errors : err.errors } );
      }
      else
      {
        // guarda en DB los campos pregunta y respuesta de quiz
        req.quiz.save( { fields : [ 'pregunta' , 'respuesta' , 'tema' ] } ).then(
          function ()
          {
            // Redirección http (url relativo) a la lista de preguntas
            res.redirect( '/quizes' );
          }
        );
      }
    }
  )
}

// DELETE /quizes/:quizId
exports.destroy = function ( req , res )
{
  req.quiz.destroy().then(
    function ()
    {
      res.redirect( '/quizes' );
    }
  ).catch(
    function ( err )
    {
      next( err );
    }
  );
}
