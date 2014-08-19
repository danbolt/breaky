function RecipeStepper()
{
  var currentRecipe = null;
  var currentState = null;

  var slideStateOut = function()
  {
    if (currentState == null) { return; }

    $('#slidePanel').animate({left: '100%'}, 750, slideStateIn);
  }

  var slideStateIn = function()
  {
    nextStateContent();

    $('#slidePanel').css('left', '-100%');
    $('#slidePanel').animate({left: '0%'}, 750);
  }

  var updateView = function(text)
  {
    $('#instruction').html(text.toUpperCase().replace(/\. /g, '.<br /><br />'));
  }

  var updateTips = function(tipData)
  {
    $('#tips').empty();

    if (tipData)
    {
      tipData.forEach(function(tip)
      {
        $('#tips').append('<div class=\'tip\'><div class=\'tipTitle\'>' + tip.title.toUpperCase() + '</div><div class=\'tipText\'>' + tip.text + '</div></div>');
      });
    }

    // need to reset hover functionality every time tips are added
    $('.tip').hover(function()
    {
      $(this).find('.tipText').show(200);
    },
    function()
    {
      $(this).find('.tipText').hide(200);
    });
  }

  var updateViewAndTips = function(text, tipData)
  {
    updateView(text);

    updateTips(tipData);
  }

  var applyRecipeData = function(recipeData)
  {
    var stateArray = [];

    recipeData.steps.forEach(function(step)
    {
      stateArray[step.name] = step;
    });

    recipeData.steps = stateArray;

    currentRecipe = recipeData;
    currentState = currentRecipe.firstStep;

    updateViewAndTips(currentRecipe.steps[currentState].content.mainText, currentRecipe.steps[currentState].content.tips);
  }

  var loadRecipe = function(recipeFileName)
  {
    $.getJSON('recipes/' + recipeFileName + '.json').done(applyRecipeData).fail(requestFailed);
  }

  var nextStateContent = function()
  {
    if (currentState != null && currentRecipe != null)
    {
      currentState = currentRecipe.steps[currentState].nextStep;

      if (currentState != null)
      {
        updateViewAndTips(currentRecipe.steps[currentState].content.mainText, currentRecipe.steps[currentState].content.tips);
      }
      else
      {
        updateViewAndTips('You\'re done!', null);
      }
    }
  }

  this.loadRecipe = loadRecipe;
  this.nextState = slideStateOut;
}
