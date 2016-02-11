import React from 'react'
import { render } from 'react-dom'
import { ListItem, Toggle } from 'material-ui'
import * as ServiceActions from '../actions/services'

const Service = props => (
  <ListItem
    primaryText={props.name}
    rightToggle={<Toggle
      name={props.handle}
      defaultToggled={props.enabled}
      disabled={props.locked}
      onToggle={(event, toggled) => props.onServiceToggle(props.handle, toggled)}
    />}
  />
)

Service.propTypes = {
  handle:          React.PropTypes.string,
  name:            React.PropTypes.string,
  enabled:         React.PropTypes.bool,
  locked:          React.PropTypes.bool,
  onServiceToggle: React.PropTypes.func,
}

export default Service
