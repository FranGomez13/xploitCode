var editorHTML;
var editorJS;
var editorCSS;
var temporizador = "";
var temporizador2 = "";
$(document).ready(function(){
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
	var code = $("#txt-html")[0];
	editorHTML = CodeMirror.fromTextArea(code, {
		lineNumbers : true,
		mode:  "xml",
		htmlmode: true
	});
	editorHTML.setOption("theme", "dracula");

	code = $("#txt-js")[0];
	editorJS = CodeMirror.fromTextArea(code, {
		lineNumbers : true,
		mode:  "javascript"
	});
	editorJS.setOption("theme", "dracula");

	code = $("#txt-css")[0];
	editorCSS = CodeMirror.fromTextArea(code, {
		lineNumbers : true,
		mode:  "css"
	});
	editorCSS.setOption("theme", "dracula");

	$("#principal").css("display", "block");
	loading();
});

$('#btnPlayPen').click(function(){
	changePreview();
});

$('#btnSavePen').click(function(){
	$.ajax({
		url: window.location.pathname + '/save',
		data:{"html": editorHTML.getValue(),
		      "js":editorJS.getValue(),
		      "css": editorCSS.getValue()},
		method: 'PUT',
		success:function(data){
			socket.emit('projectSave', {clientID: $('#clientID').val()});
		}
	});
});

$('#btnDeletePen').click(function(){
	$('#confirm').html(
		`<button onclick="deletePen()" type="button" class="btn btn-danger form-control">
			Confirm Delete
		</button><hr>
		<button onclick="closeConfirm()"  type="button" class="btn btn-secondary form-control">
			Cancel
		</button>`
	).dialog('open');
});

$('#btnCancelPen').click(function(){
	window.location.href = '/user';
});

function loading(){
	editorHTML.setValue($('#HTML').text());
	editorJS.setValue($('#JS').text());
	editorCSS.setValue($('#CSS').text());
	editorHTML.on("change", function(instance, changeObj) {
		if (changeObj.origin !== 'setValue'){
			clearTimeout(temporizador2);
			temporizador2 = setTimeout(sendChanges, 200);
		}
		clearTimeout(temporizador);
    	temporizador = setTimeout(changePreview, 2000);
	});
	editorJS.on('change', function(instance, changeObj){
		if (changeObj.origin !== 'setValue'){
			clearTimeout(temporizador2);
			temporizador2 = setTimeout(sendChanges, 200);
		}
	});
	editorCSS.on("change", function(instance, changeObj) {
		if (changeObj.origin !== 'setValue'){
			clearTimeout(temporizador2);
			temporizador2 = setTimeout(sendChanges, 200);
		}
		clearTimeout(temporizador);
    	temporizador = setTimeout(changePreview, 2000);
    });
	changePreview();
}

function changePreview(){
	$('#preview').empty();
	var iframe = document.createElement('iframe');
	var html = `<style>${editorCSS.getValue()}</style>
				<body>${editorHTML.getValue()}
				<script>${editorJS.getValue()}<\/script></body>`;
	iframe.style.cssText = 'width: 100%; height: 300px; background: white;';
	iframe.src = 'data:text/html;charset=utf-8,' + encodeURI(html);
	document.getElementById('preview').appendChild(iframe);
}

function deletePen(){
	$.ajax({
		url: window.location.pathname.replace('/pen', '/project'),
		method: 'DELETE',
		success:function(data){
			socket.emit('projectDelete', {clientID: $('#clientID').val()});
			closeConfirmDelete();
		}
	});
}

function closeConfirm(){
	$('#confirm').dialog('close');
}

function closeConfirmDelete(){
	$('#confirm').dialog('close');
	window.location.replace('/user/projects');
}