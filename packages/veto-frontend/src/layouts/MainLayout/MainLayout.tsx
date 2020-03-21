import React, { FunctionComponent, useState } from 'react'
import { Flex } from '@veriphi/veto-ui'
import { Router } from '@reach/router'
import Dashboard from '../../pages/Dashboard'
import Wallets from '../../pages/Wallets'
import History from '../../pages/History'
import Explorer from '../../pages/Explorer'
import Monitoring from '../../pages/Monitoring'
import SideMenu from 'components/molecules/SideMenu'

export type MainLayoutLabel = 'Dashboard' | 'Wallets' | 'History' | 'Explorer' | 'Monitoring'
export type MainLayoutRoute = '/dashboard' | '/wallets' | '/history' |'/explorer' | '/monitoring'

type Props = {
    path: string
}

const getActiveMenu = () : MainLayoutRoute => {
    const currentPathName : string = window.location.pathname
    if(currentPathName !== '/dashboard' || '/wallets' || '/history' || '/explorer' || '/monitoring') {
        return '/dashboard'
    } else {
        return currentPathName
    }
}

const MainLayout : FunctionComponent<Props> = ({ path }: Props) : JSX.Element => {
    const [activeMenu] = useState<MainLayoutRoute>(getActiveMenu())

    return (
    <Flex>
        <SideMenu currentActiveMenu={activeMenu} />
        <Router>
            <Dashboard path='/dashboard' />
            <Wallets path='/wallets' />
            <History path='/history' />
            <Explorer path='/explorer' />
            <Monitoring path='/monitoring' />
        </Router>
    </Flex >
    )
}

export default MainLayout