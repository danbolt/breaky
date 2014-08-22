var APP_TITLE = 'brekkie';

var requestFailed = function(jqxhr, textStatus, error)
{
  var err = textStatus + ", " + error;
  console.log( "Request Failed: " + err );
}

var finishTitleFadeout = function()
{
  mainMenu.transitionIn();
}

var finishMenuFadeout = function(recipeFileName)
{
  recipeStepper.loadRecipe(recipeFileName);
}

var titleArea = new TitleArea();
var mainMenu = new MainMenu();
var recipeStepper = new RecipeStepper();

titleArea.fadeTitleIn();

if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) )
{
  $('#slidePanel').click(recipeStepper.nextState);
}
else
{
  $(document).click(recipeStepper.nextState);
}
