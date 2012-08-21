(function($) {
	// jQuery plugin implementation
	$.fn.carousel = function(conf) {
		$(this).each(function(index, elem) {
			carousel($(elem), conf);
		})
	}
	
function carousel(self, conf) {
	var viewportWidth = self.parent().width();
  var move = 0;
	var moves = 0;
	var childItems = self.children();
	
	var totalWidth = 0;
	$(childItems).each(function(index, elem) {
		totalWidth += $(elem).width();
	})	
	var maxMoves = Math.floor(totalWidth / viewportWidth) - 1;
	
	applyCss(self);
	
	self.parent().prev('.previousImg').click(function(event) {
		if (moves == 0) {
			return;
		}
		moves -= 1;
		
		move += viewportWidth;
		self.animate({
			left : move
		}, 500);

	});

	self.parent().next(".nextImg").click(function(event) {
		if (moves >= maxMoves) {
			return;
		}	
		moves += 1;
		
		move -= viewportWidth;
		self.animate({
			left : move
		}, 500);

	});
};

})(jQuery);

function applyCss(self) {
	  self.css('position', 'absolute');
	  self.css('height', 'inherit');
	  $(self.parent()).css('float', 'left');
	  $(self.parent()).css('position', 'relative');
	  $(self.parent()).css('overflow', 'hidden');
	  self.children().each(function(index, elem) {
	    $(elem).css('float','left');
	    });
	  self.parent().prev('.previousImg').css('float', 'left');	  
	  self.parent().next('.nextImg').css('float', 'left');
	  }

$(window).load(function() {
	$('.carousel').carousel();
})
