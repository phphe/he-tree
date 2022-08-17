// Don't modify config when runtime

import { urlHasDir } from '../src/utils'

export default {
  APP_NAME: 'he-tree',
  ANALYTICS_ID: 'G-L74NT4DL5X',
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
    {
      text: 'Hire Me',
      path: '/hire-me',
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
  I18N: {
    locale: 'en',
    fallbackLocale: 'en',
    locales: { en: 'English', zh: '简体中文' },
    messages: {
      en: {
        Languages: 'Languages',
        Home: 'Home',
        Works: 'Works',
        About: 'About',
        Version: 'Version',
        Guide: 'Guide',
        API: 'API',
        Examples: 'Examples',
        'Get Started': 'Get Started',
        'More Examples': 'More Examples',
      },
      zh: {
        Languages: '语言',
        Home: '首页',
        Works: '作品',
        About: '关于',
        Version: '版本',
        Guide: '使用指南',
        API: 'API',
        Examples: '例子',
        'Get Started': '快速开始',
        'More Examples': '更多例子',
      },
    },
  },
  UI: {
    github_buttons: true,
  },
}
