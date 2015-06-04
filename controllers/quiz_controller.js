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
      res.render( 'quizes/index' , { quizes : quizes } );
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
  res.render( 'quizes/show' , { quiz : req.quiz } );
};

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
          )
        }
      );
    }
  );
}
