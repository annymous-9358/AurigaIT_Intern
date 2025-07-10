import React, { Component } from 'react'

export class UserGreeting extends Component {
    constructor(props) {
        super(props)
        this.state = {
            isLoggedIn: true
        }
    }
  render() {
    // Conditional rendering using ternary operator
    // return this.state.isLoggedIn ? (<div>Welcome Kunik</div>): (<div>Welcome Guest</div>)
    
    // Conditional rendering using short-circuit operator
    return this.state.isLoggedIn && <div>Welcome Kunik</div>
    
    // let message
    // if (this.state.isLoggedIn) {
    //     message = <div>Welcome Kunik</div>
    // } else {
    //     message = <div>Welcome Guest</div>
    // }

    // Conditional rendering using if-else
    // if (this.state.isLoggedIn) {
    // return <div>Welcome Kunik</div>
    // }else {
    //     return <div>Welcome Guest</div>
    // }
    // Conditional rendering using element variable
    // return  <div>{message}</div>
    
}
}
           

export default UserGreeting