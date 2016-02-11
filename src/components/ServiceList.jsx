import React, { PropTypes } from 'react'
import { List } from 'material-ui'
import LoadingIndicator from './LoadingIndicator'
import Service from './Service'

const ServiceList = props => (
  <List subheader='Status'>
    <LoadingIndicator key='_loading' isWaiting={props.isWaiting} />
    {Object.keys(props.services).map(key => (
      <Service
        key={key}
        handle={key}
        name={props.services[key].name}
        enabled={props.services[key].enabled}
        locked={props.services[key].locked}
        onServiceToggle={props.onServiceToggle}
      />
    ))}
  </List>
)

ServiceList.propTypes = {
  isWaiting:       React.PropTypes.bool,
  onServiceToggle: React.PropTypes.func,
  services:        React.PropTypes.object,
}

export default ServiceList
