import React, { useEffect, FunctionComponent } from 'react'
import { RouteComponentProps } from '@reach/router'
import { Button, Text } from '@veriphi/veto-ui'
import useSettings from '../../hooks/useSettings'
import SummaryCard from '../../components/molecules/SummaryCard'

const Dashboard: FunctionComponent<RouteComponentProps> = (): JSX.Element => {
  // General Page State
  const [settings, setSettings] = useSettings()

  const toggleDarkMode = () => {
    setSettings({ darkmode: !settings.darkmode })
  }

  useEffect(() => {
    document.body.style.backgroundColor = settings.darkmode ? '#000' : '#fff'
  }, [settings])

  return (
    <div>
      <Text variant="heading1">Dashboard</Text>

      <SummaryCard />

      <Button variant="primary" onClick={toggleDarkMode}>
        {settings.darkmode ? 'Light Mode' : 'Dark Mode'}
      </Button>
    </div>
  )
}

export default Dashboard
