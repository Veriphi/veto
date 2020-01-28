/** @jsx jsx */
import { jsx, css } from '@emotion/core'
import { Fragment } from 'react'
import { action } from '@storybook/addon-actions'
import Input from './Input'
import { Heading3, Text } from '../Text'
import { Box } from '@lightspeed/flame/Core'
import { Label } from '@lightspeed/flame/FormField'

export default {
  title: 'Input',
  component: Input,
}

export const Styles = () => (
  <Fragment>
    <Box mb={5}>
      <Heading3 ml="-8px" color="secondary" mb={3}>
        Simple Text Input
      </Heading3>
      <Input />
    </Box>
    <Box mb={5}>
      <Heading3 ml="-8px" color="secondary" mb={3}>
        Placeholder
      </Heading3>
      <Input placeholder="Email" />
    </Box>

    <Box mb={5}>
      <Heading3 ml="-8px" color="secondary" mb={3}>
        Label
      </Heading3>
      <Input label="Username" />
    </Box>

    <Box mb={5}>
      <Heading3 ml="-8px" color="secondary" mb={3}>
        Optional with Label
      </Heading3>
      <Input label="Memo" optional />
    </Box>

    <Box mb={5}>
      <Heading3 ml="-8px" color="secondary" mb={3}>
        Label and Tooltip
      </Heading3>
      <Input
        label="This is Label"
        placeholder="I am placeholder"
        tooltip="This is a tool tip description, it's pretty long."
      />
    </Box>

    <Box mb={5}>
      <Heading3 ml="-8px" color="secondary" mb={3}>
        Optional with Label and Tooltip
      </Heading3>
      <Input
        label="This is Label"
        placeholder="I am placeholder"
        optional
        tooltip="This is a tool tip description, it's pretty long."
      />
    </Box>

    <Box mb={5}>
      <Heading3 ml="-8px" color="secondary" mb={3}>
        Label, Optional, Tooltip and LabelHelper
      </Heading3>
      <Input
        label="This is Label"
        placeholder="I am placeholder"
        optional
        tooltip="This is a tool tip description, it's pretty long."
        labelHelper={
          <Text
            mr={3}
            color="textBody"
            css={css`
              text-decoration: underline;
              cursor: pointer;
            `}
            onClick={action('Label Helper Clicked')}
          >
            Manual Connection ?
          </Text>
        }
      />
    </Box>
  </Fragment>
)

// Add more named exports for further stories.
