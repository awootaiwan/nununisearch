# site-search-sdk-js
## 以下內容從 cupid 複製，待更新

[![npm (tag)](https://img.shields.io/npm/v/@awootaiwan/cupid-sdk-js/latest?color=red)](https://www.npmjs.com/package/@awootaiwan/cupid-sdk-js) [![cdn](https://img.shields.io/badge/cdn-latest-orange)](https://api.awoo.org/libs/cupid-sdk-latest.min.js) ![GitHub issues](https://img.shields.io/github/issues/awootaiwan/cupid-sdk-js) ![GitHub pull requests](https://img.shields.io/github/issues-pr/awootaiwan/cupid-sdk-js)

## Installation

#### In a browser

```javascript
<script>
  window.cupid={init:function(t){var e,n,o;document.getElementById("cupid-js")||((e=document.createElement("script")).type="text/javascript",e.id="cupid-js",e.async=!0,e.src=("https:"===document.location.protocol?"https://":"http://")+"api.awoo.org/libs/cupid-sdk-latest.min.js",(o=document.getElementsByTagName("script")[0]).parentNode.insertBefore(e,o)),n=window.onload,window.onload=function(){return n&&n(),t()}}};

  cupid.init(() => {
    const cupidSDK = new CupidSDK('id');

    /*頁面商品顯示數量設定*/
    cupidSDK.setLimit(12);

    /*頁面渲染範例*/
    cupidSDK.renderSuggestionTag();
    cupidSDK.renderProductList();

    /*資料存取範例*/
    (async() => {
      console.log(await cupidSDK.getContentAll('日本,面膜'));
    })();
  });
</script>
```

#### Node Usage

```
$ npm i @awootaiwan/cupid-sdk-js
or
$ yarn add @awootaiwan/cupid-sdk-js
```

#### Node Example

```javascript
import CupidSDK from "@awootaiwan/cupid-sdk-js";

const cupidSDK = new CupidSDK("id");
(async () => {
  console.log(await cupidSDK.getContentAll("日本,面膜"));
})();
```

## Develop

### Installing

```
$ git clone https://github.com/awootaiwan/cupid-sdk-js.git
$ cd cupid-sdk-js
$ npm install
$ vim .env
```

內容如下

```
NUNUNI_ID=xxxxxx   #請輸入nununiId
NUNUNI_DOMAIN=http://example.com #請輸入 api網址
```

開發上如果有需要用到 api 網址可使用如下的程式碼

```
const api = `${process.env.NUNUNI_DOMAIN}/nununi/latest/${process.env.NUNUNI_ID}/content`;
```

### Dev

```
$ npm start
$ open http://localhost:3000
```

### Build

```
$ npm run build:app
```

### Build by your self.

Update `.env` to your dev / personal endpoint.

Update `demo/index.html` content, js replace from

```
window.cupid={init:function(t){var e,n,o;document.getElementById("cupid-js")||((e=document.createElement("script")).type="text/javascript",e.id="cupid-js",e.async=!0,e.src=("https:"===document.location.protocol?"https://":"http://")+"localhost:9080/cupid-sdk-latest.min.js",(o=document.getElementsByTagName("script")[0]).parentNode.insertBefore(e,o)),n=window.onload,window.onload=function(){return n&&n(),t()}}};
```

Tips: `npm install -g static-server`

```
npm run build:app
open demo/index.html
cd production && static-server
```