import React from 'react'

export default class EmojiItem extends React.Component {

  handleHover = () => this.props.onHover(this.props.data)
  handleClick = () => this.props.onSelect(this.props.data)

  shouldComponentUpdate = (nextProps) => {
    return this.props.data.no !== nextProps.data.no
  }

  render() {
    const { data } = this.props
    return <li
      title="click to copy" 
      className={`emoji-item`}
      onClick={this.handleClick}
      onMouseOver={this.handleHover} 
      key={data.no}>
      {data.char}
    </li>
  }
}