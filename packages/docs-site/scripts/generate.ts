import { spawn, execSync } from 'child_process'
import * as hp from 'helper-js'
import os from 'os'

start()

async function start() {
  const isWin = os.platform() === 'win32'

  console.log('Step 1: compile docs')
  execSync('npm run compile-docs', { stdio: 'inherit' })
  console.log('Step 2: build')
  execSync('npm run build', { stdio: 'inherit' })
  console.log('Step 3: start preivew server')
  const step3 = hp.promisePin<void, any>()
  const preview = spawn('npx' + (isWin ? '.cmd' : ''), ['vite', 'preview'])
  preview.stdout.on('data', (data) => {
    console.log('step3: ' + data.toString())
    if (data.toString().includes('Local:')) {
      step3.resolve()
    }
  })
  preview.stderr.on('data', (data) => {
    console.error('step3: ' + data.toString())
    step3.reject(data)
  })
  preview.on('close', () => {
    console.log('step3: stop preview')
  })
  await step3.promise
  console.log('Step 4: prerender')
  execSync('npx ts-node scripts/prerender.ts', { stdio: 'inherit' })
  // end
  preview.kill()
  console.log('done')
  process.exit(0)
}
