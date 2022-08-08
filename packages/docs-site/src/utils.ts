import * as hp from 'helper-js'

export function strToURIComponent(str: string) {
  const newChars = []
  const chars = str.split('')
  for (const char of chars) {
    if (/\s/.test(char)) {
      newChars.push('-')
    } else if (/[`~!@#$%^&*()-=_+\\[\]{}?,.<>'"]/.test(char)) {
      // ignore
    } else {
      newChars.push(char.toLowerCase())
    }
  }
  return encodeURIComponent(
    newChars.join('').replace(/-+/g, '-').replace(/^-/, '').replace(/-$/, '')
  )
}

export function cloneObject<T extends Object>(obj: T): T {
  return hp.mapObjectTree(obj, (v) => undefined) as T
}

export function urlHasDir(url: string, dir: string) {
  return new RegExp('/' + dir + '($|/)').test(url)
}
