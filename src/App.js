import React, { Component } from 'react'
import './App.css';
import emojis from './emojis'
import debounce from 'lodash/debounce'
import { withStyles } from '@material-ui/core/styles'
import Snackbar from '@material-ui/core/Snackbar'
import SearchBar from './SearchBar'
import SearchResults from './SearchResults'
import EmojiDetails from './EmojiDetails'
import copy from 'clipboard-copy'
import { parseUnicodes } from './utils'

const styles = theme => ({
  close: {
    padding: theme.spacing.unit / 2,
  },
})

class App extends Component {

  state = {
    emojis: emojis,
    searchTerm: '',
    selected: null,
    hover: null,
    maxNumOfResults: 400,
    open: false
  }

  updateSearchTerm = debounce(event => {    
    this.setState({
      maxNumOfResults: 400,
      searchTerm: event.target.value
    })
  }, 30)

  handleChange = event => {
    event.persist()
    this.updateSearchTerm(event)
  }

  handleSelect = result => {
    copy(parseUnicodes(result.codes))
      .then(this.setState({ open: true }))

    this.setState({
      selected: result
    })
  }

  handleHover = result => {
    this.setState({
      hover: result
    })
  }

  handleLoadMore = () => {
    this.setState(prevState => (
      {
        maxNumOfResults: prevState.maxNumOfResults + 250
      }
    ))
  }

  handleClose = () => this.setState({ open: false })

  filterEmojis = (emojis, searchTerm) => 
    emojis
      .filter(e => 
        e.name.concat(e.keywords).toLowerCase().indexOf(searchTerm.toLowerCase()) !== -1
      )

  render() {
    const { emojis, searchTerm, selected, hover, maxNumOfResults } = this.state
    const results = this.filterEmojis(emojis, searchTerm)

    return (
      <div className="App">

        <header className="app-header content">
          <SearchBar 
            searchResults={results}
            allResults={emojis}
            onSearch={this.handleChange}
          />
          {hover && <EmojiDetails data={this.state.hover} />}
        </header>

        <main>
          <header className="app-header content hidden" style={{ position: 'static' }}>
            <SearchBar 
              searchResults={results}
              allResults={emojis}
              onSearch={this.handleChange}
            />
            {hover && <EmojiDetails data={this.state.hover} />}
          </header>

          <SearchResults 
            results={results}
            maxNumOfResults={maxNumOfResults}
            onSelect={this.handleSelect}
            onHover={this.handleHover}
            onLoadMore={this.handleLoadMore}
          />
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
