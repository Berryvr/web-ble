export default function readMessage(descriptor) {

  const decoder = new TextDecoder('utf-8');

  if (!descriptor) {
    console.log('no descriptor found')
  } else {
    console.log(descriptor);
    return descriptor.readValue()
      .then(value => {
        //decode message here
        console.log(value)
        const messageArray = new Uint8Array(value.buffer);
        const messagelengthArray = new Uint16Array(value.buffer);
        const timeStampArray = new Uint32Array(value.buffer);

        let message = decoder.decode(messageArray.slice(30, (30 + messagelengthArray[14])));
        let timestamp = new Date(timeStampArray[0] * 1000);

        // bundle decoded message into object and return.
        let recievedMessage = { timestamp: timestamp, message: message };
        console.log(recievedMessage);
        return recievedMessage;

      })
      .catch(error => {
        console.log('Argh! ' + error);
      });

  }

}
