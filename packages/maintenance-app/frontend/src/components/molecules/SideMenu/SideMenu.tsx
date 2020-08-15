import React, { FunctionComponent, ReactElement } from 'react'
import { Flex, MainNav, NavigationElement } from '@veriphi/veto-ui'
import { navigate } from '@reach/router'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBorderAll } from '@fortawesome/free-solid-svg-icons/faBorderAll'
import { faWallet } from '@fortawesome/free-solid-svg-icons/faWallet'
import { faHistory } from '@fortawesome/free-solid-svg-icons/faHistory'
import { faCube } from '@fortawesome/free-solid-svg-icons/faCube'
import { faServer } from '@fortawesome/free-solid-svg-icons/faServer'
import { MainLayoutLabel, MainLayoutRoute } from '../../../layouts/MainLayout/MainLayout'

type MenuItemProps = {
  label: MainLayoutLabel
  route: MainLayoutRoute
  icon: React.ReactNode
  isSelected: boolean
}

type NavigationElementProps = {
  title: string
  icon: React.ReactNode
  isSelected?: boolean
  onClick: (...args: any[]) => void
}

const MenuItem: FunctionComponent<MenuItemProps> = ({
  label,
  route,
  icon,
  isSelected,
}: MenuItemProps): ReactElement => {
  const onClick = () => navigate(route)

  const navigationElementProps: NavigationElementProps = {
    title: label,
    icon,
    isSelected,
    onClick,
  }

  return <NavigationElement {...navigationElementProps} />
}

type MenuConfigItem = {
  label: MainLayoutLabel
  route: MainLayoutRoute
  icon: React.ReactNode
}

const menuConfig: MenuConfigItem[] = [
  {
    label: 'Dashboard',
    route: '/dashboard',
    icon: <FontAwesomeIcon icon={faBorderAll} />,
  },
  {
    label: 'Wallets',
    route: '/wallets',
    icon: <FontAwesomeIcon icon={faWallet} />,
  },
  {
    label: 'History',
    route: '/history',
    icon: <FontAwesomeIcon icon={faHistory} />,
  },
  {
    label: 'Explorer',
    route: '/explorer',
    icon: <FontAwesomeIcon icon={faCube} />,
  },
  {
    label: 'Settings',
    route: '/settings',
    icon: <FontAwesomeIcon icon={faServer} />,
  },
]

type Props = {
  currentActiveMenu: MainLayoutRoute
}

const SideMenu: FunctionComponent<Props> = ({ currentActiveMenu }: Props): JSX.Element => {
  return (
    <Flex flexDirection="column" marginRight="25px">
      <MainNav
        navigations={menuConfig.map((menuItem: MenuConfigItem) => {
          return <MenuItem {...menuItem} isSelected={menuItem.route === currentActiveMenu} />
        })}
      ></MainNav>
    </Flex>
  )
}

export default SideMenu
