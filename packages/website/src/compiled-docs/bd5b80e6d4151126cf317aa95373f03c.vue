<template>
  <div class="docs-view">
    <div class="article mt-14 mb-8 prose">
      <vheading :level="1" id="api">API</vheading>
<vheading :level="2" id="basetree">BaseTree</vheading>
<vheading :level="3" id="props">props</vheading>
<vheading :level="4" id="idkey">idKey</vheading>
<pre><code v-pre class="language-ts">{ type: String, default: &quot;id&quot; }
</code></pre>
<vheading :level="4" id="parentidkey">parentIdKey</vheading>
<pre><code v-pre class="language-ts">{ type: String, default: &quot;parent_id&quot; }
</code></pre>
<vheading :level="4" id="childrenkey">childrenKey</vheading>
<pre><code v-pre class="language-ts">{ type: String, default: &quot;children&quot; }
</code></pre>
<vheading :level="4" id="textkey">textKey</vheading>
<pre><code v-pre class="language-ts">{ type: String, default: &quot;text&quot; }
</code></pre>
<vheading :level="4" id="flatdata">flatData</vheading>
<pre><code v-pre class="language-ts">{
  type: Array
}
</code></pre>
<vheading :level="4" id="treedata">treeData</vheading>
<pre><code v-pre class="language-ts">{
  type: Array
}
</code></pre>
<vheading :level="4" id="indent">indent</vheading>
<pre><code v-pre class="language-ts">{ type: Number, default: 20 }
</code></pre>
<vheading :level="4" id="gap">gap</vheading>
<pre><code v-pre class="language-ts">{
  type: Number
}
</code></pre>
<vheading :level="4" id="rtl">rtl</vheading>
<pre><code v-pre class="language-ts">{ type: Boolean, default: false }
</code></pre>
<vheading :level="4" id="virtualization">virtualization</vheading>
<pre><code v-pre class="language-ts">{ type: Boolean, default: false }
</code></pre>
<vheading :level="4" id="virtualizationprerender">virtualizationPrerender</vheading>
<pre><code v-pre class="language-ts">{ type: Number, default: 20 }
</code></pre>
<vheading :level="4" id="childrenlazyloading">childrenLazyLoading</vheading>
<pre><code v-pre class="language-ts">{ type: Boolean, default: false }
</code></pre>
<vheading :level="4" id="childrenloader">childrenLoader</vheading>
<pre><code v-pre class="language-ts">(
  node: Node,
  vm: ComponentPublicInstance
) =&gt; Promise&lt;Node[]&gt;;
</code></pre>
<vheading :level="4" id="defaultfolded">defaultFolded</vheading>
<pre><code v-pre class="language-ts">{ type: Boolean, default: false }
</code></pre>
<vheading :level="3" id="data">data</vheading>
<vheading :level="4" id="nodes">nodes</vheading>
<pre><code v-pre class="language-ts">Node[]
</code></pre>
<vheading :level="4" id="nodesbyid">nodesByID</vheading>
<pre><code v-pre class="language-ts">Record&lt;string, Node&gt;
</code></pre>
<vheading :level="4" id="trees">trees</vheading>
<pre><code v-pre class="language-ts">{[treeID:string]: Node}
</code></pre>
<vheading :level="4" id="dragging">dragging</vheading>
<pre><code v-pre class="language-ts">boolean
</code></pre>
<vheading :level="4" id="treeid">treeID</vheading>
<pre><code v-pre class="language-ts">string
</code></pre>
<vheading :level="4" id="tree">tree</vheading>
<p>vm of tree</p>
<pre><code v-pre class="language-ts">this
</code></pre>
<vheading :level="3" id="computed">computed</vheading>
<vheading :level="4" id="visiblenodes">visibleNodes</vheading>
<pre><code v-pre class="language-ts">Node[]
</code></pre>
<vheading :level="3" id="events">events</vheading>
<vheading :level="4" id="fold">fold</vheading>
<pre><code v-pre class="language-ts">(node: Node)
</code></pre>
<vheading :level="4" id="unfold">unfold</vheading>
<pre><code v-pre class="language-ts">(node: Node)
</code></pre>
<vheading :level="4" id="load-children">load-children</vheading>
<p>For children lazy load. Start to load children</p>
<pre><code v-pre class="language-ts">(node: Node)
</code></pre>
<vheading :level="4" id="load-children-success">load-children-success</vheading>
<p>For children lazy load</p>
<pre><code v-pre class="language-ts">(node: Node)
</code></pre>
<vheading :level="4" id="load-children-error">load-children-error</vheading>
<p>For children lazy load. Get error by <code v-pre>node.$childrenLoadStaus.error</code>.</p>
<pre><code v-pre class="language-ts">(node: Node)
</code></pre>
<vheading :level="3" id="methods">methods</vheading>
<vheading :level="4" id="countchildren">countChildren</vheading>
<pre><code v-pre class="language-ts">(node: Node | undefined): number
</code></pre>
<vheading :level="4" id="addnode">addNode</vheading>
<pre><code v-pre class="language-ts">(node: obj, parentId: number | string | null, index?: number): void;
</code></pre>
<vheading :level="4" id="movenode">moveNode</vheading>
<pre><code v-pre class="language-ts">(node: Node, parentId: number | string | null, index?: number): void;
</code></pre>
<vheading :level="4" id="removenode">removeNode</vheading>
<pre><code v-pre class="language-ts">(node: Node): void;
</code></pre>
<vheading :level="4" id="outputnesteddata">outputNestedData</vheading>
<pre><code v-pre class="language-ts">(parent: Node | null, ignoreKeys?: string[], _returnFlat?: boolean | undefined): obj[];
</code></pre>
<vheading :level="4" id="outputflatdata">outputFlatData</vheading>
<pre><code v-pre class="language-ts">(parent: Node | null, ignoreKeys?: string[]): Record&lt;string, unknown&gt;[];
</code></pre>
<vheading :level="4" id="isnodeparentfolded">isNodeParentFolded</vheading>
<pre><code v-pre class="language-ts">(node: Node): boolean;
</code></pre>
<vheading :level="4" id="isnodevisible">isNodeVisible</vheading>
<pre><code v-pre class="language-ts">(node: Node): boolean;
</code></pre>
<vheading :level="4" id="foldall">foldAll</vheading>
<pre><code v-pre class="language-ts">(): void;
</code></pre>
<vheading :level="4" id="unfoldall">unfoldAll</vheading>
<pre><code v-pre class="language-ts">(node?: Node | undefined): Promise&lt;void&gt; | undefined;
</code></pre>
<vheading :level="4" id="unfold-1">unfold</vheading>
<pre><code v-pre class="language-ts">(node: Node): void | Promise&lt;void&gt;;
</code></pre>
<vheading :level="4" id="togglefold">toggleFold</vheading>
<pre><code v-pre class="language-ts">(node: Node): void | Promise&lt;void&gt;;
</code></pre>
<vheading :level="4" id="updatechecked">updateChecked</vheading>
<pre><code v-pre class="language-ts">(node: Node): void;
</code></pre>
<vheading :level="4" id="getallcheckednodes">getAllCheckedNodes</vheading>
<pre><code v-pre class="language-ts">(): Node[];
</code></pre>
<vheading :level="2" id="draggable">Draggable</vheading>
<p>The draggable tree component. It extends BaseTree.</p>
<vheading :level="3" id="props-1">props</vheading>
<vheading :level="4" id="triggerclass">triggerClass</vheading>
<pre><code v-pre class="language-ts">{ type: String, default: &quot;tree-node&quot; }
</code></pre>
<vheading :level="4" id="triggerbyself">triggerBySelf</vheading>
<pre><code v-pre class="language-ts">Boolean
</code></pre>
<vheading :level="4" id="draggable-1">draggable</vheading>
<pre><code v-pre class="language-ts">{ type: Boolean, default: true }
</code></pre>
<vheading :level="4" id="droppable">droppable</vheading>
<pre><code v-pre class="language-ts">{ type: Boolean, default: true }
</code></pre>
<vheading :level="4" id="eachdraggable">eachDraggable</vheading>
<pre><code v-pre class="language-ts">{
  type: [Boolean, Function]
}
</code></pre>
<p>Function type is <Anchor :to="resolveHref('#eachDraggableFunc')">eachDraggableFunc</Anchor></p>
<vheading :level="4" id="eachdroppable">eachDroppable</vheading>
<pre><code v-pre class="language-ts">{
  type: [Boolean, Function]
}
</code></pre>
<p>Function type is <Anchor :to="resolveHref('#eachDraggableFunc')">eachDraggableFunc</Anchor></p>
<vheading :level="4" id="rootdraggable">rootDraggable</vheading>
<pre><code v-pre class="language-ts">{ type: Boolean, default: true }
</code></pre>
<vheading :level="4" id="rootdroppable">rootDroppable</vheading>
<pre><code v-pre class="language-ts">{ type: Boolean, default: true }
</code></pre>
<vheading :level="4" id="ondragstart">ondragstart</vheading>
<pre><code v-pre class="language-ts">{
  type: Function as PropType&lt;(store: Store3) =&gt; boolean&gt;
}
</code></pre>
<p><strong><code v-pre>ondragend</code> supports promise, but <code v-pre>ondragstart</code> does not.</strong></p>
<vheading :level="4" id="ondragend">ondragend</vheading>
<pre><code v-pre class="language-ts">{
  type: Function as PropType&lt;(store: Store3) =&gt; boolean&gt;
}
</code></pre>
<p><strong><code v-pre>ondragend</code> supports promise, but <code v-pre>ondragstart</code> does not.</strong></p>
<vheading :level="4" id="afterplaceholdercreated">afterPlaceholderCreated</vheading>
<pre><code v-pre class="language-ts">(placeholder: HTMLElement, store: Store3) =&gt; void
</code></pre>
<vheading :level="4" id="placeholdermaxheight">placeholderMaxHeight</vheading>
<pre><code v-pre class="language-ts">{ type: Number, default: 100 }
</code></pre>
<vheading :level="4" id="unfoldwhendragover">unfoldWhenDragover</vheading>
<pre><code v-pre class="language-ts">{ type: Boolean, default: true }
</code></pre>
<vheading :level="4" id="unfoldwhendragoverdelay">unfoldWhenDragoverDelay</vheading>
<pre><code v-pre class="language-ts">{ type: Number, default: 80 }
</code></pre>
<vheading :level="4" id="isnodeunfoldable">isNodeUnfoldable</vheading>
<pre><code v-pre class="language-ts">{
type: Function as PropType&lt;(store: Store3) =&gt; boolean&gt;,
}
</code></pre>
<vheading :level="4" id="draggingnodepositionmode">draggingNodePositionMode</vheading>
<pre><code v-pre class="language-ts">{
type: String as PropType&lt;PositionMode&gt;,
default: &quot;top_left_corner&quot;,
}
</code></pre>
<vheading :level="4" id="preventtextselection">preventTextSelection</vheading>
<pre><code v-pre class="language-ts">{ type: Boolean, default: true }
</code></pre>
<vheading :level="4" id="edgescroll">edgeScroll</vheading>
<pre><code v-pre class="language-ts">{
  type: Boolean
}
</code></pre>
<vheading :level="4" id="edgescrolltriggermargin">edgeScrollTriggerMargin</vheading>
<pre><code v-pre class="language-ts">{ type: Number, default: 50 }
</code></pre>
<vheading :level="4" id="edgescrollspeed">edgeScrollSpeed</vheading>
<pre><code v-pre class="language-ts">{ type: Number, default: 0.35 }
</code></pre>
<vheading :level="4" id="edgescrolltriggermode">edgeScrollTriggerMode</vheading>
<pre><code v-pre class="language-ts">{
type: String as PropType&lt;PositionMode&gt;,
default: &quot;top_left_corner&quot;,
}
</code></pre>
<vheading :level="4" id="edgescrollspecifiedcontainerx">edgeScrollSpecifiedContainerX</vheading>
<pre><code v-pre class="language-ts">HTMLElement | ((store: Store3) =&gt; HTMLElement)
</code></pre>
<vheading :level="4" id="edgescrollspecifiedcontainery">edgeScrollSpecifiedContainerY</vheading>
<pre><code v-pre class="language-ts">HTMLElement | ((store: Store3) =&gt; HTMLElement)
</code></pre>
<vheading :level="3" id="data-1">data</vheading>
<vheading :level="4" id="draggingnode">draggingNode</vheading>
<pre><code v-pre class="language-ts">Node | null
</code></pre>
<vheading :level="4" id="store">store</vheading>
<p>Runtime data of drag and drop.</p>
<pre><code v-pre class="language-ts">Store3 | null
</code></pre>
<vheading :level="3" id="events-1">events</vheading>
<vheading :level="4" id="drag">drag</vheading>
<p>Emit when drag start.</p>
<pre><code v-pre class="language-ts">(store: Store3)
</code></pre>
<vheading :level="4" id="before-first-move">before-first-move</vheading>
<p>Same with <code v-pre>drag</code></p>
<pre><code v-pre class="language-ts">(store: Store3)
</code></pre>
<vheading :level="4" id="drop">drop</vheading>
<p>Emit when drag end. Emit to drag start/source tree.</p>
<pre><code v-pre class="language-ts">(store: Store3)
</code></pre>
<vheading :level="4" id="drop-into">drop-into</vheading>
<p>Emit when drag end. Emit to drag end/target tree.</p>
<pre><code v-pre class="language-ts">(store: Store3)
</code></pre>
<vheading :level="4" id="drop-change">drop-change</vheading>
<p>Emit when the tree changed by drag. Emit to both drag start and end tree.</p>
<pre><code v-pre class="language-ts">(store: Store3)
</code></pre>
<vheading :level="3" id="methods-1">methods</vheading>
<vheading :level="4" id="isparentdragging">isParentDragging</vheading>
<pre><code v-pre class="language-ts">(node: Node): boolean;
</code></pre>
<vheading :level="2" id="other">Other</vheading>
<vheading :level="3" id="draggable-2">Draggable</vheading>
<p>The Vue instance(vm) of the Draggable component.</p>
<vheading :level="3" id="eachdraggablefunc">eachDraggableFunc</vheading>
<pre><code v-pre class="language-ts">;(node: Node | undefined, store: Store3, options: Options2, vm: Draggable) =&gt;
  boolean | undefined
