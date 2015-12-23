import _ from 'lodash'
import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import { pushState } from 'redux-router'
import PureRenderMixin from 'react-addons-pure-render-mixin'
import TimerMixin from 'react-timer-mixin'
import MUI from 'material-ui'
import ThemeManager from 'material-ui/lib/styles/theme-manager'
import SiteList from '../components/SiteList'
import ToolList from '../components/ToolList'
import ServiceList from '../components/ServiceList'
import { getServiceStatus, setServiceStatus } from '../actions/services'
import Theme from '../theme'

const {
  AppBar,
  AppCanvas,
  Mixins,
  Paper,
  Styles,
  Tabs,
  Tab,
} = MUI

const {
  StylePropable,
  StyleResizable,
} = Mixins

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
    children:  React.PropTypes.node,
    isWaiting: React.PropTypes.bool,
    services:  React.PropTypes.object,
  },

  mixins: [
    PureRenderMixin,
    StylePropable,
    StyleResizable,
    TimerMixin,
  ],

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
   * Gets VVV service status on start.
   */
  componentDidMount() {
    this.props.dispatch(getServiceStatus())

    this.setInterval(() => {
      this.props.dispatch(getServiceStatus())
    }, 30000)
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
          onTitleTouchTap={() => this.props.dispatch(pushState(null, '/sites'))}
          style={styles.appbar}
          iconElementRight={
            <Tabs>{appTabs.map(tab => (
              // TODO: Set to active when current route equals tab.route
              <Tab {...tab}
                onActive={() => this.props.dispatch(pushState(null, tab.route))}
                style={styles.tab}
              />
            ))}</Tabs>
          }
        />
        <div style={Object.assign({}, styles.root,
          this.isDeviceSize(StyleResizable.statics.Sizes.LARGE) && styles.large.root
        )}>
          <section style={styles.content}>
            {this.props.children}
          </section>
          <aside style={Object.assign({}, styles.sidebar,
            this.isDeviceSize(StyleResizable.statics.Sizes.LARGE) && styles.large.sidebar
          )}>
            <Paper style={styles.box}>
              <ToolList />
            </Paper>
            <Paper style={styles.box}>
              <ServiceList
                isWaiting={_.isEmpty(this.props.services)}
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
    padding: 16,
    paddingTop: 88,
  },
  appbar: {
    position: 'fixed',
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
  tab: {
    padding: 24,
    paddingTop: 16,
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

const selector = state => state.services.toJS()

export default connect(selector)(App)
