(function($) { 
		// jQuery plugin implementation
	$.fn.carousel = function (conf) {
	  $(this).each(function(index, elem){
      carousel($(elem), conf);
	  })
	}
	
	function carousel (self, conf) { 
    var divWidth = self.find('div').eq(0).width();
		var move=0;
		var items = self.find('div').size();
		items -= 1;

		console.log(self);

		self.parent().prev('.previousImg').click(function(event){
			if (move === 0) {
				return;
			}	
			
		  move = move + divWidth;
		  
		  self.animate({
		    left: move
		  }, 500);
			
		});
    
    self.parent().next(".nextImg").click(function(event){
			if (move == (0 - divWidth * items)) {
				return;
			}
			
		  move = move - divWidth;
		  self.animate({
			   left: move
			}, 500);
		
		});
	};

})(jQuery);

$(document).ready(function(){
  $('.carousel').carousel();
})
