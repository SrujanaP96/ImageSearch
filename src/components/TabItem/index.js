import './index.css'

const TabItem = props => {
  const {tabDetails, onClickTabUpdate} = props
  const {displayText, tabId} = tabDetails

  const onClickTab = () => {
    onClickTabUpdate(tabId)
  }

  return (
    <li className="tab-item">
      <button className="tab-button" type="button" onClick={onClickTab}>
        {displayText}
      </button>
    </li>
  )
}

export default TabItem
