////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//Cargar tablas PELICULA
///////////////////////////////////
function cargarTablaPelicula(doc, lang){
	$("#showPelicula").click();	
	$("#tblDataPelicula").children().children().empty();
	//var networkState = navigator.connection.type;
	
	//TITULO
	$("#tabla-titulo").append(doc.title);
	$("#tabla-poster").empty();
	if (mostrarImagen == 0 || mostrarImagen == 1){
	//if ((mostrarImagen == 0)||(mostrarImagen == 1 && networkState == Connection.WIFI)){
		if((doc.poster != null)&&(doc.poster != '')&&(doc.poster != '-')){
			$('#tabla-poster').attr("src", 'https://usercontent.googleapis.com/freebase/v1/image'+doc.poster+'?maxwidth=600&maxheight=1000&mode=fillcropmid&key=AIzaSyCzWaoBj5IfV7lRykIIh3PGbaG9k2supQQ');
			$(".poster").css('width','auto');			
		}else{
			$('#tabla-poster').attr("src", 'images/poster.jpg');
			$('.no_image').append(getTag(lang, 'no_img'));
			$(".poster").css('width','100%');			
		}
		$("#tabla-poster").css('display','block');			
		$(".primer_titulo").css('margin-top','-50px');			
	}else{
		$(".primer_titulo").css('margin-top','-80px');			
		$("#tabla-poster").css('display','none');			
	}
	
	//GENERAL INFO
	$("#general_info").append(getTag(lang, 'gen-inf'));
	$("#tabla-durac-celda").append(getTag(lang, 'tag'));
	$("#tabla-durac").append(doc.tagline);
	$("#tabla-anio-celda").append(getTag(lang, 'ano'));
	$("#tabla-anio").append(doc.anio);
	$("#tabla-imdb-celda").append(getTag(lang, 'imdbr'));
	if ((doc.imdb != undefined)&&((doc.imdb != 'N/A'))) $("#tabla-imdb").append(doc.imdb+' <i class="fa fa-star menu-star"></i>');
	else $("#tabla-imdb").append('-');
	$("#tabla-tagline-celda").append(getTag(lang, 'dir'));
	jQuery.each( doc.directores, function( i, val ) {
		if (doc.directores[i] != '-'){
			$("#tabla-tagline").append("<a id='director"+i+"'>"+doc.directores[i]+"</a><br />");
			$("#director"+i).unbind("click");
			$("#director"+i).click(function() {
				showTablaII(doc.directores[i], lang);
			});
		}else{
			$("#tabla-tagline").append(doc.directores[i]);
		}
	});
	$("#tabla-director-celda").append(getTag(lang, 'comp'));
	jQuery.each( doc.productora, function( i, val ) {
		$("#tabla-director").append(doc.productora[i]+'<br />');
	});
	var items = doc.lanzamiento.split("-",3);
	var lanzamiento = parseFecha(items, lang);
	$("#tabla-idioma-celda").append(getTag(lang, 'lanz'));
	$("#tabla-idioma").append(lanzamiento);
	$("#tabla-exec_productores-celda").append(getTag(lang, 'adapt'));
	$("#tabla-exec_productores").append(doc.adapted_by);
	$("#tabla-age-celda").append(getTag(lang, 'dur'));
	$("#tabla-age").append(doc.duracion);	
	$("#tabla-guion-celda").append(getTag(lang, 'clas'));
	jQuery.each( doc.rating, function( i, val ) {
		$("#tabla-guion").append(doc.rating[i]+'<br />');
	});
	$("#tabla-pais-celda").append(getTag(lang, 'gen'));
	jQuery.each( doc.generos, function( i, val ) {
		$("#tabla-pais").append(doc.generos[i]+'<br />');
	});
	$("#tabla-adapted-celda").append(getTag(lang, 'pai'));
	jQuery.each( doc.pais, function( i, val ) {
		$("#tabla-adapted").append(doc.pais[i]+'<br />');
	});
	$("#tabla-rating-celda").append(getTag(lang, 'idi_film'));
	jQuery.each( doc.idioma, function( i, val ) {
		$("#tabla-rating").append(doc.idioma[i]+'<br />');
	});
	$("#tabla-generos-celda").append(getTag(lang, 'rec'));
	if (doc.recaudacion[0] != '-'){
		var num = addPoints(3, doc.recaudacion[0]).join(getTag(lang, 'sep'));
		$("#tabla-generos").append(num + ' (' + doc.recaudacion[1] + ')');
	}else{
		$("#tabla-generos").append(doc.recaudacion[0]);
	}
	$("#tabla-prequel-celda").append(getTag(lang, 'preq'));
	if ((doc.precuela != undefined)&&(doc.precuela != '-')){
		$("#tabla-prequel").append('<span class="col-xs-12 col-sm-12 col-md-12 no-padd-left"><a id="prequel">'+doc.precuela+'</a></span>');
		$("#prequel").unbind("click");
		$("#prequel").click(function() {
			showTablaII(doc.precuela, lang);
		});
	}else{
		$("#tabla-prequel").append('<span class="col-xs-12 col-sm-12 col-md-12 no-padd-left">-</span>');		
	}
	$("#tabla-sequel-celda").append(getTag(lang, 'seq'));
	if ((doc.secuela != undefined)&&(doc.secuela != '-')){
		$("#tabla-sequel").append('<span class="col-xs-12 col-sm-12 col-md-12 no-padd-left"><a id="sequel">'+doc.secuela+'</a></span>');
		$("#sequel").unbind("click");
		$("#sequel").click(function() {
			showTablaII(doc.secuela, lang);
		});
	}else{
		$("#tabla-sequel").append('<span class="col-xs-12 col-sm-12 col-md-12 no-padd-left">-</span>');		
	}

	//DESCRIPCION
	$("#tabla-plotdesc-celda").append(getTag(lang, 'plotdesc'));
	$("#tabla-lanzamiento").append(doc.descripcion);
	if ((lang == 'en')&&(doc.plot != undefined)&&(doc.plot != null)){
		$("#tabla-lanzamiento-celda").append(getTag(lang, 'desc'));
		$("#tabla-lanzamiento-celda").css('display','block');
		$("#tabla-plot-celda").append('Plot');
		$("#tabla-plot").append(doc.plot);
		$("#tabla-plot-celda").css('display','block');
		$("#tabla-plot").css('display','initial');
	}else{
		$("#tabla-lanzamiento-celda").css('display','none');
		$("#tabla-plot-celda").css('display','none');
		$("#tabla-plot").css('display','none');	
	}

	//CAST
	$("#tabla-causedeath-celda").append(getTag(lang, 'act'));
	jQuery.each( doc.actores, function( i, val ) {
		if (doc.actores[i][0] != '-'){
			if ((doc.actores[i][0] != 'undefined')&&(doc.actores[i][0] != undefined)&&(doc.actores[i][0] != '-')){
				if (doc.actores[i][1] != undefined){
					$("#tabla-causedeath").append("<span class='col-xs-6 col-sm-6 col-md-4 lista-cast'><a id='actores"+i+"'>"+doc.actores[i][0]+"</a></span><span class='col-xs-6 col-sm-6 col-md-8 lista-char'>"+doc.actores[i][1]+"</span>");
				}else{
					$("#tabla-causedeath").append("<span class='col-xs-6 col-sm-6 col-md-4 lista-cast'><a id='actores"+i+"'>"+doc.actores[i][0]+"</a></span><span class='col-xs-6 col-sm-6 col-md-8 lista-char'>-</span>");
				}
				$("#actores"+i).unbind("click");
				$("#actores"+i).click(function() {
					showTablaII(doc.actores[i][0], lang);
				});
			}
		}else{
			$("#tabla-causedeath").append("<span class='col-xs-12 col-sm-12 col-md-12'>-</span>");
		}
	});

	//PRODUCCION
	$("#production").append(getTag(lang, 'info_prod'));
	$("#tabla-actores-celda").append(getTag(lang, 'prod'));
	jQuery.each( doc.productores, function( i, val ) {
		if (doc.productores[i] != '-'){
			$("#tabla-actores").append("<span class='col-xs-12 col-sm-12 col-md-12'><a id='productores"+i+"'>"+doc.productores[i]+"</a></span>");
			$("#productores"+i).unbind("click");
			$("#productores"+i).click(function() {
				showTablaII(doc.productores[i], lang);
			});
		}else{
			$("#tabla-actores").append(doc.productores[i]);
		}
	});
	$("#tabla-productora-celda").append(getTag(lang, 'exprod'));
	jQuery.each( doc.exec_productores, function( i, val ) {
		if (doc.exec_productores[i] != '-'){
			$("#tabla-productora").append("<span class='col-xs-12 col-sm-12 col-md-12'><a id='exec_productores"+i+"'>"+doc.exec_productores[i]+"</a></span>");
			$("#exec_productores"+i).unbind("click");
			$("#exec_productores"+i).click(function() {
				showTablaII(doc.exec_productores[i], lang);
			});
		}else{
			$("#tabla-productora").append(doc.exec_productores[i]);
		}
	});
	$("#tabla-productores-celda").append(getTag(lang, 'gui'));
	jQuery.each( doc.guionistas, function( i, val ) {
		if (doc.guionistas[i] != '-'){
			$("#tabla-productores").append("<span class='col-xs-12 col-sm-12 col-md-12'><a id='guion"+i+"'>"+doc.guionistas[i]+"</a></span>");
			$("#guion"+i).unbind("click");
			$("#guion"+i).click(function() {
				showTablaII(doc.guionistas[i], lang);
			});
		}else{
			$("#tabla-productores").append(doc.guionistas[i]);
		}
	});

	//PREMIOS
	$("#premios").append(getTag(lang, 'premios'));
	$("#tabla-recaudacion-celda").append(getTag(lang, 'pre'));
	jQuery.each( doc.premios, function( i, val ) {
		if (doc.premios[i][0] != '-'){
			if (doc.premios[i][1] != undefined){
				if (doc.premios[i][2] != undefined){
					$("#tabla-recaudacion").append("<span class='col-xs-12 col-sm-12 col-md-12 lista'>"+doc.premios[i][2]+' - '+doc.premios[i][0]+"</span>");
				}else{
					$("#tabla-recaudacion").append("<span class='col-xs-12 col-sm-12 col-md-12 lista'>"+doc.premios[i][0]+"</span>");
				}
				$("#tabla-recaudacion").append("<span id='premios"+i+"' class='col-xs-12 col-sm-12 col-md-12'></span>");
				processAwards(doc.premios[i][1], 'premios'+i, lang);
			}else{
				$("#tabla-recaudacion").append("<span class='col-xs-12 col-sm-12 col-md-12 lista'>"+doc.premios[i][0]+"</span><span class='col-xs-12 col-sm-12 col-md-12'></span>");
			}
		}else{
			$("#tabla-recaudacion").append("<span class='col-xs-12 col-sm-12 col-md-12 lista'>-</span>");
		}
	});
	$("#tabla-desc-celda").append(getTag(lang, 'pre-nom'));
	jQuery.each( doc.premios_nom, function( i, val ) {
		if (doc.premios_nom[i][0] != '-'){
			if (doc.premios_nom[i][1] != undefined){
				if (doc.premios_nom[i][2] != undefined){
					$("#tabla-desc").append("<span class='col-xs-12 col-sm-12 col-md-12 lista'>"+doc.premios_nom[i][2]+' - '+doc.premios_nom[i][0]+"</span>");
				}else{
					$("#tabla-desc").append("<span class='col-xs-12 col-sm-12 col-md-12 lista'>"+doc.premios_nom[i][0]+"</span>");
				}
				$("#tabla-desc").append("<span id='premios_nom"+i+"' class='col-xs-12 col-sm-12 col-md-12'></span>");
				processAwards(doc.premios_nom[i][1], 'premios_nom'+i, lang);
			}else{
				$("#tabla-desc").append("<span class='col-xs-12 col-sm-12 col-md-12 lista'>"+doc.premios_nom[i][0]+"</span><span class='col-xs-12 col-sm-12 col-md-12'></span>");
			}
		}else{
			$("#tabla-desc").append("<span class='col-xs-12 col-sm-12 col-md-12 lista'>-</span>");
		}
	});

	//WEB
	$("#website").append(getTag(lang, 'webmenu'));
	$("#tabla-premios-celda").append(getTag(lang, 'tra'));
	if (doc.trailer != '-'){
		//$("#tabla-premios").append("<span class='col-xs-12 col-sm-12 col-md-12'><a href='"+doc.trailer+"' >"+doc.trailer+"</a></span>");
		$("#tabla-premios").append("<span class='col-xs-12 col-sm-12 col-md-12'><a id='tabla-premios-trailer'>"+doc.trailer+"</a></span>");
		$("#tabla-premios-trailer").unbind("click");
		$("#tabla-premios-trailer").click(function() {
			var r = confirm(getTag(lang, 'leaving'));
			if (r == true) {
				navigator.app.loadUrl(doc.trailer, {openExternal: true});
			}
		});
	}else{
		$("#tabla-premios").append("<span class='col-xs-12 col-sm-12 col-md-12'>-</span>");
	}
	/*$("#tabla-clasificacion-celda").append(getTag(lang, 'web'));
	if (doc.web != '-'){
		//$("#tabla-clasificacion").append("<span class='col-xs-12 col-sm-12 col-md-12'><a href='"+doc.web+"' >"+doc.web+"</a></span>");
		$("#tabla-clasificacion").append("<span class='col-xs-12 col-sm-12 col-md-12'><a id='tabla-clasificacion-web'>"+doc.web+"</a></span>");
		$("#tabla-clasificacion-web").unbind("click");
		$("#tabla-clasificacion-web").click(function() {
			var r = confirm(getTag(lang, 'leaving'));
			if (r == true) {
				navigator.app.loadUrl(doc.web, {openExternal: true});
			}
		});
	}else{
		$("#tabla-clasificacion").append("<span class='col-xs-12 col-sm-12 col-md-12'>-</span>");
	}*/
	
	//CAMBIAR IDIOMA
	if ((doc.mid != undefined) && (doc.mid != '-')){
		$("#buscar-imdb").empty();
		$("#buscar-imdb").unbind("click");
		$("#buscar-imdb").css('display','initial');
		$("#buscar-imdb").append('- '+getTag(lang, 'mostrar-otro-idi'));
		$("#buscar-imdb").click(function() {
			if (lang=='en')
				addRecord(doc.mid, 'es');
			else
				addRecord(doc.mid, 'en');
		});		
	}
	
	//MENU LATERAL
	$("#opt_menu_home").click(function() {
		slide_menu();
		$("#showPelicula").click();			
	});
	$("#navmenu").empty();
	$("#navmenu").append('<a class="link_menu link_menu_title" onclick="slide_menu();$(\'#showPelicula\').click();" href="#abMainCtrl">'+doc.title+'</a>');
	$("#navmenu").append('<a class="link_menu" onclick="slide_menu();$(\'#showPelicula\').click();" href="#general_info">'+getTag(lang, 'gen-inf')+'</a>');
	$("#navmenu").append('<a class="link_menu" onclick="slide_menu();$(\'#showPelicula\').click();" href="#tabla-lanzamiento-celda">'+getTag(lang, 'plotdesc')+'</a>');
	$("#navmenu").append('<a class="link_menu" onclick="slide_menu();$(\'#showPelicula\').click();" href="#tabla-causedeath-celda">'+getTag(lang, 'act')+'</a>');
	$("#navmenu").append('<a class="link_menu" onclick="slide_menu();$(\'#showPelicula\').click();" href="#production">'+getTag(lang, 'info_prod')+'</a>');
	$("#navmenu").append('<a class="link_menu_h4" onclick="slide_menu();$(\'#showPelicula\').click();" href="#tabla-actores-celda">'+getTag(lang, 'prod')+'</a>');
	$("#navmenu").append('<a class="link_menu_h4" onclick="slide_menu();$(\'#showPelicula\').click();" href="#tabla-productora-celda">'+getTag(lang, 'exprod')+'</a>');
	$("#navmenu").append('<a class="link_menu_h4" onclick="slide_menu();$(\'#showPelicula\').click();" href="#tabla-productores-celda">'+getTag(lang, 'gui')+'</a>');
	$("#navmenu").append('<a class="link_menu" onclick="slide_menu();$(\'#showPelicula\').click();" href="#premios">'+getTag(lang, 'premios')+'</a>');
	$("#navmenu").append('<a class="link_menu_h4" onclick="slide_menu();$(\'#showPelicula\').click();" href="#tabla-recaudacion-celda">'+getTag(lang, 'pre')+'</a>');
	$("#navmenu").append('<a class="link_menu_h4" onclick="slide_menu();$(\'#showPelicula\').click();" href="#tabla-desc-celda">'+getTag(lang, 'pre-nom')+'</a>');
	$("#navmenu").append('<a class="link_menu" onclick="slide_menu();$(\'#showPelicula\').click();" href="#tabla-desc-celda">'+getTag(lang, 'webmenu')+'</a>');
	$("#navmenu").append('<a class="link_menu_h4" onclick="slide_menu();$(\'#showPelicula\').click();" href="#tabla-premios-celda">'+getTag(lang, 'tra')+'</a>');

}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//Cargar tablas ACTOR
///////////////////////////////////
function cargarTablaActor(doc, lang){
	$("#showActor").click();	
	$("#tblDataActor").children().children().empty();
	//var networkState = navigator.connection.type;

	//TITULO
	$("#act-tabla-titulo").append(doc.name);
	$("#act-tabla-poster").empty();
	if (mostrarImagen == 0 || mostrarImagen == 1){
	//if ((mostrarImagen == 0)||(mostrarImagen == 1 && networkState == Connection.WIFI)){
		if((doc.poster != null)&&(doc.poster != '')&&(doc.poster != '-')){
			$('#act-tabla-poster').attr("src", 'https://usercontent.googleapis.com/freebase/v1/image'+doc.poster+'?maxwidth=600&maxheight=1000&mode=fillcropmid&key=AIzaSyCzWaoBj5IfV7lRykIIh3PGbaG9k2supQQ');
			$(".poster").css('width','auto');			
		}else{
			$('#act-tabla-poster').attr("src", 'images/poster.jpg');
			$('.no_image').append(getTag(lang, 'no_img'));
			$(".poster").css('width','100%');			
		}
		$("#act-tabla-poster").css('display','block');			
		$(".primer_titulo").css('margin-top','-50px');			
	}else{
		$(".primer_titulo").css('margin-top','-80px');			
		$("#act-tabla-poster").css('display','none');			
	}
	
	//DETALLES PERSONALES
	var fecha = new Date();
	$("#personal_details").append(getTag(lang, 'pers-det'));
	$("#act-tabla-anio-celda").append(getTag(lang, 'not'));
	jQuery.each( doc.profesion, function( i, val ) {
		$("#act-tabla-anio").append(doc.profesion[i]+'<br />');
	});
	$("#act-tabla-age-celda").append(getTag(lang, 'fec-nac'));
	if (doc.nacimiento != '-'){
		var items = doc.nacimiento.split("-",3);
		var nacimiento = parseFecha(items, lang);
		$("#act-tabla-age").append(nacimiento);
		if (doc.lugar_nacimiento != '-')$("#act-tabla-age").append('<br />'+doc.lugar_nacimiento);
	}else{
		$("#act-tabla-age").append('-');
	}
	if (doc.muerte == null){
		$("#act-tabla-durac-celda").append(getTag(lang, 'eda'));
		if (doc.nacimiento != '-'){
			var edad = fecha.getFullYear() - items[0];
			if (fecha.getMonth() + 1 < items[1]) {edad--;}
			else {
				if (fecha.getMonth() + 1 == items[1]){
					if (fecha.getDate() < items[2]){
						edad--;
					}
				}
			};
			if(!isNaN(edad))$("#act-tabla-durac").append(edad);
			else $("#act-tabla-durac").append('-');
		}else{
			$("#act-tabla-durac").append('-');
		}
		$("#act-tabla-tagline-celda").css('display','none');
		$("#act-tabla-tagline").css('display','none');
	}else{
		var items_muerte = doc.muerte.split("-",3);
		var muerte = parseFecha(items_muerte, lang);
		var edad_muerte = items_muerte[0] - items[0];
		if (items_muerte[1] < items[1]) {edad_muerte--;}
		else {
			if (items_muerte[1] == items[1]){
				if (items_muerte[2] < items[2]){
					edad_muerte--;
				}
			}
		};
		$("#act-tabla-durac-celda").append(getTag(lang, 'mue'));
		if (lang == 'en') $("#act-tabla-durac").append(muerte+' (aged '+edad_muerte+')<br />'+doc.lugar_muerte);
		else $("#act-tabla-durac").append(muerte+' ('+edad_muerte+' años)<br />'+doc.lugar_muerte);
		$("#act-tabla-tagline-celda").append(getTag(lang, 'cau-mue'));
		jQuery.each( doc.causa_muerte, function( i, val ) {
			$("#act-tabla-tagline").append(doc.causa_muerte[i]+'<br />');
		});
		$("#act-tabla-tagline-celda").css('display','initial');
		$("#act-tabla-tagline").css('display','initial');	
	}
	$("#act-tabla-causedeath-celda").append(getTag(lang, 'nac'));
	$("#act-tabla-causedeath").append(doc.pais);
	$("#act-tabla-director-celda").append(getTag(lang, 'alt'));
	$("#act-tabla-director").append(doc.altura);
	
	//BIOGRAFÍA
	$("#act-tabla-actores-celda").append(getTag(lang, 'bio'));
	$("#act-tabla-actores").append(doc.descripcion);
	
	//VIDA PERSONAL
	$("#personal_life").append(getTag(lang, 'pers-lif'));	
	$("#act-tabla-productora-celda").append(getTag(lang, 'edu'));
	jQuery.each( doc.education, function( i, val ) {
		$("#act-tabla-productora").append(doc.education[i]+'<br />');
	});
	$("#act-tabla-productores-celda").append(getTag(lang, 'par'));
	jQuery.each( doc.esposas, function( i, val ) {
		$("#act-tabla-productores").append(doc.esposas[i]+'<br />');
	});
	$("#act-tabla-exec_productores-celda").append(getTag(lang, 'hij'));
	jQuery.each( doc.hijos, function( i, val ) {
		$("#act-tabla-exec_productores").append(doc.hijos[i]+'<br />');
	});
	$("#act-tabla-guion-celda").append(getTag(lang, 'padr'));
	jQuery.each( doc.padres, function( i, val ) {
		$("#act-tabla-guion").append(doc.padres[i]+'<br />');
	});
	
	//FILMOGRAFÍA	
	$("#filmografia").append(getTag(lang, 'filmograf'));	
	$("#act-tabla-adapted-celda").append(getTag(lang, 'film'));
	if ((doc.film != undefined)&&(doc.film != '-')){
		jQuery.each( doc.film, function( i, val ) {
			$("#act-tabla-adapted").append('<span class="col-xs-2 col-sm-1 col-md-1 span-episode-num text-right">'+val.year+' - </span><p class="col-xs-10 col-sm-11 col-md-11 episode"><a id="film'+i+'">'+val.movie+'</a></p>');
			if ((val.character != undefined)&&(val.character != '-')){
				$("#act-tabla-adapted").append('<span class="col-xs-offset-2 col-xs-10 col-sm-offset-1 col-sm-11 col-md-offset-1 col-md-11 campo span-episode">'+val.character+'</span>');
			}else{
				$("#act-tabla-adapted").append('<span class="col-xs-offset-2 col-xs-10 col-sm-offset-1 col-sm-11 col-md-offset-1 col-md-11 campo span-episode"></span>');
			}
			$("#film"+i).unbind("click");
			$("#film"+i).click(function() {
				showTablaII(val.movie, lang);
			});
		});
	}else{
		$("#act-tabla-adapted").append("<span class='col-xs-12 col-sm-12 col-md-12'>-</span>");		
	}
	$("#act-tabla-pais-celda").append(getTag(lang, 'tv'));
	if ((doc.tv != undefined)&&(doc.tv != '-')){
		jQuery.each( doc.tv, function( i, val ) {
			$("#act-tabla-pais").append('<span class="col-xs-2 col-sm-1 col-md-1 span-episode-num text-right">'+val.year+' - </span><p class="col-xs-10 col-sm-11 col-md-11 episode"><a id="tv'+i+'">'+val.serie+'</a></p>');
			if ((val.character != undefined)&&(val.character != '-')){
				if (val.from != '-'){
					if (val.to != '-'){
						$("#act-tabla-pais").append("<span class='col-xs-offset-2 col-xs-10 col-sm-offset-1 col-sm-11 col-md-offset-1 col-md-11 campo span-episode'>"+val.character+" ("+val.from+" - "+val.to+")</span>");
					}else{
						$("#act-tabla-pais").append("<span class='col-xs-offset-2 col-xs-10 col-sm-offset-1 col-sm-11 col-md-offset-1 col-md-11 campo span-episode'>"+val.character+" ("+val.from+" - )</span>");
					}
				}else{
					$("#act-tabla-pais").append("<span class='col-xs-offset-2 col-xs-10 col-sm-offset-1 col-sm-11 col-md-offset-1 col-md-11 campo span-episode'>"+val.character+"</span>");
				}
			}else{
				$("#act-tabla-pais").append('<span class="col-xs-offset-2 col-xs-10 col-sm-offset-1 col-sm-11 col-md-offset-1 col-md-11 campo span-episode"></span>');
			}
			$("#tv"+i).unbind("click");
			$("#tv"+i).click(function() {
				showTablaII(val.serie, lang);
			});
		});
	}else{
		$("#act-tabla-pais").append("<span class='col-xs-12 col-sm-12 col-md-12'>-</span>");		
	}
	
	//DETRAS DE CAMARA FILM
	$("#detras-de-camara").append(getTag(lang, 'detras-de-camara'));	
	$("#act-tabla-idioma-celda").append(getTag(lang, 'act-dir'));
	jQuery.each( doc.film_dir, function( i, val ) {
		if (doc.film_dir[i] != '-'){
			$("#act-tabla-idioma").append("<span class='col-xs-12 col-sm-12 col-md-12'><a id='film_dir"+i+"'>"+doc.film_dir[i]+"</a></span>");
			$("#film_dir"+i).unbind("click");
			$("#film_dir"+i).click(function() {
				showTablaII(doc.film_dir[i], lang);
			});
		}else{
			$("#act-tabla-idioma").append("<span class='col-xs-12 col-sm-12 col-md-12 lista'>-</span>");
		}
	});
	$("#act-tabla-generos-celda").append(getTag(lang, 'act-pro'));
	jQuery.each( doc.film_prod, function( i, val ) {
		if (doc.film_prod[i] != '-'){
			$("#act-tabla-generos").append("<span class='col-xs-12 col-sm-12 col-md-12'><a id='film_prod"+i+"'>"+doc.film_prod[i]+"</a></span>");
			$("#film_prod"+i).unbind("click");
			$("#film_prod"+i).click(function() {
				showTablaII(doc.film_prod[i], lang);
			});
		}else{
			$("#act-tabla-generos").append("<span class='col-xs-12 col-sm-12 col-md-12 lista'>-</span>");
		}
	});
	$("#act-tabla-lanzamiento-celda").append(getTag(lang, 'act-ex'));
	jQuery.each( doc.film_exprod, function( i, val ) {
		if (doc.film_exprod[i] != '-'){
			$("#act-tabla-lanzamiento").append("<span class='col-xs-12 col-sm-12 col-md-12'><a id='film_exprod"+i+"'>"+doc.film_exprod[i]+"</a></span>");
			$("#film_exprod"+i).unbind("click");
			$("#film_exprod"+i).click(function() {
				showTablaII(doc.film_exprod[i], lang);
			});
		}else{
			$("#act-tabla-lanzamiento").append("<span class='col-xs-12 col-sm-12 col-md-12 lista'>-</span>");
		}
	});
	$("#act-tabla-recaudacion-celda").append(getTag(lang, 'act-gui'));
	if (doc.writer != undefined){
		jQuery.each( doc.writer, function( i, val ) {
			if (doc.writer[i] != '-'){
				$("#act-tabla-recaudacion").append("<span class='col-xs-12 col-sm-12 col-md-12'><a id='writer"+i+"'>"+doc.writer[i]+"</a></span>");
				$("#writer"+i).unbind("click");
				$("#writer"+i).click(function() {
					showTablaII(doc.writer[i], lang);
				});
			}else{
				$("#act-tabla-recaudacion").append("<span class='col-xs-12 col-sm-12 col-md-12 lista'>-</span>");	
			}
		});
	}else{
		$("#act-tabla-recaudacion").append('-');	
	}

	//DETRAS DE CAMARA TV
	$("#detras-de-camara-tv").append(getTag(lang, 'detras-de-camara-tv'));	
	$("#act-tabla-tvcreat-celda").append(getTag(lang, 'tvcreat'));
	if (doc.tv_creat != undefined){
		jQuery.each( doc.tv_creat, function( i, val ) {
			if (doc.tv_creat[i] != '-'){
				$("#act-tabla-tvcreat").append("<span class='col-xs-12 col-sm-12 col-md-12'><a id='tv_creat"+i+"'>"+doc.tv_creat[i]+"</a></span>");
				$("#tv_creat"+i).unbind("click");
				$("#tv_creat"+i).click(function() {
					showTablaII(doc.tv_creat[i], lang);
				});
			}else{
				$("#act-tabla-tvcreat").append("<span class='col-xs-12 col-sm-12 col-md-12 lista'>-</span>");
			}
		});
	}else{
		$("#act-tabla-tvcreat").append("<span class='col-xs-12 col-sm-12 col-md-12 lista'>-</span>");		
	}
	$("#act-tabla-tvprod-celda").append(getTag(lang, 'tvprod'));
	if (doc.tv_prod != undefined){
		jQuery.each( doc.tv_prod, function( i, val ) {
			if (doc.tv_prod[i] != '-'){
				$("#act-tabla-tvprod").append("<span class='col-xs-12 col-sm-12 col-md-12'><a id='tv_prod"+i+"'>"+doc.tv_prod[i]+"</a></span>");
				$("#tv_prod"+i).unbind("click");
				$("#tv_prod"+i).click(function() {
					showTablaII(doc.tv_prod[i], lang);
				});
			}else{
				$("#act-tabla-tvprod").append("<span class='col-xs-12 col-sm-12 col-md-12 lista'>-</span>");
			}
		});
	}else{
		$("#act-tabla-tvprod").append("<span class='col-xs-12 col-sm-12 col-md-12 lista'>-</span>");		
	}
	$("#act-tabla-tvwrit-celda").append(getTag(lang, 'tvwrit'));
	if (doc.tv_writer != undefined){
		jQuery.each( doc.tv_writer, function( i, val ) {
			if (doc.tv_writer[i] != '-'){
				$("#act-tabla-tvwrit").append("<span class='col-xs-12 col-sm-12 col-md-12'><a id='tv_writer"+i+"'>"+doc.tv_writer[i]+"</a></span>");
				$("#tv_writer"+i).unbind("click");
				$("#tv_writer"+i).click(function() {
					showTablaII(doc.tv_writer[i], lang);
				});
			}else{
				$("#act-tabla-tvwrit").append("<span class='col-xs-12 col-sm-12 col-md-12 lista'>-</span>");
			}
		});
	}else{
		$("#act-tabla-tvwrit").append("<span class='col-xs-12 col-sm-12 col-md-12 lista'>-</span>");		
	}
	
	//OTROS TRABAJOS
	$("#otros-trabajos").append(getTag(lang, 'otros-trabajos'));	
	$("#act-tabla-desc-celda").append(getTag(lang, 'mus'));
	jQuery.each( doc.music, function( i, val ) {
		$("#act-tabla-desc").append("<span class='col-xs-12 col-sm-12 col-md-12'>"+doc.music[i]+"</span>");
	});
	$("#act-tabla-premios-celda").append(getTag(lang, 'org'));
	jQuery.each( doc.org, function( i, val ) {
		$("#act-tabla-premios").append("<span class='col-xs-12 col-sm-12 col-md-12'>"+doc.org[i]+"</span>");
	});
	$("#act-tabla-clasificacion-celda").append(getTag(lang, 'trab'));
	jQuery.each( doc.employ_hist, function( i, val ) {
		if (doc.employ_hist[i][0] != '-'){
			$("#act-tabla-clasificacion").append("<span class='col-xs-12 col-sm-12 col-md-12'>"+doc.employ_hist[i][0]+" ("+doc.employ_hist[i][1]+")</span>");
		}else{
			$("#act-tabla-clasificacion").append("<span class='col-xs-12 col-sm-12 col-md-12'>"+doc.employ_hist[i][0]+"</span>");
		}
	});
	
	//PREMIOS
	$("#premios-ganados").append(getTag(lang, 'premios-ganados'));	
	$("#act-tabla-trailer-celda").append(getTag(lang, 'pre'));
	jQuery.each( doc.aw_won, function( i, val ) {
		if (doc.aw_won[i][0] != '-'){
			if (doc.aw_won[i][1] != undefined){
				if (doc.aw_won[i][2] != undefined){
					$("#act-tabla-trailer").append("<span class='col-xs-12 col-sm-12 col-md-12 lista'>"+doc.aw_won[i][2]+' - '+doc.aw_won[i][0]+"</span>");
				}else{
					$("#act-tabla-trailer").append("<span class='col-xs-12 col-sm-12 col-md-12 lista'>"+doc.aw_won[i][0]+"</span>");
				}
				$("#act-tabla-trailer").append("<span id='aw_won"+i+"' class='col-xs-12 col-sm-12 col-md-12'></span>");
				processAwards(doc.aw_won[i][1], 'aw_won'+i, lang);
			}else{
				$("#act-tabla-trailer").append("<span class='col-xs-12 col-sm-12 col-md-12 lista'>"+doc.aw_won[i][0]+"</span><span class='col-xs-12 col-sm-12 col-md-12'></span>");
			}
		}else{
			$("#act-tabla-trailer").append("<span class='col-xs-12 col-sm-12 col-md-12 lista'>-</span>");
		}
	});
	$("#act-tabla-writer-celda").append(getTag(lang, 'pre-nom'));
	jQuery.each( doc.aw_nom, function( i, val ) {
		if (doc.aw_nom[i][0] != '-'){
			if (doc.aw_nom[i][1] != undefined){
				if (doc.aw_nom[i][2] != undefined){
					$("#act-tabla-writer").append("<span class='col-xs-12 col-sm-12 col-md-12 lista'>"+doc.aw_nom[i][2]+' - '+doc.aw_nom[i][0]+"</span>");
				}else{
					$("#act-tabla-writer").append("<span class='col-xs-12 col-sm-12 col-md-12 lista'>"+doc.aw_nom[i][0]+"</span>");
				}
				$("#act-tabla-writer").append("<span id='aw_nom"+i+"' class='col-xs-12 col-sm-12 col-md-12'></span>");
				processAwards(doc.aw_nom[i][1], 'aw_nom'+i, lang);
			}else{
				$("#act-tabla-writer").append("<span class='col-xs-12 col-sm-12 col-md-12 lista'>"+doc.aw_nom[i][0]+"</span><span class='col-xs-12 col-sm-12 col-md-12'></span>");
			}
		}else{
			$("#act-tabla-writer").append("<span class='col-xs-12 col-sm-12 col-md-12 lista'>-</span>");
		}
	});
	
	//WEB
	/*$("#act-tabla-appe-celda").append(getTag(lang, 'web'));
	if (doc.web != '-'){
		//$("#act-tabla-appe").append("<span class='col-xs-12 col-sm-12 col-md-12'><a href='"+doc.web+"' >"+doc.web+"</a></span>");
		$("#act-tabla-appe").append("<span class='col-xs-12 col-sm-12 col-md-12'><a id='act-tabla-appe-web'>"+doc.web+"</a></span>");
		$("#act-tabla-appe-web").unbind("click");
		$("#act-tabla-appe-web").click(function() {
			var r = confirm(getTag(lang, 'leaving'));
			if (r == true) {
				navigator.app.loadUrl(doc.web, {openExternal: true});
			}
		});
	}else{
		$("#act-tabla-appe").append("<span class='col-xs-12 col-sm-12 col-md-12 lista'>-</span>");
	}*/
	
	//CAMBIAR IDIOMA
	$("#act-buscar-imdb").empty();
	$("#act-buscar-imdb").unbind("click");
	$("#act-buscar-imdb").css('display','initial');
	$("#act-buscar-imdb").append('- '+getTag(lang, 'buscar-otro-idi'));
	$("#act-buscar-imdb").click(function() {
		if (lang=='en')
			showTablaII(doc.name, 'es');
		else
			showTablaII(doc.name, 'en');
	});
	
	//MENU LATERAL
	$("#opt_menu_home").click(function() {
		slide_menu();
		$("#showActor").click();			
	});
	$("#navmenu").empty();
	$("#navmenu").append('<a class="link_menu link_menu_title" onclick="slide_menu();$(\'#showActor\').click();" href="#abMainCtrl">'+doc.name+'</a>');
	$("#navmenu").append('<a class="link_menu" onclick="slide_menu();$(\'#showActor\').click();" href="#personal_details">'+getTag(lang, 'pers-det')+'</a>');
	$("#navmenu").append('<a class="link_menu" onclick="slide_menu();$(\'#showActor\').click();" href="#act-tabla-actores-celda">'+getTag(lang, 'bio')+'</a>');
	$("#navmenu").append('<a class="link_menu" onclick="slide_menu();$(\'#showActor\').click();" href="#personal_life">'+getTag(lang, 'pers-lif')+'</a>');
	$("#navmenu").append('<a class="link_menu" onclick="slide_menu();$(\'#showActor\').click();" href="#filmografia">'+getTag(lang, 'filmograf')+'</a>');
	$("#navmenu").append('<a class="link_menu_h4" onclick="slide_menu();$(\'#showActor\').click();" href="#act-tabla-adapted-celda">'+getTag(lang, 'film')+'</a>');
	$("#navmenu").append('<a class="link_menu_h4" onclick="slide_menu();$(\'#showActor\').click();" href="#act-tabla-pais-celda">'+getTag(lang, 'tv')+'</a>');
	$("#navmenu").append('<a class="link_menu" onclick="slide_menu();$(\'#showActor\').click();" href="#detras-de-camara">'+getTag(lang, 'detras-de-camara')+'</a>');
	$("#navmenu").append('<a class="link_menu_h4" onclick="slide_menu();$(\'#showActor\').click();" href="#act-tabla-idioma-celda">'+getTag(lang, 'act-dir')+'</a>');
	$("#navmenu").append('<a class="link_menu_h4" onclick="slide_menu();$(\'#showActor\').click();" href="#act-tabla-lanzamiento-celda">'+getTag(lang, 'act-ex')+'</a>');
	$("#navmenu").append('<a class="link_menu_h4" onclick="slide_menu();$(\'#showActor\').click();" href="#act-tabla-generos-celda">'+getTag(lang, 'act-pro')+'</a>');
	$("#navmenu").append('<a class="link_menu_h4" onclick="slide_menu();$(\'#showActor\').click();" href="#act-tabla-recaudacion-celda">'+getTag(lang, 'act-gui')+'</a>');
	$("#navmenu").append('<a class="link_menu" onclick="slide_menu();$(\'#showActor\').click();" href="#detras-de-camara-tv">'+getTag(lang, 'detras-de-camara-tv')+'</a>');
	$("#navmenu").append('<a class="link_menu_h4" onclick="slide_menu();$(\'#showActor\').click();" href="#act-tabla-tvcreat-celda">'+getTag(lang, 'tvcreat')+'</a>');
	$("#navmenu").append('<a class="link_menu_h4" onclick="slide_menu();$(\'#showActor\').click();" href="#act-tabla-tvprod-celda">'+getTag(lang, 'tvprod')+'</a>');
	$("#navmenu").append('<a class="link_menu_h4" onclick="slide_menu();$(\'#showActor\').click();" href="#act-tabla-tvwrit-celda">'+getTag(lang, 'tvwrit')+'</a>');
	$("#navmenu").append('<a class="link_menu" onclick="slide_menu();$(\'#showActor\').click();" href="#otros-trabajos">'+getTag(lang, 'otros-trabajos')+'</a>');
	$("#navmenu").append('<a class="link_menu_h4" onclick="slide_menu();$(\'#showActor\').click();" href="#act-tabla-desc-celda">'+getTag(lang, 'mus')+'</a>');
	$("#navmenu").append('<a class="link_menu_h4" onclick="slide_menu();$(\'#showActor\').click();" href="#act-tabla-premios-celda">'+getTag(lang, 'org')+'</a>');
	$("#navmenu").append('<a class="link_menu_h4" onclick="slide_menu();$(\'#showActor\').click();" href="#act-tabla-clasificacion-celda">'+getTag(lang, 'trab')+'</a>');
	$("#navmenu").append('<a class="link_menu" onclick="slide_menu();$(\'#showActor\').click();" href="#premios-ganados">'+getTag(lang, 'premios-ganados')+'</a>');
	$("#navmenu").append('<a class="link_menu_h4" onclick="slide_menu();$(\'#showActor\').click();" href="#act-tabla-trailer-celda">'+getTag(lang, 'pre')+'</a>');
	$("#navmenu").append('<a class="link_menu_h4" onclick="slide_menu();$(\'#showActor\').click();" href="#act-tabla-writer-celda">'+getTag(lang, 'pre-nom')+'</a>');

}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//Cargar tablas SERIE
///////////////////////////////////
function cargarTablaSerie(doc, lang){
	$("#showSerie").click();	
	$("#tblDataSerie").children().children().empty();
	//var networkState = navigator.connection.type;

	//TITULO
	$("#ser-tabla-titulo").append(doc.title);
	$("#ser-tabla-poster").empty();
	if (mostrarImagen == 0 || mostrarImagen == 1){
	//if ((mostrarImagen == 0)||(mostrarImagen == 1 && networkState == Connection.WIFI)){
		if((doc.poster != null)&&(doc.poster != '')&&(doc.poster != '-')){
			$('#ser-tabla-poster').attr("src", 'https://usercontent.googleapis.com/freebase/v1/image'+doc.poster+'?maxwidth=600&maxheight=1000&mode=fillcropmid&key=AIzaSyCzWaoBj5IfV7lRykIIh3PGbaG9k2supQQ');
			$(".poster").css('width','auto');			
		}else{
			$('#ser-tabla-poster').attr("src", 'images/poster.jpg');
			$('.no_image').append(getTag(lang, 'no_img'));
			$(".poster").css('width','100%');			
		}
		$("#ser-tabla-poster").css('display','block');			
		$(".primer_titulo").css('margin-top','-50px');			
	}else{
		$(".primer_titulo").css('margin-top','-80px');			
		$("#ser-tabla-poster").css('display','none');			
	}
	
	//GENERAL INFO
	$("#ser-general_info").append(getTag(lang, 'gen-inf'));
	$("#ser-tabla-guion-celda").append(getTag(lang, 'cade'));
	jQuery.each( doc.cadena, function( i, val ) {
		$("#ser-tabla-guion").append(doc.cadena[i]+'<br />');
	});
	$("#ser-tabla-adapted-celda").append(getTag(lang, 'pai'));
	jQuery.each( doc.pais, function( i, val ) {
		$("#ser-tabla-adapted").append(doc.pais[i]+'<br />');
	});
	$("#ser-tabla-imdb-celda").append(getTag(lang, 'imdbr'));
	if ((doc.imdb != undefined)&&((doc.imdb != 'N/A'))) $("#ser-tabla-imdb").append(doc.imdb+' <i class="fa fa-star menu-star"></i>');
	else $("#ser-tabla-imdb").append('-');
	var transmision = doc.episodio_primero.substr(0, 4) + ' - ';
	if (doc.episodio_ultimo != '-') transmision = transmision + doc.episodio_ultimo.substr(0, 4); else transmision = transmision + getTag(lang, 'actual');
	$("#ser-tabla-durac-celda").append(getTag(lang, 'trans'));
	$("#ser-tabla-durac").append(transmision);
	$("#ser-tabla-anio-celda").append(getTag(lang, 'curr_prod'));
	if (doc.en_produccion) 
		$("#ser-tabla-anio").append(getTag(lang, 'yes'));
	else 
		$("#ser-tabla-anio").append(getTag(lang, 'no'));
	$("#ser-tabla-pais-celda").append(getTag(lang, 'gen'));
	jQuery.each( doc.generos, function( i, val ) {
		$("#ser-tabla-pais").append(doc.generos[i]+'<br />');
	});
	$("#ser-tabla-rating-celda").append(getTag(lang, 'idi_film'));
	jQuery.each( doc.idioma, function( i, val ) {
		$("#ser-tabla-rating").append(doc.idioma[i]+'<br />');
	});
	$("#ser-tabla-exec_productores-celda").append(getTag(lang, 'song'));
	$("#ser-tabla-exec_productores").append(doc.song);
	$("#ser-tabla-director-celda").append(getTag(lang, 'setting'));
	jQuery.each( doc.setting, function( i, val ) {
		$("#ser-tabla-director").append(doc.setting[i]+'<br />');
	});
	$("#ser-tabla-tagline-celda").append(getTag(lang, 'spun_off'));
	jQuery.each( doc.spun_off, function( i, val ) {
		$("#ser-tabla-tagline").append('<span class="col-xs-12 col-sm-12 col-md-12 no-padd-left"><a id="spun_off'+i+'">'+doc.spun_off[i]+'</a></span>');
		$("#spun_off"+i).unbind("click");
		$("#spun_off"+i).click(function() {
			showTablaII(doc.spun_off[i], lang);
		});
	});
	$("#ser-tabla-idioma-celda").append(getTag(lang, 'spin_off'));
	jQuery.each( doc.spin_off, function( i, val ) {
		$("#ser-tabla-idioma").append('<span class="col-xs-12 col-sm-12 col-md-12 no-padd-left"><a id="spin_off'+i+'">'+doc.spin_off[i]+'</a></span>');
		$("#spin_off"+i).unbind("click");
		$("#spin_off"+i).click(function() {
			showTablaII(doc.spin_off[i], lang);
		});
	});
	
	//DESCRIPCION
	$("#ser-tabla-plotdesc-celda").append(getTag(lang, 'plotdesc'));
	$("#ser-tabla-lanzamiento").append(doc.descripcion);
	if ((lang == 'en')&&(doc.plot != undefined)&&(doc.plot != null)){
		$("#ser-tabla-lanzamiento-celda").append(getTag(lang, 'desc'));
		$("#ser-tabla-lanzamiento-celda").css('display','block');
		$("#ser-tabla-plot-celda").append('Plot');
		$("#ser-tabla-plot").append(doc.plot);
		$("#ser-tabla-plot-celda").css('display','block');
		$("#ser-tabla-plot").css('display','initial');
	}else{
		$("#ser-tabla-lanzamiento-celda").css('display','none');
		$("#ser-tabla-plot-celda").css('display','none');
		$("#ser-tabla-plot").css('display','none');	
	}

	//CAST
	$("#ser-tabla-causedeath-celda").append(getTag(lang, 'act'));
	if (doc.actores.length > 0){
		jQuery.each( doc.actores, function( i, val ) {
			if ((doc.actores[i].actor != 'undefined')&&(doc.actores[i].actor != undefined)&&(doc.actores[i].actor != '-')){
				$("#ser-tabla-causedeath").append("<span class='col-xs-6 col-sm-6 col-md-3 lista-cast'><a id='ser-actores"+i+"'>"+doc.actores[i].actor+"</a></span>");
				if (doc.actores[i].character != '-'){
					if (doc.actores[i].from != '-'){
						if (doc.actores[i].to != '-'){
							$("#ser-tabla-causedeath").append("<span class='col-xs-6 col-sm-6 col-md-9 lista-char'>"+doc.actores[i].character+"<br />("+doc.actores[i].from+" - "+doc.actores[i].to+")</span>");
						}else{
							$("#ser-tabla-causedeath").append("<span class='col-xs-6 col-sm-6 col-md-9 lista-char'>"+doc.actores[i].character+"<br />("+doc.actores[i].from+" - )</span>");
						}
					}else{
						$("#ser-tabla-causedeath").append("<span class='col-xs-6 col-sm-6 col-md-9 lista-char'>"+doc.actores[i].character+"</span>");
					}
				}else{
					$("#ser-tabla-causedeath").append("<span class='col-xs-6 col-sm-6 col-md-9 lista-char'>-</span>");
				}
				$("#ser-actores"+i).unbind("click");
				$("#ser-actores"+i).click(function() {
					showTablaII(doc.actores[i].actor, lang);
				});
			}
		});
	}else{
		$("#ser-tabla-causedeath").append("<span class='col-xs-12 col-sm-12 col-md-12'>-</span>");
	}

	//PRODUCCION
	$("#ser-production").append(getTag(lang, 'info_prod'));
	$("#ser-tabla-actores-celda").append(getTag(lang, 'episod-creat'));
	if (doc.creadores.length > 0){
		jQuery.each( doc.creadores, function( i, val ) {
			if (doc.creadores[i] != '-'){
				$("#ser-tabla-actores").append("<span class='col-xs-12 col-sm-12 col-md-12'><a id='creadores"+i+"'>"+doc.creadores[i]+"</a></span>");
				$("#creadores"+i).unbind("click");
				$("#creadores"+i).click(function() {
					showTablaII(doc.creadores[i], lang);
				});
			}else{
				$("#ser-tabla-actores").append("<span class='col-xs-12 col-sm-12 col-md-12'>-</span>");
			}
		});
	}else{
		$("#ser-tabla-actores").append("<span class='col-xs-12 col-sm-12 col-md-12'>-</span>");
	}
	$("#ser-tabla-productora-celda").append(getTag(lang, 'episod-gui'));
	if (doc.escritores.length > 0){
		jQuery.each( doc.escritores, function( i, val ) {
			if ((doc.escritores[i] != '-')||(doc.escritores[i] == '')){
				$("#ser-tabla-productora").append("<span class='col-xs-12 col-sm-12 col-md-12'><a id='escritores"+i+"'>"+doc.escritores[i]+"</a></span>");
				$("#escritores"+i).unbind("click");
				$("#escritores"+i).click(function() {
					showTablaII(doc.escritores[i], lang);
				});
			}else{
				$("#ser-tabla-productora").append("<span class='col-xs-12 col-sm-12 col-md-12'>-</span>");
			}
		});
	}else{
		$("#ser-tabla-productora").append("<span class='col-xs-12 col-sm-12 col-md-12'>-</span>");
	}

	//EPISODIOS
	$("#ser-episodes").append(getTag(lang, 'episod'));
	$("#ser-episodes-msg").append(getTag(lang, 'episod-mssg'));
	$("#ser-tabla-productores-celda").append(getTag(lang, 'episod_temp'));
	$("#ser-tabla-productores").append(doc.episodio_temporadas);
	$("#ser-tabla-age-celda").append(getTag(lang, 'episod_cant'));
	$("#ser-tabla-age").append(doc.episodio_cantidad);
	$("#ser-tabla-generos-celda").append(getTag(lang, 'episod_dur'));
	$("#ser-tabla-generos").append(doc.episodio_duracion);
	var items_episodio_primero = doc.episodio_primero.split("-",3);
	var episodio_primero = parseFecha(items_episodio_primero, lang);
	if (doc.episodio_ultimo != '-'){
		var items_episodio_ultimo = doc.episodio_ultimo.split("-",3);
		var episodio_ultimo = parseFecha(items_episodio_ultimo, lang);
	}else{
		var episodio_ultimo = getTag(lang, 'actual');
	}
	$("#ser-tabla-episod-celda").append(getTag(lang, 'orig_run'));
	$("#ser-tabla-episod").append(episodio_primero+' - '+episodio_ultimo);

	$("#ser-episodes-list").append("<h2 id='ser-episodes-list-tit'>"+getTag(lang, 'episod-list')+"</h2>");
	if (doc.episodio_cantidad < 700){
		if ((doc.episodio_cantidad > 0)&&(doc.episodios.length > 0)){
			$("#ser-episodes-list").append('<p class="col-xs-12 col-sm-12 col-md-12 campo" id="ser-episodes-list-titles"></p>');
			for(var i=1; i < doc.episodios.length; i ++) {
				$("#ser-episodes-list-titles").append('<span class="col-xs-12 col-sm-12 col-md-12"><h4 class="temp-link" id="h-temp'+i+'">'+getTag(lang, 'temp')+' '+i+' <i id="fa-d'+i+'" class="fa fa-chevron-down fa-style"></i><i id="fa-u'+i+'" class="fa fa-chevron-up fa-style fa-style-up"></i></h4></span>');
				$("#ser-episodes-list-titles").append('<p class="col-xs-12 col-sm-12 col-md-12 p-episode" id="p-temp'+i+'"></p>');
				if(doc.episodios[i] != undefined){
					for(var j=0; j < doc.episodios[i].length; j++) {
						var num = j;num++;
						$("#p-temp"+i).append('<span class="col-xs-12 col-sm-12 col-md-12" id="span-temp'+i+'"></span>');
						$("#span-temp"+i).append('<span class="col-xs-2 col-sm-offset-1 col-sm-1 col-md-offset-1 col-md-1 span-episode-num text-right">Ep '+num+'</span><p class="col-xs-10 col-sm-10 col-md-10 episode">'+doc.episodios[i][j][0]+'</p>');
						if (doc.episodios[i][j][1] != undefined){
							var items_airdate = doc.episodios[i][j][1].value.split("-",3);
							var airdate = parseFecha(items_airdate, lang);
							$("#span-temp"+i).append('<span class="col-xs-offset-2 col-xs-10 col-sm-offset-2 col-sm-10 col-md-offset-2 col-md-10 campo span-episode">'+airdate+'</span>');
						}else{
							$("#span-temp"+i).append('<span class="col-xs-offset-2 col-xs-10 col-sm-offset-2 col-sm-10 col-md-offset-2 col-md-10 campo span-episode"></span>');
						}
					}
				}
			}
			if ((doc.episodios[0] != null)&&(doc.episodios[0].length > 0)){
				$("#ser-episodes-list-titles").append('<span class="col-xs-12 col-sm-12 col-md-12"><h4 class="temp-link" id="h-temp0">'+getTag(lang, 'temp_esp')+'  <i id="fa-d0" class="fa fa-chevron-down fa-style"></i><i id="fa-u0" class="fa fa-chevron-up fa-style fa-style-up"></i></h4></span>');
				$("#ser-episodes-list-titles").append('<p class="col-xs-12 col-sm-12 col-md-12 p-episode" id="p-temp0"></p>');
				for(var j=0; j < doc.episodios[0].length; j++) {
					var num = j;num++;
					$("#p-temp0").append('<span class="col-xs-12 col-sm-12 col-md-12" id="span-temp0"></span>');
					$("#span-temp0").append('<span class="col-xs-2 col-sm-offset-1 col-sm-1 col-md-offset-1 col-md-1 span-episode-num">Ep '+num+'</span><p class="col-xs-10 col-sm-10 col-md-10 episode">'+doc.episodios[0][j][0]+'</p>');
					if (doc.episodios[0][j][1] != undefined){
						var items_airdate = doc.episodios[0][j][1].value.split("-",3);
						var airdate = parseFecha(items_airdate, lang);
						$("#span-temp0").append('<span class="col-xs-offset-2 col-xs-10 col-sm-offset-2 col-sm-10 col-md-offset-2 col-md-10 campo span-episode">'+airdate+'</span>');
					}else{
						$("#span-temp0").append('<span class="col-xs-offset-2 col-xs-10 col-sm-offset-2 col-sm-10 col-md-offset-2 col-md-10 campo span-episode"></span>');
					}
				}
			}
		}else{
			$("#ser-episodes-list").append("<span class='col-xs-12 col-sm-12 col-md-12 lista-char no-padd-left'>"+getTag(lang, 'episod-mssg-err')+"</span>");
		}
	}else{
		$("#ser-episodes-list").append("<span class='col-xs-12 col-sm-12 col-md-12 lista-char no-padd-left'>"+getTag(lang, 'episod-mssg-err')+"</span>");
	}

	$(".temp-link").click(function() {
		var id = $(this).attr("id");
		if (id.length == 7)	id = id.substr(id.length - 1);
		else id = id.substr(id.length - 2);
		$("#p-temp"+id).slideToggle();
		$("#fa-d"+id).slideToggle(1);
		$("#fa-u"+id).slideToggle(1);
	});		
	
	//PREMIOS
	$("#ser-premios").append(getTag(lang, 'premios'));
	$("#ser-tabla-recaudacion-celda").append(getTag(lang, 'pre'));
	jQuery.each( doc.premios, function( i, val ) {
		if (doc.premios[i][0] != '-'){
			if (doc.premios[i][1] != undefined){
				if (doc.premios[i][2] != undefined){
					$("#ser-tabla-recaudacion").append("<span class='col-xs-12 col-sm-12 col-md-12 lista'>"+doc.premios[i][2]+' - '+doc.premios[i][0]+"</span>");
				}else{
					$("#ser-tabla-recaudacion").append("<span class='col-xs-12 col-sm-12 col-md-12 lista'>"+doc.premios[i][0]+"</span>");
				}
				$("#ser-tabla-recaudacion").append("<span id='premios"+i+"' class='col-xs-12 col-sm-12 col-md-12'></span>");
				processAwards(doc.premios[i][1], 'premios'+i, lang);
			}else{
				$("#ser-tabla-recaudacion").append("<span class='col-xs-12 col-sm-12 col-md-12 lista'>"+doc.premios[i][0]+"</span><span class='col-xs-12 col-sm-12 col-md-12'></span>");
			}
		}else{
			$("#ser-tabla-recaudacion").append("<span class='col-xs-12 col-sm-12 col-md-12 lista'>-</span>");
		}
	});
	$("#ser-tabla-desc-celda").append(getTag(lang, 'pre-nom'));
	jQuery.each( doc.premios_nom, function( i, val ) {
		if (doc.premios_nom[i][0] != '-'){
			if (doc.premios_nom[i][1] != undefined){
				if (doc.premios_nom[i][2] != undefined){
					$("#ser-tabla-desc").append("<span class='col-xs-12 col-sm-12 col-md-12 lista'>"+doc.premios_nom[i][2]+' - '+doc.premios_nom[i][0]+"</span>");
				}else{
					$("#ser-tabla-desc").append("<span class='col-xs-12 col-sm-12 col-md-12 lista'>"+doc.premios_nom[i][0]+"</span>");
				}
				$("#ser-tabla-desc").append("<span id='premios_nom"+i+"' class='col-xs-12 col-sm-12 col-md-12'></span>");
				processAwards(doc.premios_nom[i][1], 'premios_nom'+i, lang);
			}else{
				$("#ser-tabla-desc").append("<span class='col-xs-12 col-sm-12 col-md-12 lista'>"+doc.premios_nom[i][0]+"</span><span class='col-xs-12 col-sm-12 col-md-12'></span>");
			}
		}else{
			$("#ser-tabla-desc").append("<span class='col-xs-12 col-sm-12 col-md-12 lista'>-</span>");
		}
	});

	//WEB
	/*$("#ser-website").append(getTag(lang, 'webmenu'));
	$("#ser-tabla-premios-celda").append(getTag(lang, 'web'));
	if (doc.web != '-'){
		//$("#ser-tabla-premios").append("<span class='col-xs-12 col-sm-12 col-md-12'><a href='"+doc.web+"' >"+doc.web+"</a></span>");
		$("#ser-tabla-premios").append("<span class='col-xs-12 col-sm-12 col-md-12'><a id='ser-tabla-premios-web'>"+doc.web+"</a></span>");
		$("#ser-tabla-premios-web").unbind("click");
		$("#ser-tabla-premios-web").click(function() {
			var r = confirm(getTag(lang, 'leaving'));
			if (r == true) {
				navigator.app.loadUrl(doc.web, {openExternal: true});
			}
		});
	}else{
		$("#ser-tabla-premios").append("<span class='col-xs-12 col-sm-12 col-md-12'>-</span>");
	}*/
	
	//CAMBIAR IDIOMA
	if ((doc.mid != undefined) && (doc.mid != '-')){
		$("#ser-buscar-imdb").empty();
		$("#ser-buscar-imdb").unbind("click");
		$("#ser-buscar-imdb").css('display','initial');
		$("#ser-buscar-imdb").append('- '+getTag(lang, 'mostrar-otro-idi'));
		$("#ser-buscar-imdb").click(function() {
			if (lang=='en')
				addRecord(doc.mid, 'es');
			else
				addRecord(doc.mid, 'en');
		});		
	}
	
	//MENU LATERAL
	$("#opt_menu_home").click(function() {
		slide_menu();
		$("#showSerie").click();			
	});
	$("#navmenu").empty();
	$("#navmenu").append('<a class="link_menu link_menu_title" onclick="slide_menu();$(\'#showSerie\').click();" href="#abMainCtrl">'+doc.title+'</a>');
	$("#navmenu").append('<a class="link_menu" onclick="slide_menu();$(\'#showSerie\').click();" href="#ser-general_info">'+getTag(lang, 'gen-inf')+'</a>');
	$("#navmenu").append('<a class="link_menu" onclick="slide_menu();$(\'#showSerie\').click();" href="#ser-tabla-lanzamiento-celda">'+getTag(lang, 'plotdesc')+'</a>');
	$("#navmenu").append('<a class="link_menu" onclick="slide_menu();$(\'#showSerie\').click();" href="#ser-tabla-causedeath-celda">'+getTag(lang, 'act')+'</a>');
	$("#navmenu").append('<a class="link_menu" onclick="slide_menu();$(\'#showSerie\').click();" href="#ser-production">'+getTag(lang, 'info_prod')+'</a>');
	$("#navmenu").append('<a class="link_menu_h4" onclick="slide_menu();$(\'#showSerie\').click();" href="#ser-tabla-actores-celda">'+getTag(lang, 'episod-creat')+'</a>');
	$("#navmenu").append('<a class="link_menu_h4" onclick="slide_menu();$(\'#showSerie\').click();" href="#ser-tabla-productora-celda">'+getTag(lang, 'episod-gui')+'</a>');
	$("#navmenu").append('<a class="link_menu" onclick="slide_menu();$(\'#showSerie\').click();" href="#ser-episodes">'+getTag(lang, 'episod')+'</a>');
	$("#navmenu").append('<a class="link_menu" onclick="slide_menu();$(\'#showSerie\').click();" href="#ser-episodes-list-tit">'+getTag(lang, 'episod-list')+'</a>');
	$("#navmenu").append('<a class="link_menu" onclick="slide_menu();$(\'#showSerie\').click();" href="#ser-premios">'+getTag(lang, 'premios')+'</a>');
	$("#navmenu").append('<a class="link_menu_h4" onclick="slide_menu();$(\'#showSerie\').click();" href="#ser-tabla-recaudacion-celda">'+getTag(lang, 'pre')+'</a>');
	$("#navmenu").append('<a class="link_menu_h4" onclick="slide_menu();$(\'#showSerie\').click();" href="#ser-tabla-desc-celda">'+getTag(lang, 'pre-nom')+'</a>');

}


