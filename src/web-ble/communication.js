import readMessage from './readMessage.js';
import writeMessage from './writeMessage.js';

export default class Communication {

    //Constructor
    constructor() {
        this.canWrite = false;
        this.myDescriptor = {};
        this.desc = {};
    }

    connect() {
    let serviceUuid = 'battery_service';
    if (serviceUuid.startsWith('0x')) {
      serviceUuid = parseInt(serviceUuid);
    }
  
    let characteristicUuid = 'battery_level';
    if (characteristicUuid.startsWith('0x')) {
      characteristicUuid = parseInt(characteristicUuid);
    }
  
    console.log('Requesting any Bluetooth Device...');
    return navigator.bluetooth.requestDevice({
        acceptAllDevices: true,
        optionalServices: [serviceUuid]})
    .then(device => {
      console.log('Connecting to GATT Server...');
      return device.gatt.connect();
    })
    .then(server => {
      console.log('Getting Service...');
      return server.getPrimaryService(serviceUuid);
    })
    .then(service => {
      console.log('Getting Characteristic...');
      return service.getCharacteristic(characteristicUuid);
    })
    .then(characteristic => {
      console.log('Getting Descriptor...');
      return characteristic.getDescriptor('gatt.characteristic_user_description');
    })
    .then(desc => { 
      console.log('Connected');

      //this.setState({myDescriptor:desc})
      this.myDescriptor = desc

      console.log(this.myDescriptor);
    })
    }

    checkMessage() {

          
        return readMessage(this.myDescriptor) //.then( (recievedMessage) => {return recievedMessage;});
          

    }

    writeMessage(message) {
       writeMessage(message, this.myDescriptor);
    }

    checkTurn(chatArray, message, timestamp) {
        if(chatArray[chatArray.length-1].message !== message && chatArray[chatArray.length-1].timestamp !== timestamp) {
            this.canWrite = true
        } else {
            this.canWrite = false
        }
    }
}