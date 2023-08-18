(function($){
	var containerCupom = $(".slick__cupom")
	var containerCopy = $(".slick__copy-cupom")
	


	containerCupom.slick({
		autoplay: false,
		autoplaySpeed: 4000,
		pauseOnFocus: false,
		pauseOnHover: false,
		arrows: false,
		dots: false,
		adaptiveHeight: true,
		slidesToShow: 4,
		slidesToScroll: 1,
	});

	containerCopy.slick({
		autoplay: false,
		autoplaySpeed: 4000,
		pauseOnFocus: false,
		pauseOnHover: false,
		arrows:false,
		dots: true,
		adaptiveHeight: true,
		slidesToShow: 3,
		slidesToScroll: 1,
		responsive: [{
			breakpoint: 768,
			settings: {
				slidesToShow: 1,
				slidesToScroll: 1,

						}
			
			}]
	});
	
    var template_cupom =
		'<div class="item">' +
			'<div class="copy-card">' +
				'<div class="copy-box-img"></div>' +
					'<div class="copy-box-text">' +
						'<div class="rules-card">' +
							'<h1 class="rules-title"> Regras de Uso</h1>'+
							'<p class="rules-describe"></p>'+
						'</div>'+
						'<span class="copy-name_cupom">'+
						'</span>'+
						'<span class="copy-percent">'+
						'</span>'+
						'<a class="btn-copy">Pegar</a>'+
						'<div class="box-cupom justify-content-center align-items-center">'+
							'<span class="cupom"></span>'+
							'<a class="btn-copy-cupom">copiar</a>'
						'</div>'+
					'</div>' +
			'</div>' +
		'</div>';
	
	$.ajax({
		method:"POST",
		url:"https://apimob-v2.futfanatics.app/coupon",
		async:true
	}).done(function(response){

		console.log(response)

		var cupons = response.data.coupons;
		
		cupons.forEach(function(cupom){
			var $elem = $(template_cupom);
			console.log(cupom)

			$elem.find('.copy-box-img').css(cupom.thumb );
			$elem.find('.rules-describe').text(cupom.regulation_general);
			$elem.find('.copy-name_cupom').text(cupom.code);
			$elem.find('.copy-percent').text(cupom.discount);
			$elem.find('.cupom').text(cupom.code);
			
			containerCopy.slick('slickAdd', $elem);
		});
		$('.btn-copy').on('click', function(){
			$('.copy-box-img').css({
				'display':'none',
			});
			$('.copy-box-text').css({
				'height':'100%',
				'border-radius':'10px',
				'justify-content':'normal',
			});
			$('.rules-card').css({
				'display':'flex',
				'flex-direction':'column',
				'align-items':'center',
				'justify-center':'center',
			});
			$('.copy-name_cupom').css({
				'display':'none'
			});
			$('.btn-copy').css({
				'display':'none'
			});

			$('.box-cupom').addClass('active');
		});


		function copyToClipboard(element) {
			var $temp = $("<input>");
			$("body").append($temp);
			$temp.val($(element).text()).select();
			document.execCommand("copy");
			$temp.remove();
		}
	
		$('.btn-copy-cupom').on('click', function() {
			var $el = $(this)
			copyToClipboard($el .find('.cupom'));
			$($el).addClass('copied');
			setTimeout(function() {
				$($el).removeClass('copied');
			}, 3000);
		});
	});


	

})(jQuery);

