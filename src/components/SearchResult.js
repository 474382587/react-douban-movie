import React from 'react'
import Axios from 'axios'
import ItemList from './ItemList'
import Loader from './Loader'
import Title from './Title'

class SearchResult extends React.Component {
  // state
  state = {
    start: 0,
    itemList: [],
    allLoaded: false,
    completeLoading: false
  }
  // store data
  storeDataToLocalStorage() {
    // Store Data Here Before Going To Detail Page
    const storedState = JSON.stringify(this.state)
    localStorage.setItem('searchResult', storedState)
  }
  // check local storage
  itemListCache() {
    const storedState = JSON.parse(localStorage.getItem('searchResult'))
    console.log('searchResult', storedState)
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
      'https://cors-anywhere.herokuapp.com/http://api.douban.com/v2/movie/search?q=?' +
      this.props.match.params.id +
      '&start='

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
  }
  // throttle function
  throttle(fn, delay) {
    var timer = null
    return function() {
      clearTimeout(timer)
      timer = setTimeout(function() {
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
        this.setState(
          {
            completeLoading: false
          },
          () => {
            this.getData()
          }
        )
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
  backToPrevious = () => {
    localStorage.removeItem('searchResult')
    this.props.history.goBack()
  }
  render() {
    return (
      <div className="search-result">
        <div className="back-button" onClick={this.backToPrevious}>
          返回
        </div>
        <Title title={`搜索：${this.props.match.params.id}`} />
        <ItemList itemList={this.state.itemList} />
        {!this.state.completeLoading && <Loader />}
        {this.state.allLoaded && <div className="end">到底了朋友</div>}
      </div>
    )
  }
}

export default SearchResult
