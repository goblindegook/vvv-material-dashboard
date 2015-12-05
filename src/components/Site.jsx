import React from 'react'
import { render } from 'react-dom'
import PureRenderMixin from 'react-addons-pure-render-mixin'
import MUI from 'material-ui'
import Highlight from 'react-highlighter'
import WordPressIcon from '../images/wordpress.png'

const {
  Avatar,
  Card,
  CardHeader,
  CardText,
  CardTitle,
  CardMedia,
  CardActions,
  FlatButton,
  RaisedButton,
  SvgIcon,
  List,
  ListItem,
} = MUI

const getHostUrl        = host => 'http://' + host
const getSiteActionKey  = (item, action = '') => item.hosts[0] + '_' + action
const getSiteUrl        = (item, path = '') => getHostUrl(item.hosts[0]) + path
const getSiteAdminUrl   = item => getSiteUrl(item, '/wp-admin/')
const getSiteProfileUrl = item => getSiteUrl(item, '?XDEBUG_PROFILE')

const Site = props => {

  const actions = [
    <RaisedButton
      href={getSiteUrl(props)}
      label='Visit'
      primary={true}
      linkButton={true}
      key={getSiteActionKey(props, 'view')}
    />
  ]

  if (props.cms === 'wordpress') {
    actions.push(
      <RaisedButton
        href={getSiteAdminUrl(props)}
        label='Admin'
        secondary={true}
        linkButton={true}
        key={getSiteActionKey(props, 'admin')}
      />
    )
  }

  if (props.xdebug) {
    actions.push(
      <FlatButton
        href={getSiteProfileUrl(props)}
        label='Profile'
        linkButton={true}
        key={getSiteActionKey(props, 'profile')}
      />
    )
  }

  return (
    <Card initiallyExpanded={false} style={props.style} zDepth={1}>
      <CardHeader
        title={props.query ? <Highlight search={props.query}>{props.name}</Highlight> : props.name}
        subtitle={props.debug ? 'Debug Mode' : ''}
        avatar={props.cms === 'wordpress' ? <Avatar src={WordPressIcon} /> : <Avatar>{props.name[0].toUpperCase()}</Avatar>}
        showExpandableButton={props.hosts.length > 1}
      />
      <CardActions>
        {actions}
      </CardActions>
      <CardText expandable={true}>
        <List>
          {props.hosts.length > 1
            ? props.hosts.map(host => <ListItem key={host} primaryText={host} href={getHostUrl(host)} />)
            : []}
        </List>
      </CardText>
    </Card>
  )
}

Site.mixins = [PureRenderMixin]

Site.propTypes = {
  key:    React.PropTypes.string,
  name:   React.PropTypes.string,
  debug:  React.PropTypes.bool,
  hosts:  React.PropTypes.arrayOf(React.PropTypes.string),
  query:  React.PropTypes.string,
  cms:    React.PropTypes.string,
  style:  React.PropTypes.object,
  xdebug: React.PropTypes.bool,
}

export default Site
