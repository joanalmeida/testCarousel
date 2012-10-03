(function($) {
  /* jQuery plugin implementation */
  $.fn.carousel = function(conf) {
    $(this).each(function(index, elem) {
      carousel($(elem), conf);
    })
  }

  function carousel(self, conf) {
    var viewportWidth = self.width();
    var currentPage = 0;
    var carousel = self.find('.carousel');

    var settings = self.extend({
      'pagination' : false,
      'circular' : false
    }, conf);

    var totalWidth = 0;
    carousel.children().each(function(index, elem) {
      totalWidth += $(elem).width();
    })
    var maxPage = Math.ceil(totalWidth / viewportWidth) - 1;

    if (settings.pagination) {
      carousel.after('<a id="nextImgBttm"class="arrow nextImg">Next</a>')
              .after('<div class="pagination"><p>' + (currentPage + 1) + ' of '
                     + (maxPage + 1) + '</p></div>')
              .after('<a id="prevImgBttm" class="arrow previousImg">Prev</a>');

    }

    if (!settings.circular) {
      self.find('.previousImg').addClass('disabled');
    }
    applyCss(carousel, totalWidth);

    self.find('.previousImg').bind('click', function(event) {
      /* Moves the carrousel left */
      self.go(currentPage - 1, carousel);
    });

    self.find('.nextImg').bind('click', function(event) {
      /* Moves the carrousel right */
      self.go(currentPage + 1, carousel);
    });

    self.go = function(page, carousel) {
      var self = this;

      if ((page < 0 || page > maxPage) && !settings.circular) {
        return;
      }

      // check the limits
      page = page < 0 ? maxPage : page;
      page = page > maxPage ? 0 : page;

      /*
       * Adds or removes the disable class to the next or previous buttons if
       * not circular
       */
      self.find('.arrow.disabled').removeClass('disabled');
      if (!settings.circular) {
        if (page == maxPage) {
          self.find('.nextImg').addClass('disabled');
        }
        if (page == 0) {
          self.find('.previousImg').addClass('disabled');
        }
      }

      currentPage = page;

      if (settings.pagination) {
        self.find('.pagination').html(
            '<p>' + (page + 1) + ' of ' + (maxPage + 1) + '</p>');
      }

      carousel.animate({
        left : -(page * viewportWidth)
      }, 500);

    }; //End of go function
  }; //End of carousel function

})(jQuery);

/* Applies the corresponding css properties */
function applyCss(self, width) {
  self.css('position', 'absolute');
  self.css('height', 'inherit');
  self.css('width', width);
  $(self.parent()).css('float', 'left');
  $(self.parent()).css('position', 'relative');
  $(self.parent()).css('overflow', 'hidden');
  self.children().each(function(index, elem) {
    $(elem).css('float', 'left');
  });
}

$(window).load(function() {
  $('.viewport').carousel({
    'pagination' : true
    // 'circular' : true
  });
  // $('.carousel2').carousel({
  //   'pagination' : true
  // });

  // $('.carousel3').carousel({
  //   'circular' : true,
  //   'pagination' : true
  // });
})
