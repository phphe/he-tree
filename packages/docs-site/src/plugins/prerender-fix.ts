// execute before mount
export default function (mountPoint: string | Element) {
  // @ts-ignore
  if (typeof window !== 'undefined' && window.__IS_GENERATED__) {
    ;(typeof mountPoint === 'string'
      ? document.querySelector(mountPoint)!
      : mountPoint
    ).setAttribute('data-server-rendered', 'true')
  }
}
