import React from 'react'
import Radio from '@material-ui/core/Radio'
import RadioGroup from '@material-ui/core/RadioGroup'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import { withStyles } from '@material-ui/core/styles'
import { pluralize } from './utils'

const styles = theme => ({
  root: {
    flexDirection: 'row'
  },
  group: {
    flexDirection: 'row',
    margin: `0 0 0 0.6rem`,
  },
});

const StyledRadio = withStyles({
  root: {
    padding: `0 0.2rem`
  }
})(Radio)

function SearchBar({ classes, searchResults, allResults, selectedCodeType, onSearch, onCodeTypeSelect }) {

  const handleChange = e => onCodeTypeSelect(e.target.value)

  return <section className="search-bar">
    <input
      className="search-input" 
      autoFocus={true} 
      onChange={onSearch} 
      type="text" 
      placeholder="type to search" 
    />
    <section className="result-stats">
      {`${searchResults.length} / ${allResults.length} ${pluralize('result', 'results', searchResults.length)}`}
    </section>

    <section className="code-type-radio">
      <div className="tip">click emoji to copy</div>
      <RadioGroup
        className={classes.group}
        aria-label="Code Type"
        name="codeType"
        value={selectedCodeType}
        onChange={handleChange}
      >
        <FormControlLabel value="character" control={<StyledRadio />} label="character" />
        <FormControlLabel value="html" control={<StyledRadio />} label="html code" />
        <FormControlLabel value="hex" control={<StyledRadio />} label="hex code" />
      </RadioGroup>
    </section>
  </section>
}

export default withStyles(styles)(SearchBar)