import React from 'react';
import Communication from './web-ble/communication.js';

//TODO: clean React component and use communication class 
// Should be dumb, use communication class to handle web-ble

export default class Description extends React.Component {

    constructor(props) {
        super(props);
        this.value= '';
        this.connected = false;
        this.state = {chatArray: []}
        this.com = new Communication();
        this.myDescriptor = '';
        this.myInterval = '';
    
        this.handleSubmit = this.handleSubmit.bind(this);
      }

    render() {
        let status;

        if(this.state.connected) {
            status = 'Verbonden'
        } else {
            status = 'Niet verbonden'
        }

        return(
            <div className="communication">
                <h4>Status: {status}</h4>
                <form className="message-input">
                    <label htmlFor="newDescription">Message</label>
                    <input type="text" id="newDescription" name="newDescription" ref={(c) => this.value = c} />
                </form>
                
                <div className="message-read">
                    <button className="button" onClick={() => this.connect()}>Connect</button>
                    <button className="button" onClick={() => this.readDescriptor()}>Read</button>
                    <button className="button" type="button" onClick={this.handleSubmit}>Write</button>
                    <button className="button" type="button" onClick={() => this.startInterval()}>Start auto-reading</button>
                    <button className="button" type="button" onClick={() => this.stopInterval()}>Stop auto-reading</button>
                    <button className="button" type="button" onClick={() => this.setState({chatArray: []})}>Clear chat</button>
                </div>
                <div>
                    {this.state.chatArray.map(function(d, idx){
                        if(d){
                    return (<li key={idx}>{d.message}</li>)
                        }
                     })}
                </div>
            </div>
        )
    }

    handleSubmit() {
      this.com.writeMessage(this.value.value);
    }

    startInterval() {
        this.setState({myInterval:setInterval(() => {
            if(this.state.connected){
            this.readDescriptor()
            }
          }, 5000)});
    }

    async connect() {
        await this.com.connect();
        this.setState({ connected: true});
        console.log(this.state.connected);
        
    }

    stopInterval(){
        clearInterval(this.state.myInterval);
    }

    readDescriptor() {
        let checkDuplicate = this.state.chatArray[this.state.chatArray.length-1];
        this.com.checkMessage().then((recievedMessage) => {
            if(!checkDuplicate) {
                this.setState({chatArray:this.state.chatArray.concat(recievedMessage)})
            } else if(JSON.stringify(checkDuplicate.timestamp) !== JSON.stringify(recievedMessage.timestamp)){
                this.setState({chatArray:this.state.chatArray.concat(recievedMessage)})
            }
        })      
    }
}