</code></pre>
<vheading :level="3" id="positionmode">PositionMode</vheading>
<pre><code v-pre class="language-ts">&#39;top_left_corner&#39; | &#39;mouse&#39;
</code></pre>
<vheading :level="3" id="store3">Store3</vheading>
<p>Runtime data of drag and drop.</p>
<pre><code v-pre class="language-ts">interface {
  // Store
  movedCount: number;
  listenerElement: HTMLElement;
  directTriggerElement: HTMLElement;
  triggerElement: HTMLElement;
  startEvent: MouseOrTouchEvent;
  moveEvent: MouseOrTouchEvent;
  endEvent: MouseOrTouchEvent;
  mouse: EventPosition;
  initialMouse: EventPosition;
  move: EventPosition2;
  movedOrClonedElement: HTMLElement;
  movedElement: HTMLElement;
  initialPosition: EventPosition2;
  initialPositionRelativeToViewport: EventPosition2;
  updateMovedElementStyle: () =&gt; void;
  _isMovingElementCloned: boolean;
  // Store2
  startTreeEl: HTMLElement;
  targetTreeEl: HTMLElement;
  placeholder: HTMLElement;
  // Store3
  startTree: Draggable;
  targetTree: Draggable;
  draggingNode: Node;
  startPath: {
      tree: Draggable;
      parent?: Node;
      index: number;
  };
  targetPath: Store3[&quot;startPath&quot;]; // same to startPath
  placeholderLevel: number;
  placeholderPrevNode?: Node;
  placeholderPrevNodeInTree?: Node;
  dragChanged?: boolean;
  isCloned?: boolean;
}
</code></pre>
<vheading :level="3" id="eventposition">EventPosition</vheading>
<pre><code v-pre class="language-ts">{
  x: number, y: number,
  pageX: number,
  pageY: number,
  clientX: number,
  clientY: number,
  screenX: number,
  screenY: number
}
</code></pre>
<vheading :level="3" id="eventposition2">EventPosition2</vheading>
<pre><code v-pre class="language-ts">{
  x: number
  y: number
}
</code></pre>
<vheading :level="3" id="obj">obj</vheading>
<pre><code v-pre class="language-ts">{
  string: unknown
}
</code></pre>
<vheading :level="3" id="basenode">BaseNode</vheading>
<pre><code v-pre class="language-ts">{
    $id: string | number;
    $pid?: string | number;
    $level: number;
    $hidden?: boolean;
    $folded?: boolean;
    $checked?: boolean | 0;
    $children: Node[];
    $childrenLoading?: boolean;
    $childrenLoadStaus?: {
      status: &#39;success&#39;|&#39;error&#39;,
      error: Error
    };
    $draggable?: boolean;
    $droppable?: boolean;
    $nodeStyle?: string | Record&lt;string, string&gt; | unknown;
    $nodeClass?: string | unknown;
    $outerStyle?: string | Record&lt;string, string&gt; | unknown;
    $outerClass?: string | unknown;
}
</code></pre>
<vheading :level="3" id="node">Node</vheading>
<pre><code v-pre class="language-ts">obj &amp; BaseNode
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
      const data = {"name":"API","id":"api","children":[{"name":"BaseTree","id":"basetree","children":[{"name":"props","id":"props","children":[{"name":"idKey","id":"idkey","children":[]},{"name":"parentIdKey","id":"parentidkey","children":[]},{"name":"childrenKey","id":"childrenkey","children":[]},{"name":"textKey","id":"textkey","children":[]},{"name":"flatData","id":"flatdata","children":[]},{"name":"treeData","id":"treedata","children":[]},{"name":"indent","id":"indent","children":[]},{"name":"gap","id":"gap","children":[]},{"name":"rtl","id":"rtl","children":[]},{"name":"virtualization","id":"virtualization","children":[]},{"name":"virtualizationPrerender","id":"virtualizationprerender","children":[]},{"name":"childrenLazyLoading","id":"childrenlazyloading","children":[]},{"name":"childrenLoader","id":"childrenloader","children":[]},{"name":"defaultFolded","id":"defaultfolded","children":[]}]},{"name":"data","id":"data","children":[{"name":"nodes","id":"nodes","children":[]},{"name":"nodesByID","id":"nodesbyid","children":[]},{"name":"trees","id":"trees","children":[]},{"name":"dragging","id":"dragging","children":[]},{"name":"treeID","id":"treeid","children":[]},{"name":"tree","id":"tree","children":[]}]},{"name":"computed","id":"computed","children":[{"name":"visibleNodes","id":"visiblenodes","children":[]}]},{"name":"events","id":"events","children":[{"name":"fold","id":"fold","children":[]},{"name":"unfold","id":"unfold","children":[]},{"name":"load-children","id":"load-children","children":[]},{"name":"load-children-success","id":"load-children-success","children":[]},{"name":"load-children-error","id":"load-children-error","children":[]}]},{"name":"methods","id":"methods","children":[{"name":"countChildren","id":"countchildren","children":[]},{"name":"addNode","id":"addnode","children":[]},{"name":"moveNode","id":"movenode","children":[]},{"name":"removeNode","id":"removenode","children":[]},{"name":"outputNestedData","id":"outputnesteddata","children":[]},{"name":"outputFlatData","id":"outputflatdata","children":[]},{"name":"isNodeParentFolded","id":"isnodeparentfolded","children":[]},{"name":"isNodeVisible","id":"isnodevisible","children":[]},{"name":"foldAll","id":"foldall","children":[]},{"name":"unfoldAll","id":"unfoldall","children":[]},{"name":"unfold","id":"unfold-1","children":[]},{"name":"toggleFold","id":"togglefold","children":[]},{"name":"updateChecked","id":"updatechecked","children":[]},{"name":"getAllCheckedNodes","id":"getallcheckednodes","children":[]}]}]},{"name":"Draggable","id":"draggable","children":[{"name":"props","id":"props-1","children":[{"name":"triggerClass","id":"triggerclass","children":[]},{"name":"triggerBySelf","id":"triggerbyself","children":[]},{"name":"draggable","id":"draggable-1","children":[]},{"name":"droppable","id":"droppable","children":[]},{"name":"eachDraggable","id":"eachdraggable","children":[]},{"name":"eachDroppable","id":"eachdroppable","children":[]},{"name":"rootDraggable","id":"rootdraggable","children":[]},{"name":"rootDroppable","id":"rootdroppable","children":[]},{"name":"ondragstart","id":"ondragstart","children":[]},{"name":"ondragend","id":"ondragend","children":[]},{"name":"afterPlaceholderCreated","id":"afterplaceholdercreated","children":[]},{"name":"placeholderMaxHeight","id":"placeholdermaxheight","children":[]},{"name":"unfoldWhenDragover","id":"unfoldwhendragover","children":[]},{"name":"unfoldWhenDragoverDelay","id":"unfoldwhendragoverdelay","children":[]},{"name":"isNodeUnfoldable","id":"isnodeunfoldable","children":[]},{"name":"draggingNodePositionMode","id":"draggingnodepositionmode","children":[]},{"name":"preventTextSelection","id":"preventtextselection","children":[]},{"name":"edgeScroll","id":"edgescroll","children":[]},{"name":"edgeScrollTriggerMargin","id":"edgescrolltriggermargin","children":[]},{"name":"edgeScrollSpeed","id":"edgescrollspeed","children":[]},{"name":"edgeScrollTriggerMode","id":"edgescrolltriggermode","children":[]},{"name":"edgeScrollSpecifiedContainerX","id":"edgescrollspecifiedcontainerx","children":[]},{"name":"edgeScrollSpecifiedContainerY","id":"edgescrollspecifiedcontainery","children":[]}]},{"name":"data","id":"data-1","children":[{"name":"draggingNode","id":"draggingnode","children":[]},{"name":"store","id":"store","children":[]}]},{"name":"events","id":"events-1","children":[{"name":"drag","id":"drag","children":[]},{"name":"before-first-move","id":"before-first-move","children":[]},{"name":"drop","id":"drop","children":[]},{"name":"drop-into","id":"drop-into","children":[]},{"name":"drop-change","id":"drop-change","children":[]}]},{"name":"methods","id":"methods-1","children":[{"name":"isParentDragging","id":"isparentdragging","children":[]}]}]},{"name":"Other","id":"other","children":[{"name":"Draggable","id":"draggable-2","children":[]},{"name":"eachDraggableFunc","id":"eachdraggablefunc","children":[]},{"name":"PositionMode","id":"positionmode","children":[]},{"name":"Store3","id":"store3","children":[]},{"name":"EventPosition","id":"eventposition","children":[]},{"name":"EventPosition2","id":"eventposition2","children":[]},{"name":"obj","id":"obj","children":[]},{"name":"BaseNode","id":"basenode","children":[]},{"name":"Node","id":"node","children":[]}]}]}
      useTitle(data.name, vm)
      docsSubmenu.value = data.children
      onBeforeUnmount(() => {
        docsSubmenu.value = null
      })
    },
  }
</script>
