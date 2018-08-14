import React from 'react'
import Header from './Header'
import ItemList from './ItemList'
import Axios from 'axios'

class Home extends React.Component {
  state = {
    keywords: '',
    itemList: []
  }
  storeDataToLocalStorage() {
    // Store Data Here Before Going To Detail Page
    const itemList = JSON.stringify(this.state.itemList)
    localStorage.setItem('itemList', itemList)
  }
  handleClick = () => {
    this.props.history.push('/search/' + this.state.keywords)
  }
  componentWillUnmount(){
    this.storeDataToLocalStorage()
  }
  handleInput = data => {
    this.setState(preState => {
      return { keywords: data }
    })
  }
  getData() {
    console.log('Going to get data from test JSON file * * * ')
    Axios.get('/test.json').then(res => {
      console.log(...res.data.subjects)
      this.setState(prevState => {
        return {
          itemList:[...prevState.itemList,...res.data.subjects] //prevState.itemList.concat(res.data.subjects)
        }
      })
    })
  }
  componentDidMount() {
    this.getData()
  }
  render() {
    return (
      <div>
        <Header handleInput={this.handleInput} handleClick={this.handleClick} />
        <ItemList itemList={this.state.itemList} title="豆瓣电影 Top250"/>
      </div>
    )
  }
}

export default Home
