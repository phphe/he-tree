<template>
  <div class="docs-view">
    <div class="article mt-14 mb-8 prose">
      <vheading :level="1" id="guide">Guide</vheading>
<p><strong>使用 Vue2 时把下面文档的 3 替换为 2.</strong></p>
<vheading :level="2" id="安装">安装</vheading>
<pre><code v-pre class="language-sh"># Vue3
npm i -P @he-tree/vue3
# Vue2
npm i -P @he-tree/vue2
</code></pre>
<vheading :level="2" id="引入">引入</vheading>
<pre><code v-pre class="language-ts">import { BaseTree, Draggable, obj, BaseNode, Node } from &#39;@he-tree/vue3&#39;
import &#39;@he-tree/vue3/dist/he-tree-vue3.css&#39;
</code></pre>
<vheading :level="2" id="不要给节点设置外边距">不要给节点设置外边距</vheading>
<p>你可能需要设置节点之间的距离, 不要使用<code v-pre>margin-bottom</code>来实现. 否则组件不能得到节点的真实高度. 使用 prop <code v-pre>gap</code> 替代.</p>
<vheading :level="2" id="treedata-或-flatdata">treeData 或 flatData</vheading>
<p>该组件可以传入树形数据或扁平数据. 传入树形数据(treeData)时, 需指定 <code v-pre>childrenKey</code>. 传入扁平数据(flatData)时, 需指定 <code v-pre>idKey</code>, <code v-pre>parentIdKey</code>.</p>
<p><code v-pre>treeData</code> 示例:</p>
<pre><code v-pre class="language-ts">treeData = [
  {
    text: &#39;node1&#39;,
    children: [{ text: &#39;node1-1&#39; }, { text: &#39;node1-2&#39; }, { text: &#39;node1-3&#39; }],
  },
  { text: &#39;node2&#39; },
]
</code></pre>
<p><code v-pre>flatData</code> 示例:</p>
<pre><code v-pre class="language-ts">flatData = [
  { text: &#39;node1&#39;, id: 1 },
  { text: &#39;node2&#39;, id: 2 },
  { text: &#39;node1-1&#39;, id: 3, pid: 1 },
  { text: &#39;node1-2&#39;, id: 3, pid: 1 },
  { text: &#39;node1-3&#39;, id: 3, pid: 1 },
]
</code></pre>
<vheading :level="2" id="html-结构">HTML 结构</vheading>
<pre><code v-pre class="language-pug">.he-tree(:id=&quot;treeID&quot; :class=&quot;{&#39;he-tree-dragging&#39;:dragging, &#39;he-tree-rtl&#39;: rtl}&quot;)
  .vl-items
    .tree-node-outer(:data-id=&quot;node.$id&quot; :class=&quot;node.$outerClass&quot; :style=&quot;node.$outerClass&quot;)
      .tree-node(:class=&quot;node.$nodeClass&quot; :style=&quot;node.$nodeStyle&quot;)
        slot(:node=&quot;node&quot; :tree=&quot;tree&quot;) {{node[textKey]}}
    .tree-node-outer(:data-id=&quot;node.$id&quot; :class=&quot;node.$outerClass&quot; :style=&quot;node.$outerClass&quot;)
      .tree-node(:class=&quot;node.$nodeClass&quot; :style=&quot;node.$nodeStyle&quot;)
        slot(:node=&quot;node&quot; :tree=&quot;tree&quot;) {{node[textKey]}}
    ...
</code></pre>
<p><strong>该组件渲染为列表而不是树形结构. 不同层级的节点有不同的 <code v-pre>padding-left</code>.</strong> 参考此结构, 你可以做下面的事:</p>
<ul>
<li>设置 <code v-pre>node.$outerClass</code> 和 <code v-pre>node.$outerStyle</code>来控制 tree-node-outer 元素 的 class 和 style.</li>
<li>设置 <code v-pre>node.$nodeClass</code> 和 <code v-pre>node.$nodeStyle</code>来控制 tree-node 元素 的 class 和 style.</li>
<li>使用默认插槽来定制节点外观. 该插槽参数: node, tree.</li>
</ul>
<vheading :level="2" id="使用">使用</vheading>
<pre><code v-pre class="language-vue">&lt;template&gt;
  &lt;BaseTree :flatData=&quot;flatData&quot; idKey=&quot;id&quot; parentIdKey=&quot;pid&quot; /&gt;
&lt;/template&gt;
&lt;script&gt;
  import &#39;@he-tree/vue3/dist/he-tree-vue3.css&#39;
  import { BaseTree } from &#39;@he-tree/vue3&#39;

  export default {
    components: { BaseTree },
    data() {
      return {
        flatData: [
          { text: &#39;node1&#39;, id: 1 },
          { text: &#39;node2&#39;, id: 2 },
          { text: &#39;node1-1&#39;, id: 3, pid: 1 },
          { text: &#39;node1-2&#39;, id: 3, pid: 1 },
          { text: &#39;node1-3&#39;, id: 3, pid: 1 },
        ],
      }
    },
  }
&lt;/script&gt;
</code></pre>
<vheading :level="2" id="输出数据">输出数据</vheading>
<p>使用方法 <code v-pre>outputNestedData</code> 和 <code v-pre>outputFlatData</code> 以获得树形数据或扁平数据.</p>
<vheading :level="2" id="折叠和展开">折叠和展开</vheading>
<pre><code v-pre class="language-vue">&lt;template&gt;
  &lt;BaseTree :flatData=&quot;flatData&quot; idKey=&quot;id&quot; parentIdKey=&quot;pid&quot;&gt;
    &lt;template v-slot=&quot;{ node, tree }&quot;&gt;
      &lt;b @click=&quot;tree.toggleFold(node)&quot;&gt;{{ node.$folded ? &#39;+&#39; : &#39;-&#39; }}&lt;/b&gt;
      &lt;span&gt;{{ node.text }}&lt;/span&gt;
    &lt;/template&gt;
  &lt;/BaseTree&gt;
&lt;/template&gt;
&lt;script&gt;
  import &#39;@he-tree/vue3/dist/he-tree-vue3.css&#39;
  import { BaseTree } from &#39;@he-tree/vue3&#39;

  export default {
    components: { BaseTree },
    data() {
      return {
        flatData: [
          { text: &#39;node1&#39;, id: 1 },
          { text: &#39;node2&#39;, id: 2 },
          { text: &#39;node1-1&#39;, id: 3, pid: 1 },
          { text: &#39;node1-2&#39;, id: 3, pid: 1 },
          { text: &#39;node1-3&#39;, id: 3, pid: 1 },
        ],
      }
    },
  }
&lt;/script&gt;
</code></pre>
<vheading :level="2" id="按需加载子节点">按需加载子节点</vheading>
<p>展开节点时加载其子节点数据. 例如通过 Ajax. 使用 prop <code v-pre>childrenLazyLoading</code> 启用. prop <code v-pre>childrenLoader</code> 是加载时调用的方法, 可以返回 <code v-pre>Promise</code>, 返回的数据只能是树形数据.</p>
<vheading :level="2" id="默认折叠所有节点">默认折叠所有节点</vheading>
<p>使用 prop <code v-pre>defaultFolded</code> 控制.</p>
<vheading :level="2" id="勾选框">勾选框</vheading>
<p>使用方法 <code v-pre>getAllCheckedNodes</code> 以获得所有勾选的节点.</p>
<pre><code v-pre class="language-vue">&lt;template&gt;
  &lt;BaseTree :flatData=&quot;flatData&quot; idKey=&quot;id&quot; parentIdKey=&quot;pid&quot;&gt;
    &lt;template v-slot=&quot;{ node, tree }&quot;&gt;
      &lt;input
        type=&quot;checkbox&quot;
        v-model=&quot;node.$checked&quot;
        @change=&quot;tree.updateChecked(node)&quot;
      /&gt;
      &lt;span&gt;{{ node.text }}&lt;/span&gt;
    &lt;/template&gt;
  &lt;/BaseTree&gt;
&lt;/template&gt;
&lt;script&gt;
  import &#39;@he-tree/vue3/dist/he-tree-vue3.css&#39;
  import { BaseTree } from &#39;@he-tree/vue3&#39;

  export default {
    components: { BaseTree },
    data() {
      return {
        flatData: [
          { text: &#39;node1&#39;, id: 1 },
          { text: &#39;node2&#39;, id: 2 },
          { text: &#39;node1-1&#39;, id: 3, pid: 1 },
          { text: &#39;node1-2&#39;, id: 3, pid: 1 },
          { text: &#39;node1-3&#39;, id: 3, pid: 1 },
        ],
      }
    },
  }
&lt;/script&gt;
</code></pre>
<vheading :level="2" id="rtl">RTL</vheading>
<p>从右到左显示. 使用 prop <code v-pre>rtl</code> 控制.</p>
<vheading :level="2" id="虚拟列表">虚拟列表</vheading>
<p>此功能可以在有许多节点时提高渲染性能. 使用 prop <code v-pre>virtualization</code> 启用. 使用 prop <code v-pre>virtualizationPrerender</code> 设置开始时显示的节点数量.</p>
<vheading :level="2" id="拖拽">拖拽</vheading>
<pre><code v-pre class="language-vue">&lt;template&gt;
  &lt;Draggable :flatData=&quot;flatData&quot; idKey=&quot;id&quot; parentIdKey=&quot;pid&quot; /&gt;
&lt;/template&gt;
&lt;script&gt;
  import &#39;@he-tree/vue3/dist/he-tree-vue3.css&#39;
  import { Draggable } from &#39;@he-tree/vue3&#39;

  export default {
    components: { Draggable },
    data() {
      return {
        flatData: [
          { text: &#39;node1&#39;, id: 1 },
          { text: &#39;node2&#39;, id: 2 },
          { text: &#39;node1-1&#39;, id: 3, pid: 1 },
          { text: &#39;node1-2&#39;, id: 3, pid: 1 },
          { text: &#39;node1-3&#39;, id: 3, pid: 1 },
        ],
      }
    },
  }
&lt;/script&gt;
</code></pre>
<vheading :level="2" id="拖拽触发">拖拽触发</vheading>
<p>使用 prop <code v-pre>triggerClass</code> 指定触发拖拽的元素的 css class. 当 prop <code v-pre>triggerBySelf</code> 为 true 时, 它的子元素将不能触发拖拽.</p>
<vheading :level="2" id="阻止拖拽">阻止拖拽</vheading>
<ul>
<li>当 prop <code v-pre>draggable</code> 为 false, 此树的任一节点不能被拖拽.</li>
<li>使用 prop <code v-pre>eachDraggable</code> 在拖拽开始时.</li>
<li>当 prop <code v-pre>rootDraggable</code> 为 false, 顶级节点(level 1) 不能被拖拽.</li>
<li>使用 prop <code v-pre>ondragstart</code> 在拖拽开始时.</li>
<li>设置 <code v-pre>node.$draggable</code> 为 false 控制单个节点是否可拖拽.</li>
<li>当父节点不可拖拽而子节点可拖拽时, 例如设置 子节点的 <code v-pre>$draggable</code> 为 true, 子节点可以拖拽.</li>
</ul>
<vheading :level="2" id="阻止放入">阻止放入</vheading>
<ul>
<li>当 prop <code v-pre>droppable</code> 为 false, 任一节点不能放入这棵树.</li>
<li>使用 prop <code v-pre>eachDroppable</code> 当拖动到一节点上时.</li>
<li>当 prop <code v-pre>rootDroppable</code> 为 false, 被拖拽的节点不能成为顶级节点.</li>
<li>使用 prop <code v-pre>ondragend</code> 在拖拽结束时, 若返回 false, 则恢复拖拽前的原状.</li>
<li>设置 <code v-pre>node.$droppable</code> 为 false 控制单个节点是否可放入.</li>
<li>当父节点不可放入而子节点可放入时, 例如设置子节点的 <code v-pre>$droppable</code> 为 true, 则此子节点可放入.</li>
</ul>
<vheading :level="2" id="拖拽过程中的运行时数据">拖拽过程中的运行时数据</vheading>
<p>参考 <Anchor :to="resolveHref('api.md#store')"><code v-pre>tree.store</code></Anchor></p>
<vheading :level="2" id="占位元素">占位元素</vheading>
<p>拖拽时, 会生成一个元素默认淡青色背景, 用以标识可放置的位置. 使用 prop <code v-pre>afterPlaceholderCreated</code> 修改它. 如果想操作此元素比如添加文字, 只能通过原生 js 操作.</p>
<vheading :level="2" id="拖拽到节点上时打开该节点">拖拽到节点上时打开该节点</vheading>
<p>当把节点拖动到一个折叠节点上时, 默认会打开此节点以便拖入其中. 可通过 prop <code v-pre>unfoldWhenDragover</code>控制. 相关 prop: <Anchor :to="resolveHref('api.md#unfoldWhenDragoverDelay')">unfoldWhenDragoverDelay</Anchor></p>
<vheading :level="2" id="拖拽节点的定位">拖拽节点的定位</vheading>
<p>默认使用拖拽节点的左上角坐标来定位, 也可以设置使用鼠标位置来定位. <Anchor :to="resolveHref('api.md#draggingNodePositionMode')">draggingNodePositionMode</Anchor></p>
<vheading :level="2" id="边缘滚动">边缘滚动</vheading>
<p>这是属于拖拽插件的功能. 如果树处在一个滚动框中, 拖拽到其边缘时需要自动滚动. 此项默认关闭, 使用 prop<code v-pre>edgeScroll</code>开启. 相关 prop: <Anchor :to="resolveHref('api.md#edgeScrollTriggerMargin')">edgeScrollTriggerMargin</Anchor>, <Anchor :to="resolveHref('api.md#edgeScrollSpeed')">edgeScrollSpeed</Anchor>, <Anchor :to="resolveHref('api.md#edgeScrollTriggerMode')">edgeScrollTriggerMode</Anchor>.</p>
<vheading :level="2" id="pro-插件需购买">Pro 插件(需购买)</vheading>
<p><Anchor :to="resolveHref('/pro-plugin')">pro 插件</Anchor> 有以下高级功能.</p>
<ul>
<li>跨树拖拽.</li>
<li>拖拽开始时克隆原节点而不是移动原节点.</li>
</ul>
<vheading :level="2" id="通过-script-标签引入">通过 script 标签引入</vheading>
<p>从 npm 下载最新版本, 上传 <code v-pre>dist</code> 文件夹到你的服务器.</p>
<pre><code v-pre class="language-html">&lt;!-- replace vue3 to vue2 if use Vue2 --&gt;
&lt;script src=&quot;yourpath/dist/he-tree-vue3.min.js&quot; charset=&quot;utf-8&quot;&gt;&lt;/script&gt;
&lt;link rel=&quot;stylesheet&quot; href=&quot;yourpath/dist/he-tree-vue3.css&quot; /&gt;
&lt;!-- usage --&gt;
&lt;script type=&quot;text/javascript&quot;&gt;
  var Tree = heTreeVue3.BaseTree;
  var Fold = heTreeVue3.Draggable;
  ...
&lt;/script&gt;
</code></pre>
<p>通过全局变量 <code v-pre>heTreeVue3</code> 或 <code v-pre>heTreeVue2</code> 访问此库.</p>

    </div>
  </div>
</template>

<script>
  import docsSubmenu from '../docsSubmenu'
  import { onBeforeUnmount, getCurrentInstance } from 'vue'
  import { useTitle } from '../HTMLHead'
  import DocTemplateBase from '../parts/DocTemplateBase.vue'

  export default {
    extends: DocTemplateBase,
    setup() {
      const vm = getCurrentInstance()
      const data = {"name":"Guide","id":"guide","children":[{"name":"安装","id":"安装","children":[]},{"name":"引入","id":"引入","children":[]},{"name":"不要给节点设置外边距","id":"不要给节点设置外边距","children":[]},{"name":"treeData 或 flatData","id":"treedata-或-flatdata","children":[]},{"name":"HTML 结构","id":"html-结构","children":[]},{"name":"使用","id":"使用","children":[]},{"name":"输出数据","id":"输出数据","children":[]},{"name":"折叠和展开","id":"折叠和展开","children":[]},{"name":"按需加载子节点","id":"按需加载子节点","children":[]},{"name":"默认折叠所有节点","id":"默认折叠所有节点","children":[]},{"name":"勾选框","id":"勾选框","children":[]},{"name":"RTL","id":"rtl","children":[]},{"name":"虚拟列表","id":"虚拟列表","children":[]},{"name":"拖拽","id":"拖拽","children":[]},{"name":"拖拽触发","id":"拖拽触发","children":[]},{"name":"阻止拖拽","id":"阻止拖拽","children":[]},{"name":"阻止放入","id":"阻止放入","children":[]},{"name":"拖拽过程中的运行时数据","id":"拖拽过程中的运行时数据","children":[]},{"name":"占位元素","id":"占位元素","children":[]},{"name":"拖拽到节点上时打开该节点","id":"拖拽到节点上时打开该节点","children":[]},{"name":"拖拽节点的定位","id":"拖拽节点的定位","children":[]},{"name":"边缘滚动","id":"边缘滚动","children":[]},{"name":"Pro 插件(需购买)","id":"pro-插件需购买","children":[]},{"name":"通过 script 标签引入","id":"通过-script-标签引入","children":[]}]}
      useTitle(data.name, vm)
      docsSubmenu.value = data.children
      onBeforeUnmount(() => {
        docsSubmenu.value = null
      })
    },
  }
</script>
