$(function() {
	
	
	
	
	
	var fechaInicio=$('#fechaInicio');
	var fechaFin=$('#fechaFin');
	var autor=$('#autor');
	var color=$('#color');
	var calendarEl = document.getElementById('calendar');
	var eventos=[{extendedProps:{autor:'Sofi'},title:'TP 4 Seminario Colaborativo',start:'2022-10-30',end:'2022-11-14',color:'purple'}];
	const addModal=$("#addEventModal");
	
	var addEvent=(data)=>{
		addModal.show();
		fechaInicio.val(data.dateStr);
		var evento={
			title:$('#titulo').val(),
			description:$('#descripcion').val(),
			start:data.dateStr,
			end:fechaFin.val(),
			extendedProps:{
				autor:autor.val(),
			},
			
			color:color.val()
		}
		console.log(evento);
		
		$('#addToList').click(()=>{
			eventos.push(evento);
			//console.log(eventos.length);
		});
		
	};
	
	
	
	const closeModalButton=$("#closeModal");
	closeModalButton.click(()=>addModal.hide());
	console.log(eventos.length);
	
	
	
	
	
	var calendar = new FullCalendar.Calendar(calendarEl, {
		themeSystem:'Pulse',
		initialView: 'dayGridMonth',
		locale:'es',
		editable:true,
		headerToolbar:{
			right:'prev, next, today',
			center:'title',
			left:'timeGridDay,timeGridWeek,dayGridMonth',
			
		},
		selectHelper:true,
		events:eventos,
		dateClick:addEvent,
		eventClick:(data)=>{alert('autor: '+data.event.extendedProps.autor)}
		
	});
	
	
	
	calendar.render();
	
});