////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//Cargar tablas LISTA
///////////////////////////////////
function cargarTablaListaInternal(response, texto, lang){
	$("#showLista").click();	
	$("#tblDataLista").children().children().empty();
	$("#navmenu").empty();
	//LISTA VACIA
	if (response.rows.length == 0){
		searchPorNombre(texto, lang);	
	}else{
		$("#resultados_titulo").append(getTag(lang, 'resultados_offline'));	
		jQuery.each( response.rows, function( i, val ) {
			var items = val.id.split("-",4);
			if (items[2] != '_' && items[2] != undefined){
				var titulo = items[1].replace(/_/g, " ");
				var details = '';
				if (items[3] == 'movie'){
					if (lang=='en') details = items[2] + ' ' + getTag(lang, 'movie');
					else details = getTag(lang, 'movie') + ' ' + items[2];
				}else{
					if (items[3] == 'serie'){
						if (lang=='en') details = items[2] + ' ' + getTag(lang, 'serie');
						else details = getTag(lang, 'serie') + ' ' + items[2];
					}else{
						if (lang=='en') details = getTag(lang, 'born') + ' ' + items[2];			
						else details = getTag(lang, 'born') + ' ' + items[2];			
					}
				}
				$("#resultados_lista").append("<span class='col-xs-12 col-sm-12 col-md-12 lista episode'><a id='resultados_lista"+i+"'>"+titulo+"</a></span><span class='col-xs-12 col-sm-12 col-md-12'>"+details+"</span>");
				
				//CLICK
				$("#resultados_lista"+i).unbind("click");
				$("#resultados_lista"+i).click(function() {
					showFilm(val.id, lang);
				});
			}
		});

		//CAMBIAR IDIOMA
		$("#list-buscar-imdb").empty();
		$("#list-buscar-imdb").unbind("click");
		$("#list-buscar-imdb").css('display','initial');
		$("#list-buscar-imdb").append('- '+getTag(lang, 'search'));
		$("#list-buscar-imdb").click(function() {
			searchPorNombre(texto, lang);
		});

	}
		
	
}

