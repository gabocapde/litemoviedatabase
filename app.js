////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//Inicializar las BDs con y sin replicación
///////////////////////////////////////////
var uuid;
var registros = [];
var go_back = [];
var requestSent = false;
var mostrarImagen = 0;
var syncData = 1;
var lang = 'en';
var dbSin = new PouchDB('filmsSin');
var dbCon = new PouchDB('filmsCon');
var replication = PouchDB.sync('filmsCon', 'https://litemoviedatabase.smileupps.com/filmsdatabase', {live: true})
	.on('complete', function (info) {
		console.log(info);
	})
	.on('error', function (err) {
		console.log(err);
	});


function init() {
	dbSin.get('config', function(err, doc) {
		if (doc == undefined){
			uuid = guid();
			dbSin.put({_id: 'config',language: 'en',mostrarImagen: 0,syncData:1,uuid: uuid}, function callback(err, result) {});		
			$("[ng-controller='abMainCtrl']").scope().language = 'en';			
			$("[ng-controller='abMainCtrl']").scope().mostrarImagen = 0;
			$("[ng-controller='abMainCtrl']").scope().syncData = 1;
			changeTagsHTML('en');
			init_load();
			//init_replication();
		}else{
			uuid = doc.uuid;
			lang = doc.language;
			mostrarImagen = doc.mostrarImagen;
			syncData = doc.syncData;
			$("[ng-controller='abMainCtrl']").scope().language = doc.language;	
			$("[ng-controller='abMainCtrl']").scope().mostrarImagen = doc.mostrarImagen;
			$("[ng-controller='abMainCtrl']").scope().syncData = doc.syncData;
						
			changeTagsHTML(doc.language);
			init_load();
			init_replication();
		}
	});
	dbSin.get('logs', function(err, doc) {
		if (doc == undefined){
			dbSin.put({_id: 'logs',log: []}, function callback(err, result) {});		
		}
	});
	dbSin.get('history', function(err, doc) {
		if (doc == undefined){
			dbSin.put({_id: 'history',hist: []}, function callback(err, result) {});		
		}
	});
	$("body").scrollTop(0);
	document.getElementById("input_search").addEventListener("input", function() {showTabla();slideOut_menu();});		
	document.getElementById("input_search").addEventListener("blur", function() {slideOut_menu();});		
}

function init_load(){
	dbCon.allDocs({startkey: lang, endkey: lang+'z'}, function(err, response) {
		if (response.rows.length > 0){
			var random = ~~(Math.random() * response.rows.length);
			var random_id = response.rows[random].id;
			$('.random').empty();
			$('.random').append(getTag(lang, 'random'));
			showFilm(random_id, lang);
		}else{
			$('#tabla-nothing').empty();
			$("#tabla-nothing").append(getTag(lang, 'nothing'));
			$("#tabla-nothing2").append(getTag(lang, 'nothing2'));
			$('#noth-tabla-poster').attr("src", 'images/Chaplin_The_Kid_1.jpg');
			$("#showNothing").click();	
			$("#opt_menu_home").click(function() {
				slide_menu();
				$("#showNothing").click();			
			});
		}
	});
}
	
function init_replication() {
	//var networkState = navigator.connection.type;
	if ((syncData == 0)||(syncData == 1)){
		replication = PouchDB.sync('filmsCon', 'https://litemoviedatabase.smileupps.com/filmsdatabase', {live: true})
			.on('complete', function (info) {
				console.log(info);
			})
			.on('error', function (err) {
				console.log(err);
			});
	}else{
		replication.cancel(); 
	}
}

	
	
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//Mostrar Films por nombre o Random
///////////////////////////////////
var ultima_busq = '';
function showTabla() {
	var texto = $("[ng-controller='abMainCtrl']").scope().texto;
	if (texto.length > 0 && texto != undefined){
		var myVar = setTimeout(function(){
			var new_texto = $("[ng-controller='abMainCtrl']").scope().texto;
			if ((new_texto == texto)&&(ultima_busq != texto)) {
				ultima_busq = texto;
				showTablaII(texto, lang);
			}
			clearTimeout(myVar);
		},500);
	}
}

