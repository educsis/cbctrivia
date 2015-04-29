/**
 * Light Javascript "class" frameworking for you
 * to organize your code a little bit better.
 *
 * If you want more complex things, I'd suggest
 * importing something like Backbone.js as it
 * has much better abilities to handle a MVC
 * like framework including persistant stores (+1)
 *
 * @author  sjlu (Steven Lu)
 */
var num_pregunta = 0;
var total_preguntas = 0; 
var mi_punteo = 0;
var objCenter = $('.center').html();
var vida = $('.vida').val();
var key = $('.key').val();
var Frontpage = function()
{
	/**
	 * The exports variable is responsible for
	 * storing and returning public functions
	 * in the instantized class.
	 */
	var exports = {};

	/**
	 * Write your public functions like this.
	 * Make sure you include it into the exports
	 * variable.
	 */
	function public_function() 
	{
		/**
		 * Note that we can still call
		 * private functions within the scope
		 * of the "class".
		 */
		private_function();
	}
	exports.public_function = public_function;

	/**
	 * Private functions are very similar, they
	 * just are not included in the exports 
	 * function.
	 */
	 function private_function()
	 {

	 }

	 /**
	  * You may wanna have a init() function
	  * to do all your bindings for the class.
	  */
	 function init()
	 {
		$('.center').html('');
		$('.instruccionesbtn').remove();
		
		$('.cover').remove();
		$('.preloader').remove();
		$.ajax({
			type: "url",
			url: "phpAjax/ranking.php",
		}).done(function (msg){
		
	$('.center').html(msg);
$('a.closeRank').remove();
		});
	 ///	setTimeout(function() {
	// /		$('.preloader').remove();
      	//	$('.cover').addClass('animated hinge');
      	//	setTimeout(function() {
      	//		$('.cover').remove();
	//		}, 500);
	//	}, 3000);

	 }
	 exports.init = init;

	 function getXmlHttp(){
	 	// if browser suports XMLHttpRequest
	    if (window.XMLHttpRequest) {
	      // Cretes a instantce of XMLHttpRequest object
	      xhttp = new XMLHttpRequest();
	    }
	    else {
	      // for IE 5/6
	      xhttp = new ActiveXObject("Microsoft.XMLHTTP");
	    }
	    return xhttp;
	 }

	 function inicia_juego(){
		/**ajax para iniciar juego**/
		$.ajax({
			type: "POST",
			url: "phpAjax/inicia.php",
			data: { vida: vida, key: key }
		});

	 	$.getJSON( "trivia2.json", function( data ) {
		var items = [];
		var key=0;
		var html = '<h1 class="msg_incorrecto ">INCORRECTA</h1>';
		html += '<div id="timer"></div>';
		html += '<h1 class="msg_correcto">CORRECTA</h1>';
		html += '<div class="punteoWrapper">';
		html += '<div class="time"></div>';
		html += '<h1 class="mi_punteo">'+mi_punteo+'</h1>';
		html += '<h2>PUNTOS</h2>';
		html += '</div>';
		var num_pregunta = 0;
		
		var num_preguntas = data['quiz'].length;

		var o = data['quiz'];
		for(var j, x, i = o.length; i; j = Math.floor(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x);
		data['quiz'] = o;

		total_preguntas = num_preguntas;
		//alert(total_preguntas);
		while(key<num_preguntas){
			var random =  Math.floor((Math.random() * 12) + 1); 
			console.log(random);
			html += '<div class="preguntaWrapper p-'+key+'">';
			html += '<p class="pregunta">'+data['quiz'][key]['que']+'</p>';
			if(random >= 1 && random <= 2){
				html += '<a href="#" class="respuestaBtn" data-tipo="c">'+data['quiz'][key]['ca']+'</a>';
				html += '<a href="#" class="respuestaBtn" data-tipo="i">'+data['quiz'][key]['ia'][0]+'</a>';
				html += '<a href="#" class="respuestaBtn" data-tipo="i">'+data['quiz'][key]['ia'][1]+'</a>';
			}
			else if(random >= 3 && random <= 4){
				html += '<a href="#" class="respuestaBtn" data-tipo="i">'+data['quiz'][key]['ia'][0]+'</a>';
				html += '<a href="#" class="respuestaBtn" data-tipo="c">'+data['quiz'][key]['ca']+'</a>';
				html += '<a href="#" class="respuestaBtn" data-tipo="i">'+data['quiz'][key]['ia'][1]+'</a>';	
			}
			else if(random >= 5 && random <= 6){
				html += '<a href="#" class="respuestaBtn" data-tipo="i">'+data['quiz'][key]['ia'][0]+'</a>';
				html += '<a href="#" class="respuestaBtn" data-tipo="i">'+data['quiz'][key]['ia'][1]+'</a>';	
				html += '<a href="#" class="respuestaBtn" data-tipo="c">'+data['quiz'][key]['ca']+'</a>';
			}
			else if(random >= 7 && random <= 8){
				html += '<a href="#" class="respuestaBtn" data-tipo="i">'+data['quiz'][key]['ia'][1]+'</a>';
				html += '<a href="#" class="respuestaBtn" data-tipo="i">'+data['quiz'][key]['ia'][0]+'</a>';
				html += '<a href="#" class="respuestaBtn" data-tipo="c">'+data['quiz'][key]['ca']+'</a>';
			}
			else if(random >= 9 && random <= 10){
				html += '<a href="#" class="respuestaBtn" data-tipo="i">'+data['quiz'][key]['ia'][1]+'</a>';
				html += '<a href="#" class="respuestaBtn" data-tipo="c">'+data['quiz'][key]['ca']+'</a>';
				html += '<a href="#" class="respuestaBtn" data-tipo="i">'+data['quiz'][key]['ia'][0]+'</a>';
			}
			else if(random >= 11 && random <= 12){
				html += '<a href="#" class="respuestaBtn" data-tipo="c">'+data['quiz'][key]['ca']+'</a>';
				html += '<a href="#" class="respuestaBtn" data-tipo="i">'+data['quiz'][key]['ia'][1]+'</a>';
				html += '<a href="#" class="respuestaBtn" data-tipo="i">'+data['quiz'][key]['ia'][0]+'</a>';
			}

			html += '</div>';
			//items.push(html);
			//console.log(html);
			key++;
		}
			/***limpia pantalla****/
			$('.center').html('');
			$('.instruccionesbtn').remove();
			$('.center').html(html);
			/**inicia tiempo**/
			$('#timer').countdown({until: "+90s", format: "MS", compact: true, onExpiry:termina_juego});

			$('.p-'+num_pregunta).addClass('show animated bounceIn');
		});
	 }

	 exports.inicia_juego = inicia_juego;


	 function termina_juego(){
	 	$('#timer').countdown('destroy');
	 	$('#timer').remove();
	 	var msg = '<h3 class="msgTermina" style="margin-top:30px;">TU TIEMPO HA TERMINADO</h3>';
	 	msg += '<h3 class="msgTermina">LOGRASTE '+mi_punteo+' PUNTO(S)</h3>'
	 	msg += '<a href="#" onClick="window.location.reload(true);" class="btn" style="margin: 20px auto 10px;">VOLVER A INICIO</a>';
	 		setTimeout(function() {
				$('.center').html(msg);		
			}, 300);
	 	
	 	//alert('Fin del Juego, tu punteo es de '+ mi_punteo);
	 }

	 exports.termina_juego = termina_juego;
	 /**
	  * Last but not least, we have to return
	  * the exports object.
	  */
	 return exports;
}

/**
 * To initialize our Frontpage class, we need
 * to define it into a Javascript variable like
 * so.
 */
var frontpage = new Frontpage();

/**
 * We can then call the functions as like any
 * other object, just the ones included in the 
 * exports object that was returned from Frontpage()
 */
frontpage.public_function();

/**
 * Write all your event listeners in the 
 * document.ready function or else they
 * may not bind correctly. As a side note, I like
 * to just call a public function in a class
 * to handle all your bindings here.
 */
$(document).ready(function() {
	frontpage.init();

	$('.center').delegate('.ranking', 'click', function(){
		/**sumar puntos si es correcto***/
		$.ajax({
			type: "url",
			url: "phpAjax/ranking.php",
		}).done(function (msg){
			$('.center').html(msg);
			/*$('.center').delegate('.closeRank', 'click', function(){
				$('.center').html(objCenter);
			});*/
			$('.closeRank').click(function(){
				$('.center').html(objCenter);
			});
		});
	});


	$('.center').delegate('.btnjugar', 'click', function(){
		frontpage.inicia_juego();
	});

	$('#box').qtip({
         content: '<ul><li>Haz click en JUGAR para comenzar la trivia.</li><li>Para el ranking solo serán tomados en cuenta los primeros tres intentos. Puedes jugar las veces que quieras.<li>Tienes 90 segundos para contestar correctamente todas las preguntas que puedas.</li><li>Los punteos se reinician cada vez que presionas JUGAR de nuevo.</li><li>Puedes ver el top 10 presionando VER RANKING</li></ul>',
         position: {
             my: 'right'
         }
     });

	$('.center').delegate('.respuestaBtn', 'click', function(){
		var obj = $(this);
			if(obj.attr('data-tipo')=='c'){
				/**sumar puntos si es correcto***/
				if(vida<=3){
					$.ajax({
						type: "POST",
						url: "phpAjax/sumapuntos.php",
						data: { vida: vida, key: key }
					});
				}
				/*********************************/
				$('.msg_correcto').show();
				$('.msg_correcto').addClass('animated rubberBand');
				$('.p-'+num_pregunta).addClass('show animated flipOutX');
				/*agregar el punteo*/
      			mi_punteo++;
      			$('.mi_punteo').html(mi_punteo);
      			$('.mi_punteo').addClass('animated wobble')
				setTimeout(function() {
					$('.p-'+num_pregunta).remove();
					num_pregunta++;
      				$('.msg_correcto').fadeOut();
      				$('.msg_correcto').removeClass('animated rubberBand');
      				$('.mi_punteo').removeClass('animated wobble')
      				$('.p-'+num_pregunta).addClass('show animated bounceIn');
      				
      				/****chequear si termino el juego**/
      				if(num_pregunta>=total_preguntas){
						frontpage.termina_juego();
					}
				}, 850);
			}else{
				$('.msg_incorrecto').show();
				$('.msg_incorrecto').addClass('animated rubberBand');
				$('.p-'+num_pregunta).addClass('show animated flipOutX');

				setTimeout(function() {
					$('.p-'+num_pregunta).remove();
					num_pregunta++;
      				$('.msg_incorrecto').fadeOut();
      				$('.msg_incorrecto').removeClass('animated rubberBand');
      				$('.p-'+num_pregunta).addClass('show animated bounceIn');

      				/****chequear si termino el juego**/
      				if(num_pregunta>=total_preguntas){
						frontpage.termina_juego();
					}
				}, 850);
			}

				/*alert('incorrecta');*/
			//$('.p-'+num_pregunta).addClass('show animated rubberBand');
			
	});
});
