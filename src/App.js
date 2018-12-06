import React, { Component } from 'react'
import './App.css';
import emojis from './emojis'
import debounce from 'lodash/debounce'
import { withStyles } from '@material-ui/core/styles'
import Snackbar from '@material-ui/core/Snackbar'
import copy from 'clipboard-copy'

const styles = theme => ({
  close: {
    padding: theme.spacing.unit / 2,
  },
})

function pluralize(wordSingular, wordPlural, num) {
  return num === 1 ? wordSingular : wordPlural
}

function parseUnicodes(codes) {
  return codes.split(' ').map(code => `&#${parseInt(code, 16)};`).join('')
}

function EmojiDetails({ data }) {
  return <aside className="emoji-details">
    <p>{data.keywords}</p>
    <h2><span>{data.char}</span> {data.name}</h2>
    <h4>{parseUnicodes(data.codes)}</h4>
  </aside>
}

class EmojiItem extends React.Component {

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


class App extends Component {

  state = {
    emojis: emojis,
    searchTerm: '',
    selected: null,
    hover: null,
    amount: 400,
    open: false
  }

  updateSearchTerm = debounce(event => {    
    this.setState({
      amount: 400,
      searchTerm: event.target.value
    })
  }, 30)

  handleChange = event => {
    event.persist()
    this.updateSearchTerm(event)
  }

  select = result => {
    copy(parseUnicodes(result.codes))
      .then(this.setState({ open: true }))

    this.setState({
      selected: result
    })
  }

  hover = result => {
    this.setState({
      hover: result
    })
  }


  loadMore = () => {
    this.setState(prevState => (
      {
        amount: prevState.amount + 250
      }
    ))
  }

  renderSearchResults = (results, searchTerm) => {

    const { amount } = this.state
    return <ul className="search-results" style={{ display: 'flex' }}>
      {results.slice(0,amount).map(result => 
        <EmojiItem 
          key={result.no} 
          data={result}
          onSelect={this.select}
          onHover={this.hover} 
        />
      )}
      {amount < results.length && <button onClick={this.loadMore}>show more</button>}
    </ul>   
  }

  handleClose = () => this.setState({ open: false })

  render() {
    const { emojis, searchTerm, selected, hover } = this.state
    const results = emojis
      .filter(e => 
        e.name.concat(e.keywords).toLowerCase().indexOf(searchTerm.toLowerCase()) !== -1
      )

    return (
      <div className="App">

        <header className="app-header content">
          <section>
            <div className="search-box">
              <input autoFocus={true} onChange={this.handleChange} type="text" placeholder="type to search" />
            </div>
            <section className="result-stats">
              {`${results.length} / ${emojis.length} ${pluralize('emoji', 'emojis', results.length)}`}
            </section>
          </section>

          {hover && <EmojiDetails data={this.state.hover} />}

        </header>

        <main>
          {this.renderSearchResults(results, searchTerm)}
        </main>

        <footer className="content">
          <p>made with &#9749; by <a href="http://github.com/epoch">epoch</a></p>
        </footer>

        <Snackbar
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'right',
          }}
          open={this.state.open}
          autoHideDuration={3000}
          onClose={this.handleClose}
          ContentProps={{
            'aria-describedby': 'message-id',
          }}
          message={<span id="message-id">html code {selected && parseUnicodes(selected.codes)} copied</span>}
          action={[
            <div key="close" className="snackbar-close-btn" onClick={this.handleClose}>
              &#x274C;
            </div>,
          ]}
        />
      </div>
    );
  }
}

export default withStyles(styles)(App);
