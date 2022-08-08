import baseConfig from '../docs/config'
import fs from 'fs'
import path from 'path'
import { spawn, execSync } from 'child_process'

let domain = new URL(baseConfig.ORIGIN_PROD).hostname
const tpl = fs
  .readFileSync(path.join(__dirname, 'tpl/deploy.tpl.sh'))
  .toString()
let codeStr = tpl
if (!domain.includes('.github.io')) {
  // custom domain
  codeStr = codeStr.replace(
    `# echo "{domain}" > CNAME`,
    `# echo "${domain}" > CNAME`
  )
}
codeStr = codeStr.replace(`{git_name}`, baseConfig.GIT_NAME)
fs.writeFileSync('.deploy.sh', codeStr)
execSync('sh .deploy.sh', { stdio: 'inherit' })
fs.unlinkSync('.deploy.sh')
console.log('deploy done')
