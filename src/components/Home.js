import React from 'react'
import Header from './Header'
import ItemList from './ItemList'
import Axios from 'axios'
import Loader from './Loader'

class Home extends React.Component {
  // state
  state = {
    keywords: '',
    start: 0,
    itemList: [],
    allLoaded: false,
    completeLoading: false
  }
  // search button
  handleClick = () => {
    this.props.history.push('/search/' + this.state.keywords)
  }

  // sync user input
  handleInput = data => {
    this.setState(() => {
      return { keywords: data }
    })
  }
  // store data
  storeDataToLocalStorage() {
    // Store Data Here Before Going To Detail Page
    const storedState = JSON.stringify(this.state)
    localStorage.setItem('storedState', storedState)
  }
  // check local storage
  itemListCache() {
    const storedState = JSON.parse(localStorage.getItem('storedState'))
    console.log('storedState', storedState)
    if (storedState) {
      this.setState(() => {
        return storedState
      })
      return true
    } else {
      return false
    }
  }

  // acquire data
  getData() {
    console.log('Going to get data from test JSON file * * * ')
    // DEV and Prodution
    const devUrl = ''
    const prodUrl =
      'https://cors-anywhere.herokuapp.com/http://api.douban.com/v2/movie/top250?start='

    var promiseArray = []
    
    promiseArray.push(Axios.get(prodUrl + this.state.start))
    promiseArray.push(Axios.get(prodUrl + (this.state.start + 20)))
    promiseArray.push(Axios.get(prodUrl + (this.state.start + 40)))
    Promise.all(promiseArray).then(res => {
      console.log(res)
      res.forEach(e => {
        if (e.data.subjects.length === 0) {
          this.setState(() => {
            return {
              allLoaded: true
            }
          })
        }
        !e.data.subjects.length
          ? ''
          : this.setState(prevState => {
              return {
                itemList: [...prevState.itemList, ...e.data.subjects]
              }
            })
      })
      this.setState(prevState => {
        return {
          completeLoading: true,
          start: prevState.start + 60
        }
      })
      this.storeDataToLocalStorage()
    })

    // console.log('网络连接...')

    // Axios.get('/test.json').then(res => {
    //   console.log(...res.data.subjects)
    //   this.setState(prevState => {
    //     return {
    //       itemList:[...prevState.itemList,...res.data.subjects] //prevState.itemList.concat(res.data.subjects)
    //     }
    //   })
    // })
  }
  // throttle function
  throttle(fn, delay) {
    var timer = null
    return function () {
      clearTimeout(timer)
      timer = setTimeout(function () {
        fn()
      }, delay)
    }
  }
  handleScroll = () => {
    return this.throttle(() => {
      console.log('Scrolling')
      if (
        //判断是否到底
        !this.state.allLoaded &&
        this.state.completeLoading &&
        window.pageYOffset + window.innerHeight >
        document.documentElement.scrollHeight - 300
      ) {
        this.setState({
            completeLoading: false
        }, () => {
          this.getData()
        })
        console.log('新的一轮')
      }
      //判断是否下拉
    }, 60)
  }

  // load data and add event listener to catch use scroll action
  componentDidMount() {
    this.itemListCache() || this.getData()
    window.addEventListener(
      'scroll',
      // 函数节流
      this.handleScroll(), 
      false
    )
  }
  componentWillUnmount() {
    window.removeEventListener(
      'scroll',
      // 函数节流
      this.handleScroll(),
      false
    )
  }
  // render jsx
  render() {
    return (
      <div>
        <Header handleInput={this.handleInput} handleClick={this.handleClick} />
        <ItemList itemList={this.state.itemList} title="豆瓣电影 Top250" />
        {!this.state.completeLoading && <Loader />}
        {this.state.allLoaded && <div className="end">到底了朋友</div>}
      </div>
    )
  }
}

export default Home
