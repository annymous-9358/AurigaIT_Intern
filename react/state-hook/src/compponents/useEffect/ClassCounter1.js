import React, { Component } from 'react'

 class ClassCounter1 extends Component {
    constructor(props) {
        super(props)
        this.state = {
        count: 0,
        name: ''
        }
    }
    componentDidMount() {
        document.title = `Count: ${this.state.count}`
    }
    componentDidUpdate(prevProps, prevState) {
        if (prevState.count !== this.state.count) {
        console.log('Updating document title');
            document.title = `Count: ${this.state.count}`
        }
    }
  render() {
    return (
      <div>
        <input type="text" value={this.state.name} onChange={e => this.setState({ name: e.target.value })} />
        <button onClick={() => this.setState({ count: this.state.count + 1 })}>
          Increment Count: {this.state.count}
        </button>
      </div>
    )
  }
}

export default ClassCounter1