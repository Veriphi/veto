import React from 'react'
import { Text, Card } from '@veriphi/veto-ui'
import InsetManageCard from '../InsetManageCard'

const AppCard = (props) => {
  return (
    <Card sx={{ width: 500, height: 300 }}>
      <Text variant="cardHeading">{props.title}</Text>
      <InsetManageCard image={props.image} name={props.name} version={props.version} click={props.click}></InsetManageCard>
    </Card>
  )
}

export default AppCard