function cargarTablaListaExternal(response, lang, titulo){
	$("#showLista").click();	
	$("#tblDataLista").children().children().empty();
	$("#navmenu").empty();
	$("#resultados_titulo").append(getTag(lang, 'resultados'));	
	jQuery.each( response, function( i, val ) {
		if ((val.name != '') && (!estaProhibido(val))){
			if ((val.notable != undefined)&&(val.notable.name != '')){
				var note = (val.notable.name == 'Actor') ? getTag(lang, 'actriz') : val.notable.name;
				$("#resultados_lista").append("<span class='col-xs-12 col-sm-12 col-md-12 lista episode'><a id='resultados_lista"+i+"'>"+val.name+"</a></span><span class='col-xs-12 col-sm-12 col-md-12'>"+note+"</span>");
			}else
				$("#resultados_lista").append("<span class='col-xs-12 col-sm-12 col-md-12 lista episode'><a id='resultados_lista"+i+"'>"+val.name+"</a></span>");
			
			//CLICK
			$("#resultados_lista"+i).unbind("click");
			$("#resultados_lista"+i).click(function() {
				guardarHistory(titulo, 'search');
				addRecord(val.mid, lang);
			});
		}	
	});

	//CAMBIAR IDIOMA
	$("#list-buscar-imdb").css('display','none');	
}


