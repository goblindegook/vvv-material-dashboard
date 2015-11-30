import React, { PropTypes } from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'
import MUI from 'material-ui'
import SvgIcons from 'material-ui/lib/svg-icons'

const {
  List,
  ListItem,
} = MUI

const {
  ActionBugReport,
} = SvgIcons

const ServiceList = props => (
  <List subheader='Status'>
    <ListItem
      disabled={true}
      leftIcon={<ActionBugReport style={props.services.xdebug.enabled ? styles.active : styles.inactive} />}
      primaryText={props.services.xdebug.name}
    />
  </List>
)

ServiceList.mixins = [PureRenderMixin]

ServiceList.propTypes = {}

const styles = {
  active: {
    fill: '#0a0',
  },
  inactive: {
    fill: '#a00',
  },
}

export default ServiceList
