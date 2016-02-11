import throttle from 'lodash/throttle'
import isEmpty from 'lodash/isEmpty'
import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import { routeActions } from 'redux-simple-router'
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
    children: React.PropTypes.node,
    height:   React.PropTypes.number,
    services: React.PropTypes.object,
    width:    React.PropTypes.number,
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

    if (!this.serviceRefreshInterval) {
      this.serviceRefreshInterval = setInterval(() => {
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
    clearInterval(this.serviceRefreshInterval)
    removeEventListener('resize', this._resizeWindow)
  },

  /**
   * Renders the application.
   */
  render() {
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
          this.props.width >= 992 && styles.large.root
        )}>
          <section style={styles.content}>
            {this.props.children}
          </section>
          <aside style={Object.assign({}, styles.sidebar,
            this.props.width >= 992 && styles.large.sidebar
          )}>
            <Paper style={styles.box}>
              <ToolList />
            </Paper>
            <Paper style={styles.box}>
              <ServiceList
                isWaiting={isEmpty(this.props.services)}
                services={this.props.services}
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

const selector = state => Object.assign({},
  state.app.toJS(),
  state.services.toJS()
)

export default connect(selector)(App)
