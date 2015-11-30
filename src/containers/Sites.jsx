import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import PureRenderMixin from 'react-addons-pure-render-mixin'
import LoadingIndicator from '../components/LoadingIndicator'
import SiteList from '../components/SiteList'
import * as SiteActions from '../actions/sites'
import Theme from '../theme'

const Sites = React.createClass({

  propTypes: {
    isLoading: PropTypes.bool,
    query:     PropTypes.string,
    sites:     PropTypes.arrayOf(PropTypes.object),
  },

  mixins: [PureRenderMixin],

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
          xdebug={this.props.services.xdebug.enabled}
          onSearch={event => this.props.dispatch(SiteActions.searchSites(event.target.value))}
        />
      </div>
    )
  },
})

const selector = state => Object.assign({},
  state.status.toJS(),
  state.sites.toJS()
)

export default connect(selector)(Sites)
