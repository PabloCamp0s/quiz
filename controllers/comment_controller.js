var models = require( '../models/models.js' );

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
      quizId : req.params.quizId
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
        comment.save( { fields : [ 'texto' ] } ).then(
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

