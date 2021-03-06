var models = require( '../models/models.js' );

// Autoload :id de comentarios
exports.load = function ( req , res , next , commentId )
{
  models.Comment.find(
    {
      where : { id : Number( commentId ) }
    }
  ).then(
    function ( comment )
    {
      if ( comment )
      {
        req.comment = comment;
        next();
      }
      else
      {
        next( new Error( 'No existe commentId=' + commentId ) );
      }
    }
  );
}

// GET /quizes/:quizId/comments/new
exports.new = function ( req , res )
{
  res.render( 'comments/new' , { quizId : req.params.quizId , errors : [] } );
}

// POST /quizes/:quizId/comments
exports.create = function ( req , res )
{
  var comment = models.Comment.build(
    {
      texto : req.body.comment.texto ,
      QuizId : req.params.quizId
    }
  );

  comment.validate().then(
    function ( err )
    {
      if ( err )
      {
        res.render( 'comments/new' , { comment : comment , errors : err.errors } );
      }
      else
      {
        // guarda en DB campo texto del comment
        comment.save( { fields : [ 'texto' , 'QuizId' ] } ).then(
          function ()
          {
            // Redirección http (url relativo) a la lista de preguntas
            res.redirect( '/quizes/' + req.params.quizId );
          }
        );
      }
    }
  );
}

// PUT /quizes/:quizId/comments/:commentId
exports.edit = function ( req , res )
{
  req.comment.publicado = ( req.body.publicado === 'true' ) ;
  req.comment.save( { fields : [ 'publicado' ] } ).then(
    function ()
    {
      res.redirect( '/quizes/' + req.params.quizId );
    }
  ).catch(
    function ( error )
    {
      next( error );
    }
  );
}
