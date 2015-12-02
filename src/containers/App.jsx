import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import { pushState } from 'redux-router'
import PureRenderMixin from 'react-addons-pure-render-mixin'
import TimerMixin from 'react-timer-mixin'
import MUI from 'material-ui'
import ThemeManager from 'material-ui/lib/styles/theme-manager'
import LoadingIndicator from '../components/LoadingIndicator'
import SiteList from '../components/SiteList'
import Tools from '../components/Tools'
import ServiceList from '../components/ServiceList'
import * as SiteActions from '../actions/sites'
import * as ServiceActions from '../actions/services'
import Theme from '../theme'

const {
  AppBar,
  AppCanvas,
  Badge,
  Paper,
  Tabs,
  Tab,
} = MUI

const App = React.createClass({

  propTypes: {
    children:  PropTypes.any,
  },

  mixins: [PureRenderMixin, TimerMixin],

  childContextTypes : {
    muiTheme: React.PropTypes.object,
  },

  getChildContext() {
    return {
      muiTheme: ThemeManager.getMuiTheme(Theme),
    }
  },

  componentDidMount() {
    this.props.dispatch(ServiceActions.getStatus())

    this.setInterval(() => {
      this.props.dispatch(ServiceActions.getStatus())
    }, 30000)
  },

  render() {
    return (
      <AppCanvas>
        <AppBar
          title='Varying Vagrant Vagrants'
          showMenuIconButton={false}
          zDepth={2}
          style={styles.appbar}
          iconElementRight={
            <Tabs>
              <Tab
                label='Sites'
                route='/sites'
                onActive={this._navigateToTab}
                style={styles.tab}
              />
              <Tab
                label='About'
                route='/about'
                onActive={this._navigateToTab}
                style={styles.tab}
              />
            </Tabs>
          }
        />
        <div style={styles.root}>
          <section style={styles.content}>
            {this.props.children}
          </section>
          <aside style={styles.sidebar}>
            <Tools />
            <ServiceList
              services={this.props.services}
              onServiceToggle={(event, toggled) => {
                this.props.dispatch(ServiceActions.setStatus(event.target.name, toggled ? 'on' : 'off'))
              }}
            />
          </aside>
        </div>
      </AppCanvas>
    )
  },

  _navigateToTab(tab) {
    this.props.dispatch(pushState(null, tab.props.route))
  },
})

const styles = {
  root: {
    display: 'flex',
  },
  appbar: {
    position: 'fixed',
  },
  content: {
    flex: 3,
    flexDirection: 'row',
    padding: '24px 16px',
    marginTop: 64,
  },
  sidebar: {
    flex: 1,
    padding: 16,
    paddingLeft: 0,
    marginTop: 64,
  },
  tab: {
    padding: 24,
    paddingTop: 16,
  },
}

const selector = state => Object.assign({},
  state.services.toJS(),
  state.sites.toJS()
)

export default connect(selector)(App)
