import React, { useEffect, FunctionComponent } from 'react'
import { RouteComponentProps } from '@reach/router'
import { Button, Text, Flex } from '@veriphi/veto-ui'
import useSettings from '../../hooks/useSettings'
import BitcoinOnionButton from '../../components/molecules/BitcoinOnionButton'
import { setupSifir } from '../../api'
import DashboardCard from '../../components/molecules/DashboardCard'
import sparkImage from '../../public/spark.png'
import bitcoinImage from '../../public/bitcoin.png'

/*
import greenImage from '../../public/green.png'
import lightningImage from '../../public/lightning.png'
import cyphernodeImage from '../../public/cyphernode.png'
import vetoImage from '../../public/veto.png'
import sifirImage from '../../public/sifir.png'
*/

const Dashboard: FunctionComponent<RouteComponentProps> = (): JSX.Element => {
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
      <DashboardCard
        image={sparkImage}
        name="Spark Wallet"
        version="2.14"
        click={'/sparkwallet/#/'}
        title={'SPARK WALLET'}
      />
      <Flex height={"1"} />
      <DashboardCard
        image={bitcoinImage}
        name="Bitcoin Core "
        version="2.14"
        click={'/sparkwallet/#/'}
        title={'BITCOIN'}
      />

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
