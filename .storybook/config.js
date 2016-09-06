import { configure } from '@kadira/storybook'

import 'normalize.css'
import './Storybook.scss'

function loadStories() {
  require('../client/stories/Menu')
}

configure(loadStories, module)
