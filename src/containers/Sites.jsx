import pick from 'lodash/pick'
import Immutable from 'immutable'
import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import LoadingIndicator from '../components/LoadingIndicator'
import SiteList from '../components/SiteList'
import * as SiteActions from '../actions/sites'
import Theme from '../theme'

const Sites = React.createClass({

  propTypes: {
    services: React.PropTypes.instanceOf(Immutable.Map),
    sites:    React.PropTypes.instanceOf(Immutable.Map),
  },

  componentDidMount() {
    if (!this.props.sites.get('siteList').size) {
      this.props.dispatch(SiteActions.fetchSites())
    }
  },

  render() {
    const state = {
      services: this.props.services.toJS(),
      sites:    this.props.sites.toJS(),
    }

    return (
      <div>
        <LoadingIndicator isWaiting={state.sites.isWaiting} />
        <SiteList
          isWaiting={state.sites.isWaiting}
          query={state.sites.query}
          sites={state.sites.siteList}
          xdebug={state.services.serviceList.xdebug && state.services.serviceList.xdebug.enabled}
          onSearch={event => this.props.dispatch(SiteActions.searchSites(event.target.value))}
        />
      </div>
    )
  },
})

const selector = state => pick(state, ['services', 'sites'])

export default connect(selector)(Sites)
