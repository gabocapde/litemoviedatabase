////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//Crear film JSON	  
///////////////////////////
function createFilm(response, lang, imdb, plot) {
	var directors = []; var actors = []; var genres = []; var writers = []; var awards = []; var revenue = []; var country = [];
	var langs = []; var prod_comp = []; var prods = []; var exec_prods = []; var music = []; var rating = []; var awards_nom = [];
	
	if ((response.property['/film/film/directed_by'] != undefined)&&(response.property['/film/film/directed_by'].values.length > 0)){
		jQuery.each( response.property['/film/film/directed_by'].values, function( i, val ) {
			directors.push(val.text);
		});	
	}

	if ((response.property['/film/film/starring'] != undefined)&&(response.property['/film/film/starring'].values.length > 0)){
		jQuery.each( response.property['/film/film/starring'].values, function( i, val ) {
			var character = [];
			if ((val.property['/film/performance/actor'] != undefined)&&(val.property['/film/performance/actor'].values.length > 0)){
				character.push(val.property['/film/performance/actor'].values[0].text);
				if (val.property['/film/performance/character'] != undefined){
					if (val.property['/film/performance/character'].values[0] != undefined){
						character.push(val.property['/film/performance/character'].values[0].text);
					}
				}
			}
				actors.push(character);
		});	
	}

	if ((response.property['/film/film/genre'] != undefined)&&(response.property['/film/film/genre'].values.length > 0)){
		jQuery.each( response.property['/film/film/genre'].values, function( i, val ) {
			genres.push(val.text);
		});	
	}

	if ((response.property['/film/film/written_by'] != undefined)&&(response.property['/film/film/written_by'].values.length > 0)){
		jQuery.each( response.property['/film/film/written_by'].values, function( i, val ) {
			writers.push(val.text);
		});	
	}

	if ((response.property['/award/award_winning_work/awards_won'] != undefined)&&(response.property['/award/award_winning_work/awards_won'].values.length > 0)){
		jQuery.each( response.property['/award/award_winning_work/awards_won'].values, function( i, val ) {
			if ((val.property['/award/award_honor/award'] != undefined)&&(val.property['/award/award_honor/award'].values.length > 0)){
				var award = [];
				award.push(val.property['/award/award_honor/award'].values[0].text);
				if ((val.property['/award/award_honor/award_winner'] != undefined)&&(val.property['/award/award_honor/award_winner'].values.length > 0)){
					var film_award = '';
					jQuery.each( val.property['/award/award_honor/award_winner'].values, function( i2, val2 ) {
						if (i2 > 0) film_award = film_award + ', ';
						film_award = film_award + val2.text;
					});	
					award.push(film_award);
					if ((val.property['/award/award_honor/year'] != undefined)&&(val.property['/award/award_honor/year'].values.length > 0)){
						award.push(val.property['/award/award_honor/year'].values[0].text);
					}
				}
				awards.push(award);
			}
		});
	}
	
	if ((response.property['/award/award_nominated_work/award_nominations'] != undefined)&&(response.property['/award/award_nominated_work/award_nominations'].values.length > 0)){
		jQuery.each( response.property['/award/award_nominated_work/award_nominations'].values, function( i, val ) {
			if ((val.property['/award/award_nomination/award'] != undefined)&&(val.property['/award/award_nomination/award'].values.length > 0)){
				var award = [];
				award.push(val.property['/award/award_nomination/award'].values[0].text);
				if ((val.property['/award/award_nomination/award_nominee'] != undefined)&&(val.property['/award/award_nomination/award_nominee'].values.length > 0)){
					var film_award = '';
					jQuery.each( val.property['/award/award_nomination/award_nominee'].values, function( i2, val2 ) {
						if (i2 > 0) film_award = film_award + ', ';
						film_award = film_award + val2.text;
					});	
					award.push(film_award);
					if ((val.property['/award/award_nomination/year'] != undefined)&&(val.property['/award/award_nomination/year'].values.length > 0)){
						award.push(val.property['/award/award_nomination/year'].values[0].text);
					}
				}
				awards_nom.push(award);
			}
		});
	}
	
	if ((response.property['/film/film/gross_revenue'] != undefined)&&(response.property['/film/film/gross_revenue'].values.length > 0)){
		revenue.push(response.property['/film/film/gross_revenue'].values[0].property['/measurement_unit/dated_money_value/amount'].values[0].text);	
		revenue.push(response.property['/film/film/gross_revenue'].values[0].property['/measurement_unit/dated_money_value/currency'].values[0].text);
	}

	if ((response.property['/film/film/country'] != undefined)&&(response.property['/film/film/country'].values.length > 0)){
		jQuery.each( response.property['/film/film/country'].values, function( i, val ) {
			country.push(val.text);
		});	
	}

	if ((response.property['/film/film/language'] != undefined)&&(response.property['/film/film/language'].values.length > 0)){
		jQuery.each( response.property['/film/film/language'].values, function( i, val ) {
			var idioma = val.text.replace(" Language", "");
			idioma = idioma.replace("Idioma ", "");
			langs.push(idioma);
		});	
	}

	if ((response.property['/film/film/production_companies'] != undefined)&&(response.property['/film/film/production_companies'].values.length > 0)){
		jQuery.each( response.property['/film/film/production_companies'].values, function( i, val ) {
			prod_comp.push(val.text);
		});	
	}

	if ((response.property['/film/film/produced_by'] != undefined)&&(response.property['/film/film/produced_by'].values.length > 0)){
		jQuery.each( response.property['/film/film/produced_by'].values, function( i, val ) {
			prods.push(val.text);
		});	
	}

	if ((response.property['/film/film/executive_produced_by'] != undefined)&&(response.property['/film/film/executive_produced_by'].values.length > 0)){
		jQuery.each( response.property['/film/film/executive_produced_by'].values, function( i, val ) {
			exec_prods.push(val.text);
		});	
	}

	if ((response.property['/film/film/music'] != undefined)&&(response.property['/film/film/music'].values.length > 0)){
		jQuery.each( response.property['/film/film/music'].values, function( i, val ) {
			music.push(val.text);
		});	
	}

	if ((response.property['/film/film/rating'] != undefined)&&(response.property['/film/film/rating'].values.length > 0)){
		jQuery.each( response.property['/film/film/rating'].values, function( i, val ) {
			rating.push(val.text);
		});	
	}
	
	var titulo = ((response.property['/type/object/name'] != undefined)&&(response.property['/type/object/name'].values.length > 0)) ? response.property['/type/object/name'].values[0].value : '-';
	var mid = ((response.property['/type/object/mid'] != undefined)&&(response.property['/type/object/mid'].values.length > 0)) ? response.property['/type/object/mid'].values[0].value : '-';
	var anio = ((response.property['/film/film/initial_release_date'] != undefined)&&(response.property['/film/film/initial_release_date'].values.length > 0)) ? response.property['/film/film/initial_release_date'].values[0].value.substring(0, 4) : '_';
	var duracion = ((response.property['/film/film/runtime'] != undefined)&&(response.property['/film/film/runtime'].values.length > 0)) ? ((response.property['/film/film/runtime'].values[0] != undefined) ? response.property['/film/film/runtime'].values[0].property['/film/film_cut/runtime'].values[0].value + ' min' : '-') : '-';
	var precuela = ((response.property['/film/film/prequel'] != undefined) && (response.property['/film/film/prequel'].values.length > 0)) ? response.property['/film/film/prequel'].values[0].text : '-';
	var secuela = ((response.property['/film/film/sequel'] != undefined) && (response.property['/film/film/sequel'].values.length > 0)) ? response.property['/film/film/sequel'].values[0].text : '-';
	var argu = (lang == 'en')? plot : null;
	
	var film = {
		_id: lang + '-' + titulo.replace(/[ -]/g, "_").toLowerCase() + '-' + anio + '-movie',
		title: titulo,
		imdb: imdb,
		plot: argu,
		mid: mid,
		anio: anio,
		duracion: duracion,
		tagline: ((response.property['/film/film/tagline'] != undefined)&&(response.property['/film/film/tagline'].values[0] != undefined)) ? response.property['/film/film/tagline'].values[0].value : '-',
		directores: (directors.length > 0)? directors : '-',
		actores: (actors.length > 0)? actors : '-',
		productora: (prod_comp.length > 0)? prod_comp : '-',
		productores: (prods.length > 0)? prods : '-',
		exec_productores: (exec_prods.length > 0)? exec_prods : '-',
		guionistas: (writers.length > 0)? writers : '-',
		adapted_by: ((response.property['/media_common/adaptation/adapted_from'] != undefined)&&(response.property['/media_common/adaptation/adapted_from'].values[0] != undefined)) ? response.property['/media_common/adaptation/adapted_from'].values[0].text : '-',
		rating: (rating.length > 0)? rating : '-',
		pais: (country.length > 0)? country : '-',
		idioma: (langs.length > 0)? langs : '-',
		generos: (genres.length > 0)? genres : '-',
		lanzamiento: ((response.property['/film/film/initial_release_date'] != undefined)&&(response.property['/film/film/initial_release_date'].values[0] != undefined)) ? response.property['/film/film/initial_release_date'].values[0].value.substring(0, 10) : '-',
		recaudacion: (revenue.length > 0)? revenue : '-',
		precuela: precuela,
		secuela: secuela,
		descripcion: ((response.property['/common/topic/description'] != undefined)&&(response.property['/common/topic/description'].values[0] != undefined)) ? response.property['/common/topic/description'].values[0].value : '-',
		premios: (awards.length > 0)? awards : '-',
		premios_nom: (awards_nom.length > 0)? awards_nom : '-',
		trailer: ((response.property['/film/film/trailers'] != undefined)&&(response.property['/film/film/trailers'].values[0] != undefined)) ? response.property['/film/film/trailers'].values[0].value : '-',
		web: ((response.property['/common/topic/official_website'] != undefined)&&(response.property['/common/topic/official_website'].values[0] != undefined)) ? response.property['/common/topic/official_website'].values[0].text : '-',
		poster: ((response.property['/common/topic/image'] != undefined)&&(response.property['/common/topic/image'].values[0] != undefined)) ? response.property['/common/topic/image'].values[0].id : null
	};

	return film;
}


