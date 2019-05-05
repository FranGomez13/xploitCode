var socket;
$(document).ready(function() {
	var mensajes = [];
	socket = io.connect('xploitcode.herokuapp.com');
	socket.on('profileUpdateServer', function (data) {
		notify('Profile Update', data);
	});
	socket.on('welcome_event', function (clientID) {
		$('#clientID').val(clientID);
	});
	socket.on('fileSaveServer', function (data) {
		notify('File Save', data);
	});
	socket.on('fileCreateServer', function (data) {
		notify('File Create', data);
		changeFolder(
			window.location.pathname === '/user' ? `/user/folder/${$('#parentId').val()}` : window.location.pathname, $('#title-content').text());
	});
	socket.on('fileDeleteServer', function (data) {
		notify('File Delete', data);
		changeFolder(
			window.location.pathname === '/user' ? `/user/folder/${$('#parentId').val()}` : window.location.pathname, $('#title-content').text());
	});
	socket.on('fileShareServer', function (data) {
		notify('File Share', data);
	});
	socket.on('folderCreateServer', function (data) {
		notify('Folder Create', data);
		changeFolder(
			window.location.pathname === '/user' ? `/user/folder/${$('#parentId').val()}` : window.location.pathname, $('#title-content').text());
	});
	socket.on('projectCreateServer', function (data) {
		notify('Project Create', data);
		changeFolder(
			window.location.pathname === '/user' ? `/user/folder/${$('#parentId').val()}` : window.location.pathname, $('#title-content').text());
	});
	socket.on('projectSaveServer', function (data) {
		notify('Project Save', data);
	});
});