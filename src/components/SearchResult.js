import React from 'react'
import Axios from 'axios'
import ItemList from './ItemList'

class SearchResult extends React.Component {

  componentDidMount() {
    this.getData()
  }
  getData = () => {
    const keywords = this.props.match.params.id
    console.log(keywords)
  }
  render() {
    return (
      <div>

      </div>
    )
  }
}

export default SearchResult