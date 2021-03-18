export default function writeMessage(message, descriptor) {
        
    if (!descriptor) {
        return;
      }
      let encoder = new TextEncoder('utf-8');
      //make method to write message here
      let buffer = new ArrayBuffer(512);
      const messageArray = new Uint8Array(buffer);
      const messagLengthArray = new Uint16Array(buffer);
      const timestampArray = new Uint32Array(buffer);

      //set timestamp
      timestampArray.set([Math.floor(new Date().getTime()/1000)], 0);
      //set message length so decoder knows range of the String
      messagLengthArray.set([message.length], 14);          
      //set message
      console.log([encoder.encode(message)]);
      messageArray.set(encoder.encode(message), 30);
     
      descriptor.writeValue(buffer)
      .then(_ => {
        console.log('> Characteristic User Description changed to: '+ message);
      })
      .catch(error => {
        console.log(error);
      });
}