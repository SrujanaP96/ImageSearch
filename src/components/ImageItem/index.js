import './index.css'

const ImageItem = props => {
  const {imageDetails} = props
  const {imageUrl, altDescription} = imageDetails
  return (
    <li className="box">
      <img src={imageUrl} className="img" alt={altDescription} />
    </li>
  )
}

export default ImageItem
