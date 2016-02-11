import React from 'react'
import { render } from 'react-dom'
import MUI from 'material-ui'
import Search from './Search'
import Site from './Site'

const {
  GridList,
  List,
} = MUI

function filterSites(sites, query) {
  return sites
    .filter(item => !query || item.key.match(RegExp(query, 'i')))
    .sort((a, b) => a.key.localeCompare(b.key))
}

const SiteList = props => (
  <div style={Object.assign({}, styles.container, props.isWaiting && styles.hidden)}>
    <Search
      placeholder='Search sites'
      onChange={props.onSearch}
      value={props.query}
    />
    <List style={Object.assign({}, styles.list, !filterSites(props.sites, props.query).length && styles.hidden)}>
      {filterSites(props.sites, props.query)
        .map(item => (
          <Site {...props}
            key={item.key}
            debug={item.debug}
            hosts={item.hosts}
            name={item.key}
            cms={item.cms}
            style={styles.site}
          />
        ))}
    </List>
  </div>
)

SiteList.propTypes = {
  onSearch: React.PropTypes.func,
  query:    React.PropTypes.string,
  sites:    React.PropTypes.arrayOf(React.PropTypes.object),
  xdebug:   React.PropTypes.bool,
}

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
  },
  list: {
    backgroundColor: '#eee',
  },
  hidden: {
    display: 'none',
  },
  site: {
    marginBottom: 16,
  },
}

export default SiteList
