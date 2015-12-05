import React, { PropTypes } from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'
import MUI from 'material-ui'
import SvgIcons from 'material-ui/lib/svg-icons'
import IconDatabase from './icons/IconDatabase'
import IconOpcache from './icons/IconOpcache'
import IconProfiler from './icons/IconProfiler'

const {
  List,
  ListItem,
  SvgIcon,
} = MUI

const {
  ActionInfo,
  ContentMail,
} = SvgIcons

const ToolList = props => (
  <List subheader='Tools'>
    <ListItem
      primaryText='phpMyAdmin'
      href='/database-admin/'
      leftIcon={<SvgIcon><IconDatabase /></SvgIcon>}
    />
    <ListItem
      primaryText='phpMemcachedAdmin'
      href='/memcached-admin/'
      leftIcon={<SvgIcon><IconDatabase /></SvgIcon>}
    />
    <ListItem
      primaryText='Opcache Status'
      href='/opcache-status/opcache.php'
      leftIcon={<SvgIcon><IconOpcache /></SvgIcon>}
    />
    <ListItem
      primaryText='Webgrind'
      href='/webgrind/'
      leftIcon={<SvgIcon><IconProfiler /></SvgIcon>}
    />
    <ListItem
      primaryText='PHP Info'
      href='/phpinfo/'
      leftIcon={<ActionInfo />}
    />
    <ListItem
      primaryText='Mailcatcher'
      href='http://vvv.dev:1080/'
      leftIcon={<ContentMail />}
    />
  </List>
)

ToolList.mixins = [PureRenderMixin]

ToolList.propTypes = {}

export default ToolList
