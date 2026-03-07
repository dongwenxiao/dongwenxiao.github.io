$(function () {
  let page1 = $('.page1');
  let page2 = $('.page2');
  page1.on('touchend', function () {
    handler();
  });

  page1.on('touchmove', function () {
    handler();
  });

  let handlerCount = 0;
  function handler() {
    if (handlerCount > 0) return;
    handlerCount++;
    let winWidth = window.screen.width;
    let right = page1.find('.right');
    right.css('-webkit-transform', 'translate3d(' + winWidth + 'px,0,0)');

    // right.addClass('push-right');

    // right.animate({left: winWidth + 'px'},1000,'ease-in',function(){
    // 	page2.show();
    // 	changeOpacity();
    // });

    let fixbug = 0;
    right.on('webkitTransitionEnd', function () {
      page2.show();
      changeOpacity();
      // page1.css("opacity",0);
      // page1.on('webkitTransitionEnd',function(){
      // 	fixbug ++;
      // 	if(fixbug == 2){
      // 		page1.hide();
      // 	}
      // });
    });

    function changeOpacity() {
      page1.animate(
        {
          opacity: 0,
        },
        500,
        'ease-in',
        function () {
          page1.hide();
        }
      );
    }
  }
});
