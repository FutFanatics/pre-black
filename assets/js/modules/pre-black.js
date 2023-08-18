(function($){
	var containerMarcas = $(".marcas_slick")
	var containerCopy = $(".app_slick")
	


	containerMarcas.slick({
		autoplay: false,
		autoplaySpeed: 4000,
		pauseOnFocus: false,
		pauseOnHover: false,
		arrows: false,
		dots: true,
		adaptiveHeight: true,
		slidesToShow: 12,
		slidesToScroll: 2,
		responsive: [{
			breakpoint: 768,
			settings: {
				slidesToShow: 3,
				slidesToScroll: 3,

						}
			
			}]
	});

	containerApp.slick({
		autoplay: false,
		autoplaySpeed: 4000,
		pauseOnFocus: false,
		pauseOnHover: false,
		arrows:false,
		dots: true,
		adaptiveHeight: true,
		slidesToShow: 4,
		slidesToScroll: 1,
		responsive: [{
			breakpoint: 768,
			settings: {
				slidesToShow: 1,
				slidesToScroll: 1,

						}
			
			}]
	});

	function multiSlideAdaptiveHeight(slider) {

        var activeSlides = [];
        var tallestSlide = 0;
        
        setTimeout(function() {
        
            $('.slick-track .slick-active', slider).each(function(item) {
                activeSlides[item] = $(this).outerHeight();
            });
        
            activeSlides.forEach(function(item) {
            if (item > tallestSlide) {
				tallestSlide = item;
			}
			});
        
			$('.slick-list', slider).height(tallestSlide);
        }, 10);
    }

	function startTimer() {

		var data_evento = new Date("November 25, 2023 00:00:00");
		var data_atual = new Date();
		var duration = (data_evento.getTime() - data_atual.getTime()) / 1000;

		var days, days_sobra, hours, hours_sobra, minutes, seconds;

		setInterval(function() { 
			days = parseInt(duration / 86400 );
			days_sobra = parseInt(duration % 86400 );
	
			hours = parseInt( days_sobra / 3600)
			hours_sobra = parseInt( days_sobra % 3600)
			
			minutes = parseInt(hours_sobra / 60 );
			seconds = parseInt(hours_sobra % 60 );
	
			$('.day').text(days);
			$('.hour').text(hours);
			$('.min').text(minutes);
			$('.seg').text(seconds);
			
			duration = duration - 1;

		}, 1000);
    }
	startTimer();

	$('.newsletter_form').on('submit', function(event) {
		event.preventDefault();

		var form = $(this);
		var formData = form.serialize();
		var url = 'https://microservicos.futfanatics.com.br/api/v1/futfanatics-nacional/dinamizeAjax?url=' + encodeURIComponent(form.attr('action'));

		form.find('.msg-resp').html('').removeClass('text-success text-danger text-info').slideUp();

		if (!form.find('select').val()) {
			form.find('.msg-resp').html('Escolha o seu time.').addClass('text-info').slideDown();
			return false;
		}
		
		$.post(url, formData, function(response) {
			if (response.status) {
				form.find('.msg-resp').html('Boa jogada, e-mail cadastrado com sucesso!').addClass('text-success').slideDown();
				form.find('.form-control').addClass('sucess');
				addTriggerTGM("submitNewsletter", []);

			} else {
				form.find('.msg-resp').html('Desculpe-nos, ocorreu um erro ao cadastrar.').addClass('text-danger').slideDown();
				form.find('.form-control').addClass('error')
				console.log('Error form dinamize: ' + response.error_msg.result);
			}
		});

		return false;
	});

})(jQuery);
