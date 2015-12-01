import React, { PropTypes } from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'
import { List } from 'material-ui'
import Service from './Service'

const ServiceList = props => (
  <List subheader='Status'>
    {Object.keys(props.services).map(key => (
      <Service
        key={key}
        name={props.services[key].name}
        enabled={props.services[key].enabled}
        locked={props.services[key].locked}
      />
    ))}
  </List>
)

ServiceList.mixins = [PureRenderMixin]

ServiceList.propTypes = {}

export default ServiceList
