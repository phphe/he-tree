// Don't modify config when runtime

import { urlHasDir } from '../src/utils'

export default {
  APP_NAME: 'he-tree',
  ANALYTICS_ID: 'G-L74NT4DL5X',
  LOCALE: 'en',
  ORIGIN_PROD: 'https://hetree.phphe.com', // production host name
  GIT_NAME: 'phphe/he-tree',
  VERSION: '2.*.*',
  MENU: [
    {
      text: 'Guide',
      path: '/v2/guide',
    },
    {
      text: 'API',
      path: '/v2/api',
    },
    {
      text: 'Pro',
      path: '/pro',
    },
  ],
  SUBPATH: [
    {
      match: (url: string) => urlHasDir(url, 'v1'),
      version: '1.*.*',
      homePath: '/v1',
      menu: [
        {
          text: 'Guide',
          path: '/v1/guide',
        },
        {
          text: 'API',
          path: '/v1/api',
        },
      ],
    },
  ],
}
