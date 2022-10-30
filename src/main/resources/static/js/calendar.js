$(function() {
	
	
	
	var calendarEl = document.getElementById('calendar');
	var addEvent=(data)=>console.log(data.dateStr)
	
	var eventos=[{title:'TP 4 Seminario Colaborativo by: Sofi',start:'2022-10-30',end:'2022-11-14',color:'purple'}];
	const addModal=$("#addEventModal");
	const closeModalButton=$("#closeModal");
	closeModalButton.click(()=>addModal.hide());
	addModal.click(()=>console.log('Holis'));
	
	var example=(data)=>addModal.show();
	
	
	
	var calendar = new FullCalendar.Calendar(calendarEl, {
		themeSystem:'Pulse',
		initialView: 'dayGridMonth',
		locale:'es',
		headerToolbar:{
			right:'prev, next, today',
			center:'title',
			left:'timeGridDay,timeGridWeek,dayGridMonth',
			
		},
		events:eventos,
		dateClick:addEvent,
		eventClick:example
		
	});
	
	
	
	calendar.render();
	
});