jQuery.fn.delay = function (time, name) {

	return this.queue((name || "fx"), function () {
		var self = this;
		setTimeout(function () {
			jQuery.dequeue(self);
		}, time);
	});

};

(function ($) {

	$.fn.responsiveVideo = function () {

		// Gather all videos
		var el = $(this),
			all_videos = el.find('iframe[src*="player.vimeo.com"], iframe[src*="youtube.com"], iframe[src*="dailymotion.com"], iframe[src*="kickstarter.com"][src*="video.html"],object, embed');

		// Cycle through each video and add wrapper div with appropriate aspect ratio
		all_videos.each(function () {

			var video = $(this)

			aspect_ratio = video.attr('height') / video.attr('width');

			video.removeAttr('height').removeAttr('width');


			if (!video.is('embed') && !video.parent().hasClass('responsive-video-wrapper')) video.wrap('<div class="responsive-video-wrapper" style="padding-top: ' + (aspect_ratio * 100) + '%" />');



		});

	};

})(jQuery);


var globalTimer = null;

jQuery(window).bind("load resize", function () {
	clearTimeout(globalTimer);
	globalTimer = setTimeout(doneResize, 50);
});

function doneResize() {

	if (jQuery("#menuwidgets .menuwidget")) {
		var navwidth = 0;
		var menuwidth = 0;
		var windowwidth = 0;
		jQuery('#nav ul.sf-menu').children().each(function () {
			navwidth += jQuery(this).outerWidth();
		});
		widgetwidth = jQuery('#menuwidgets').outerWidth() + 30;
		menuwidth = navwidth + widgetwidth;
		windowwidth = jQuery(window).width();

		if (menuwidth > windowwidth) {
			jQuery("#flexnav, #menuwidgets").addClass('stackleft');
			jQuery("#nav.navcenter").css('display', 'block');
		} else {
			jQuery("#flexnav, #menuwidgets").removeClass('stackleft');
			jQuery("#nav.navcenter").css('display', 'inline-block');
		}
	}

	if ((jQuery("#bgwrapper div.widthdetect").width() == 0)) { // if mobile menu
	jQuery("#navwrap").addClass("mobilemenu");
	jQuery("#nav").css("display","none");
		jQuery("ul.sf-menu").superfish('destroy');
		if (jQuery('#secondary-nav')) {
			jQuery('#secondary-nav ul.sf-menu > li').addClass("cloned").appendTo('#nav ul.sf-menu');
		}
		




	} else {
		jQuery("#navwrap").removeClass("mobilemenu");
		jQuery("#nav").css("display","block");
		jQuery("#nav.navcenter").css('display', 'inline-block');
		if (jQuery('#secondary-nav')) {
			jQuery('#nav ul.sf-menu > li.cloned').appendTo('#secondary-nav ul.sf-menu').removeClass('cloned');
		}

		jQuery("ul.sf-menu").superfish({
			cssArrows: true,
			dropShadows: false,
			animation: {
				opacity: 'show',
				height: 'show'
			},
			speed: 150,
			delay: 300
		});
	}


	if (jQuery("body").hasClass("flex-respsp")) {
		jQuery("div").each(function () {
			var paddingLeft = jQuery(this).css("paddingLeft");
			var paddingRight = jQuery(this).css("paddingRight");
			if (paddingLeft == "95px") {
				jQuery(this).css("paddingLeft", "11.2%");
				jQuery(this).css("paddingRight", "11.2%");
			} else if (paddingLeft == "50px") {
				jQuery(this).css("paddingLeft", "5%");
				jQuery(this).css("paddingRight", "5%");
			}
			if(jQuery(this).css("width") == '500px') {
				jQuery(this).css({"max-width":"500px","width":"100%"});	
			}
			if(jQuery(this).css("width") == '780px') {
				jQuery(this).addClass('oldbanner');
			}

		});
		jQuery(".fspbanner").each(function () {
				if(jQuery('body').hasClass('sp14')) { 
					jQuery(this).css("padding-left", "70px").css("padding-right","70px");
				} else {
				var marginLeft = jQuery(this).css("marginLeft");
				var marginRight = jQuery(this).css("marginRight");
				if (marginLeft == "-95px") {
					jQuery(this).css("marginLeft", "-14.2%").css("marginRight", "-14.2%");
				}
				}
			});
	} else { 
		jQuery('div.oldbanner').removeClass('oldbanner');
		
	};

};

function submitForm(formID) {
	document.getElementById(formID).submit();
}

