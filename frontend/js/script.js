$(document).ready(function() {

	// fix header
	$('#header').removeClass('fix');
	$(window).scroll(function() {
		if ($(this).scrollTop() > $('#header').height()) {
			$('#header').addClass('fix');
			$('body').css('padding-top', $('#header').height());
		} else {
			$('#header').removeClass('fix');
			$('body').css('padding-top', 0);
		};
	});



	// scrolling
	$('a[href^="#"]').on('click', function(e) {
		e.preventDefault();
		var anchor = $(this);
		$('html, body').stop().animate({
			scrollTop: +($(anchor.attr('href')).offset().top) - 70
		}, 1000);
	});



	// header navigation
	$('.nav_button').click(function(){
		$('#burger').toggleClass('active-sandwich');
		$('.header__navigation').slideToggle();
	});



	// customize select
	$('.form-select').each(function(){
		var $this = $(this), numberOfOptions = $(this).children('option').length;
	
		$this.addClass('select-hidden'); 
		$this.wrap('<div class="select"></div>');
		$this.after('<div class="select-styled"></div>');

		var $styledSelect = $this.next('div.select-styled');
		$styledSelect.text($this.children('option').eq(0).text());
	
		var $list = $('<ul />', {
			'class': 'select-options'
		}).insertAfter($styledSelect);
	
		for (var i = 0; i < numberOfOptions; i++) {
			$('<li />', {
				text: $this.children('option').eq(i).text(),
				rel: $this.children('option').eq(i).val()
			}).appendTo($list);
		}
	
		var $listItems = $list.children('li');
	
		$styledSelect.on('click', function(e) {
			e.stopPropagation();
			$('div.select-styled.active').not(this).each(function(){
				$(this).removeClass('active').next('ul.select-options').hide();
			});
			$(this).toggleClass('active').next('ul.select-options').toggle();
		});
	
		$listItems.on('click', function(e) {
			e.stopPropagation();
			$styledSelect.text($(this).text()).removeClass('active');
			$styledSelect.addClass('selected');
			$this.val($(this).attr('rel'));
			$list.hide();
			//console.log($this.val());
		});
	
		$(document).on('click', function() {
			$styledSelect.removeClass('active');
			$list.hide();
		});

	});



	// order
	$('.order__btn').hover(
		function() {
			$(this).closest('.order').addClass('hover');
		},
		function() {
			$(this).closest('.order').removeClass('hover');
		}
	);



	// imageSlider
	$(".image-slider").slick();



	// reviewsSlider
	$(".review-slider__for").slick({
		slidesToShow: 1,
		slidesToScroll: 1,
		arrows: false,
		dots: true,
		asNavFor: '.review-slider__nav',
		responsive: [
			{
				breakpoint: 768,
				settings: {
					dots: false
				}
			}
		]
	});

	$(".review-slider__nav").slick({
		slidesToShow: 1,
		slidesToScroll: 1,
		asNavFor: '.review-slider__for'
	});



	// validate form
	$('.field_phone').mask('(000) 000-0000');
	$('.form_jumb').on('submit', function(e) {

		var name = $(this).find('.field_name');
		var phone = $(this).find('.field_phone');
		var select = $(this).find('.field_select').parent('.select');
		var selectStyled = select.find('.select-styled');

		if( !name.val() ) {
			e.preventDefault();
			name.next('.form-info').fadeIn(300);
		} else {
			name.next('.form-info').fadeOut(300);
		}

		if ( phone.val().length != 14 ) {
			e.preventDefault();
			phone.next('.form-info').fadeIn(300);
		} else {
			phone.next('.form-info').fadeOut(300);
		}

		if ( !selectStyled.hasClass('selected') ) {
			e.preventDefault();
			select.next('.form-info').fadeIn(300);
		} else {
			select.next('.form-info').fadeOut(300);
		}
	});
});


