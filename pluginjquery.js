(function($) {
  /* jQuery plugin implementation */
  $.fn.carousel = function(conf) {
    $(this).each(function(index, elem) {
      carousel($(elem), conf);
    })
  }

  function carousel(self, conf) {
    var viewportWidth = self.parent().width();
    var currentPage = 0;
    var childItems = self.children();

    var settings = self.extend({
      'pagination' : false,
      'circular' : false
    }, conf);

    var totalWidth = 0;
    childItems.each(function(index, elem) {
      totalWidth += $(elem).width();
    })
    var maxPage = Math.ceil(totalWidth / viewportWidth) - 1;
    
    if(settings.pagination){
      self.parent().next('.nextImg').after('<div class="pagination"><p>Page: ' + (currentPage + 1) + ' of ' + (maxPage + 1) + '</p></div>');
    }

    if (!settings.circular) {
      self.parent().prev('.previousImg').addClass('disabled');
    }
    applyCss(self, totalWidth);

    self.parent().prev('.previousImg').click(function(event) {
      /* Moves the carrousel left */
      self.go(currentPage - 1);
    });

    self.parent().next('.nextImg').click(function(event) {
      /* Moves the carrousel right */
      self.go(currentPage + 1);
    });

    self.go = function(page) {
      var self = this;

      if ((page < 0  || page > maxPage) && !settings.circular) { 
        return;
      }

      // check the limits
      page = page < 0 ? maxPage: page;
      page = page > maxPage ? 0: page;

      
      /* Adds or removes the disable class to the next or previous
       * buttons if not circular */
      self.parent().next('.arrow.disabled').removeClass('disabled');
      if (!settings.circular){
        if (page == maxPage) {
          self.parent().next('.nextImg').addClass('disabled');
        }
        if (page == 0){
          self.parent().prev('.previousImg').addClass('disabled');
        }
      }

      currentPage = page;
      self.parent().nextAll('.pagination').html('<p>Page: ' + (page + 1) + ' of ' + (maxPage + 1) + '</p>');
      
      self.animate({
        left : -(page * viewportWidth)
      }, 500);

    };
  }
  ;

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
  self.parent().prev('.previousImg').css('float', 'left');
  self.parent().next('.nextImg').css('float', 'left');
  self.parent().nextAll('.clear').css('clear', 'left');
}

$(window).load(function() {
  $('.carousel1').carousel({
    'pagination' : true,
    'circular' : true,
  });
  $('.carousel2').carousel({
    'pagination' : true
  });
  
  $('.carousel3').carousel();
})
