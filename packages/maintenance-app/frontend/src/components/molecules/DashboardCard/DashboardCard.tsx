import React from 'react'
import { Text, Card } from '@veriphi/veto-ui'
import InsetCard from '../InsetCard/InsetCard'

const DashboardCard = (props) => {
  return (
    <Card sx={{ width: 500, height: 300 }}>
      <Text variant="cardInsetHeading">{props.title}</Text>
      <InsetCard image={props.image} name={props.name} version={props.version} click={props.click}></InsetCard>
    </Card>
  )
}

export default DashboardCard
