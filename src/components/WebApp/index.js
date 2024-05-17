// Write your code here
import {Component} from 'react'
import Loader from 'react-loader-spinner'
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css'

import ImageItem from '../ImageItem'
import TabItem from '../TabItem'

import './index.css'

const tabsList = [
  {tabId: 'Mountain', displayText: 'Mountain'},
  {tabId: 'Flowers', displayText: 'Flowers'},
  {tabId: 'Beaches', displayText: 'Beaches'},
  {tabId: 'Cities', displayText: 'Cities'},
  {tabId: 'Animal', displayText: 'Animal'},
  {tabId: 'London', displayText: 'London'},
  {tabId: 'Plants', displayText: 'Plants'},
]

class WebApp extends Component {
  state = {
    imagesList: [],
    isLoading: true,
    activeTabId: tabsList[0].tabId,
    searchInput: '',
  }

  componentDidMount() {
    this.getImagesData()
  }

  onChangeSearchInput = event => {
    this.setState({searchInput: event.target.value})
  }

  onClickTabUpdate = value => {
    this.setState({activeTabId: value}, this.getImagesData)
  }

  getImagesData = async () => {
    const {activeTabId} = this.state
    this.setState({isLoading: true})
    const url = `https://api.unsplash.com/search/photos?query=${activeTabId}&client_id=qwhKpPLZDWrkiCIGbebbKDULPccJRJgY_owGWj_UWNM`
    const response = await fetch(url)
    const fetchData = await response.json()
    console.log(fetchData)
    const updatedData = fetchData.results.map(each => ({
      altDescription: each.alt_description,
      imageUrl: each.urls.small,
      id: each.id,
    }))
    this.setState({imagesList: updatedData, isLoading: false})
  }

  renderImagesCon = () => {
    const {imagesList} = this.state
    return (
      <ul className="images-con">
        {imagesList.map(each => (
          <ImageItem key={each.id} imageDetails={each} />
        ))}
      </ul>
    )
  }

  renderLoader = () => (
    <div className="loader-container">
      <Loader type="Rings" color="#00BFFF" height={200} width={200} />
    </div>
  )

  render() {
    const {isLoading, searchInput} = this.state
    return (
      <div className="app-con">
        <h1 className="head">Image Search App</h1>
        <form className="but-con">
          <div className="con">
            <input
              type="search"
              className="input-box"
              onChange={this.onChangeSearchInput}
              value={searchInput}
            />
            <button type="button">Search</button>
          </div>
          <ul className="tabs-container">
            {tabsList.map(eachItem => (
              <TabItem
                tabDetails={eachItem}
                key={eachItem.tabId}
                onClickTabUpdate={this.onClickTabUpdate}
              />
            ))}
          </ul>
        </form>
        {isLoading ? this.renderLoader() : this.renderImagesCon()}
      </div>
    )
  }
}

export default WebApp
