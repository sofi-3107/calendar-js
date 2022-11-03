$(function() {
	const hostUrl = window.location;


	var eventos = [];
	var calendar




	var calendarEl = document.getElementById('calendar');
	var fechaInicio = $('#fechaInicio');
	var fechaFin = $('#fechaFin');
	var autor = $('#autor');
	var color = $('#color');
	var title = $('#title');
	var description = $('#description');
	const addModal = $("#addEventModal");
	const deleteModal = $('#deleteModal');
	const cancelar = $('#cancelar');
	const deleteButton = $('#delete');
	const closeModalButton = $("#closeModal");

	/**borrar evento */




	fechaFin.attr('max', Date.now());


	var deleteEvent = (info) => {
		deleteModal.show();
		console.log(info);
		deleteButton.click(() => {
			let event = 0;
			event = calendar.getEventById(info.event.id);
			$.ajax({
				url: hostUrl + 'deleteEvento/' + info.event.id,
				type: 'delete',
				dataType: 'json',
				contentType: "application/json",
				encode: true,
				error: (e) => console.log(e)
			});

			event.remove();
			alert('Evento borrado correctamenre');
			deleteModal.hide();
			location.reload();


		});
		cancelar.click(() => deleteModal.hide());
	}
	var addEvent = (data) => {
		addModal.show();
		fechaInicio.val(data.dateStr);
		/**http request */
		$('form').submit((e) => {
			e.preventDefault();
			let evento = {
				title: title.val(),
				description: description.val() || '',
				start: data.date,
				end: new Date(fechaFin.val()) || new Date(data.dateStr),
				autor: autor.val() || 'anonimo',
				color: color.val().toString() || '#a84aa4'
			};
			$.ajax({
				url: hostUrl + 'saveEvento',
				data: JSON.stringify(evento),
				dataType: 'json',
				contentType: "application/json",
				encode: true,
				type: 'post',
				success: (resp) => console.log('success'),

			});
				console.log('done add')
				title.val('');
				description.val('');
				fechaInicio.val('');
				fechaFin.val('');
				autor.val('');
				addModal.hide();
				location.reload();
				//let source=calendar.getEventSources()[0];
				//calendar.addEvent(evento,source); 






		});



	};





	closeModalButton.click(() => {
		addModal.hide();
		title.val('');
		description.val('');
		fechaInicio.val('');
		fechaFin.val('');
		autor.val('');
		deleteModal.hide();
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
		eventClick: deleteEvent


	}
	);

	calendar.render();











});