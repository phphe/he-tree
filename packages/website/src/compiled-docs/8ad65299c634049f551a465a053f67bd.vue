<template>
  <div class="docs-view">
    <div class="article mt-14 mb-8 prose">
      <vheading :level="1" id="guide">Guide</vheading>
<p><strong>Replace 3 to 2 for Vue2 in follow doc.</strong></p>
<vheading :level="2" id="installation">Installation</vheading>
<pre><code v-pre class="language-sh"># Vue3
npm i -P @he-tree/vue3
# Vue2
npm i -P @he-tree/vue2
</code></pre>
<vheading :level="2" id="import">Import</vheading>
<pre><code v-pre class="language-ts">import { BaseTree, Draggable, obj, BaseNode, Node } from &#39;@he-tree/vue3&#39;
import &#39;@he-tree/vue3/dist/he-tree-vue3.css&#39;
</code></pre>
<vheading :level="2" id="dont-use-margin-out-of-node">Don&#39;t use margin out of node</vheading>
<p>You may want to use <code v-pre>margin-bottom</code> to set the space between two nodes, that is not allowed. If so, it can&#39;t get the correct height of node. Use prop <code v-pre>gap</code> to do that.</p>
<vheading :level="2" id="treedata-or-flatdata">treeData or flatData</vheading>
<p>The tree is able to receive both tree data and flat data as initial data. When use <code v-pre>treeData</code>, tree need <code v-pre>childrenKey</code>. When use <code v-pre>flatData</code>, it need <code v-pre>idKey</code>, <code v-pre>parentIdKey</code>.</p>
<p><code v-pre>treeData</code> example:</p>
<pre><code v-pre class="language-ts">treeData = [
  {
    text: &#39;node1&#39;,
    children: [{ text: &#39;node1-1&#39; }, { text: &#39;node1-2&#39; }, { text: &#39;node1-3&#39; }],
  },
  { text: &#39;node2&#39; },
]
</code></pre>
<p><code v-pre>flatData</code> example:</p>
<pre><code v-pre class="language-ts">flatData = [
  { text: &#39;node1&#39;, id: 1 },
  { text: &#39;node2&#39;, id: 2 },
  { text: &#39;node1-1&#39;, id: 3, pid: 1 },
  { text: &#39;node1-2&#39;, id: 3, pid: 1 },
  { text: &#39;node1-3&#39;, id: 3, pid: 1 },
]
</code></pre>
<vheading :level="2" id="structure">Structure</vheading>
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
<p><strong>It is rendered as a flat list, not nested tree. Different level node has different <code v-pre>padding-left</code>.</strong> Refer to the structure above, you can do:</p>
<ul>
<li>Set outer element class and style by set <code v-pre>node.$outerClass</code> and <code v-pre>node.$outerStyle</code></li>
<li>Set node element class and style by set <code v-pre>node.$nodeClass</code> and <code v-pre>node.$nodeStyle</code></li>
<li>Use default slot to customize node render. The slot has props: node, tree.</li>
</ul>
<vheading :level="2" id="usage">Usage</vheading>
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
<vheading :level="2" id="ouput">Ouput</vheading>
<p>Use methods <code v-pre>outputNestedData</code> or <code v-pre>outputFlatData</code> to get converted data without runtime properties. In order to get the changed data when drag, they should be executed in the <Anchor :to="resolveHref('api.md#drop')"><code v-pre>drop</code></Anchor> or <Anchor :to="resolveHref('api.md#drop-change')"><code v-pre>drop-change</code></Anchor> event.</p>
<vheading :level="2" id="fold--expand">Fold &amp; Expand</vheading>
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
<vheading :level="2" id="lazy-load">Lazy Load</vheading>
<p>Load children data when unfold a node. Such as by Ajax. Use prop <code v-pre>childrenLazyLoading</code> to enable. Use function prop <code v-pre>childrenLoader</code> to load data, it can return <code v-pre>Promise</code> and must return tree data, nested data.</p>
<vheading :level="2" id="folde-all-nodes-by-default">Folde all nodes by default</vheading>
<p>Use prop <code v-pre>defaultFolded</code>.</p>
<vheading :level="2" id="checkbox">Checkbox</vheading>
<p>Use method <code v-pre>getAllCheckedNodes</code> to get all checked nodes.</p>
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
<p>Use prop <code v-pre>rtl</code> to enable.</p>
<vheading :level="2" id="virtualization">Virtualization</vheading>
<p>Improve performance when there are a lot of nodes. Use prop <code v-pre>virtualization</code> to enable. Use prop <code v-pre>virtualizationPrerender</code> to define render length at start.</p>
<p>Must add style <code v-pre>overflow:auto</code> for tree. And set height. The height can be fixed value. Use <code v-pre>max-height</code> or <code v-pre>display:flex</code> to set dynamic height also works.</p>
<pre><code v-pre class="language-html">&lt;Draggable virtualization style=&quot;height:300px;overflow:auto&quot; /&gt;
</code></pre>
<p>You can use follow code update virtualization list manually:</p>
<pre><code v-pre class="language-js">tree.$refs.virtualizationList.update()
</code></pre>
<vheading :level="2" id="draggable">Draggable</vheading>
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
<vheading :level="2" id="drag-trigger">Drag Trigger</vheading>
<p>Use prop <code v-pre>triggerClass</code> to specify the css name of the element that triggers the drag. When prop <code v-pre>triggerBySelf</code> true, the child element can&#39;t trigger drag.</p>
<vheading :level="2" id="prevent-drag">Prevent Drag</vheading>
<ul>
<li>When prop <code v-pre>draggable</code> false, the tree&#39;s any nodes can&#39;t be drag.</li>
<li>Use prop <code v-pre>eachDraggable</code> before drag start.</li>
<li>When prop <code v-pre>rootDraggable</code> false, the root nodes(level 1) can&#39;t be dragged.</li>
<li>Use hook prop <code v-pre>ondragstart</code> before drag start.</li>
<li>Set <code v-pre>node.$draggable</code> false to handle single node.</li>
<li>When parent node is not draggable, child node is draggable, such as set <code v-pre>$draggable</code> as true of child node, then this child node is draggable.</li>
</ul>
<vheading :level="2" id="prevent-drop">Prevent Drop</vheading>
<ul>
<li>When prop <code v-pre>droppable</code> false, any nodes can&#39;t be dropped in to the tree.</li>
<li>Use prop <code v-pre>eachDroppable</code> when drag over a node.</li>
<li>When prop <code v-pre>rootDroppable</code> false, the root (level 1) can&#39;t be dropped.</li>
<li>Use hook prop <code v-pre>ondragend</code> before drop end. <code v-pre>ondragend</code> supports promise.</li>
<li>Set <code v-pre>node.$droppable</code> false to handle single node.</li>
<li>When parent node is not droppable, child node is droppable, such as set <code v-pre>$droppable</code> as true of child node, then this child node is droppable.</li>
</ul>
<vheading :level="2" id="runtime-data-in-drag-and-drop-process">Runtime data in drag and drop process</vheading>
<p>Check <Anchor :to="resolveHref('api.md#store')"><code v-pre>tree.store</code></Anchor></p>
<vheading :level="2" id="placeholder">Placeholder</vheading>
<p>When dragging, an element will be generated with a default light cyan background to identify the place where can be dropped. Use hook prop <code v-pre>afterPlaceholderCreated</code> to handle it. If you want to manipulate this element such as adding text, you can only use native JS operations.</p>
<vheading :level="2" id="open-folded-node-when-dragging">Open folded node when dragging</vheading>
<p>When dragging a node over a collapsed node, this node is opened by default for dragging into it. It can be controlled by prop <code v-pre>unfoldWhenDragover</code>. Related prop: <code v-pre>unfoldWhenDragoverDelay</code>, <code v-pre>isNodeUnfoldable</code></p>
<vheading :level="2" id="how-to-locate-the-dragging-node">How to locate the dragging node</vheading>
<p>The top left corner of dragging node is used by default. Mouse position is also supported. <Anchor :to="resolveHref('api.md#draggingNodePositionMode')"><code v-pre>draggingNodePositionMode</code></Anchor></p>
<vheading :level="2" id="edge-scroll">Edge Scroll</vheading>
<p>This function belongs to Draggable plugin. If the tree is in a scroll box, it needs to be automatically scrolled when dragged to its edge. This prop is diabled by default. Use prop <code v-pre>edgeScroll</code> control that. Related prop: <Anchor :to="resolveHref('api.md#edgeScrollTriggerMargin')">edgeScrollTriggerMargin</Anchor>, <Anchor :to="resolveHref('api.md#edgeScrollSpeed')">edgeScrollSpeed</Anchor>, <Anchor :to="resolveHref('api.md#edgeScrollTriggerMode')">edgeScrollTriggerMode</Anchor>.</p>
<vheading :level="2" id="touch">Touch</vheading>
<p>It works in touch devices. It will prevent default action when touch by drag, but sometimes that does not work. Use follow css to prevent default touch action such as scroll. The css target is the drag trigger element. If no drag trigger, it is <code v-pre>.tree-node</code>.</p>
<pre><code v-pre class="language-css">touch-action: none;
</code></pre>
<vheading :level="2" id="max-level">Max Level</vheading>
<p>To limit the max level of the tree when drag. Use prop <code v-pre>eachDroppable</code>. Follow example code works in Vue2 and Vue3.</p>
<pre><code v-pre class="language-html">&lt;Draggable :eachDroppable=&quot;eachDroppable&quot; /&gt;
</code></pre>
<pre><code v-pre class="language-js">data() {
  return {
    eachDroppable: (node, store, options, startTree) =&gt; {
      const maxLevel = 3; // change it by your requirement
      let draggingNodeMaxLevel = 0;
      hp.walkTreeData(
        store.draggingNode,
        (childNode) =&gt; {
          if (childNode.$level &gt; draggingNodeMaxLevel) {
            draggingNodeMaxLevel = childNode.$level;
          }
        },
        &quot;$children&quot;
      );
      draggingNodeMaxLevel = draggingNodeMaxLevel - store.draggingNode.$level;
      if (node.$level + draggingNodeMaxLevel &gt;= maxLevel) {
        return false;
      }
    },
  }
}
</code></pre>
<vheading :level="2" id="pro-plugin">Pro Plugin</vheading>
<p>The <Anchor :to="resolveHref('/pro-plugin')">pro plugin</Anchor> has advanced features.</p>
<ul>
<li>Cross tree. Drag from a tree to another tree.</li>
<li>Clone. Clone node when drag start.</li>
</ul>
<vheading :level="2" id="import-by-script-tag">Import by script tag</vheading>
<p>Download the latest version from npm, upload <code v-pre>dist</code> folder to your server. You can access the library through gloabl variable <code v-pre>heTreeVue3</code> or <code v-pre>heTreeVue2</code>.</p>
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
      const data = {"name":"Guide","id":"guide","children":[{"name":"Installation","id":"installation","children":[]},{"name":"Import","id":"import","children":[]},{"name":"Don't use margin out of node","id":"dont-use-margin-out-of-node","children":[]},{"name":"treeData or flatData","id":"treedata-or-flatdata","children":[]},{"name":"Structure","id":"structure","children":[]},{"name":"Usage","id":"usage","children":[]},{"name":"Ouput","id":"ouput","children":[]},{"name":"Fold & Expand","id":"fold--expand","children":[]},{"name":"Lazy Load","id":"lazy-load","children":[]},{"name":"Folde all nodes by default","id":"folde-all-nodes-by-default","children":[]},{"name":"Checkbox","id":"checkbox","children":[]},{"name":"RTL","id":"rtl","children":[]},{"name":"Virtualization","id":"virtualization","children":[]},{"name":"Draggable","id":"draggable","children":[]},{"name":"Drag Trigger","id":"drag-trigger","children":[]},{"name":"Prevent Drag","id":"prevent-drag","children":[]},{"name":"Prevent Drop","id":"prevent-drop","children":[]},{"name":"Runtime data in drag and drop process","id":"runtime-data-in-drag-and-drop-process","children":[]},{"name":"Placeholder","id":"placeholder","children":[]},{"name":"Open folded node when dragging","id":"open-folded-node-when-dragging","children":[]},{"name":"How to locate the dragging node","id":"how-to-locate-the-dragging-node","children":[]},{"name":"Edge Scroll","id":"edge-scroll","children":[]},{"name":"Touch","id":"touch","children":[]},{"name":"Max Level","id":"max-level","children":[]},{"name":"Pro Plugin","id":"pro-plugin","children":[]},{"name":"Import by script tag","id":"import-by-script-tag","children":[]}]}
      useTitle(data.name, vm)
      docsSubmenu.value = data.children
      onBeforeUnmount(() => {
        docsSubmenu.value = null
      })
    },
  }
</script>
