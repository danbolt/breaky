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

$('#slidePanel').click(function() {$('#backbutton').css('visibility', 'hidden'); recipeStepper.nextState();});

$('#backbutton').click(function() {$(this).css('visibility', 'hidden'); recipeStepper.prevState();});
