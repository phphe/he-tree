import * as fs from 'fs'
import * as path from 'path'

export const docsDir = 'docs'

export function getLocales() {
  return fs
    .readdirSync(docsDir)
    .filter((v) => fs.statSync(path.join(docsDir, v)).isDirectory())
}
