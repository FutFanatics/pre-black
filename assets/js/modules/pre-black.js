(function($){
	var containerMarcas = $(".marcas_slick")
	var containerApp = $(".app_slick")
	


	containerMarcas.slick({
		autoplay: false,
		autoplaySpeed: 4000,
		pauseOnFocus: false,
		pauseOnHover: false,
		arrows: false,
		dots: true,
		adaptiveHeight: true,
		slidesToShow: 12,
		slidesToScroll: 4,
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
		dots: false,
		adaptiveHeight: true,
		slidesToShow: 4,
		slidesToScroll: 1,
		responsive: [{
			breakpoint: 768,
			settings: {
				slidesToShow: 2,
				slidesToScroll: 1,

						}
			
			}]
	});

	var produto = [120960,114348,114386,117476,114394,116495];

    var template_produtos =
		'<div class="item">' +
			'<a class="link">' +
				'<div class="foto"><span class="discount d-none"></span>' +
					'<span class="thumb">' +
						'<img class="lozad img-fluid" src="assets/img/pixel-2.png">' +
					'</span>' +
				'</div>' +
				'<div class="tags"></div>' +
				'<h2 class="title"></h2>' +
				'<div class="price"></div>' +
				'<div class="product-variants">' +
					'<div class="variants-slider"></div>' +
				'</div>' +
				'<div class="product-actions"></div>' +
			'</a>' +
		'</div>';

    var vitrine = $('#vitrine-fut');

	
	$.getJSON('https://www.futfanatics.com.br/web_api/products?id=' + produto.join(","), '', function (data) {
		if (data) {
			var variants = [];

			data.Products.forEach(function(dataProduct){

				var product = dataProduct.Product

				if (product.available != 0) {
					var template = jQuery(template_produtos);

					var link = product.url.https;
					var img = product.ProductImage[0].thumbs[180].https;
					var title = product.name;
					var pricePromo = product.promotional_price;
					var price = product.price;
					var percentDiscount = 100 - (pricePromo/price) * 100;
					var payment = product.payment_option;
					var personalization = product.Properties['Permite Personalização'] == 'Sim' ? true : false;
					var release = product.release == "1" ? true : false;

					template.find('.link').attr('href', link);
					template.find('.foto span img').attr('src', img);
					template.find('.title').html(title);

					if (percentDiscount < 100) {
						template.find('.foto .discount').html('▾ ' + percentDiscount.toFixed() + '%').removeClass('d-none');
					}

					// lozad('.lozad', {
					//     load: function(target)
 
					//             target.src = target.dataset.src;
					//             target.onload = function() {
					//                 target.classList.add('fadein');
					//             }
					//     }
					// }).observe();

					if (release && pricePromo != 0 && personalization) {
						template.find('.tags').html('<span class="lancamento">Lançamento</span> <span class="oferta">Oferta</span>');
					} else if (pricePromo != 0 && personalization) {
						template.find('.tags').html('<span class="oferta">Oferta</span> <span class="personalize">Personalize</span>');
					} else if (product.release && pricePromo != 0) {
						template.find('.tags').html('<span class="lancamento">Lançamento</span><span class="oferta">Oferta</span>');
					} else {

						if (release) {
							template.find('.tags').html('<span class="lancamento">Lançamento</span>');
						} else if (pricePromo != 0) {
							template.find('.tags').html('<span class="oferta">Oferta</span>');
						} else if (personalization) {
							template.find('.tags').html('<span class="personalize">Personalize</span>');
						}
					}

					if (pricePromo != 0) {
						template.find('.price').html('<div class="old-price">R$ ' + price.replace('.', ',') + '</div><div class="current-price">R$ ' + pricePromo.replace('.', ',') + '</div>');
					} else {
						template.find('.price').html('<div class="current-price">R$ ' + price.replace('.', ',') + '</div>');
					}
				

					
					// variants[0].forEach(function(row){
					//     if (row) {
					//         template.find('.variants-slider').append(
					//             '<div class="variants-item">' +
					//                 '<button type="button" data-variant="'+ row.Variant.id +'">' + 
					//                     row.Variant.Sku[0].value + 
					//                 '</button>' +
					//             '</div>'
					//         );
					//     }
					// });

					// template.find('.product-actions').html(
					//     '<a href="#" class="bt_comprar d-flex justify-content-center" title="Adicionar este item ao seu carrinho">' +
					//         '<i></i>' +
					//         '<span>Comprar</span>' +
					//     '</a>'
					// );

	//                vitrine.append(template);
					vitrine.slick('slickAdd', template);
				}
			});

			// jQuery.ajax({
			//     url: "https://www.futfanatics.com.br/web_api/variants?product_id=" + product.id,
			//     //context: document.body,
			//     async: false,
			//     method: "GET",
			//     crossDomain: true,
			//   }).done(function(data) {
			//       console.log("Data:",data);
			//     variants.push(data.Variants);
			//   });
				
			
		}
	});

	vitrine.html('');


	if (isMobile()) {
		vitrine.slick({
			autoplay: false,
			infinite: true,
			speed: 500,
			arrows: false,
			dots: true,
			slidesToShow: 2,
			slidesToScroll: 2,
	//        lazyLoad: 'ondemand',
			prevArrow: $('.slick-nav_vitrine').find('.slick-prev'),
			nextArrow: $('.slick-nav_vitrine').find('.slick-next'),
		});

	} else {

		vitrine.slick({
			autoplay: false,
			infinite: true,
			speed: 500,
			arrows: true,
			dots: true,
			slidesToShow: 5,
			slidesToScroll: 2,
	//        lazyLoad: 'ondemand',
			prevArrow: $('.slick-nav_vitrine').find('.slick-prev'),
			nextArrow: $('.slick-nav_vitrine').find('.slick-next'),
		});

	}

	function isMobile() {
		if (window.innerWidth > 991) {
			return false;
		}
		return true;
	}
	

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

