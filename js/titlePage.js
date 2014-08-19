function TitleArea()
{
  var fadeTitleIn = function()
  {
    var fadeTaglineIn = function()
    {
      $('#tagline').fadeIn(1000, fadeTitleOut);
    }

    $('#slidePanel').css('display', 'none');
    $('#slidePanel').append('<div id=\'logo\'><br />' + APP_TITLE.toUpperCase() + '</div><div id=\'tagline\'>Let\'s make breakfast.</div>');
    $('#slidePanel').fadeIn(1000, fadeTaglineIn);
  }

  var fadeTitleOut = function()
  {
    $('#slidePanel').fadeOut(1400, finishTitleFadeout);
  }

  this.fadeTitleIn = fadeTitleIn;
}
