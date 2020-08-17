/* eslint-disable */

var $ =  require('jquery/dist/jquery')

/**
 * Trust All Scripts
 *
 * This is a dirty little script for iterating over script tags
 * of your Ghost posts and adding them to the document head.
 *
 * This works for any script that then injects content into the page
 * via ids/classnames etc.
 *
 */
var trustAllScripts = function () {
    var scriptNodes = document.querySelectorAll('.load-external-scripts script');

    for (var i = 0; i < scriptNodes.length; i += 1) {
        var node = scriptNodes[i];
        var s = document.createElement('script');
        s.type = node.type || 'text/javascript';

        if (node.attributes.src) {
            s.src = node.attributes.src.value;
        } else {
            s.innerHTML = node.innerHTML;
        }

        document.getElementsByTagName('head')[0].appendChild(s);
    }
};

const getOffsetTop = element => {
  let offsetTop = 0;
  while (element) {
    offsetTop += element.offsetTop;
    element = element.offsetParent;
  }
  return offsetTop;
}

var anchorScroll = function(location) {
  if (location && location.hash) {
    setTimeout(() => {
      const el = document.querySelector(location.hash)
      const offsetTop = getOffsetTop(el);
      if (el) window.scrollTo(0, offsetTop - 20)
    }, 0);
  }
}

var animatedScroll = function() {
  $('a[href*="#"]').on('click', function (e) {
    e.preventDefault()

    $('html, body').animate(
      {
        scrollTop: $($(this).attr('href')).offset().top,
      },
      400,
      'swing'
    )
  })
}

exports.shouldUpdateScroll = ({
  routerProps: { location },
  getSavedScrollPosition
}) => {
  anchorScroll(location);
  return true;
}

exports.onRouteUpdate = ({location}) => {
  trustAllScripts();
  animatedScroll();
  return true;
};
