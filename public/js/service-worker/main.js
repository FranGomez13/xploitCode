//Verificamos si el service worker es compatible en el navegador
var subscription;
if('serviceWorker' in navigator) {
	send().catch(e=>{});
}

//Registramos el service worker y las notificicaciones
async function send(){
	const register = await navigator.serviceWorker.register('/worker.js',{scope: '/'});
	subscription = await register.pushManager.subscribe({
		userVisibleOnly: true,
		applicationServerKey: convertKey("BHmZLNxSeAt6FzranWQ_fdf9jwtwy1W7Xt-36Pzps-bKV_IjlwlkjJQ6-ncQYJSLI3wTglGBmpgIvJ9GmjfsLko")
	});
	console.log("subscription");
	console.log(subscription);
}

function convertKey(key){
	const padding = '='.repeat((4 - key.length % 4) % 4);
	const base64 = (key + padding).replace(/\-/g, '+').replace(/\_/g, '/');
	const raw = window.atob(base64);
	const output = new Uint8Array(raw.length);
	for (var i=0; i<raw.length; i++)
		output[i] = raw.charCodeAt(i);
	return output;
}