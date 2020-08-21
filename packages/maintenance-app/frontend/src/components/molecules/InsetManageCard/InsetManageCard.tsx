import React from 'react'
import { Flex, Text, Card } from '@veriphi/veto-ui'
import ManageButton from '../../atoms/ManageButton'

const InsetManageCard = (props) => {
  return (
    <Card variant="inset" style={{ width: 400, height: 70 }}>
      <Flex flexDirection="row">
        <img src={props.image} width="50" height="50" alt="" />
        <Flex flexDirection="column">
          <Text variant="cardPrimaryHeading"> {props.name} </Text>
          <Text variant="grey"> {props.version} </Text>
        </Flex>
        <ManageButton click={props.click}></ManageButton>
      </Flex>
    </Card>
  )
}

export default InsetManageCard

// FIX DIMENSIONS AND STYLING
