import React from 'react'
import Axios from 'axios'

class Detail extends React.Component {
  state = {
    image: '',
    title: '',
    directors: '',
    casts: '',
    intro: '',
    completed: false
  }
  backToPrevious = () => {
    this.props.history.goBack()
  }
  componentDidMount() {
    this.getData()
  }
  getData() {
    const buildUrl = 'https://cors-anywhere.herokuapp.com/http://api.douban.com/v2/movie/subject/'
    const devUrl = ''
    
    console.log('Going to get data from test JSON file * * * ')
    Axios.get('/detail.json').then(res => {
      this.setState(() => {
        return {
          title: res.data.title,
          directors: res.data.directors.map(e => e.name).join('，'),
          casts: res.data.casts.map(e => e.name).join('，'),
          intro: res.data.summary,
          image: res.data.images.small,
          completed: true
        }
      })
    })
  }
  render() {
    if(!this.state.completed){
      return (
        <div className="lds-hourglass" />
      )
    }
    return (
      <div>
        <div className="detail" disabled={this.completed}>
          <div className="back-button" onClick={this.backToPrevious}>
            返回
          </div>
          <div className="detail__image-wrapper">
            <img className="detail__image" src={this.state.image} alt="" />
          </div>
          <div className="detail__content-wrapper">
            <ul className="info">
              <li className="title">{ this.state.title }</li>
              <li className="director">
                导演：
                { this.state.directors }
              </li>
              <li className="cast">
                主演：
                { this.state.casts }
              </li>
            </ul>
            <div className="intro">
              <p className="intro-title">简介</p>
              <p className="intro-content">{ this.state.intro }</p>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default Detail