function showTablaII(texto, lang) {
	go_back = [];
	$('.random').empty();
	$("body").scrollTop(0);
	id_titulo = texto.replace(/[ -]/g, "_").toLowerCase();
	dbCon.allDocs({startkey: lang+'-'+id_titulo, endkey: lang+'-'+id_titulo+'z'}, function(err, response) { 
		//Verifico error de BD
		if (err) {
			console.log('Error dbCon: '+err);
		}		
		if (response.rows.length > -1){
			cargarTablaListaInternal(response, texto, lang); 
		}
	});
}


////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//Buscar por nombre si no se encuentra en la BD
////////////////////////////////////////////////
function searchPorNombre(titulo, lang) {
	if(!requestSent) {
		requestSent = true;
		$('#showCarga').click();		
		$("body").scrollTop(0);
		$.ajax({
		    url: "https://www.googleapis.com/freebase/v1/search?query="+titulo+"&lang="+lang+"&filter=(any type:/film/film type:/tv/tv_program type:/film/actor type:/film/director type:/film/producer type:/film/writer type:/tv/tv_actor type:/tv/tv_program_creator type:/tv/tv_writer type:/tv/tv_producer)&domain=/film&domain=/tv&limit=15&key=AIzaSyCzWaoBj5IfV7lRykIIh3PGbaG9k2supQQ",
		    dataType: "json",
		    crossDomain: true,
		    success: function(data) {
				if (data.result.length == 0){
					$('#tabla-nothing').empty();
					$("#tabla-nothing").append(getTag(lang, 'no_matches'));
					$('#noth-tabla-poster').attr("src", 'images/Chaplin_The_Kid_3.jpg');
					$("#showNothing").click();	
				}else{
					cargarTablaListaExternal(data.result, lang, titulo);
				}
		    },
			error: function (err) {
				$('#tabla-nothing').empty();
				$("#tabla-nothing").append(getTag(lang, 'conn_problem'));
				$('#noth-tabla-poster').attr("src", 'images/Chaplin_The_Kid_2.jpg');
				$("#showNothing").click();	
			},
			complete: function() {
				requestSent = false;
			}
		});
	}
}


////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//Agregar Films/Actores por nombre a la BD
//////////////////////////////////////////
function addRecord(codigo, lang) {
	if(!requestSent) {
		requestSent = true;
		$('#showCarga').click();		
		$.ajax({
		    url: "https://www.googleapis.com/freebase/v1/topic"+codigo+"?limit=60&lang="+lang+"&key=AIzaSyCzWaoBj5IfV7lRykIIh3PGbaG9k2supQQ",
			dataType: "json",
			crossDomain: true,
			success: function(data) {
				//console.log(data);
				if (data.error != undefined){
					alert(data.error.message);
				}else{
					if (isFilm(data.property['/type/object/type']))
						addFilmPorNombre(data, lang);
					else
						if (isSerie(data.property['/type/object/type']))
							addSeriePorNombre(data, lang);
						else
							addActorPorNombre(data, lang);
				}
			},
			error: function (err) {
				$('#tabla-nothing').empty();
				$("#tabla-nothing").append(getTag(lang, 'conn_problem'));
				$('#noth-tabla-poster').attr("src", 'images/Chaplin_The_Kid_2.jpg');
				$("#showNothing").click();	
			},
			complete: function() {
				requestSent = false;
			}
		});  
	}
}

