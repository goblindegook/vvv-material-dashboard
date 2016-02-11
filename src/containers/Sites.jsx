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
    if (!this.props.sites.get('sites').count()) {
      this.props.dispatch(SiteActions.fetchSites())
    }
  },

  render() {
    const props = Object.assign({},
      this.props.services.toJS(),
      this.props.sites.toJS()
    )

    return (
      <div>
        <LoadingIndicator {...props} />
        <SiteList {...props}
          xdebug={props.services.xdebug && props.services.xdebug.enabled}
          onSearch={event => this.props.dispatch(SiteActions.searchSites(event.target.value))}
        />
      </div>
    )
  },
})

const selector = state => pick(state, ['services', 'sites'])

export default connect(selector)(Sites)
