import React from 'react'
import { render } from 'react-dom'
import PureRenderMixin from 'react-addons-pure-render-mixin'
import MUI from 'material-ui'
import SvgIcons from 'material-ui/lib/svg-icons'

const {
  TextField,
  Paper,
} = MUI

const {
  ActionSearch,
} = SvgIcons

const Search = props => (
  <Paper style={Object.assign({}, styles.search, props.containerStyle)} zDepth={1}>
    <ActionSearch style={Object.assign({}, styles.searchIcon, props.iconStyle)} />
    <TextField
      type='text'
      fullWidth
      {...props}
    />
  </Paper>
)

Search.propTypes = {
  containerStyle: React.PropTypes.object,
  iconStyle:      React.PropTypes.object,
  onChange:       React.PropTypes.func,
  placeholder:    React.PropTypes.string,
  value:          React.PropTypes.string,
}

Search.mixins = [PureRenderMixin]

const styles = {
  search: {
    display: 'flex',
    flexDirection: 'row',
    marginBottom: 16,
    padding: 8,
    paddingLeft: 16,
    paddingRight: 16,
  },
  searchIcon: {
    margin: '.8rem',
    marginLeft: 0,
  },
}

export default Search
