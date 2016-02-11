import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import LoadingIndicator from '../components/LoadingIndicator'
import SiteList from '../components/SiteList'
import * as SiteActions from '../actions/sites'
import Theme from '../theme'

const Sites = React.createClass({

  propTypes: {
    isWaiting: PropTypes.bool,
    query:     PropTypes.string,
    sites:     PropTypes.arrayOf(PropTypes.object),
  },

  componentDidMount() {
    if (!this.props.sites.length) {
      this.props.dispatch(SiteActions.fetchSites())
    }
  },

  render() {
    return (
      <div>
        <LoadingIndicator {...this.props} />
        <SiteList {...this.props}
          xdebug={this.props.services.xdebug && this.props.services.xdebug.enabled}
          onSearch={event => this.props.dispatch(SiteActions.searchSites(event.target.value))}
        />
      </div>
    )
  },
})

const selector = state => Object.assign({},
  state.services.toJS(),
  state.sites.toJS()
)

export default connect(selector)(Sites)
