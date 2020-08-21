import React from 'react'
import { Text, Card } from '@veriphi/veto-ui'
import InsetOpenCard from '../InsetOpenCard/InsetOpenCard'

const AppCard = (props) => {
  return (
    <Card sx={{ width: 500, height: 300 }}>
      <Text variant="cardHeading">{props.title}</Text>
      <InsetOpenCard image={props.image} name={props.name} version={props.version} click={props.click}></InsetOpenCard>
    </Card>
  )
}

export default AppCard
