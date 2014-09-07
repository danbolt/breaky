function RecipeStepper()
{
  var currentRecipe = null;
  var previousStates = [];
  var currentState = null;

  var slideStateOut = function()
  {
    if (currentRecipe == null) { return; }
    if (currentState == null) { $('#backbutton').css('visibility', 'visible');  return; }

    $('#slidePanel').animate({left: '100%'}, 750, slideStateIn);
  }

  var slideStateIn = function(prev)
  {
    if (prev == undefined) prev = false;

    if (!prev)
    {
      nextStateContent();

      $('#slidePanel').css('left', '-100%');
      $('#slidePanel').animate({left: '0%'}, 750, function() { if(previousStates.length > 0)  { $('#backbutton').css('visibility', 'visible'); } });
    }
    else
    {
      prevStateContent();

      $('#slidePanel').css('left', '100%');
      $('#slidePanel').animate({left: '0%'}, 750, function() { if(previousStates.length > 0)  { $('#backbutton').css('visibility', 'visible'); } });
    }
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

    $('#slidePanel').empty();
    $('#slidePanel').fadeIn(100);
    $('#slidePanel').append('<div id="instruction"></div><div id="tips"></div>');

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
      previousStates.push(currentState);
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

  var prevStateContent = function()
  {
    currentState = previousStates.pop();

    updateViewAndTips(currentRecipe.steps[currentState].content.mainText, currentRecipe.steps[currentState].content.tips);
  }

  var goBack = function()
  {
    if (previousStates.length < 1)
    {
      return;
    }

    $('#slidePanel').animate({left: '-100%'}, 750, function() { slideStateIn(true);});
  }

  this.loadRecipe = loadRecipe;
  this.nextState = slideStateOut;
  this.prevState = goBack;
}
