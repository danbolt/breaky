function MainMenu()
{
  var chooseRecipeMessage = 'Let\'s pick a recipe';

  var recipeListing = [
                       {name:'Crepes', description: 'Thin pancakes that go nicely with fruit.', filename: 'crepes'},
                       {name:'Crepes', description: 'Thin pancakes that go nicely with fruit.', filename: 'crepes'},
                       {name:'Crepes', description: 'Thin pancakes that go nicely with fruit.', filename: 'crepes'},
                       {name:'Crepes', description: 'Thin pancakes that go nicely with fruit.', filename: 'crepes'},
                       {name:'Crepes', description: 'Thin pancakes that go nicely with fruit.', filename: 'crepes'},
                       {name:'Crepes', description: 'Thin pancakes that go nicely with fruit.', filename: 'crepes'}
                      ];

  var transitionIn = function()
  {
    $('#slidePanel').empty();
    $('#slidePanel').append('<div id="instruction">' + chooseRecipeMessage.toUpperCase() + '</div>');

    showRecipes();
  }

  var transitionOut = function(recipeFileName)
  {
    $('#slidePanel').fadeOut(500, function()
    {
      finishMenuFadeout(recipeFileName);
    });
  }

  var showRecipes = function()
  {
    recipeListing.forEach(function(recipe)
    {
      $('#slidePanel').append('<div class="recipeListing" filename="' + recipe.filename + '"><div class="recipeTitle">' + recipe.name.toUpperCase() + '</div><div class="recipeDescription">' + recipe.description  + '</div></div>');
    });

    $('.recipeListing').click(function() {transitionOut($(this).attr('filename'));});

    $('#slidePanel').fadeIn(100);
  }

  this.transitionIn = transitionIn;
}
