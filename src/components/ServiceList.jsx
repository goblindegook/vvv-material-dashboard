import React, { PropTypes } from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'
import { List } from 'material-ui'
import Service from './Service'

const ServiceList = props => (
  <List subheader='Status'>
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
  onServiceToggle: React.PropTypes.func,
  services:        React.PropTypes.object,
}

ServiceList.mixins = [PureRenderMixin]

export default ServiceList
