## Structure

refer https://miyauchi.dev/posts/vite-vue3-typescript#checking-template-statically-in-vti

resolve markdown
const md = fs
.readFileSync(`./src/content/cmd-generators/${ctx.params.name}.md`)
.toString()
const html = marked(md)
const $ = cheerio.load(html)
const nodes = []
const root = { children: nodes, depth: 0 }
const parents = [root]
$('body')
    .children()
    .each((i, el) => {
      // make nodes nested
      const node = {
        tagName: el.tagName,
        children: [],
      }
      const isParent = /^h\d$/.test(el.tagName)
const depth = isParent && parseInt(el.tagName.substring(1))
Object.assign(node, {
isParent,
depth,
})
if (!isParent || depth > parents[0].depth) {
parents[0].children.push(node)
} else {
parents.shift()
parents[0].children.push(node)
}
if (isParent) {
parents.unshift(node)
}
// resolve node self content
if (isParent) {
node.text = $(el).text()
        node.slug = strToURIComponent(node.text)
      } else if (node.tagName === 'pre') {
        node.isJSON = true
        node.value = JSON.parse($(el).find('code').html())
} else {
node.html = $.html(el) // outerHTML
}
})
ctx.body = JSON.stringify(nodes)
