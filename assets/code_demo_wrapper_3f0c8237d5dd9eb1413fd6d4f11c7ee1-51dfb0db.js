import{C as f}from"./CodeContainer-bc270f09.js";import{_ as m,j as g,O as k,r as o,o as s,k as l,w as i,l as D,m as b,a as p,v,t as C,b as V}from"./index-86792da5.js";/* empty css                        */const $={components:{Draggable:g,OpenIcon:k},data(){return{treeData:[{text:"Projects",children:[{text:"Frontend",children:[{text:"Vue",children:[{text:"Nuxt"}]},{text:"React",children:[{text:"Next"}]},{text:"Angular"}]},{text:"Backend"}]},{text:"Photos"},{text:"Videos"}]}}},N=["onUpdate:modelValue"],O={class:"mtl-ml"};function y(_,n,x,u,t,h){const c=o("OpenIcon"),a=o("Draggable");return s(),l(a,{class:"mtl-tree",modelValue:t.treeData,"onUpdate:modelValue":n[0]||(n[0]=r=>t.treeData=r),treeLine:""},{default:i(({node:r,stat:e})=>[e.children.length?(s(),l(c,{key:0,open:e.open,class:"mtl-mr",onClick:d=>e.open=!e.open},null,8,["open","onClick"])):D("",!0),b(p("input",{class:"mtl-checkbox mtl-mr",type:"checkbox","onUpdate:modelValue":d=>e.checked=d},null,8,N),[[v,e.checked]]),p("span",O,C(r.text),1)]),_:1},8,["modelValue"])}const B=m($,[["render",y]]),I="<template>\n  <Draggable class=\"mtl-tree\" v-model=\"treeData\" treeLine>\n    <template #default=\"{ node, stat }\">\n      <OpenIcon\n        v-if=\"stat.children.length\"\n        :open=\"stat.open\"\n        class=\"mtl-mr\"\n        @click.native=\"stat.open = !stat.open\"\n      />\n      <input\n        class=\"mtl-checkbox mtl-mr\"\n        type=\"checkbox\"\n        v-model=\"stat.checked\"\n      />\n      <span class=\"mtl-ml\">{{ node.text }}</span>\n    </template>\n  </Draggable>\n</template>\n\n<script>\n  import { BaseTree, Draggable, pro, OpenIcon } from '@he-tree/vue'\n  import '@he-tree/vue/style/default.css'\n  import '@he-tree/vue/style/material-design.css'\n\n  export default {\n    components: { Draggable, OpenIcon },\n    data() {\n      return {\n        treeData: [\n          {\n            text: 'Projects',\n            children: [\n              {\n                text: 'Frontend',\n                children: [\n                  {\n                    text: 'Vue',\n                    children: [\n                      {\n                        text: 'Nuxt',\n                      },\n                    ],\n                  },\n                  {\n                    text: 'React',\n                    children: [\n                      {\n                        text: 'Next',\n                      },\n                    ],\n                  },\n                  {\n                    text: 'Angular',\n                  },\n                ],\n              },\n              {\n                text: 'Backend',\n              },\n            ],\n          },\n          { text: 'Photos' },\n          { text: 'Videos' },\n        ],\n      }\n    },\n  }\n<\/script>",j={components:{CodeContainer:f,Demo:B},data(){return{code:I}}};function w(_,n,x,u,t,h){const c=o("Demo"),a=o("CodeContainer");return s(),l(a,{code:t.code,demo:"",codeLanguage:"vue"},{default:i(()=>[V(c)]),_:1},8,["code"])}const A=m(j,[["render",w]]);export{A as i};
