<template>
  <div class="docs-view">
    <div class="article mt-14 mb-8 prose">
      <vheading :level="1" id="pro-插件">Pro 插件</vheading>
<p>he-tree 遵循 MIT 协议, 保留版权即可自由使用. he-tree-pro 是一个付费插件, 包含几个高级功能: 跨树拖拽, 拖拽时克隆. 如果您有需要, 请购买 he-tree-pro. 购买时请填写您的邮箱和名字, 一旦您购买, 相关文件会在 24 小时内发送给您. 购买后, 如果有更新, 您也会收到全新版本.</p>
<vheading :level="2" id="许可证">许可证</vheading>
<vheading :level="3" id="regular-license">Regular License</vheading>
<ul>
<li>可使用的终端产品数量: <strong>1</strong></li>
<li>在出售的终端产品中使用: <strong>不允许</strong></li>
</ul>
<vheading :level="3" id="extended-license">Extended License</vheading>
<ul>
<li>可使用的终端产品数量: <strong>20</strong></li>
<li>在出售的终端产品中使用: <strong>允许</strong></li>
</ul>
<vheading :level="2" id="通过-paypal-购买">通过 Paypal 购买</vheading>
<form action="https://www.paypal.com/cgi-bin/webscr" method="post" target="_top">
<input type="hidden" name="cmd" value="_s-xclick">
<table>
<tr><td><input type="hidden" name="on0" value="Licenses">Licenses</td></tr><tr><td><select name="os0">
    <option value="Regular License">Regular License $ 50.00 USD</option>
    <option value="Extended License">Extended License $ 500.00 USD</option>
</select> </td></tr>
<tr><td><input type="hidden" name="on1" value="Your Name">Your Name</td></tr><tr><td><input type="text" name="os1" maxlength="200"></td></tr>
<tr><td><input type="hidden" name="on2" value="Your Email">Your Email</td></tr><tr><td><input type="text" name="os2" maxlength="200"></td></tr>
</table>
<input type="hidden" name="encrypted" value="-----BEGIN PKCS7-----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-----END PKCS7-----">
<input type="image" src="https://www.paypalobjects.com/en_US/GB/i/btn/btn_buynowCC_LG.gif" border="0" name="submit" alt="PayPal – The safer, easier way to pay online!">
<img alt="" border="0" src="https://www.paypalobjects.com/zh_XC/i/scr/pixel.gif" width="1" height="1">
</form>

<p>有客户反映收不到第一封邮件. 你可以购买后<Anchor :to="resolveHref('mailto:phphe@outlook.com?subject=he-tree-vue-pro purchased&body=Please send it to me as soon as possible.')">点击这里</Anchor>先给我发送一封邮件, 然后我将回复你.</p>
<vheading :level="2" id="支付宝或微信或其他方式购买">支付宝或微信或其他方式购买</vheading>
<p>请联系我们.</p>
<vheading :level="2" id="曾购买老版本">曾购买老版本</vheading>
<p>购买过 <Anchor :to="resolveHref('https://he-tree-vue.phphe.com/')">he-tree-vue</Anchor>的用户可以免费升级到 he-tree. <Anchor :to="resolveHref('mailto:phphe@outlook.com?subject=Request he-tree&body=I have purchased he-tree-vue. I want to get same license of he-tree.')">点击此处发送邮件联系我</Anchor>.</p>
<vheading :level="2" id="雇佣我">雇佣我</vheading>
<p>我可以提供 he-tree 定制开发, 高级 Vue 组件定制, 或其他 Vue 相关开发. <Anchor :to="resolveHref('mailto:phphe@outlook.com?subject=&body=')">请联系我</Anchor>.</p>
<vheading :level="2" id="联系方式">联系方式</vheading>
<ul>
<li>Email: <Anchor :to="resolveHref('mailto:&#x70;&#104;&#112;&#104;&#x65;&#x40;&#111;&#x75;&#116;&#x6c;&#111;&#x6f;&#107;&#46;&#x63;&#111;&#x6d;')">&#x70;&#104;&#112;&#104;&#x65;&#x40;&#111;&#x75;&#116;&#x6c;&#111;&#x6f;&#107;&#46;&#x63;&#111;&#x6d;</Anchor></li>
</ul>

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
      const data = {"name":"Pro 插件","id":"pro-插件","children":[{"name":"许可证","id":"许可证","children":[{"name":"Regular License","id":"regular-license","children":[]},{"name":"Extended License","id":"extended-license","children":[]}]},{"name":"通过 Paypal 购买","id":"通过-paypal-购买","children":[]},{"name":"支付宝或微信或其他方式购买","id":"支付宝或微信或其他方式购买","children":[]},{"name":"曾购买老版本","id":"曾购买老版本","children":[]},{"name":"雇佣我","id":"雇佣我","children":[]},{"name":"联系方式","id":"联系方式","children":[]}]}
      useTitle(data.name, vm)
      docsSubmenu.value = data.children
      onBeforeUnmount(() => {
        docsSubmenu.value = null
      })
    },
  }
</script>
