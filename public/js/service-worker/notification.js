/*function notify(title, message){
	if(!('Notification' in window))
		alert('Notificaciones no soportadas');
	else if (Notification.permission === 'granted')
		generarNotificacion(title, message);
	else if (Notification.permission !== 'denied'){
		Notification.requestPermission(function(permission){
			if (!('permission' in Notification))
				Notification.permission = permission;
			if (permission === 'granted')
				generarNotificacion(title, message);
		});
	}
}

function generarNotificacion(title, message){
	var options = {body: message, dir: 'ltr'};
	var notification = new Notification(title, options);
}*/

function notify(title, message){
	$('#notification').empty();
	$('#notification').html(
		`<div id="${title}" class="toast ml-auto" data-delay="5000" data-autohide="true" style="z-index: 10;">
        	<div class="toast-header">
	            <strong class="mr-auto text-primary">${title}</strong>
	            <button type="button" class="ml-2 mb-1 close" data-dismiss="toast" aria-label="Close">
	                <span aria-hidden="true">×</span>
	            </button>
        	</div>
    		<div class="toast-body">
            	${message}
       		</div>
    	</div>`
	);
	$(`#${title}`).on('hidden.bs.toast', function () {
  		$(`#${title}`).remove();
	})
	$('.toast').toast('show');
}