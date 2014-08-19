var requestFailed = function(jqxhr, textStatus, error)
{
  var err = textStatus + ", " + error;
  console.log( "Request Failed: " + err );
}

var recipeStepper = new RecipeStepper();

recipeStepper.loadRecipe('crepes');

if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) )
{
  $('#slidePanel').click(recipeStepper.nextState);
}
else
{
  $(document).click(recipeStepper.nextState);
}