function addFilmPorNombre(data, lang) {
	var titulo = ((data.property['/type/object/name'] != undefined)&&(data.property['/type/object/name'].values.length > 0)) ? data.property['/type/object/name'].values[0].value : '-';
	var anio = ((data.property['/film/film/initial_release_date'] != undefined)&&(data.property['/film/film/initial_release_date'].values.length > 0)) ? data.property['/film/film/initial_release_date'].values[0].value.substring(0, 4) : '_';
	var imdb = '';
	var plot = '';
	$.ajax({
	    url: 'http://www.omdbapi.com/?t='+titulo+'&y='+anio+'&plot=short&r=json',
		dataType: "json",
		crossDomain: true,
		success: function(dataEpisodes) {
			imdb = dataEpisodes.imdbRating;
			plot = dataEpisodes.Plot;
		},
		error: function (err) {
				$('#tabla-nothing').empty();
				$("#tabla-nothing").append(getTag(lang, 'conn_problem'));
				$('#noth-tabla-poster').attr("src", 'images/Chaplin_The_Kid_2.jpg');
				$("#showNothing").click();	
			},
		complete: function() {
			var film = createFilm(data, lang, imdb, plot);
			dbCon.get(film._id, function(err, otherDoc) {
				if (err) {
					console.log('Error dbCon: '+err);
				}	
				//No pregunto si se encuentra porque ya pregunté antes.
				if (otherDoc == undefined){
					dbCon.put(film, function callback(err, result) {
						//Verifico error de escritura
						if (err) {
							console.log('Error dbCon: '+err);
						}
					}).then(function() {showFilm(film._id, lang);});
				}else{
					dbCon.put(film, film, otherDoc._rev, function(err, response) {
						//Verifico error de escritura
						if (err) {
							console.log('Error dbCon: '+err);
						}
					}).then(function() {showFilm(film._id, lang);});
				}
			});
		}
	});  	
}

function addActorPorNombre(data, lang) {
	var nombre = data.property['/type/object/name'].values[0].value;
	$.when( 
		$.ajax({
		    url: 'https://www.googleapis.com/freebase/v1/mqlread?query=[{"type":"/film/film","name":null,"initial_release_date":null,"starring": [{"actor": "'+nombre+'","character":null}],"sort":"initial_release_date","limit":300}]&key=AIzaSyCzWaoBj5IfV7lRykIIh3PGbaG9k2supQQ',
			dataType: "json",
			crossDomain: true
		}),
		$.ajax({
		    url: 'https://www.googleapis.com/freebase/v1/mqlread?query=[{"type":"/tv/tv_program","name":null,"air_date_of_first_episode":null,"regular_cast": [{"actor": "'+nombre+'","character":null,"from":null,"to":null}],"sort":"air_date_of_first_episode","limit":300}]&key=AIzaSyCzWaoBj5IfV7lRykIIh3PGbaG9k2supQQ',
			dataType: "json",
			crossDomain: true
		})).then(function( film_performances, tv_performances ){
			var actor = createActor(data, film_performances[0].result, tv_performances[0].result, lang);
			dbCon.get(actor._id, function(err, otherDoc) {
				if (err) {
					console.log('Error dbCon: '+err);
				}		
				//No pregunto si se encuentra porque ya pregunté antes.
				if (otherDoc == undefined){
					dbCon.put(actor, function callback(err, result) {
						//Verifico error de escritura
						if (err) {
							console.log('Error dbCon: '+err);
						}
					}).then(function() {showFilm(actor._id, lang);});
				}else{
					dbCon.put(actor, actor, otherDoc._rev, function(err, response) {
						//Verifico error de escritura
						if (err) {
							console.log('Error dbCon: '+err);
						}
					}).then(function() {showFilm(actor._id, lang);});
				}
			});
		},function (err) {
				$('#tabla-nothing').empty();
				$("#tabla-nothing").append(getTag(lang, 'conn_problem'));
				$('#noth-tabla-poster').attr("src", 'images/Chaplin_The_Kid_2.jpg');
				$("#showNothing").click();	
		});
}

