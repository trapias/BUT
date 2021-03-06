/*!
 * toc - jQuery Table of Contents Plugin
 * v0.1.2
 * http://projects.jga.me/toc/
 * copyright Greg Allen 2013
 * MIT License
 * modified for DNN BUT by Alberto Velo
*/
(function($) {
$.fn.toc = function(options) {
  var self = this;
  var opts = $.extend({}, jQuery.fn.toc.defaults, options);

  var container = $(opts.container);
  var headings = $(opts.selectors, container);
  var headingOffsets = [];
    //var activeClassName = opts.prefix+'-active';
  var activeClassName = 'active';

    //BUT: use affix to handle scrolling

  //var scrollTo = function(e) {
  //  if (opts.smoothScrolling) {
  //    e.preventDefault();
  //    var elScrollTo = $(e.target).attr('href');
  //    var $el = $(elScrollTo);

  //    $('body,html').animate({ scrollTop: $el.offset().top }, 400, 'swing', function() {
  //      location.hash = elScrollTo;
  //    });
  //  }
  //  $('li', self).removeClass(activeClassName);
  //  $(e.target).parent().addClass(activeClassName);
  //};

  //highlight on scroll
  //var timeout;
  //var highlightOnScroll = function(e) {
  //  if (timeout) {
  //    clearTimeout(timeout);
  //  }
  //  timeout = setTimeout(function() {
  //    var top = $(window).scrollTop(),
  //      highlighted;
  //    for (var i = 0, c = headingOffsets.length; i < c; i++) {
  //      if (headingOffsets[i] >= top) {
  //        $('li', self).removeClass(activeClassName);
  //        highlighted = $('li:eq('+(i-1)+')', self).addClass(activeClassName);
  //        opts.onHighlight(highlighted);
  //        break;
  //      }
  //    }
  //  }, 50);
  //};
  //if (opts.highlightOnScroll) {
  //  $(window).bind('scroll', highlightOnScroll);
  //  highlightOnScroll();
  //}

  return this.each(function() {
    //build TOC
      var el = $(this);

    var ul = $('<ul class=\'nav nav-list but-toc\'/>');
    headings.each(function(i, heading) {
      var $h = $(heading);
      headingOffsets.push($h.offset().top - opts.highlightOffset);

      //console.log('heading=' + $h.prop('tagName') + ' ' + $h.html());
        if ($h.html() == '') return;
        $h.addClass('but-toc-heading' + ' ' + $h.prop('tagName').toLowerCase());

      //add anchor
      var anchor = $('<span/>').attr('id', opts.anchorName(i, heading, opts.prefix)).insertBefore($h);

      //build TOC item
      var a = $('<a/>')
        .text(opts.headerText(i, heading, $h))
        .attr('href', '#' + opts.anchorName(i, heading, opts.prefix))
        .bind('click', function(e) { 
          scrollTo(e);
          el.trigger('selected', $(this).attr('href'));
        });

	  var chevron = '<em class="icon-chevron-right"></em>';
	  a.append(chevron);
	  
      var li = $('<li/>')
        .addClass(opts.itemClass(i, heading, $h, opts.prefix))
        .append(a);

      ul.append(li);
    });
    el.html(ul);
    //console.log('el=' + el.html());
  });
};


jQuery.fn.toc.defaults = {
  container: 'body',
  selectors: 'h1,h2,h3',
  smoothScrolling: true,
  prefix: 'toc',
  onHighlight: function() {},
  highlightOnScroll: true,
  highlightOffset: 100,
  anchorName: function(i, heading, prefix) {
    return prefix+i;
  },
  headerText: function(i, heading, $heading) {
    return $heading.text();
  },
  itemClass: function(i, heading, $heading, prefix) {
    return prefix + '-' + $heading[0].tagName.toLowerCase();
  }

};

})(jQuery);
