var realTime;
$(document).ready(function() {
	realTime = io.connect('http://xploitcode.herokuapp.com');
	realTime.emit('join', {'room': $('#pen').val()});
	realTime.on('joined', function(data){console.log(data);});
	realTime.on('updateRealTime', function(data){
		console.log("cambio");
		editorJS.setValue(data.js);
		editorHTML.setValue(data.html);
		editorCSS.setValue(data.css);
	});
});

function sendChanges(){
	realTime.emit(
		'realTime',
		{'room': $('#pen').val(),
		'html': editorHTML.getValue(),
		'css': editorCSS.getValue(),
		'js': editorJS.getValue()}
	);
}