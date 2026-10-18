(function ($) {
  'use strict';

  var phrases = [
    '富强', '民主', '文明', '和谐', '☭',
    '自由', '平等', '公正', '法治', '★',
    '爱国', '敬业', '诚信', '友善', '♡'
  ];
  var phraseIndex = 0;

  function randomChannel() {
    return Math.floor(Math.random() * 256);
  }

  function randomColor() {
    return 'rgb(' + randomChannel() + ',' + randomChannel() + ',' + randomChannel() + ')';
  }

  $(function () {
    $('body').on('click', function (event) {
      if ($(event.target).closest('[data-no-click-effect]').length) {
        return;
      }

      var phrase = phrases[phraseIndex];
      phraseIndex = (phraseIndex + 1) % phrases.length;

      var startY = event.pageY;
      var $floating = $('<span></span>').text(phrase).css({
        position: 'absolute',
        zIndex: 1000000,
        top: startY - 20,
        left: event.pageX,
        fontWeight: 'bold',
        color: randomColor()
      });

      $('body').append($floating);
      $floating.animate({ top: startY - 180, opacity: 0 }, 1500, function () {
        $floating.remove();
      });
    });
  });
})(jQuery);
