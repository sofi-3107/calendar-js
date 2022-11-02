$(function() {

	var eventos = [];







	var fechaInicio = $('#fechaInicio');
	var fechaFin = $('#fechaFin');
	var autor = $('#autor');
	var color = $('#color');
	var title=$('#title');
	var description=$('#description');

	var calendarEl = document.getElementById('calendar');
	//var eventos = [{ extendedProps: { autor: 'Sofi' }, title: 'TP 4 Seminario Colaborativo', start: '2022-10-30', end: '2022-11-14', color: 'purple' }];
	var addModal = $("#addEventModal");

	var addEvent = (data) => {
		addModal.show();
		fechaInicio.val(data.dateStr);
		
		var evento = {
			title:title.val(),
			description: description.val(),
			start: data.date,
			end: new Date(fechaFin.val()),
			autor: autor.val(),
			color:color.val()
		};

		/**http request */
		$('form').submit((e) => {
			e.preventDefault();

			$.ajax({
				url: 'http://localhost:8000/saveEvento',
				data: JSON.stringify(evento),
				dataType: 'json',
				contentType: "application/json",
				encode: true,
				type: 'post',
				success: (resp) => alert(resp),
				error: (e) => console.log(e)
			});
			//location.reload();
			title.val('') ;
			description.val('') ;
			fechaInicio.val('') ;
			fechaFin.val('') ;
			autor.val('');
			addModal.hide();
		});



	};



	const closeModalButton = $("#closeModal");
	closeModalButton.click(() => addModal.hide());





	/**CALENDARIO */
	var calendar = new FullCalendar.Calendar(calendarEl, {
		themeSystem: 'Pulse',
		initialView: 'dayGridMonth',
		locale: 'es',
		editable: true,
		headerToolbar: {
			right: 'prev, next, today',
			center: 'title',
			left: 'timeGridDay,timeGridWeek,dayGridMonth',

		},
		eventSources: {
			url: 'http://localhost:8000/all',
			method: 'GET',
			color: 'purple',
			error: (f) => alert('failed fetching data' + f)
		},

		dateClick: addEvent,
		eventClick: (data) => { alert('autor: ' + data.event.extendedProps.autor + ' description: ' + data.event.description) }

	}
	);

	calendar.render();












});