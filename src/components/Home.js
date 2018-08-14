import React from 'react'
import Header from './Header'
import ItemList from './ItemList'
import Axios from 'axios'
import Loader from './Loader'

class Home extends React.Component {
  state = {
    keywords: '',
    start: 0,
    itemList: [],
    allLoaded: false,
    completeLoading: false
  }
  throttle(fn, delay) {
    var timer = null
    return function() {
      clearTimeout(timer)
      timer = setTimeout(function() {
        fn()
      }, delay)
    }
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
    this.setState(() => {
      return { keywords: data }
    })
  }
  getData() {
    console.log('Going to get data from test JSON file * * * ')
    // DEV and Prodution 
    const devUrl = ''
    const prodUrl = 'https://cors-anywhere.herokuapp.com/http://api.douban.com/v2/movie/top250?start='

    var promiseArray = []
      this.setState(prevState => {
        return {
          completeLoading: false
        }
      })
      promiseArray.push(Axios.get(prodUrl + this.state.start))
      promiseArray.push(Axios.get(prodUrl + (this.state.start + 20)))
      promiseArray.push(Axios.get(prodUrl + (this.state.start + 40)))
      Promise.all(promiseArray).then(res=>{
        console.log(res)
          res.forEach(e=>{
            if (e.data.subjects.length === 0) {
              this.setState(prevState => {
                return {
                  allLoaded: true
                }
              })
            } 
            !e.data.subjects.length ? '' : this.setState(prevState => {
              return {
                itemList:[...prevState.itemList,...e.data.subjects]
              }
            })
          })
          this.setState(prevState => {
            return {
              completeLoading: true,
              start: prevState.start + 60
            }
          })
          console.log("cong zhe li kai shi " + this.state.start)
      })



    // Axios.get('/test.json').then(res => {
    //   console.log(...res.data.subjects)
    //   this.setState(prevState => {
    //     return {
    //       itemList:[...prevState.itemList,...res.data.subjects] //prevState.itemList.concat(res.data.subjects)
    //     }
    //   })
    // })
  }
  componentDidMount() {
    this.getData()
    window.addEventListener(
      'scroll',
      // 函数节流
      this.throttle(() => {
        if (
          //判断是否到底
          !this.state.allLoaded && this.state.completeLoading &&
          window.pageYOffset + window.innerHeight >
            document.documentElement.scrollHeight - 300
        ) {
          console.log('新的一轮')
          this.getData()
        }
        //判断是否下拉
      }, 60),
      false
    )
  }
  render() {
    return (
      <div>
        <Header handleInput={this.handleInput} handleClick={this.handleClick} />
        <ItemList itemList={this.state.itemList} title="豆瓣电影 Top250"/>
        {!this.state.completeLoading && <Loader />}
      </div>
    )
  }
}

export default Home
