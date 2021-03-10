# site-search-sdk-js

## Installation

#### In a html file

```javascript
<script>
  window.nununi={init:function(t){var e,n,o;document.getElementById("nununi-js")||((e=document.createElement("script")).type="text/javascript",e.id="cupid-js",e.async=!0,e.src=("https:"===document.location.protocol?"https://":"http://")+"api.awoo.org/libs/nununi-sitesearch-sdk-latest.min",(o=document.getElementsByTagName("script")[0]).parentNode.insertBefore(e,o)),n=window.onload,window.onload=function(){return n&&n(),t()}}};

  nununi.init(() => {
    const nununiSDK = new NununiSiteSearchSDK('id');

   /*Products API版本設定 default: latest */
    nununiSDK.setProductsAPIVersion('v1');
    nununiSDK.setSuggestionAPIVersion('v1');
    
   /* cupid classify 標籤開關 */
    nununiSDK.setCupidClassify(true);

    /*頁面商品顯示數量設定
     32 or 64 or 80 */
    nununiSDK.setLimit(64);
    
    /*頁面商品排序設定
     1($低到高) or 2($高到低) or 11(最新上架) */
    nununiSDK.setSort(2);

    /*頁面渲染*/
    nununiSDK.renderSearchBar();
    nununiSDK.renderProductList();

    /*資料存取範例*/
    (async() => {
      console.log(await nununiSDK.getSuggestions('女 短褲'));
    })();
  });
</script>
```

#### Node Usage

```
$ npm i @awootaiwan/nununisearch
or
$ yarn add @awootaiwan/nununisearch
```

#### Node Example

```javascript
import NununiSiteSearchSDK from "@awootaiwan/nununisearch";

const nununiSDK = new NununiSiteSearchSDK("nununi Id");
(async () => {
  console.log(await nununiSDK.getSuggestions('女 短褲'));
})();
```

## Develop

### Installing

```
$ git clone https://github.com/awootaiwan/nununisearch.git
$ cd nununisearch
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

### Develop mode

```
$ npm run start
// 自動開啟 http://localhost:3000

$ npm run watch:app
// 監聽 App.js
```

### Build for Production edition

```
$ npm run build:app
```

### Build by yourself.

Update `.env` to your dev / personal endpoint.

Update `demo/index.html` content, js replace from

```
window.nununi={init:function(t){var e,n,o;document.getElementById("nununi-js")||((e=document.createElement("script")).type="text/javascript",e.id="nununi-js",e.async=!0,e.src=("https:"===document.location.protocol?"https://":"http://")+"localhost:9080/nununi-sdk-latest.min.js",(o=document.getElementsByTagName("script")[0]).parentNode.insertBefore(e,o)),n=window.onload,window.onload=function(){return n&&n(),t()}}};
```

Tips: `npm install -g static-server`

```
npm run build:app
open demo/index.html
cd production && static-server
```
