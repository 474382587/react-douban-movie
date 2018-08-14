import React from 'react'
import Header from './Header'
import ItemList from './ItemList'
class Home extends React.Component {
  state = {
    keywords: ''
  }
  componentWillMount() {
    console.log(this.props.history)
  } 
  handleClick = () => {
    this.props.history.push('/detail/' + this.state.keywords)
  }
  handleInput = data => {
    this.setState(preState => {
      return { keywords: data }
    })
  }
  render() {
    return (
      <div>
        <Header handleInput={this.handleInput} handleClick={this.handleClick} />
        <ItemList itemList={[0,1,2]} />
      </div>
    )
  }
}

export default Home
