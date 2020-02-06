import React, { Component } from "react";
import './styles/App.less'
import './styles/test.less'
import { square } from './test'
console.log(square(1111111111111111))
// console.log({square})
class App extends Component {
  render () {
    return <div className="test ttt">App</div>
  }
}

export default App