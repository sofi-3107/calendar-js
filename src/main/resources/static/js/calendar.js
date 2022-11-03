$(function() {
	const hostUrl = window.location;


	var eventos = [];
	var calendar





	var fechaInicio = $('#fechaInicio');
	var fechaFin = $('#fechaFin');
	var autor = $('#autor');
	var color = $('#color');
	var title = $('#title');
	var description = $('#description');

	fechaFin.attr('max', Date.now());

	var calendarEl = document.getElementById('calendar');
	//var eventos = [{ extendedProps: { autor: 'Sofi' }, title: 'TP 4 Seminario Colaborativo', start: '2022-10-30', end: '2022-11-14', color: 'purple' }];
	var addModal = $("#addEventModal");

	var addEvent = (data) => {

		addModal.show();
		fechaInicio.val(data.dateStr);



		/**http request */
		$('form').submit((e) => {
			e.preventDefault();
			let evento = {
				title: title.val(),
				description: description.val()||'',
				start: data.date,
				end: new Date(fechaFin.val())|| new Date(data.dateStr),
				autor: autor.val()|| 'anonimo',
				color: color.val().toString()||'#a84aa4'
			};
			$.ajax({
				url: hostUrl + 'saveEvento',
				data: JSON.stringify(evento),
				dataType: 'json',
				contentType: "application/json",
				encode: true,
				type: 'post',
				success: (resp) => console.log(resp),
				error: (e) => console.log(e)
			});

			title.val('');
			description.val('');
			fechaInicio.val('');
			fechaFin.val('');
			autor.val('');
			addModal.hide();
			//calendar.getEventSources()[0].refetch();
			location.reload();
		});



	};



	const closeModalButton = $("#closeModal");
	closeModalButton.click(() => {
		addModal.hide();
		title.val('');
		description.val('');
		fechaInicio.val('');
		fechaFin.val('');
		autor.val('');
		addModal.hide();
		calendar.refetchEvents();
	});






	/**CALENDARIO */
	calendar = new FullCalendar.Calendar(calendarEl, {
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
			url: hostUrl + 'all',
			method: 'GET',
			error: (f) => alert('failed fetching data' + f)
		},

		dateClick: addEvent,
		eventClick: (data) => { alert('autor: ' + data.event.extendedProps.autor + ' description: ' + data.event.extendedProps.description) }

	}
	);

	calendar.render();











});