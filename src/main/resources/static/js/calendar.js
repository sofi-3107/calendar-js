$(function() {
	const hostUrl = window.location;



	var calendar




	var calendarEl = document.getElementById('calendar');
	const fechaInicio = $('#fechaInicio');
	const fechaFin = $('#fechaFin');
	const autor = $('#autor');
	const color = $('#color');
	const title = $('#title');
	const description = $('#description');
	const formInputs = [fechaInicio, fechaFin, autor, title, description];
	const addModal = $("#addEventModal");
	const deleteModal = $('#deleteModal');
	const cancelar = $('#cancelar');
	const deleteButton = $('#delete');
	const changeButton = $('#change');
	const closeModalButton = $("#closeModal");
	const author = $('#author');
	const titulo = $('#titulo');
	const descripcion = $('#descripcion');
	const inicio = $('#begin');
	const fin = $('#end');
	const deleteInputs = [author, titulo, descripcion, inicio, fin];
	/**borrar evento */




	fechaFin.attr('max', Date.now());


	var deleteEvent = (info) => {

		deleteModal.show();
		let beg = moment(info.event.start).format('yyyy-MM-DD');
		let enDate = info.event.end == null ? moment(info.event.start).format('yyyy-MM-DD') : moment(info.event.and).format('yyyy-MM-DD');
		author.val(info.event.extendedProps.autor);
		titulo.val(info.event.title);
		descripcion.val(info.event.extendedProps.description);
		inicio.val(beg);
		fin.val(enDate);

		deleteButton.click(() => {
			let event = 0;
			event = calendar.getEventById(info.event.id);
			$.ajax({
				url: hostUrl + 'deleteEvento/' + info.event.id,
				type: 'delete',
				dataType: 'json',
				contentType: "application/json",
				encode: true,
				error: (e) => console.log(e),
				complete: (jqXHR,error) => {
					console.log(jqXHR.status);
					//alert('Evento borrado correctamenre');
					calendar.getEventSources()[0].refetch();
					deleteModal.hide();
				}
			});

		});

		cancelar.click(() => deleteModal.hide());
		changeButton.click(() => {

			let changedEvent = {
				id: info.event.id,
				start: new Date(inicio.val()) || info.event.start,
				end: new Date(fin.val()),
				title: titulo.val() || '',
				autor: author.val() || '',
				description: descripcion.val() || '',
				color: info.event.color
			}

			$.ajax({
				url: hostUrl + 'update',
				data: JSON.stringify(changedEvent),
				dataType: 'json',
				contentType: "application/json",
				encode: true,
				error: (e) => console.log(e),
				type: 'put',
				complete: () => {
					deleteInputs.forEach(i => i.val(''));
					deleteModal.hide();
					location.reload()
					//calendar.getEventSources()[0].refetch();
				}
			});

		});


	}
	var addEvent = (data) => {
		addModal.show();
		fechaInicio.val(data.dateStr);
		fechaFin.val(data.dateStr);
		/**http request */
		$('form').submit((e) => {
			e.preventDefault();
			let evento = {
				title: title.val(),
				description: description.val() || '',
				start: new Date(fechaInicio.val()),
				end: new Date(fechaFin.val()),
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
				success: (resp) => console.log(resp),
				error: (jqXHR, status, error) => console.log(error),
				complete: (jqXHR, status) => {
					console.log('Estado en complete: ');
					console.log(jqXHR.status);					
					addModal.hide();
					formInputs.forEach(i => i.val(''));
					//calendar.getEventSources()[0].refetch();
					location.reload()
				}

			});




		});



	};

	closeModalButton.click(() => {
		addModal.hide();
		formInputs.forEach(i => i.val(''));
		deleteModal.hide();
		calendar.refetchEvents();
	});






	/**CALENDARIO */
	calendar = new FullCalendar.Calendar(calendarEl, {
		themeSystem: 'Pulse',
		initialView: 'dayGridMonth',
		locale: 'es',
		editable: true,
		eventDisplay: 'block',
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