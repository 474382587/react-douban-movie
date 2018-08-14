import React from 'react'

class Header extends React.Component {
  handleInput = e => {
    const data = e.target.value
    this.props.handleInput(data)
  }
  handleClick = e => {
    e.preventDefault()
    this.props.handleClick()
  }
  render() {
    return (
      <div className="search-container">
        <form action="" className="search" onSubmit={this.handleClick}>
          <input
            type="text"
            placeholder="请输入电影名称"
            onChange={this.handleInput}
          />
          <button type="submit">搜索</button>
        </form>
      </div>
    )
  }
}

export default Header