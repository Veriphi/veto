import * as React from 'react'
import { Box, Flex } from '@veriphi/veto-ui'

/*
    todo import from @veriphi/veto-ui and get rid of this
    this component at the time of coding this was not exported and was consuming
    a react context was used in the lib for isExpanded that is thus not available to this component
    thus behavior is not exactly as expected for the time being
    https://btc.atlassian.net/browse/VN-117
*/
export type NavigationElementProps = {
  title: string
  icon: React.ReactNode
  isSelected?: boolean
  isExpanded?: boolean
  handleNavigate: (...args: any[]) => void
}
const NavigationElement: React.FC<NavigationElementProps> = ({
  title,
  icon,
  handleNavigate,
  isSelected = false,
  isExpanded = false,
  ...restProps
}) => {
  return (
    <Flex
      onClick={handleNavigate}
      sx={{
        display: 'flex',
        alignItems: 'center',
        minHeight: '52px',
        width: '270px',
        mt: 3,
        pr: 2,
        pl: '32px',
        position: 'relative',
        bg: isSelected ? '#F8F6FA' : 'white',
        cursor: 'pointer',
        color: 'text',
        textDecoration: 'none',
        '&:hover': {
          bg: isSelected ? '#F8F6FA' : '#FAFAFA',
        },
      }}
      {...restProps}
    >
      <Box
        as="span"
        sx={{
          fontSize: '24px',
          minWidth: '64px',
          color: isSelected ? 'primary' : 'text',
        }}
      >
        {icon}
      </Box>{' '}
      <Box
        as="span"
        sx={{
          display: isExpanded ? 'initial' : 'initial',
          fontSize: 'large',
        }}
      >
        {title}
      </Box>
      {isSelected && (
        <Box
          sx={{
            position: 'absolute',
            width: '10px',
            bg: 'primary',
            height: '100%',
            transform: isExpanded ? 'translateX(228px)' : 'translateX(42px)',
            transition: 'transform ease-in-out 200ms',
            borderTopLeftRadius: 'radius-2',
            borderBottomLeftRadius: 'radius-2',
          }}
        />
      )}
    </Flex>
  )
}

export default NavigationElement
