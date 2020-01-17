import React from 'react'
import ReactJson from 'react-json-view'
import theme from '../../theme/index'

const ThemeJSONViewer = () => <ReactJson collapsed={1} src={theme} />

export default {
  title: 'Theme Browser',
  component: ThemeJSONViewer,
}

export const Theme = () => <ThemeJSONViewer />