function addSeriePorNombre(data, lang) {
	var titulo = ((data.property['/type/object/name'] != undefined) && (data.property['/type/object/name'].values.length > 0)) ? data.property['/type/object/name'].values[0].value : '-';
	var anio = ((data.property['/tv/tv_program/air_date_of_first_episode'] != undefined) && (data.property['/tv/tv_program/air_date_of_first_episode'].values.length > 0)) ? data.property['/tv/tv_program/air_date_of_first_episode'].values[0].value.substr(0, 4) : '-';
	var cant = ((data.property['/tv/tv_program/number_of_episodes'] != undefined)&&(data.property['/tv/tv_program/number_of_episodes'].values[0].value > 700)) ? '50' : '700';
	$.when( 
		$.ajax({
		    url: 'https://www.googleapis.com/freebase/v1/mqlread?query=[{"type":"/tv/tv_series_episode","name":null,"episode_number":null,"season_number":null,"air_date":{"value":null,"optional":false},"series":{"id":"'+data.id+'"},"limit":'+cant+',"sort":["season_number","episode_number"]}]&key=AIzaSyCzWaoBj5IfV7lRykIIh3PGbaG9k2supQQ',
			dataType: "json",
			crossDomain: true,
		}),
		$.ajax({
	    	url: 'http://www.omdbapi.com/?t='+titulo+'&y='+anio+'&type=series&r=json',
			dataType: "json",
			crossDomain: true
		})).then(function( dataEpisodes, omdb ){
			var serie = createSerie(data, dataEpisodes[0], lang, omdb[0].imdbRating, omdb[0].Plot);
			dbCon.get(serie._id, function(err, otherDoc) {
				if (err) {
					console.log('Error dbCon: '+err);
				}		
				//No pregunto si se encuentra porque ya pregunté antes.
				if (otherDoc == undefined){
					dbCon.put(serie, function callback(err, result) {
						//Verifico error de escritura
						if (err) {
							console.log('Error dbCon: '+err);
						}
					}).then(function() {showFilm(serie._id, lang);});
				}else{
					dbCon.put(serie, serie, otherDoc._rev, function(err, response) {
						//Verifico error de escritura
						if (err) {
							console.log('Error dbCon: '+err);
						}
					}).then(function() {showFilm(serie._id, lang);});
				}
			});
		},function (err) {
				$('#tabla-nothing').empty();
				$("#tabla-nothing").append(getTag(lang, 'conn_problem'));
				$('#noth-tabla-poster').attr("src", 'images/Chaplin_The_Kid_2.jpg');
				$("#showNothing").click();	
		});
}



////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//Show Film
///////////////////////////////////
function showFilm(id_titulo, lang) {
	//$("body").scrollTop($("#intro").offset().top - 5);
	$("body").scrollTop(0);
	$("#tblDataLista").children().children().empty();
	$('#showCarga').click();
	dbCon.get(id_titulo, function(err, doc) {
		if (err) {
			console.log('Error dbCon: '+err);
		}else{
			var items = doc._id.split("-",4);
			if (items[3] == 'movie'){
				cargarTablaPelicula(doc, lang);
			}else{
				if (items[3] == 'actor'){
					cargarTablaActor(doc, lang);
				}else{
					cargarTablaSerie(doc, lang);
				}
			}
			guardarHistory(doc._id, 'show');
		}
	}).then(function() {guardarRegistros(); });
}



////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//Show History
///////////////////////////////////
function showHistory() {
	$("body").scrollTop(0);
	$("#resultados_history").empty();	
	$("#title-history-err").empty();	
	var lang = $("[ng-controller='abMainCtrl']").scope().language;
	dbSin.get('history', function(err, doc) {
		if (err) {
			$("#title-history-err").append(getTag(lang, 'hist_err'));
		}else{
			$("#title-history-err").append(getTag(lang, 'hist_tit'));
			var show_hist = doc.hist.slice(0, 100);
			cargarTablaHistory(show_hist, lang);
			var history = {
				_id: 'history',
				hist: show_hist
			};	
			dbSin.put(history, history, doc._rev, function(err, response) {});
		}
	});
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//Go Back
///////////////////////////////////
function goBack() {
	$('.random').empty();
	if (go_back.length == 0){
		dbSin.get('history', function(err, doc) {
			if (!err) {
				go_back = doc.hist.slice(2, 100);
				var val = doc.hist[1];
				if (val[1] == 'show'){
					showFilm(val[0], lang);
				}else{
					searchPorNombre(val[0], lang);
				}				
			}
		});
	}else{
		var val = go_back.shift();
		if (val[1] == 'show'){
			showFilm(val[0], lang);
		}else{
			searchPorNombre(val[0], lang);
		}	
	}
}