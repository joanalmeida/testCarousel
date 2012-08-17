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
			var childItems = self.children();
			var totalWidth = 0;
			$(childItems).each(function(index, elem) {
				totalWidth += $(elem).width();
			})
			var maxMoves = Math.floor(totalWidth / viewportWidth) - 1;
			
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

$(document).ready(function() {
	$('.carousel').carousel();
})
