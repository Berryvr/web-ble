const original_request = navigator.bluetooth.requestDevice.bind(navigator.bluetooth);
navigator.bluetooth.requestDevice = function(arguments){
    console.log("New Function");
    return original_request(arguments);
}