////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//Crear actor JSON	  
///////////////////////////
function createActor(response, film_performances, tv_performances, lang) {
	var notable = []; var education = []; var esposas = []; var hijos = []; var padres = [];
	var film_act = []; var tv_act = []; var film_dir = []; var film_prod = []; var film_exprod = [];
	var music = []; var org = []; var employ_hist = []; var aw_won = []; var aw_nom = [];
	var social = []; var death_cause = []; var writer = []; var film_app = [];
	var tv_creat = []; var tv_prod = []; var tv_writer = [];
	
	var nombre = ((response.property['/type/object/name'] != undefined)&&(response.property['/type/object/name'].values.length > 0)) ? response.property['/type/object/name'].values[0].value : '-';
	var mid = ((response.property['/type/object/mid'] != undefined)&&(response.property['/type/object/mid'].values.length > 0)) ? response.property['/type/object/mid'].values[0].value : '-';
	var birth = ((response.property['/people/person/date_of_birth'] != undefined) && (response.property['/people/person/date_of_birth'].values.length > 0)) ? response.property['/people/person/date_of_birth'].values[0].value : '_';
	var death = ((response.property['/people/deceased_person/date_of_death'] != undefined)&&(response.property['/people/deceased_person/date_of_death'].values.length > 0)) ? response.property['/people/deceased_person/date_of_death'].values[0].value : null;

	if ((response.property['/people/deceased_person/cause_of_death'] != undefined)&&(response.property['/people/deceased_person/cause_of_death'].values.length > 0)){
		jQuery.each( response.property['/people/deceased_person/cause_of_death'].values, function( i, val ) {
			death_cause.push(val.text);
		});	
	}

	if ((response.property['/people/person/profession'] != undefined)&&(response.property['/people/person/profession'].values.length > 0)){
		jQuery.each( response.property['/people/person/profession'].values, function( i, val ) {
			notable.push(val.text);
		});	
	}
	
	if ((response.property['/people/person/education'] != undefined)&&(response.property['/people/person/education'].values.length > 0)){
		jQuery.each( response.property['/people/person/education'].values, function( i, val ) {
			if ((val.property['/education/education/institution'] != undefined)&&(val.property['/education/education/institution'].values.length > 0)){
				var ed = val.property['/education/education/institution'].values[0].text;
				if (val.property['/education/education/major_field_of_study'] != undefined){
					if (val.property['/education/education/major_field_of_study'].values[0] != undefined){
						ed = ed + ' (' + val.property['/education/education/major_field_of_study'].values[0].text + ')';
					}
				}
			}
			education.push(ed);
		});	
	}
	
	if ((response.property['/people/person/spouse_s'] != undefined)&&(response.property['/people/person/spouse_s'].values.length > 0)){
		jQuery.each( response.property['/people/person/spouse_s'].values, function( i, val ) {
			var spouse = val.property['/people/marriage/spouse'].values[0].text;
			spouse = spouse + ' (' + val.property['/people/marriage/type_of_union'].values[0].text;
			if ((val.property['/people/marriage/from'] != undefined)&&(val.property['/people/marriage/from'].count > 0)){
				spouse = spouse + ': ';
				spouse = spouse + val.property['/people/marriage/from'].values[0].value.substring(0, 4);
				if (val.property['/people/marriage/to'] != undefined && val.property['/people/marriage/to'].status != 'has_no_value' && val.property['/people/marriage/to'].values.length > 0){
					spouse = spouse + ' - ' + val.property['/people/marriage/to'].values[0].value.substring(0, 4) + ')';
				}else{
					spouse = spouse + ')';
				}
			}else{
				spouse = spouse + ')';
			}
			esposas.push(spouse);
		});	
	}
	
	if ((response.property['/people/person/children'] != undefined)&&(response.property['/people/person/children'].values.length > 0)){
		jQuery.each( response.property['/people/person/children'].values, function( i, val ) {
			hijos.push(val.text);
		});	
	}
	
	if ((response.property['/people/person/parents'] != undefined)&&(response.property['/people/person/parents'].values.length > 0)){
		jQuery.each( response.property['/people/person/parents'].values, function( i, val ) {
			padres.push(val.text);
		});	
	}
	
	if (film_performances.length > 0){
		jQuery.each( film_performances, function( i, val ) {
			if ((val.initial_release_date != null)&&(val.initial_release_date.substr(0,4) > 1890)&&(val.initial_release_date.substr(0,4) < 2020)){
				var character = {
					year: val.initial_release_date.substr(0,4),
					movie: val.name,
					character: ((val.starring[0].character != null)&&(val.starring[0].character != undefined))? val.starring[0].character : '-'
				};	
				film_act.push(character);
			}
		});	
	}

	if (tv_performances.length > 0){
		jQuery.each( tv_performances, function( i, val ) {
			if ((val.air_date_of_first_episode != null)&&(val.air_date_of_first_episode.substr(0,4) > 1890)&&(val.air_date_of_first_episode.substr(0,4) < 2020)){
				var character = {
					year: val.air_date_of_first_episode.substr(0,4),
					serie: val.name,
					character: ((val.regular_cast[0].character != null)&&(val.regular_cast[0].character != undefined))? val.regular_cast[0].character : '-',
					from: ((val.regular_cast[0].from != null)&&(val.regular_cast[0].from != undefined))? val.regular_cast[0].from.substr(0,4) : '-',
					to: ((val.regular_cast[0].to != null)&&(val.regular_cast[0].to != undefined))? val.regular_cast[0].to.substr(0,4) : '-'
				};	
				tv_act.push(character);
			}
		});	
	}

	if ((response.property['/film/director/film'] != undefined)&&(response.property['/film/director/film'].values.length > 0)){
		jQuery.each( response.property['/film/director/film'].values, function( i, val ) {
			film_dir.push(val.text);
		});	
	}
	
	if ((response.property['/film/producer/film'] != undefined)&&(response.property['/film/producer/film'].values.length > 0)){
		jQuery.each( response.property['/film/producer/film'].values, function( i, val ) {
			film_prod.push(val.text);
		});	
	}
	
	if ((response.property['/film/producer/films_executive_produced'] != undefined)&&(response.property['/film/producer/films_executive_produced'].values.length > 0)){
		jQuery.each( response.property['/film/producer/films_executive_produced'].values, function( i, val ) {
			film_exprod.push(val.text);
		});	
	}
	
	if ((response.property['/film/writer/film'] != undefined)&&(response.property['/film/writer/film'].values.length > 0)){
		jQuery.each( response.property['/film/writer/film'].values, function( i, val ) {
			writer.push(val.text);
		});	
	}
	
	if ((response.property['/tv/tv_program_creator/programs_created'] != undefined)&&(response.property['/tv/tv_program_creator/programs_created'].values.length > 0)){
		jQuery.each( response.property['/tv/tv_program_creator/programs_created'].values, function( i, val ) {
			tv_creat.push(val.text);
		});	
	}
	
	if ((response.property['/tv/tv_producer/programs_produced'] != undefined)&&(response.property['/tv/tv_producer/programs_produced'].values.length > 0)){
		jQuery.each( response.property['/tv/tv_producer/programs_produced'].values, function( i, val ) {
			if ((val.property['/tv/tv_producer_term/program'] != undefined)&&(val.property['/tv/tv_producer_term/program'].values.length > 0)){
				tv_prod.push(val.property['/tv/tv_producer_term/program'].values[0].text);
			}
		});	
	}
		
	if ((response.property['/tv/tv_writer/tv_programs'] != undefined)&&(response.property['/tv/tv_writer/tv_programs'].values.length > 0)){
		jQuery.each( response.property['/tv/tv_writer/tv_programs'].values, function( i, val ) {
			if ((val.property['/tv/tv_program_writer_relationship/tv_program'] != undefined)&&(val.property['/tv/tv_program_writer_relationship/tv_program'].values.length > 0)){
				tv_writer.push(val.property['/tv/tv_program_writer_relationship/tv_program'].values[0].text);
			}
		});	
	}
	
	if ((response.property['/music/artist/track'] != undefined)&&(response.property['/music/artist/track'].values.length > 0)){
		jQuery.each( response.property['/music/artist/track'].values, function( i, val ) {
			music.push(val.text);
		});	
	}
	
	if ((response.property['/organization/organization_founder/organizations_founded'] != undefined)&&(response.property['/organization/organization_founder/organizations_founded'].values.length > 0)){
		jQuery.each( response.property['/organization/organization_founder/organizations_founded'].values, function( i, val ) {
			org.push(val.text);
		});	
	}
	
	if ((response.property['/people/person/employment_history'] != undefined)&&(response.property['/people/person/employment_history'].values.length > 0)){
		jQuery.each( response.property['/people/person/employment_history'].values, function( i, val ) {
			var employ = [];
			if ((val.property['/business/employment_tenure/company'] != undefined)&&(val.property['/business/employment_tenure/company'].values.length > 0)){
				employ.push(val.property['/business/employment_tenure/company'].values[0].text);
			}
			if ((val.property['/type/object/type'] != undefined)&&(val.property['/type/object/type'].values.length > 0)){
				employ.push(val.property['/type/object/type'].values[0].text);
			}
			employ_hist.push(employ);
		});	
	}

	if ((response.property['/award/award_winner/awards_won'] != undefined)&&(response.property['/award/award_winner/awards_won'].values.length > 0)){
		jQuery.each( response.property['/award/award_winner/awards_won'].values, function( i, val ) {
			if ((val.property['/award/award_honor/award'] != undefined)&&(val.property['/award/award_honor/award'].values.length > 0)){
				var award = [];
				award.push(val.property['/award/award_honor/award'].values[0].text);
				if ((val.property['/award/award_honor/honored_for'] != undefined)&&(val.property['/award/award_honor/honored_for'].values.length > 0)){
					var film_award = '';
					jQuery.each( val.property['/award/award_honor/honored_for'].values, function( i2, val2 ) {
						if (i2 > 0) film_award = film_award + ', ';
						film_award = film_award + val2.text;
					});	
					award.push(film_award);
					if ((val.property['/award/award_honor/year'] != undefined)&&(val.property['/award/award_honor/year'].values.length > 0)){
						award.push(val.property['/award/award_honor/year'].values[0].text);
					}
				}
				aw_won.push(award);
			}
		});	
	}

	if ((response.property['/award/award_nominee/award_nominations'] != undefined)&&(response.property['/award/award_nominee/award_nominations'].values.length > 0)){
		jQuery.each( response.property['/award/award_nominee/award_nominations'].values, function( i, val ) {
			if ((val.property['/award/award_nomination/award'] != undefined)&&(val.property['/award/award_nomination/award'].values.length > 0)){
				var award = [];
				award.push(val.property['/award/award_nomination/award'].values[0].text);
				if ((val.property['/award/award_nomination/nominated_for'] != undefined)&&(val.property['/award/award_nomination/nominated_for'].values.length > 0)){
					var film_award = '';
					jQuery.each( val.property['/award/award_nomination/nominated_for'].values, function( i2, val2 ) {
						if (i2 > 0) film_award = film_award + ', ';
						film_award = film_award + val2.text;
					});	
					award.push(film_award);
					if ((val.property['/award/award_nomination/year'] != undefined)&&(val.property['/award/award_nomination/year'].values.length > 0)){
						award.push(val.property['/award/award_nomination/year'].values[0].text);
					}
				}
				aw_nom.push(award);
			}
		});	
	}

	if ((response.property['/common/topic/social_media_presence'] != undefined)&&(response.property['/common/topic/social_media_presence'].values.length > 0)){
		jQuery.each( response.property['/common/topic/social_media_presence'].values, function( i, val ) {
			social.push(val.text);
		});	
	}
	
	var actor = {
		_id: lang + '-' + nombre.replace(/[ -]/g, "_").toLowerCase() + '-' + birth.substring(0, 4) + '-actor',
		name: nombre,
		mid: mid,
		profesion: (notable.length > 0)? notable : '-',
		nacimiento: (birth.length > 0)? birth : '-',
		muerte: death,
		causa_muerte: (death_cause.length > 0)? death_cause : '-',
		lugar_nacimiento: ((response.property['/people/person/place_of_birth'] != undefined) && (response.property['/people/person/place_of_birth'].values.length > 0)) ? response.property['/people/person/place_of_birth'].values[0].text : '-',
		lugar_muerte: ((response.property['/people/deceased_person/place_of_death'] != undefined) && (response.property['/people/deceased_person/place_of_death'].values.length > 0)) ? response.property['/people/deceased_person/place_of_death'].values[0].text : '-',
		altura: ((response.property['/people/person/height_meters'] != undefined)&&(response.property['/people/person/height_meters'].values.length > 0)) ? response.property['/people/person/height_meters'].values[0].value+' mts' : '-',
		pais: ((response.property['/people/person/nationality'] != undefined) && (response.property['/people/person/nationality'].values.length > 0)) ? response.property['/people/person/nationality'].values[0].text : '-',
		descripcion: ((response.property['/common/topic/description'] != undefined) && (response.property['/common/topic/description'].values.length > 0)) ? response.property['/common/topic/description'].values[0].value : '-',
		education: (education.length > 0)? education : '-',
		esposas: (esposas.length > 0)? esposas : '-',
		hijos: (hijos.length > 0)? hijos : '-',
		padres: (padres.length > 0)? padres : '-',
		film: (film_act.length > 0)? film_act : '-',
		tv: (tv_act.length > 0)? tv_act : '-',
		film_dir: (film_dir.length > 0)? film_dir : '-',
		film_prod: (film_prod.length > 0)? film_prod : '-',
		film_exprod: (film_exprod.length > 0)? film_exprod : '-',
		writer: (writer.length > 0)? writer : '-',
		tv_creat: (tv_creat.length > 0)? tv_creat : '-',
		tv_prod: (tv_prod.length > 0)? tv_prod : '-',
		tv_writer: (tv_writer.length > 0)? tv_writer : '-',
		music: (music.length > 0)? music : '-',
		org: (org.length > 0)? org : '-',
		employ_hist: (employ_hist.length > 0)? employ_hist : '-',
		aw_won: (aw_won.length > 0)? aw_won : '-',
		aw_nom: (aw_nom.length > 0)? aw_nom : '-',
		web: ((response.property['/common/topic/topical_webpage'] != undefined) && (response.property['/common/topic/topical_webpage'].values.length > 0)) ? response.property['/common/topic/topical_webpage'].values[0].text : '-',		
		poster: ((response.property['/common/topic/image'] != undefined)&&(response.property['/common/topic/image'].status != 'has_no_value')) ? response.property['/common/topic/image'].values[0].id : '-',
		fecha: new Date()	
	};
    
	return actor;
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//Crear serie JSON	  
///////////////////////////
function createSerie(response, responseEpisodes, lang, imdb, plot){
	var awards = []; var awards_nom = []; var genres = []; var langs = []; var country = []; var network = []; var settings = [];
	var creators = []; var writers = []; var actors = []; var spin_offs = []; var spun_offs = []; var episodes = [];
	
	if ((response.property['/award/award_winning_work/awards_won'] != undefined)&&(response.property['/award/award_winning_work/awards_won'].values.length > 0)){
		jQuery.each( response.property['/award/award_winning_work/awards_won'].values, function( i, val ) {
			if ((val.property['/award/award_honor/award'] != undefined)&&(val.property['/award/award_honor/award'].values.length > 0)){
				var award = [];
				award.push(val.property['/award/award_honor/award'].values[0].text);
				if ((val.property['/award/award_honor/award_winner'] != undefined)&&(val.property['/award/award_honor/award_winner'].values.length > 0)){
					var film_award = '';
					jQuery.each( val.property['/award/award_honor/award_winner'].values, function( i2, val2 ) {
						if (i2 > 0) film_award = film_award + ', ';
						film_award = film_award + val2.text;
					});	
					award.push(film_award);
					if ((val.property['/award/award_honor/year'] != undefined)&&(val.property['/award/award_honor/year'].values.length > 0)){
						award.push(val.property['/award/award_honor/year'].values[0].text);
					}
				}
				awards.push(award);
			}
		});
	}
	
	if ((response.property['/award/award_nominated_work/award_nominations'] != undefined)&&(response.property['/award/award_nominated_work/award_nominations'].values.length > 0)){
		jQuery.each( response.property['/award/award_nominated_work/award_nominations'].values, function( i, val ) {
			if ((val.property['/award/award_nomination/award'] != undefined)&&(val.property['/award/award_nomination/award'].values.length > 0)){
				var award = [];
				award.push(val.property['/award/award_nomination/award'].values[0].text);
				if ((val.property['/award/award_nomination/award_nominee'] != undefined)&&(val.property['/award/award_nomination/award_nominee'].values.length > 0)){
					var film_award = '';
					jQuery.each( val.property['/award/award_nomination/award_nominee'].values, function( i2, val2 ) {
						if (i2 > 0) film_award = film_award + ', ';
						film_award = film_award + val2.text;
					});	
					award.push(film_award);
					if ((val.property['/award/award_nomination/year'] != undefined)&&(val.property['/award/award_nomination/year'].values.length > 0)){
						award.push(val.property['/award/award_nomination/year'].values[0].text);
					}
				}
				awards_nom.push(award);
			}
		});
	}
	
	if ((response.property['/tv/tv_program/genre'] != undefined)&&(response.property['/tv/tv_program/genre'].values.length > 0)){
		jQuery.each( response.property['/tv/tv_program/genre'].values, function( i, val ) {
			genres.push(val.text);
		});	
	}

	if ((response.property['/tv/tv_program/languages'] != undefined)&&(response.property['/tv/tv_program/languages'].values.length > 0)){
		jQuery.each( response.property['/tv/tv_program/languages'].values, function( i, val ) {
			var idioma = val.text.replace(" Language", "");
			idioma = idioma.replace("Idioma ", "");
			langs.push(idioma);
		});	
	}

	if ((response.property['/tv/tv_program/country_of_origin'] != undefined)&&(response.property['/tv/tv_program/country_of_origin'].values.length > 0)){
		jQuery.each( response.property['/tv/tv_program/country_of_origin'].values, function( i, val ) {
			country.push(val.text);
		});	
	}

	if ((response.property['/tv/tv_program/original_network'] != undefined)&&(response.property['/tv/tv_program/original_network'].values.length > 0)){
		jQuery.each( response.property['/tv/tv_program/original_network'].values, function( i, val ) {
			if ((val.property['/tv/tv_network_duration/network'] != undefined)&&(val.property['/tv/tv_network_duration/network'].values.length > 0)){
				network.push(val.property['/tv/tv_network_duration/network'].values[0].text);
			}
		});	
	}

	if ((response.property['/tv/tv_program/program_creator'] != undefined)&&(response.property['/tv/tv_program/program_creator'].values.length > 0)){
		jQuery.each( response.property['/tv/tv_program/program_creator'].values, function( i, val ) {
			creators.push(val.text);
		});	
	}

	if ((response.property['/tv/tv_program/recurring_writers'] != undefined)&&(response.property['/tv/tv_program/recurring_writers'].values.length > 0)){
		jQuery.each( response.property['/tv/tv_program/recurring_writers'].values, function( i, val ) {
			if ((val.property['/tv/tv_program_writer_relationship/writer'] != undefined)&&(val.property['/tv/tv_program_writer_relationship/writer'].values.length > 0)){
				writers.push(val.property['/tv/tv_program_writer_relationship/writer'].values[0].text);
			}
		});	
	}

	if ((response.property['/fictional_universe/work_of_fiction/setting'] != undefined)&&(response.property['/fictional_universe/work_of_fiction/setting'].values.length > 0)){
		jQuery.each( response.property['/fictional_universe/work_of_fiction/setting'].values, function( i, val ) {
			settings.push(val.text);
		});	
	}

	if ((response.property['/tv/tv_program/regular_cast'] != undefined)&&(response.property['/tv/tv_program/regular_cast'].values.length > 0)){
		jQuery.each( response.property['/tv/tv_program/regular_cast'].values, function( i, val ) {
			var character = {
				actor: ((val.property['/tv/regular_tv_appearance/actor'] != undefined) && (val.property['/tv/regular_tv_appearance/actor'].values.length > 0)) ? val.property['/tv/regular_tv_appearance/actor'].values[0].text : '-',
				character: ((val.property['/tv/regular_tv_appearance/character'] != undefined) && (val.property['/tv/regular_tv_appearance/character'].values.length > 0)) ? val.property['/tv/regular_tv_appearance/character'].values[0].text : '-',
				from: ((val.property['/tv/regular_tv_appearance/from'] != undefined) && (val.property['/tv/regular_tv_appearance/from'].values.length > 0)) ? val.property['/tv/regular_tv_appearance/from'].values[0].value.substring(0, 4) : '-',
				to: ((val.property['/tv/regular_tv_appearance/to'] != undefined) && (val.property['/tv/regular_tv_appearance/to'].values.length > 0)) ? val.property['/tv/regular_tv_appearance/to'].values[0].value.substring(0, 4) : '-'
			};	
			actors.push(character);
		});	
	}

	if ((response.property['/tv/tv_program/spin_offs'] != undefined)&&(response.property['/tv/tv_program/spin_offs'].values.length > 0)){
		jQuery.each( response.property['/tv/tv_program/spin_offs'].values, function( i, val ) {
			spin_offs.push(val.text);
		});	
	}

	if ((response.property['/tv/tv_program/spun_off_from'] != undefined)&&(response.property['/tv/tv_program/spun_off_from'].values.length > 0)){
		jQuery.each( response.property['/tv/tv_program/spun_off_from'].values, function( i, val ) {
			spun_offs.push(val.text);
		});	
	}
	
	var titulo = ((response.property['/type/object/name'] != undefined) && (response.property['/type/object/name'].values.length > 0)) ? response.property['/type/object/name'].values[0].value : '-';
	var mid = ((response.property['/type/object/mid'] != undefined) && (response.property['/type/object/mid'].values.length > 0)) ? response.property['/type/object/mid'].values[0].value : '-';
	var primer_ep = ((response.property['/tv/tv_program/air_date_of_first_episode'] != undefined) && (response.property['/tv/tv_program/air_date_of_first_episode'].values.length > 0)) ? response.property['/tv/tv_program/air_date_of_first_episode'].values[0].value : '-';
	var temporadas = ((response.property['/tv/tv_program/number_of_seasons'] != undefined) && (response.property['/tv/tv_program/number_of_seasons'].values.length > 0)) ? response.property['/tv/tv_program/number_of_seasons'].values[0].value : '-';
	var anio = (primer_ep != '-') ? primer_ep.substr(0, 4) : '_';
	
	if (responseEpisodes.result.length > 0){
		for(var i=0; i < responseEpisodes.result.length; i++) {
			if ((responseEpisodes.result[i].season_number != null)&&(responseEpisodes.result[i].season_number != undefined)){
				if (episodes[responseEpisodes.result[i].season_number] == undefined)
					episodes[responseEpisodes.result[i].season_number] = [];
				var ep = [];
				ep.push(responseEpisodes.result[i].name);
				ep.push(responseEpisodes.result[i].air_date);
				episodes[responseEpisodes.result[i].season_number].push(ep);
			}	
		}
	}

	var cantidad_ep = 0;
	//no queremos contar episodios especiales
	for ( var i = 1; i < episodes.length; i++ ){
		if(episodes[i] != undefined){
			cantidad_ep = cantidad_ep + episodes[i].length;
		}
	}

	var argu = (lang == 'en')? plot : null;
	
	var serie = {
		_id: lang + '-' + titulo.replace(/[ -]/g, "_").toLowerCase() + '-' + anio + '-serie',
		title: titulo,
		imdb: imdb,
		plot: argu,
		mid: mid,
		episodios: episodes,
		descripcion: ((response.property['/common/topic/description'] != undefined) && (response.property['/common/topic/description'].values.length > 0)) ? response.property['/common/topic/description'].values[0].value : '-',
		premios: (awards.length > 0)? awards : '-',
		premios_nom: (awards_nom.length > 0)? awards_nom : '-',
		poster: ((response.property['/common/topic/image'] != undefined) && (response.property['/common/topic/image'].values.length > 0)) ? response.property['/common/topic/image'].values[0].id : null,
		web: ((response.property['/common/topic/official_website'] != undefined) && (response.property['/common/topic/official_website'].values.length > 0)) ? response.property['/common/topic/official_website'].values[0].text : '-',
		setting: (settings.length > 0)? settings : '-',
		episodio_primero: primer_ep,
		episodio_ultimo: ((response.property['/tv/tv_program/air_date_of_final_episode'] != undefined) && (response.property['/tv/tv_program/air_date_of_final_episode'].values.length > 0)) ? response.property['/tv/tv_program/air_date_of_final_episode'].values[0].text : '-',
		pais: country,
		en_produccion: ((response.property['/tv/tv_program/currently_in_production'] != undefined) && (response.property['/tv/tv_program/currently_in_production'].values.length > 0)) ? response.property['/tv/tv_program/currently_in_production'].values[0].value : '-',
		episodio_duracion: ((response.property['/tv/tv_program/episode_running_time'] != undefined) && (response.property['/tv/tv_program/episode_running_time'].values.length > 0)) ? response.property['/tv/tv_program/episode_running_time'].values[0].text : '-',
		generos: (genres.length > 0)? genres : '-',
		idioma: (langs.length > 0)? langs : '-',
		episodio_cantidad: ((response.property['/tv/tv_program/number_of_episodes'] != undefined) && (response.property['/tv/tv_program/number_of_episodes'].values.length > 0)) ? response.property['/tv/tv_program/number_of_episodes'].values[0].value : cantidad_ep,
		episodio_temporadas: temporadas,
		cadena: network,
		creadores: creators,
		escritores: writers,
		actores: actors,
		spin_off: (spin_offs.length > 0)? spin_offs : '-',
		spun_off: (spun_offs.length > 0)? spun_offs : '-',
		song: ((response.property['/tv/tv_program/theme_song'] != undefined) && (response.property['/tv/tv_program/theme_song'].values.length > 0)) ? response.property['/tv/tv_program/theme_song'].values[0].text : '-'
	};

	return serie;
}
