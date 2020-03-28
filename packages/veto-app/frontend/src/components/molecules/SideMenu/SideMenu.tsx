import React, { FunctionComponent } from 'react'
import { Flex } from '@veriphi/veto-ui'
import { MainLayoutLabel, MainLayoutRoute } from 'layouts/MainLayout/MainLayout'
import { navigate } from '@reach/router'

type MenuItemProps = {
  label: MainLayoutLabel
  route: MainLayoutRoute
}

const MenuItem: FunctionComponent<MenuItemProps> = ({ label, route }: MenuItemProps) => {
  const handleNavigate: VoidFunction = (): void => navigate(route)
  return <div onClick={handleNavigate}>{label}</div>
}

type MenuConfigItem = {
  label: MainLayoutLabel
  route: MainLayoutRoute
}

const menuConfig: MenuConfigItem[] = [
  {
    label: 'Dashboard',
    route: '/dashboard',
  },
  {
    label: 'Wallets',
    route: '/wallets',
  },
  {
    label: 'History',
    route: '/history',
  },
  {
    label: 'Explorer',
    route: '/explorer',
  },
  {
    label: 'Monitoring',
    route: '/monitoring',
  },
]

type Props = {
  currentActiveMenu: MainLayoutRoute
}

const SideMenu: FunctionComponent<Props> = ({ currentActiveMenu }: Props): JSX.Element => {
  return (
    <Flex flexDirection="column" marginRight="25px">
      {menuConfig.map((menuItemProps: MenuConfigItem) => (
        <MenuItem {...menuItemProps} />
      ))}
    </Flex>
  )
}

export default SideMenu
