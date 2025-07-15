import React, { Component } from 'react'
// import RegularComponent from './RegularComponent'
// import PureComp from './PureComponent'
import MemmoComponent from './MemmoComponent'

class ParentComponent1 extends Component {
    constructor(props) {
        super(props)
        this.state = {
            name: 'Kunik Jain'
        }    }
        componentDidMount() {
            setInterval(() => {
                this.setState({
                    name: 'Kunik Jain Updated'
                })
            }, 2000)
        }   
  render() {
    console.log('ParentComponent1 render')
    return (
      <div>ParentComponent1
        <MemmoComponent name={this.state.name}/>
        {/* <RegularComponent name = {this.state.name}/>
        <PureComp  name = {this.state.name}/> */}
      </div>
    )
  }
}

export default ParentComponent1