jQuery(document).ready(function ($) {
	
	$( 'a[href="#"]' ).click( function(e) { // prevent empty links default behavior
      e.preventDefault();
   } );


	// sticky menu
	
	if(!$("#navwrap").hasClass('navinside') && $("#navwrap").hasClass('navsticky')) {
		var top = $('#navwrap').offset().top;
		
	  $(window).bind("load scroll", function () {
		// what the y position of the scroll is
		var y = $(this).scrollTop();
		// whether that's below the form
		if (y >= top) {
		  // if so, ad the fixed class
		  var navheight = $("#navwrap").height() + parseInt($("#navwrap").css('marginBottom'));
		  $('#navwrap').addClass('stickynav');
		  $('#nav').css('margin','0 auto');
		  $('#bgwrapper').css('marginTop',navheight + 'px');
		} else {
		  // otherwise remove it
		  $('#navwrap').removeClass('stickynav');
		  $('#bgwrapper').css('marginTop','0');
		}
	  });
	};

	

	
	jQuery("#menu-icon").click(function(){
		jQuery("#nav").slideToggle();
	});
	
	if ($("#navwrap").hasClass("navfullwidth")) {
		$('#navwrap, #nav, #flexnav, #nav ul.sf-menu').css("width", "100%").css("padding", "0");
		$menuwidth = $("#nav").width();
		$numitems = $("#nav ul.sf-menu > li").length;
		$itemwidth = (($menuwidth / $numitems) / $menuwidth) * 100;
		$('#nav ul.sf-menu > li').css("width", $itemwidth + '%').css("float", "left");
		$('#nav ul.sf-menu > li > a').css("textAlign", "center");
	}

	$('#navwrap:not(".mobilemenu") .sf-menu ul li, #secondary-navwrap .sf-menu ul li').mouseover(function () {
	
		var wapoMainWindowWidth = $(window).width();

		// checks if third level menu exist         
		var subMenuExist = $(this).find('.sub-menu').length;
		if (subMenuExist > 0) {
			var subMenuWidth = $(this).find('.sub-menu').width();
			var subMenuOffset = $(this).find('.sub-menu').parent().offset().left + subMenuWidth;

			// if sub menu is off screen, give new position
			if ((subMenuOffset + subMenuWidth) > wapoMainWindowWidth) {
				var newSubMenuPosition = subMenuWidth;
				$(this).find('.sub-menu').css({
					left: -newSubMenuPosition,
					top: '5px'	
				}).addClass('topleftround');
			}
		}
	});

	$('.fixed-header .flex-primary.sf-menu > li:last, .fixed-header .flex-secondary.sf-menu > li:last').mouseover(function () {

		var wapoMainSiteWidth = $("#wrap").width();

		var subMenuExist = $(this).find('.sub-menu:first').length;
		if (subMenuExist > 0) {
			var rightBorder = $("#wrap").offset().left + wapoMainSiteWidth;
			var subMenuWidth = $(this).find('.sub-menu:first').width();
			var subMenuOffset = $(this).find('.sub-menu:first').parent().offset().left + subMenuWidth;

			if ((subMenuOffset + subMenuWidth) > rightBorder) {
				$(this).find('.sub-menu:first').css({
					left: 'auto',
					right: '0px',
					top: '100%'
				});
			}
		}
	});
	
	$('.sf-menu > li > a').each(function () {
		if ($.trim($(this).text()) == '') {
			$("i", this).css("margin-right", "0");
		}
	});


	if ($("#feature").length == 0 && $(".layout-closed #navwrap").hasClass("belowfeature")) {
		$("#navwrap").addClass("toprounded");
	}
	if ($("#feature").length == 0 && $(".layout-closed #secondary-navwrap").hasClass("belowfeature")) {
		$("#secondary-navwrap").addClass("toprounded");
	}
	if ($("#feature").length == 0 && !$(".layout-closed #secondary-navwrap").hasClass("belowfeature") && !$('.layout-closed #navwrap').hasClass('belowfeature')) {
		$("#content").addClass("toprounded");
	}
	
	$("table").each(function() {
		$this = $(this);
		if($this.attr('width') == 508) {
		$this.addClass('respguar');
		} else if($this.attr('width') == 650) {
		$this.addClass('resp650');
		};
		
		$('td[width="78"]').parents('table').addClass('twoarrows');
		$('td[width="80"]').parents('table').addClass('bigarrows');

	});



	$('.flexform input[type="text"]').addClass("idleField");
	$('.flexform input[type="text"]').focus(function () {
		$(this).removeClass("idleField").addClass("focusField");
		if (this.value == this.defaultValue) {
			this.value = '';
		}
		if (this.value != this.defaultValue) {
			this.select();
		}
	});
	$('.flexform input[type="text"]').blur(function () {
		$(this).removeClass("focusField").addClass("idleField");
		if (this.value == '') {
			this.value = (this.defaultValue ? this.defaultValue : '');
		}
	});

	$(".flexbutton").hover(function () {
		$curcolor = $(this).css("background-color");
		$hvrcolor = $(this).attr("data-param");
		$(this).css("background-color", "#" + $hvrcolor)
	}, function () {
		$(this).css("background-color", $curcolor)
	});

	function flashing() {
		$('.flashing a').delay(2000).fadeTo(1000, 0);
		$('.flashing a').fadeTo(1000, 1, flashing);
	}
	flashing();

	$('div.buybutton').css({

		'max-width': '100%',
		'background-size': '100% 200%'
	});
	$('div.buybutton a').css({

		'max-width': '100%',
		'background-size': '100% 200%'
	});
}); // end doc ready