import React, { useEffect, FunctionComponent } from 'react'
import { RouteComponentProps } from '@reach/router'
import { Button, Text, Flex } from '@veriphi/veto-ui'
import useSettings from '../../hooks/useSettings'
import BitcoinOnionButton from '../../components/molecules/BitcoinOnionButton'
import { setupSifir } from '../../api'
import AppCard from '../../components/molecules/AppCard'
import CoreCard from '../../components/molecules/CoreCard'
import sparkImage from '../../public/spark.png'
import bitcoinImage from '../../public/bitcoin.png'
import useBitcoinVersion from '../../hooks/useBitcoinVersion'
import ErrorMessage from '../../components/atoms/ErrorMessage'
import StatusBar from '../../components/molecules/StatusBar'

/*
import greenImage from '../../public/green.png'
import lightningImage from '../../public/lightning.png'
import cyphernodeImage from '../../public/cyphernode.png'
import vetoImage from '../../public/veto.png'
import sifirImage from '../../public/sifir.png'
*/


function renderBitcoinVersion(isValidating: boolean, error?: string, version?: string) {
  if (error) {
    return <ErrorMessage>{error}</ErrorMessage>
  } else if (isValidating) {
    return '...'
  }

  return (
    <>
      <Text>{version}</Text>
    </>
  )
}


const Dashboard: FunctionComponent<RouteComponentProps> = (): JSX.Element => {
  const { version, versionError, isValidating } = useBitcoinVersion()

  const [settings, setSettings] = useSettings()

  const toggleDarkMode = () => {
    setSettings({ darkmode: !settings.darkmode })
  }

  useEffect(() => {
    document.body.style.backgroundColor = settings.darkmode ? '#000' : '#fff'
  }, [settings])

  return (
    <div>
      <Text variant="heading1">Welcome to Your Dashboard, Gustavo </Text>
      <Button variant="primary" onClick={toggleDarkMode}>
        {settings.darkmode ? 'Light Mode' : 'Dark Mode'}
      </Button>
      <BitcoinOnionButton></BitcoinOnionButton>
      <Button variant="primary" onClick={setupSifir}>
        {' '}
      </Button>
      <AppCard
        image={sparkImage}
        name="Spark"
        version="2.14"
        click={'https://localhost/sparkwallet'}
        title={'SPARK WALLET'}
      />
      <br />
      <br />
      <CoreCard
        image={bitcoinImage}
        name="Bitcoin Core "
        version={renderBitcoinVersion(isValidating, versionError, version)}
        click={'/settings'}
        title={'BITCOIN'}
      />
      <br />
      <StatusBar />
    </div>
  )
}

export default Dashboard

//

//CHANGE LOCATION.HREF TO SOMETHING BETTER

/*

      <DashboardCard  image={bitcoinImage} name="Bitcoin Core" version="2.14" click={(event : string) => (window.location.href = '/sparkwallet/#/')} title={"SPARK WALLET"} />
      <DashboardCard  image={lightningImage} name="c-lightning" version="2.14" click={(event : string) => (window.location.href = '/sparkwallet/#/')} title={"SPARK WALLET"} />
      <DashboardCard  image={sifirImage} name="Sifir" version="2.14" click={(event : string) => (window.location.href = '/sparkwallet/#/')} title={"SPARK WALLET"} />
      <DashboardCard  image={cyphernodeImage} name="Cyphernode" version="2.14" click={(event : string) => (window.location.href = '/sparkwallet/#/')} title={"SPARK WALLET"} />
      <DashboardCard  image={greenImage} name="Green Wallet" version="2.14" click={(event : string) => (window.location.href = '/sparkwallet/#/')} title={"SPARK WALLET"} />
      <DashboardCard  image={vetoImage} name="Veto" version="2.14" click={(event : string) => (window.location.href = '/sparkwallet/#/')} title={"SPARK WALLET"} />

*/
