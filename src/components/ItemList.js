import React from 'react'

class ItemList extends React.Component {
  render() {
    return (
      <div>
        <h3>{this.props.title || '豆瓣电影'}</h3>
        {this.props.itemList.map((item, index) => {
          return <div key={index}>Item</div>
        })}
      </div>
    )
  }
}
export default ItemList
