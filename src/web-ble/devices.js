export default async function getDevices() {
    let deviceArray = await navigator.bluetooth.getDevices();
    deviceArray.forEach(device => {
        console.log(device.name);
        //dig further into the device
    });
}