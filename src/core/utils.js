export function addOn(listener){
	return 'on' + listener.charAt(0).toUpperCase() + listener.slice(1)
}