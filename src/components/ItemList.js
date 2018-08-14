import React from 'react'
import MoveItem from './MovieItem'
class ItemList extends React.Component {
  render() {
    return (
      <div className="item-list">
        {this.props.itemList.map((item, index) => {
          return <MoveItem key={index} item={item}>Item</MoveItem>
        })}
      </div>
    )
  }
}
export default ItemList
