// Selected device object cache
let deviceCache = null;
//verwerk in communication.js

// Launch Bluetooth device chooser and connect to the selected
export default function connect() {
  return (deviceCache ? Promise.resolve(deviceCache) :
    requestBluetoothDevice())
    .then(device => connectDeviceAndCacheCharacteristic(device))
    .then(characteristic => startNotifications(characteristic))
    .catch(error => log(error));

  function requestBluetoothDevice() {
    log('Requesting bluetooth device...');

    return navigator.bluetooth.requestDevice({
      filters: [{ services: ['battery_service'] }],
    })
      .then(device => {
        log('"' + device.name + '" bluetooth device selected');
        deviceCache = device;

        // Listen for disconnect event
        deviceCache.addEventListener('gattserverdisconnected',
          handleDisconnection);

        return deviceCache;
      });
  }
}