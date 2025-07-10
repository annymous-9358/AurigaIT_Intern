import React, { Component } from "react";
class Message extends Component {
    constructor() {
        super();
        this.state = {
        message: "Welcome visitor",
        };
    }
    chcangeMessage(){
            this.setState({
                message: " Thank you for subscribing"
            })
        }
  render() {
    return (<div>
        <h1>{this.state.message}</h1>
        {this.props.children}
        <button onClick={() => this.chcangeMessage()}>Subscribe</button>   
        </div>
    )
  }
}
export default Message;