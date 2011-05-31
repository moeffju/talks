$(document).keydown(function(event) {
  if (event.which == 78) { // 'N'
    var slide = $('.slide.current');
    slide.find('.reveal:hidden, .result:hidden').first().fadeIn();
    slide.removeClass('with-steps');
  }
  else if (event.which == 37 || event.which == 39 || event.which == 32) { // Navigation Cursor Keys
    $('.result, .true, .false, .playing .reveal').fadeOut();
  }
  else if (event.which == 80) { // 'P'
    $('html').addClass('playing');
    $('.result, .true, .false, .playing .reveal').fadeOut();
  }
});

$(function() {
  try {
    console.clear();
  } catch(e) {}
  setTimeout(function() {
    $('.navigation-info').removeClass('navigation-info');
    $('#startup-info').fadeOut();
  }, 3000);
});

(function($){
	$.gaTracker = function(code, opts){
		opts = jQuery.extend({
			external:	'/external/',
			mailto:		'/mailtos/',
			download:	'/downloads/',
			extensions: [
				'pdf','doc','xls','csv','jpg','gif', 'mp3',
				'swf','txt','ppt','zip','gz','dmg','xml'		
			]	
		}, opts);
		
		function decorateLink(u){
			var trackingURL = '';
			
			if(u.indexOf('://') == -1 && u.indexOf('mailto:') != 0){
				var ext = u.split('.')[u.split('.').length - 1];			
				var exts = opts.extensions;
				
				for(i = 0; i < exts.length; i++){
					if(ext == exts[i]){
						trackingURL = opts.download + u;
						break;
					}
				}				
			} else {
				if(u.indexOf('mailto:') == 0){
					trackingURL = opts.mailto + u.substring(7);					
				} else {
					var regex = /([^:\/]+)*(?::\/\/)*([^:\/]+)(:[0-9]+)*\/?/i;
					var linkparts = regex.exec(u);
					var urlparts = regex.exec(location.href);					
					if(linkparts[2] != urlparts[2]) trackingURL = opts.external + u;
				}
			}
			
			return trackingURL;			
		}
		
		function addTracking(){
			_uacct = code;
			urchinTracker();
		
			$('a').each(function(){
				var u = $(this).attr('href');
				
				if(typeof(u) != 'undefined'){
					var newLink = decorateLink(u);

					if(newLink.length){
						$(this).click(function(){
							urchinTracker(newLink);
						});
					}
				}				
			});
		}
		
		function initGA(){
			try{
				var gaURL = (location.href.indexOf('https') == 0 ? 'https://ssl' : 'http://www');
				gaURL += '.google-analytics.com/urchin.js';
		
				$.getScript(gaURL, function(){
					addTracking();
				});
			} catch(err) {
				console.log('Failed to load Google Analytics:' + err);
			}
		}
		
		initGA();
	}
})(jQuery);

if (location.hostname != 'localhost' && !location.href.match(/\/test\//)) {
  $.gaTracker('UA-75436-7');
}
