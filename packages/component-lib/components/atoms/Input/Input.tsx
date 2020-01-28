import React from 'react'
import { Input, InputProps } from '@lightspeed/flame/Input'

import { Merge } from 'type-fest'
import { Heading4, Text } from '../Text'
import { Flex } from '@lightspeed/flame/Core'
import { Tooltip } from '@lightspeed/flame/Tooltip'

type Props = Merge<InputProps, { label?: string; optional?: boolean; tooltip?: string }>

export default (props: Props) => {
  const label = props.label && (
    <Flex flexDirection="row">
      <Heading4 pl={3} color="primary">
        {props.label}
      </Heading4>
      {props.optional && (
        <Text color="textBody" ml={2} fontSize="xsmall">
          (Optional)
        </Text>
      )}
      {props.tooltip && (
        <Tooltip light content={props.tooltip} placement="right">
          <Text fontSize="xsmall" color="textBody" ml={2}>
            {'[?]'}
          </Text>
        </Tooltip>
      )}
    </Flex>
  )

  const finalInputProps = {
    ...props,
    label,
  }
  return <Input data-testid="Input" {...finalInputProps} />
}
