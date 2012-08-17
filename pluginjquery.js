(function($) {
	// jQuery plugin implementation
	$.fn.carousel = function(conf) {
		$(this).each(function(index, elem) {
			carousel($(elem), conf);
		})
	}

	function carousel(self, conf) {
		var viewportWidth = self.parent().width();
		var itemQuantity = self.find('img').size();
		var itemWidth = self.find('img').eq(0).width();
		var itemsPerView = viewportWidth / itemWidth;
		var maxMoves = itemQuantity / itemsPerView;
		var timesMoved = 0;
		var move = 0;

		self.parent().prev('.previousImg').click(function(event) {
			if (move === 0) {
				return;
			}

			move = move + viewportWidth;

			self.animate({
				left : move
			}, 500);

		});

		self.parent().next(".nextImg").click(function(event) {
			if (timesMoved >= maxMoves) {
				return;
			}

			move = move - viewportWidth;
			self.animate({
				left : move
			}, 500);

			timesMoved++;

		});
	};

})(jQuery);

$(document).ready(function() {
	$('.carousel').carousel();
})
