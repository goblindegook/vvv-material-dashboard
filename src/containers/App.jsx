import isEmpty from 'lodash/isEmpty'
import pick from 'lodash/pick'
import throttle from 'lodash/throttle'
import Immutable from 'immutable'
import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import { routeActions } from 'react-router-redux'
import { AppBar, AppCanvas, Paper, Styles, Tabs, Tab } from 'material-ui'
import ThemeManager from 'material-ui/lib/styles/theme-manager'
import SiteList from '../components/SiteList'
import ToolList from '../components/ToolList'
import ServiceList from '../components/ServiceList'
import { resizeWindow } from '../actions/app'
import { getServiceStatus, setServiceStatus } from '../actions/services'
import Theme from '../theme'

const {
  Colors,
  Spacing,
  Typography,
} = Styles

const appTabs = [
  {
    label: 'Sites',
    route: '/sites',
  },
  {
    label: 'About',
    route: '/about',
  }
]

const App = React.createClass({

  contextTypes : {
    muiTheme: React.PropTypes.object,
  },

  childContextTypes : {
    muiTheme: React.PropTypes.object,
  },

  propTypes: {
    app:      React.PropTypes.instanceOf(Immutable.Map),
    children: React.PropTypes.node,
    services: React.PropTypes.instanceOf(Immutable.Map),
  },

  /**
   * Applies custom theme to application.
   * @return {Object} Child context.
   */
  getChildContext() {
    return {
      muiTheme: ThemeManager.getMuiTheme(Theme),
    }
  },

  /**
   * Start component lifecycle.
   *
   * Gets VVV service status on start and every 30 seconds.
   */
  componentDidMount() {
    this.props.dispatch(getServiceStatus())

    if (!this._serviceRefreshInterval) {
      this._serviceRefreshInterval = setInterval(() => {
        this.props.dispatch(getServiceStatus())
      }, 30000)
    }

    this._resizeWindow = throttle(() => {
      this.props.dispatch(resizeWindow(window.innerWidth, window.innerHeight))
    }, 1000/60)

    addEventListener('resize', this._resizeWindow)
  },

  /**
   * End cmponent lifecycle.
   */
  componentWillUnmount() {
    clearInterval(this._serviceRefreshInterval)
    removeEventListener('resize', this._resizeWindow)
  },

  /**
   * Renders the application.
   */
  render() {
    const state = {
      app:      this.props.app.toJS(),
      services: this.props.services.toJS(),
    }

    return (
      <AppCanvas>
        <AppBar
          title='Varying Vagrant Vagrants'
          showMenuIconButton={false}
          zDepth={2}
          onTitleTouchTap={() => this.props.dispatch(routeActions.push('/sites'))}
          iconStyleRight={styles.tabs}
          iconElementRight={
            <Tabs>
              {appTabs.map(tab => (
                // TODO: Set to active when current route equals tab.route
                <Tab {...tab}
                  onActive={() => this.props.dispatch(routeActions.push(tab.route))}
                  style={styles.tab}
                />
              ))}
            </Tabs>
          }
        />
        <div style={Object.assign({}, styles.root,
          state.app.width >= 992 && styles.large.root
        )}>
          <section style={styles.content}>
            {this.props.children}
          </section>
          <aside style={Object.assign({}, styles.sidebar,
            state.app.width >= 992 && styles.large.sidebar
          )}>
            <Paper style={styles.box}>
              <ToolList />
            </Paper>
            <Paper style={styles.box}>
              <ServiceList
                isWaiting={isEmpty(state.services.serviceList)}
                services={state.services.serviceList}
                onServiceToggle={(service, toggled) => {
                  this.props.dispatch(setServiceStatus(service, toggled ? 'on' : 'off'))
                }}
              />
            </Paper>
          </aside>
        </div>
      </AppCanvas>
    )
  },

})

const styles = {
  root: {
    backgroundColor: '#eee',
    display: 'flex',
    flexDirection: 'column',
    padding: '88px 16px 0',
  },
  appbar: {
  },
  content: {
    flex: 3,
  },
  sidebar: {
    flex: 1,
  },
  box: {
    marginBottom: 16,
  },
  tabs: {
    margin: 0,
  },
  tab: {
    minHeight: 64
  },
  large: {
    root: {
      flexDirection: 'row',
    },
    sidebar: {
      paddingLeft: 16,
    },
  }
}

const selector = state => pick(state, ['app', 'services'])

export default connect(selector)(App)
