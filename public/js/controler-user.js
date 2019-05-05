function saveFile(id){
	$.ajax({
		url: `/file/${id}`,
		data: {"content": editor.getValue()},
		method: 'PUT',
		success:function(data){
			socket.emit('fileSave', {clientID: $('#clientID').val()});
		}
	});
}

function deleteFile(id){
	closeAllModal();
	$.ajax({
		url: `/file/${id}`,
		data: {},
		method: 'DELETE',
		success:function(data){
			socket.emit('fileDelete', {clientID: $('#clientID').val()});
		}
	});
}

function sharedFile(){
	closeConfirmModal();
	$.ajax({
		url: `/file/${$('#idFile').val()}/share`,
		method: 'POST',
		data: {"_id":$("#slcUser").val(), "name": $("#slcUser option:selected").text()},
		success:function(data){
			socket.emit('fileShare', {clientID: $('#clientID').val()});
		}
	});
}

function loadFile(url, title){
	$('#popupFile').dialog({
		title: title,
		modal: true,
		resizable: false,
		width: 500,
		hide: 'fold',
		show: 'fold',
		position: { my: "center", at: "top" }
	});
	$.ajax({
		url: url,
		method: 'GET',
		success:function(data){
			$('#popupFile').html(data);
			$('#popupFile').dialog('open');
		}
	});
}

function closeFile(){
	$('#popupFile').dialog('close');
}

function openConfirmModal(id, action){
	$('#confirm').dialog({
		title: "Confirm",
		modal: true,
		resizable: false,
		autoOpen: false,
		width: 200,
		hide: 'fold',
		show: 'fold',
		position: { my: "center", at: "top" }
	});
	$('#confirm').empty();
	if (action === 'delete'){
		$('#confirm').append(`
			<button onclick="deleteFile('${id}')" type="button" class="btn btn-danger btn-sm form-control">
				Confirm Delete
			</button><hr>	
		`);
		$('#confirm').append(`
			<button onclick="closeConfirmModal()" type="button" class="btn btn-secondary btn-sm form-control">
				Cancel
			</button>
		`);
	}else if (action === 'shared'){
		$.ajax({
			url: '/file/share',
			method: 'GET',
			success:function(data){
				$('#confirm').append(`<input type="text" hidden id="idFile" value="${id}">`);
				$('#confirm').append(data);
			}
		});
	}
	$('#confirm').dialog('open');
}

function closeConfirmModal(){
	$('#confirm').dialog('close');
}

function closeAllModal(){
	$('#confirm').dialog('close');
	$('#popupFile').dialog('close');
}