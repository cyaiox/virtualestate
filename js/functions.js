/*
	Project Name : Metrica

	## UDF Function 
	
	
	## Document Ready
		-- Scrolling Navigation
		-- Responsive Caret
		-- Remove p empty tag for Shortcode
		-- Tooltip
		
		-- Quick Contact Form

	## Window Load
		- Site Loader
*/


(function($)
{
	"use strict" 
	
	
	/* - Bureger Menu */
	function burger_menu() {
		var height = $(window).height();
		var header_height = $(".header-section").height();
		var burger_menu_height = height - header_height;
		$(".burger-menu-block").css({ "top":header_height});
		$(".burger-menu a").on("click", function() {
			$(".burger-menu-block").addClass("active");
		});
		$(".burger-menu-block span").on("click", function() {
			$(".burger-menu-block").removeClass("active");
		});
	}
	
	/* - Content Slider Section */
	function content_slider_img() {
		var width = $(window).width();
		var container_width = $(".container").width();
		var content_right_padding = ( width - container_width ) / 2;
		if ( width >= 992 ) {
			$(".content-slider-content").css("padding-right", content_right_padding);
		}else {
			$(".content-slider-content").css("padding-right", "15px" );
		}
		var ele_id = 0;
		if ( width >= 992 ) {
			var content_section_height = $(".content-slider-section").height();
			var content_height = $(".content-slider-content").height();			
			$( "[id*='content_img-']" ).removeAttr("style");
			$( "[id*='content_img-'] img" ).remove();
			$( "[id*='content_img-']" ).each(function () { 
				ele_id = $(this).attr('id').split("-")[1];
				var content_img = $(this).attr("data-image");
				$( "[id*='content_img-"+ele_id+"']" ).css({"background-image":"url('" + content_img + "')","height": content_section_height });
			});
		} else {
			$( "[id*='content_img-']" ).removeAttr("style");
			$( "[id*='content_img-'] img" ).remove();
			$( "[id*='content_img-']" ).each(function () { 
				ele_id = $(this).attr('id').split("-")[1];
				var content_img = $(this).attr("data-image");
				$( "[id*='content_img-"+ele_id+"']" ).append("<img src='"+ content_img +"' />")
			});
		}
	}
	
	/* - Services Section */
	function srv_img() {
		var width = $(window).width();
		var services_section_height = $(".services-section").height();
		var services_content_height = $(".services-detail").height();
		if ( width >= 992 ) {
			$( ".srv-img" ).removeAttr("style");
			$( ".srv-img img" ).remove();
			var srv_img = $(".srv-img").attr("data-image");
			$( ".srv-img" ).css({"background-image":"url('" + srv_img + "')","height": services_section_height });
		} else {
			$( ".srv-img" ).removeAttr("style");
			$( ".srv-img img" ).remove();
			var srv_img = $(".srv-img").attr("data-image");
			$( ".srv-img" ).append("<img src='"+ srv_img +"' />")
		}
	}
	
	/* - Vertical Header */
	function vertical_menu() {
		if($(".vertical-header").length){
			var width = $(window).width();
			if($(".header-section17").length > 0){
				if ( width >= 992 ) {
					var vheader_width = $(".vertical-header").width() + 100;
					$(".content-right").css("margin-left", vheader_width);
					
				} else {
					$(".content-right").removeAttr("style");
				}
			}else {
				if ( width >= 992 ) {
					var vheader_width = $(".vertical-header").width();
					$(".content-right").css("margin-left", vheader_width);
				} else {
					$(".content-right").removeAttr("style");
				}
			}
		}
	}
	
	/* - Google-map */
	function initialize(obj) {

		var lat = $('#'+obj).attr("data-lat");
        var lng = $('#'+obj).attr("data-lng");
		var contentString = $('#'+obj).attr("data-string");
		var myLatlng = new google.maps.LatLng(lat,lng);
		var map, marker, infowindow;
		var image = 'images/marker.png';
		var zoomLevel = parseInt($('#'+obj).attr("data-zoom"),10);
		var styles = [{"featureType":"landscape","stylers":[{"saturation":-100},{"lightness":65},{"visibility":"on"}]},{"featureType":"poi","stylers":[{"saturation":-100},{"lightness":51},{"visibility":"simplified"}]},{"featureType":"road.highway","stylers":[{"saturation":-100},{"visibility":"simplified"}]},{"featureType":"road.arterial","stylers":[{"saturation":-100},{"lightness":30},{"visibility":"on"}]},{"featureType":"road.local","stylers":[{"saturation":-100},{"lightness":40},{"visibility":"on"}]},{"featureType":"transit","stylers":[{"saturation":-100},{"visibility":"simplified"}]},{"featureType":"administrative.province","stylers":[{"visibility":"off"}]},{"featureType":"water","elementType":"labels","stylers":[{"visibility":"on"},{"lightness":-25},{"saturation":-100}]},{"featureType":"water","elementType":"geometry","stylers":[{"hue":"#ffff00"},{"lightness":-25},{"saturation":-97}]}]
		var styledMap = new google.maps.StyledMapType(styles,{name: "Styled Map"});	
		var mapOptions = {
			zoom: zoomLevel,
			disableDefaultUI: true,
			center: myLatlng,
            scrollwheel: false,
			mapTypeControlOptions: {
            mapTypeIds: [google.maps.MapTypeId.ROADMAP, 'map_style']
			}
		}
		
		map = new google.maps.Map(document.getElementById(obj), mapOptions);

		map.mapTypes.set('map_style', styledMap);
		map.setMapTypeId('map_style');
	
		infowindow = new google.maps.InfoWindow({
			content: contentString
		});      
	    
        marker = new google.maps.Marker({
			position: myLatlng,
			map: map,
			icon: image
		});

		google.maps.event.addListener(marker, 'click', function() {
			infowindow.open(map,marker);
		});	
	}

	/* ## Document Scroll - Window Scroll */
	$( document ).scroll(function()
	{
		var scroll	= $(window).scrollTop();
		var width	=	$(window).width();
		var height	=	$(window).height();

		/*** set sticky menu ***/
		if( scroll >= height )
		{
			$(".header-section:not(.vertical-header)").addClass("navbar-fixed-top animated fadeInDown").delay( 2000 ).fadeIn();
		}
		else if ( scroll <= height )
		{
			$(".header-section:not(.vertical-header)").removeClass("navbar-fixed-top animated fadeInDown");
		}
		else
		{
			$(".header-section:not(.vertical-header)").removeClass("navbar-fixed-top animated fadeInDown");
		} /* set sticky menu - end */

		if ($(this).scrollTop() >= 50)
		{
			/* If page is scrolled more than 50px */
			$('#back-to-top').fadeIn(200);    /* Fade in the arrow */
		}
		else
		{
			$('#back-to-top').fadeOut(200);   /* Else fade out the arrow */
		}
	});

	$('#back-to-top').on("click", function()
	{
		/* When arrow is clicked */
		$('body,html').animate(
		{
			scrollTop : 0 /* Scroll to top of body */
		},800);
	});		
		
	
	/* ## Document Ready - Handler for .ready() called */
	$(document).ready(function($) {

		/* -- Scrolling Navigation */
		var scroll	=	$(window).scrollTop();
		var width	=	$(window).width();
		var height	=	$(window).height();
		
		/* ** set sticky menu ** */
		if( scroll >= height -200 )
		{
			$(".header-section:not(.vertical-header)").addClass("navbar-fixed-top").delay( 2000 ).fadeIn();
		}
		else if ( scroll <= height )
		{
			$(".header-section:not(.vertical-header)").removeClass("navbar-fixed-top");
		}
		else
		{
			$(".header-section").removeClass("navbar-fixed-top");
		} /* set sticky menu - end */
		
		
		$('.navbar-nav li a[href*="#"]:not([href="#"]), .site-logo a[href*="#"]:not([href="#"])').bind('click', function(e) {
	
			var $anchor = $(this);
			
			$('html, body').stop().animate({ scrollTop: $($anchor.attr('href')).offset().top - 49 }, 1500, 'easeInOutExpo');
			
			e.preventDefault();
		});

		/* -- Responsive Caret */
		$(".ddl-switch").on("click", function() {
			var li = $(this).parent();
			if ( li.hasClass("ddl-active") || li.find(".ddl-active").length !== 0 || li.find(".dropdown-menu").is(":visible") ) {
				li.removeClass("ddl-active");
				li.children().find(".ddl-active").removeClass("ddl-active");
				li.children(".dropdown-menu").slideUp();
			}
			else {
				li.addClass("ddl-active");
				li.children(".dropdown-menu").slideDown();
			}
		});
		
		/* - Search */
		if($(".search-box").length){
			$("#search").on("click", function(){
				$(".search-box").addClass("active")
			});
			$(".search-box span").on("click", function(){
				$(".search-box").removeClass("active")
			});
		}
		
		/* - Bureger Menu */
		if($(".burger-menu-block").length){
			burger_menu();
		}
		
		/* - Vertical Header */
		vertical_menu()
		
		/* - Revolution Slider */
		if($(".slider-section").length){
			$("#slider1").revolution({
				sliderType:"standard",
				sliderLayout:"auto",
				delay:9000,
				navigation: {
					arrows:{
						enable:true,
						style:"uranus"
					},
					bullets: {
						enable:true,
						hide_onmobile:true,
						hide_under:1024,
						style:"uranus",
						hide_onleave:false,
						direction:"horizontal",
						h_align:"center",
						v_align:"bottom",
						h_offset:0,
						v_offset:25,
						space:20,
						tmp:''
					}
				},
				gridwidth:1900,
				gridheight:900 ,
				/* stopAfterLoops:0,
				stopAtSlide:1 */
				
			}); 
			$("#home2-slider").revolution({
				sliderType:"standard",
				sliderLayout:"auto",
				delay:9000,
				navigation: {
					arrows:{
						enable:true,
						style:"uranus"
					}, 
					bullets: {
						enable:true,
						hide_onmobile:true,
						hide_under:1024,
						style:"uranus",
						hide_onleave:false,
						direction:"horizontal",
						h_align:"center",
						v_align:"bottom",
						h_offset:0,
						v_offset:25,
						space:10,
						tmp:''
					}
				},
				gridwidth:1900,
				gridheight:900 ,
			}); 
		}
		
		/* - Content Slider */
		content_slider_img();
		
		/* - Services Section */
		srv_img();
		
		/* LightSlider */
		if($("#portfolio-single-crousal").length) {
			$("#portfolio-single-crousal").lightSlider({
				autoWidth:true,
				slideMargin: 0,
				controls: true,
				pager: false,
				loop:true,
				onSliderLoad: function() {
					$("#portfolio-single-crousal").removeClass("cs-hidden");
				} 
			});
		}
		
		/* - Home 7 Team Section */
		if($(".team-carousel").length){
			$(".team-carousel").owlCarousel({
				autoplay: false,
				animateIn: 'fadeIn',
				loop: true,
				dots: false,
				nav: true,
				responsive:{
					0:{
						items:1
					},
					640:{
						items:2
					},
					992: {
						items:3
					}
				},
				margin: 30,
				stagePadding: 0,
				smartSpeed: 450
			});
		}
		
		/* - Statistics Section */
		$('.statistics-section').each(function ()
		{
			var $this = $(this);
			var myVal = $(this).data("value");

			$this.appear(function()
			{		
				var statistics_item_count = 0;
				var statistics_count = 0;					
				statistics_item_count = $( "[id*='statistics_count-']" ).length;

				for(var i=1; i<=statistics_item_count; i++)
				{
					statistics_count = $( "[id*='statistics_count-"+i+"']" ).attr( "data-statistics_percent" );
					if ( statistics_count >= 1000 ){
						var val_k = (statistics_count / 1000);
						$("[id*='statistics_count-"+i+"']").animateNumber({ number: val_k }, 2000);
						$("[id*='statistics_count-"+i+"']").parent("h2").append("<span>k<span>");
					} else {
						$("[id*='statistics_count-"+i+"']").animateNumber({ number: statistics_count }, 2000);
					}
				}
				$('.statistics-section .col-md-3').addClass('animated fadeInDown');
			});
		});

		/* -- Skill Section */
		$( " [id*='skill_type-'] " ).each(function ()
		{
			var ele_id = 0;
			ele_id = $(this).attr('id').split("-")[1];
			
			var $this = $(this);
			var myVal = $(this).data("value");

			$this.appear(function()
			{			
				var skill_type1_item_count = 0;
				var skill_type1_count = 0;					
				skill_type1_item_count = $( "[id*='skill_"+ ele_id +"_count-']" ).length;				
				
				for(var i=1; i<=skill_type1_item_count; i++)
				{
					skill_type1_count = $( "[id*='skill_"+ ele_id +"_count-"+i+"']" ).attr( "data-skill_percent" );
					$("[id*='skill_"+ ele_id +"_count-"+i+"']").animateNumber({ number: skill_type1_count }, 5000);
				}
				
				var skill_bar_count = 0;
				var skills_bar_count = 0;
				skill_bar_count = $( "[id*='skill_bar_"+ ele_id +"_count-']" ).length;
				
				for(var j=1; j<=skill_bar_count; j++)
				{
					skills_bar_count = $( "[id*='skill_"+ ele_id +"_count-"+j+"']" ).attr( "data-skill_percent" );
					$("[id*='skill_bar_"+ ele_id +"_count-"+j+"']").css({'width': skills_bar_count +'%'});
				}
			});
		});
		
		/* -- Circuler Skill  */
		$( "[id*='skill_circuler-']" ).each(function ()
		{
			var ele_id = 0;
			ele_id = $(this).attr('id').split("-")[1];
			
			var $this = $(this);
			var myVal = $(this).data("value");	

			$this.appear(function()
			{
				var skill_item_count = 0;
				var skills_count = 0;

				skill_item_count = $( "[id*='skill_"+ ele_id +"_count-']" ).length;

				for(var i=1; i<=skill_item_count; i++)
				{
					skills_count = $( "[id*='skill_"+ ele_id +"_count-"+i+"']" ).attr( "data-skills_percent" );
					$("[id*='skill_"+ ele_id +"_count-"+i+"']").animateNumber({ number: skills_count }, 2000);
				}
			});				
		});

		$('.dial').each(function ()
		{
			var $this = $(this);
			var myVal = $(this).data("value");		

			$this.appear(function()
			{
				// alert(myVal);
				$this.knob({ });
				$({ value: 0 }).animate({ value: myVal },
				{
					duration: 2000,
					easing: 'swing',
					step: function ()
					{
						$this.val(Math.ceil(this.value)).trigger('change');
					}
				});
			});
		});	
		
		/* -- Testimonials Section */
		if($(".testimonials-box").length){
			$(".testimonials-box").owlCarousel({
				loop: true,				
				margin: 10,
				dots: false,
				nav:false,				
				autoplay:false,				
				autoplayHoverPause:true,
				responsive:{
					0:{
						items:1
					},
					640:{
						items:2
					},
					992:{
						items:3
					},
					1200:{
						items:3
					}
				}
			})
		}
		
		/* -- Counter */
		if($(".counter-section").length) {
			$( "[id*='counter_section-']" ).each(function ()
			{
				var ele_id = 0;
				ele_id = $(this).attr('id').split("-")[1];
				
				var $this = $(this);
				var myVal = $(this).data("value");

				$this.appear(function()
				{		
					var statistics_item_count = 0;
					var statistics_count = 0;					
					statistics_item_count = $( "[id*='statistics_"+ ele_id +"_count-']" ).length;
					 
					for(var i=1; i<=statistics_item_count; i++)
					{
						statistics_count = $( "[id*='statistics_"+ ele_id +"_count-"+ i +"']" ).attr( "data-statistics_percent" );
						$("[id*='statistics_"+ ele_id +"_count-"+ i +"']").animateNumber({ number: statistics_count }, 4000);
					}				
				});
			});
		}
		
		/* -- Client Carousel */
		if( $(".clients-carousel").length ) {
			$(".clients-carousel").owlCarousel({
				loop: true,
				margin: 0,
				nav: false,
				dots: false,
				autoplay: false,
				responsive:{
					0:{
						items: 1
					},
					500:{
						items: 2
					},
					600:{
						items: 3
					},
					1000:{
						items: 6
					}
				}
			});
		}
		if( $(".clients-carousel-1").length ) {
			$(".clients-carousel-1").owlCarousel({
				loop: true,
				margin: 30,
				nav: false,
				dots: false,
				autoplay: false,
				responsive:{
					0:{
						items: 1
					},
					500:{
						items: 2
					},
					600:{
						items: 2
					},
					992:{
						items: 3
					},
					1000:{
						items: 4
					}
				}
			});
		}
		
		/* - Vertical Progress */
		if($(".verticle-progress").length) {
			$( ".bar" ).each(function () {

				var $this = $(this);
				var myVal = $(this).data("value");		

				$this.appear(function() {
			
					var percentage = $(this).data('percentage');

					$(this).animate({
					  'height' : percentage + '%'
					  
					}, 1500);
				});
			});
			$("[id*='vertical_skill-']").each(function ()
			{
				var ele_id = 0;
				ele_id = $(this).attr('id').split("-")[1];
				
				var $this = $(this);
				var myVal = $(this).data("value");

				$this.appear(function()
				{		
					var vertical_item_count = 0;
					var vertical_count = 0;					
					vertical_item_count = $( "[id*='vertical_"+ ele_id +"_count-']" ).length;
					
					
					$("[id*='vertical_"+ ele_id +"_count-']").each(function ()
					{
						var ele_id1 = 0;
						ele_id1 = $(this).attr('id').split("-")[1];
						vertical_count = $( "[id*='vertical_"+ ele_id +"_count-"+ele_id1+"']" ).attr( "data-statistics_percent" );
						$( "[id*='vertical_"+ ele_id +"_count-"+ ele_id1 +"']" ).animateNumber({ number: vertical_count }, 1500);
					});				
				});
			});
			
		}
		
		/* - Doughnut Chart */
		if($(".chart-section").length) {
			if($("#chart-1").length) {
				var data = [
				   {
					value: 61,
					color: "#f89b1c",
					label: "Logo"
				}, {
					value: 25,
					color: "#f9bc68",
					label: "Branding"
				}, {
					value: 14,
					color: "#f9e0bd",
					label: "Print"
				}];
				var options = {
					segmentShowStroke: false,
					animateRotate: true,
					animateScale: true,
					percentageInnerCutout: 65,
					tooltipTemplate: "<%= value %>%"
				}
				var ctx = document.getElementById("myChart-1").getContext("2d");
				var myChart = new Chart(ctx).Doughnut(data, options);
				document.getElementById("js-legend-1").innerHTML = myChart.generateLegend();
			}
			if($("#chart-2").length) {
				var data = [
				   {
					value: 61,
					color: "#f89b1c",
					label: "Logo"
				}, {
					value: 25,
					color: "#f9bc68",
					label: "Branding"
				}, {
					value: 14,
					color: "#f9e0bd",
					label: "Print"
				}];
				var options = {
					segmentShowStroke: false,
					animateRotate: true,
					animateScale: true,
					percentageInnerCutout: 65,
					tooltipTemplate: "<%= value %>%"
				}
				var ctx = document.getElementById("myChart-2").getContext("2d");
				var myChart = new Chart(ctx).Doughnut(data, options);
				document.getElementById("js-legend-2").innerHTML = myChart.generateLegend();
			}
			if($("#chart-3").length) {
				var data = [
				   {
					value: 61,
					color: "#f89b1c",
					label: "Logo"
				}, {
					value: 25,
					color: "#f9bc68",
					label: "Branding"
				}, {
					value: 14,
					color: "#f9e0bd",
					label: "Print"
				}];
				var options = {
					segmentShowStroke: false,
					animateRotate: true,
					animateScale: true,
					percentageInnerCutout: 65,
					tooltipTemplate: "<%= value %>%"
				}
				var ctx = document.getElementById("myChart-3").getContext("2d");
				var myChart = new Chart(ctx).Doughnut(data, options);
				document.getElementById("js-legend-3").innerHTML = myChart.generateLegend();
			}
		}
		if($(".chart-section.chart-main-bg").length) {
			if($("#myChart-black-1").length) {
				var data = [
				   {
					value: 61,
					color: "#000000",
					label: "Logo"
				}, {
					value: 25,
					color: "#727272",
					label: "Branding"
				}, {
					value: 14,
					color: "#cac8c8",
					label: "Print"
				}];
				var options = {
					segmentShowStroke: false,
					animateRotate: true,
					animateScale: true,
					percentageInnerCutout: 65,
					tooltipTemplate: "<%= value %>%"
				}
				var ctx = document.getElementById("myChart-black-1").getContext("2d");
				var myChart = new Chart(ctx).Doughnut(data, options);
				document.getElementById("js-legend-black-1").innerHTML = myChart.generateLegend();
			}
			if($("#myChart-black-2").length) {
				var data = [
				   {
					value: 61,
					color: "#000000",
					label: "Logo"
				}, {
					value: 25,
					color: "#727272",
					label: "Branding"
				}, {
					value: 14,
					color: "#cac8c8",
					label: "Print"
				}];
				var options = {
					segmentShowStroke: false,
					animateRotate: true,
					animateScale: true,
					percentageInnerCutout: 65,
					tooltipTemplate: "<%= value %>%"
				}
				var ctx = document.getElementById("myChart-black-2").getContext("2d");
				var myChart = new Chart(ctx).Doughnut(data, options);
				document.getElementById("js-legend-black-2").innerHTML = myChart.generateLegend();
			}
			if($("#myChart-black-3").length) {
				var data = [
				   {
					value: 61,
					color: "#000000",
					label: "Logo"
				}, {
					value: 25,
					color: "#727272",
					label: "Branding"
				}, {
					value: 14,
					color: "#cac8c8",
					label: "Print"
				}];
				var options = {
					segmentShowStroke: false,
					animateRotate: true,
					animateScale: true,
					percentageInnerCutout: 65,
					tooltipTemplate: "<%= value %>%"
				}
				var ctx = document.getElementById("myChart-black-3").getContext("2d");
				var myChart = new Chart(ctx).Doughnut(data, options);
				document.getElementById("js-legend-black-3").innerHTML = myChart.generateLegend();
			}
		}
		
		if($(".chart-section.full-chart").length) {
			if($("#fullchart-1").length) {
				var data = [
				   {
					value: 61,
					color: "#f89b1c",
					label: "Logo"
				}, {
					value: 25,
					color: "#f9bc68",
					label: "Branding"
				}, {
					value: 14,
					color: "#f9e0bd",
					label: "Print"
				}];
				var options = {
					segmentShowStroke: false,
					animateRotate: true,
					animateScale: true,
					percentageInnerCutout: 0
				}
				var ctx = document.getElementById("full-chart-1").getContext("2d");
				var myChart = new Chart(ctx).Doughnut(data, options);
				document.getElementById("full-js-legend-1").innerHTML = myChart.generateLegend();
			}
			if($("#fullchart-2").length) {
				var data = [
				   {
					value: 61,
					color: "#f89b1c",
					label: "Logo"
				}, {
					value: 25,
					color: "#f9bc68",
					label: "Branding"
				}, {
					value: 14,
					color: "#f9e0bd",
					label: "Print"
				}];
				var options = {
					segmentShowStroke: false,
					animateRotate: true,
					animateScale: true,
					percentageInnerCutout: 0
				}
				var ctx = document.getElementById("full-chart-2").getContext("2d");
				var myChart = new Chart(ctx).Doughnut(data, options);
				document.getElementById("full-js-legend-2").innerHTML = myChart.generateLegend();
			}
			if($("#fullchart-3").length) {
				var data = [
				   {
					value: 61,
					color: "#f89b1c",
					label: "Logo"
				}, {
					value: 25,
					color: "#f9bc68",
					label: "Branding"
				}, {
					value: 14,
					color: "#f9e0bd",
					label: "Print"
				}];
				var options = {
					segmentShowStroke: false,
					animateRotate: true,
					animateScale: true,
					percentageInnerCutout: 0
				}
				var ctx = document.getElementById("full-chart-3").getContext("2d");
				var myChart = new Chart(ctx).Doughnut(data, options);
				document.getElementById("full-js-legend-3").innerHTML = myChart.generateLegend();
			}
		}
		if($(".chart-section.full-chart.chart-main-bg").length) {
			if($("#fullchart-black-1").length) {
				var data = [
				   {
					value: 61,
					color: "#000000",
					label: "Logo"
				}, {
					value: 25,
					color: "#727272",
					label: "Branding"
				}, {
					value: 14,
					color: "#cac8c8",
					label: "Print"
				}];
				var options = {
					segmentShowStroke: false,
					animateRotate: true,
					animateScale: true,
					percentageInnerCutout: 0
				}
				var ctx = document.getElementById("full-chart-black-1").getContext("2d");
				var myChart = new Chart(ctx).Doughnut(data, options);
				document.getElementById("full-js-legend-black-1").innerHTML = myChart.generateLegend();
			}
			if($("#fullchart-black-2").length) {
				var data = [
				   {
					value: 61,
					color: "#000000",
					label: "Logo"
				}, {
					value: 25,
					color: "#727272",
					label: "Branding"
				}, {
					value: 14,
					color: "#cac8c8",
					label: "Print"
				}];
				var options = {
					segmentShowStroke: false,
					animateRotate: true,
					animateScale: true,
					percentageInnerCutout: 0
				}
				var ctx = document.getElementById("full-chart-black-2").getContext("2d");
				var myChart = new Chart(ctx).Doughnut(data, options);
				document.getElementById("full-js-legend-black-2").innerHTML = myChart.generateLegend();
			}
			if($("#fullchart-black-3").length) {
				var data = [
				   {
					value: 61,
					color: "#000000",
					label: "Logo"
				}, {
					value: 25,
					color: "#727272",
					label: "Branding"
				}, {
					value: 14,
					color: "#cac8c8",
					label: "Print"
				}];
				var options = {
					segmentShowStroke: false,
					animateRotate: true,
					animateScale: true,
					percentageInnerCutout: 0
				}
				var ctx = document.getElementById("full-chart-black-3").getContext("2d");
				var myChart = new Chart(ctx).Doughnut(data, options);
				document.getElementById("full-js-legend-black-3").innerHTML = myChart.generateLegend();
			}
		}
		
		
		/* - Shop */
		$(".cart-buttons").magnificPopup({
			delegate: 'a.zoom',
			type: 'image',
			tLoading: 'Loading image #%curr%...',
			mainClass: 'mfp-img-mobile',
			gallery: {
				enabled: true,
				navigateByImgClick: true,
				preload: [0,1] // Will preload 0 - before current, and 1 after the current image
			},
			image: {
				tError: '<a href="%url%">The image #%curr%</a> could not be loaded.',				
			}
		});
		
		/* -- Map Initialization */
		if( $( "#map-canvas-contact").length == 1 ){
			initialize( "map-canvas-contact" );
		}
		
		/* -- Map Initialization: Layout 2 */
		if( $( "#map-canvas-contact-1").length == 1 ){
			initialize( "map-canvas-contact-1" );
		}
		
		/* -- Map Initialization:  */
		 if( $( "#map-canvas-contact-3").length == 1 ){
			initialize( "map-canvas-contact-3" );
		}
		
		
		/* -- Price Filter */
		$( "#slider-range" ).slider({
			range: true,
			min: 1,
			max: 3000,
			values: [ 1, 3000 ],
			slide: function( event, ui ) {
				$( "#amount" ).html( "$" + ui.values[ 0 ] )
				$( "#amount2" ).html( "$" + ui.values[ 1 ] );
			}
		});
		$( "#amount" ).html( "$" + $( "#slider-range" ).slider( "values", 0 ) );
		$( "#amount2" ).html( " $" + $(  "#slider-range" ).slider( "values", 1 ) );
		
		/* - Quantity */

		/* This button will increment the value*/
		$(".qtyplus").on( "click", function(e){
			e.preventDefault();
			var fieldName = $(this).attr('data-field');
			var currentVal = parseInt($('input[name='+fieldName+']').val());
			if (!isNaN(currentVal)) {
				$('input[name='+fieldName+']').val(currentVal + 1);
			} else {
				$(this).find('input[name='+fieldName+']').val(0);
			}
		});

		/* This button will decrement the value till 0 */
		$(".qtyminus").on( "click" , function(e) {		
			e.preventDefault();		
			var fieldName = $(this).attr('data-field');		
			var currentVal = parseInt($('input[name='+fieldName+']').val());		
			if (!isNaN(currentVal) && currentVal > 0) {			
				$('input[name='+fieldName+']').val(currentVal - 1);
			} else {			
				$('input[name='+fieldName+']').val(0);
			}
		});
		
		/* - Shop Category Carousel */
		if($(".category-carousel").length){
			$(".category-carousel").owlCarousel({
				autoplay: false,
				loop: true,
				dots: false,
				nav: true,
				responsive:{
					0:{
						items:1
					},
					400:{
						items: 1
					},
					640:{
						items:2
					},
					1200:{
						items:3
					}
				},
				margin: 0,
				stagePadding: 0,
				smartSpeed: 450
			});
		}
		
		// Tabs
		$( '.wc-tabs-wrapper, .woocommerce-tabs' )
			.on( 'init', function() {
				$( '.wc-tab, .woocommerce-tabs .panel:not(.panel .panel)' ).hide();

				var hash  = window.location.hash;
				var url   = window.location.href;
				var $tabs = $( this ).find( '.wc-tabs, ul.tabs' ).first();

				if ( hash.toLowerCase().indexOf( 'comment-' ) >= 0 || hash === '#tab-reviews' ) {
					$tabs.find( 'li.reviews_tab a' ).trigger("click");
				} else if ( url.indexOf( 'comment-page-' ) > 0 || url.indexOf( 'cpage=' ) > 0 ) {
					$tabs.find( 'li.reviews_tab a' ).trigger("click");
				} else {
					$tabs.find( 'li:first a' ).trigger("click");
				}
			})
			.on( 'click', '.wc-tabs li a, ul.tabs li a', function() {
				var $tab          = $( this );
				var $tabs_wrapper = $tab.closest( '.wc-tabs-wrapper, .woocommerce-tabs' );
				var $tabs         = $tabs_wrapper.find( '.wc-tabs, ul.tabs' );

				$tabs.find( 'li' ).removeClass( 'active' );
				$tabs_wrapper.find( '.wc-tab, .panel:not(.panel .panel)' ).hide();

				$tab.closest( 'li' ).addClass( 'active' );
				$tabs_wrapper.find( $tab.attr( 'href' ) ).show();

				return false;
			})
			.trigger( 'init' );

		$( 'a.woocommerce-review-link' ).on("click", function() {
			$( '.reviews_tab a' ).trigger("click");
			return true;
		});
		/* Star ratings for comments */
		$( '#rating' ).hide().before( '<p class="stars"><span><a class="star-1" href="#">1</a><a class="star-2" href="#">2</a><a class="star-3" href="#">3</a><a class="star-4" href="#">4</a><a class="star-5" href="#">5</a></span></p>' );
		
		$( 'body' )
			.on( 'click', '#respond p.stars a', function() {
				var $star   	= $( this ),
					$rating 	= $( this ).closest( '#respond' ).find( '#rating' ),
					$container 	= $( this ).closest( '.stars' );

				$rating.val( $star.text() );
				$star.siblings( 'a' ).removeClass( 'active' );
				$star.addClass( 'active' );
				$container.addClass( 'selected' );

				return false;
			})
			.on( 'click', '#respond #submit', function() {
				var $rating = $( this ).closest( '#respond' ).find( '#rating' ),
					rating  = $rating.val();

				if ( $rating.size() > 0 && ! rating && wc_single_product_params.review_rating_required === 'yes' ) {
					window.alert( wc_single_product_params.i18n_required_rating_text );

					return false;
				}
			});
		
		/* - Quick Contact Form */
		$( "#btn_submit" ).on( "click", function(event) {
			event.preventDefault();
			var mydata = $("form").serialize();
			$.ajax({
				type: "POST",
				dataType: "json",
				url: "contact.php",
				data: mydata,
				success: function(data) {
					if( data["type"] == "error" ){
						$("#alert-msg").html(data["msg"]);
						$("#alert-msg").removeClass("alert-msg-success");
						$("#alert-msg").addClass("alert-msg-failure");
						$("#alert-msg").show();
					} else {
						$("#alert-msg").html(data["msg"]);
						$("#alert-msg").addClass("alert-msg-success");
						$("#alert-msg").removeClass("alert-msg-failure");					
						$("#input_name").val("");
						$("#input_email").val("");
						$("#input_subject").val("");
						$("#textarea_message").val("");
						$("#alert-msg").show();
					}
				},
				error: function(xhr, textStatus, errorThrown) {
					//alert(textStatus);
				}
			});
			return false;
		});/* Quick Contact Form /- */
		/* - Contact Form 2*/
		$( "#btn_submit1" ).on( "click", function(event) {
			event.preventDefault();
			var mydata = $("form").serialize();
			$.ajax({
				type: "POST",
				dataType: "json",
				url: "contact1.php",
				data: mydata,
				success: function(data) {
					if( data["type"] == "error" ){
						$("#alert-msg1").html(data["msg"]);
						$("#alert-msg1").removeClass("alert-msg-success");
						$("#alert-msg1").addClass("alert-msg-failure");
						$("#alert-msg1").show();
					} else {
						$("#alert-msg1").html(data["msg"]);
						$("#alert-msg1").addClass("alert-msg-success");
						$("#alert-msg1").removeClass("alert-msg-failure");					
						$("#input_name1").val("");
						$("#input_email1").val("");
						$("#input_subject1").val("");
						$("#textarea_message1").val("");
						$("#alert-msg1").show();
					}
				},
				error: function(xhr, textStatus, errorThrown) {
					//alert(textStatus);
				}
			});
			return false;
		});/* Quick Contact Form /- */
		/* - Contact Form 2*/
		$( "#btn_submit2" ).on( "click", function(event) {
			event.preventDefault();
			var mydata = $("form").serialize();
			$.ajax({
				type: "POST",
				dataType: "json",
				url: "contact2.php",
				data: mydata,
				success: function(data) {
					if( data["type"] == "error" ){
						$("#alert-msg2").html(data["msg"]);
						$("#alert-msg2").removeClass("alert-msg-success");
						$("#alert-msg2").addClass("alert-msg-failure");
						$("#alert-msg2").show();
					} else {
						$("#alert-msg2").html(data["msg"]);
						$("#alert-msg2").addClass("alert-msg-success");
						$("#alert-msg2").removeClass("alert-msg-failure");					
						$("#input_name2").val("");
						$("#input_email2").val("");
						$("#input_subject2").val("");
						$("#textarea_message2").val("");
						$("#alert-msg2").show();
					}
				},
				error: function(xhr, textStatus, errorThrown) {
					//alert(textStatus);
				}
			});
			return false;
		});/* Quick Contact Form /- */
		
		if($("#tweecool").length){
			$("#tweecool").tweecool({
				username : '@onistaweb2', 
				limit : 3,
				profile_image: false
			});
		}
		
	});/* document.ready /- */
	
	/* ## Window Resize */
	$( window ).resize(function() {
		var width	=	$(window).width();
		var height	=	$(window).height();
		
		content_slider_img();
		
		/* - Services Section */
		srv_img();
		
		/* - Vertical Header */
		vertical_menu()
		
		/* - Bureger Menu */
		burger_menu();
	});	
	
	/* ## Window Load - Handler for .load() called */
	$(window).load(function() {
		/* - Site Loader */
		if ( !$("html").is(" .ie6, .ie7, .ie8 ") ) {
			$("#site-loader").delay(1000).fadeOut("slow");
		}
		else {
			$("#site-loader").css("display","none");
		}
		/* - Blog Masonry */
		if($(".blog_masonry").length){
			var $container = $(".blog-masonry-list");
			$container.isotope({
				itemSelector: ".blog-masonry-box",
				gutter: 0,
				transitionDuration: "0.5s"
			});
		}
		
		/* - Portfolio Section */
		var $container = $(".portfolio-list");
		$container.isotope({
			itemSelector: "li",
			gutter: 0,
			transitionDuration: "0.5s"
		});	
		$("#filters a").on("click",function(){
			$('#filters a').removeClass("active");
			$(this).addClass("active");
			var selector = $(this).attr("data-filter");
			$container.isotope({ filter: selector });		
			return false;
		});
	});
	
})(jQuery);