////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//Cargar tablas HISTORY
///////////////////////////////////
function cargarTablaHistory(response, lang){
	$('#showHistory').click();
	$("#resultados_history").children().children().empty();
	jQuery.each( response, function( i, val ) {
		if (val[1] == 'show'){
			var num = i + 1;
			var items = val[0].split("-",4);
			var titulo = items[1].replace(/_/g, " ");
			var details = '';
			var otro_idioma = '';
			if (items[3] == 'movie'){
				if (lang=='en') details = items[2] + ' ' + getTag(lang, 'movie');
				else details = getTag(lang, 'movie') + ' ' + items[2];
			}else{
				if (items[3] == 'serie'){
					if (lang=='en') details = items[2] + ' ' + getTag(lang, 'serie');
					else details = getTag(lang, 'serie') + ' ' + items[2];
				}else{
					if (lang=='en') details = getTag(lang, 'born') + ' ' + items[2];			
					else details = getTag(lang, 'born') + ' ' + items[2];			
				}
			}
			if (items[0] != lang){
				otro_idioma = getTag(lang, 'otro_idioma');
			}
			
			$("#resultados_history").append('<span class="col-xs-2 col-sm-offset-1 col-sm-1 col-md-offset-1 col-md-1 span-episode-num text-right">'+num+' - </span>');
			$("#resultados_history").append("<span class='col-xs-10 col-sm-10 col-md-10 campo episode'>"+otro_idioma+"<a id='resultados_history"+i+"'>"+titulo+"</a></span>");
			$("#resultados_history").append("<span class='col-xs-offset-2 col-xs-10 col-sm-offset-2 col-sm-10 col-md-offset-2 col-md-10 campo span-episode'>"+details+"</span>");
			
			//CLICK
			$("#resultados_history"+i).unbind("click");
			$("#resultados_history"+i).click(function() {
				showFilm(val[0], lang);
			});
		}else{
			var num = i + 1;
			var titulo = val[0];
			var busqueda_tag = getTag(lang, 'busqueda_tag');
			$("#resultados_history").append('<span class="col-xs-2 col-sm-offset-1 col-sm-1 col-md-offset-1 col-md-1 span-episode-num text-right">'+num+' - </span>');
			$("#resultados_history").append('<p class="col-xs-10 col-sm-10 col-md-10 campo episode"><a id="resultados_search_history'+i+'">'+titulo+'</a></p>');
			$("#resultados_history").append('<span class="col-xs-offset-2 col-xs-10 col-sm-offset-2 col-sm-10 col-md-offset-2 col-md-10 campo span-episode">- '+busqueda_tag+'</span>');

			//CLICK
			$("#resultados_search_history"+i).unbind("click");
			$("#resultados_search_history"+i).click(function() {
				showTablaII(titulo, lang);
			});
		}
	});
	
	

}