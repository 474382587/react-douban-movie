import React from 'react'
import Axios from 'axios'
import ItemList from './ItemList'

class SearchResult extends React.Component {
  render() {
    return (
      <div>
        <ItemList itemList={this.state.itemList} title="豆瓣电影 Top250"/>
      </div>
    )
  }
}

export default SearchResult