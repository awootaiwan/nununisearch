nununi-search 手冊
===

## 目錄

- [產品介紹](#產品介紹)
- [安裝](#安裝)
- [如何使用](#如何使用)
- [樣式覆寫](#樣式覆寫)
- [錯誤處理](#錯誤處理)
- [nununi API 方法說明](#nununi-api-方法說明)

## 產品介紹
nununiSDK 由兩個主要服務構成：
* suggestion: 依照客戶輸入的關鍵字，給出AI推薦的搜尋建議。
* site-search: 依照搜尋字，去查找相關的商品，並產出商品列表。此功能可以選擇開啟 cupid classify 標籤功能。

## 安裝
若在HTML檔案內安裝，請在 `<body>` 標籤最末端插入以下`設定區塊`，即完成初始設定：
```javascript
<script>
  window.nununi={init:function(t){var e,n,o;document.getElementById("nununi-js")||((e=document.createElement("script")).type="text/javascript",e.id="nununi-js",e.async=!0,e.src="../production/nununi-sdk-latest.min.js",(o=document.getElementsByTagName("script")[0]).parentNode.insertBefore(e,o)),n=window.onload,window.onload=function(){return n&&n(),t()}}};

  nununi.init(() => {
    const nununiSDK = new NununiSDK('nununi ID');

    /*Products API版本設定 default: latest */
    nununiSDK.setProductsAPIVersion('v1');
    nununiSDK.setSuggestionAPIVersion('v1');

    /* cupid classify 標籤開關 */
    nununiSDK.setCupidClassify(true);

    /*頁面商品顯示數量設定
     32 or 64 or 80 */
    nununiSDK.setLimit(64);

    /*頁面商品排序設定
     1(價格由低到高) or 2(價格由高到低) or 11(最新上架) */
    nununiSDK.setSort(2);
  });
</script>
```
若使用 npm or yarn 安裝，請在JavaScript 檔案內引用

```
$ npm i @awootaiwan/nununisearch
or
$ yarn add @awootaiwan/nununisearch
```

```javascript
import NununiSDK from "@awootaiwan/nununisearch";
const nununiSDK = new NununiSDK("id");
```

## 如何使用

### 使用 search-bar 元件 ＋ suggestion 功能

1. 在HTML檔案內加入 `<div id="nununi-searchbar"></div>`
2. 下方的`設定區塊`內加入以下代碼，畫面會渲染出搜尋列。
```javascript
nununiSDK.renderSearchBar();
```
### 使用 product-list 元件 ＋ site-search 功能 + classify 功能
1. 在HTML檔案內加入 `<div id="nununi-productlist"></div>`
2. 在HTML檔案內加入 `<div id="cupid-classify"></div>`
3. 下方的`設定區塊`內加入以下代碼，畫面會渲染出操作元件;在搜尋列內送出搜尋字，商品列表會渲染搜尋結果。
```javascript
nununiSDK.renderProductList();
```
4. `classify` 標籤預設為 <font color="#006600">開啟</font>，若要 <font color="#dd0000">關閉</font>，請改成 `false`
```javascript
/* cupid classify 標籤開關 */
nununiSDK.setCupidClassify(true);
```
### 範例程式碼 HTML
```javascript=
<body>
...

    <div class="container">
      <div id="nununi-searchbar"></div>
      <div id="cupid-classify"></div>
      <div id="nununi-productlist"></div>
    </div>

    <script>
      window.nununi={init:function(t){var e,n,o;document.getElementById("nununi-js")||((e=document.createElement("script")).type="text/javascript",e.id="nununi-js",e.async=!0,e.src="../production/nununi-sdk-latest.min.js",(o=document.getElementsByTagName("script")[0]).parentNode.insertBefore(e,o)),n=window.onload,window.onload=function(){return n&&n(),t()}}};

      nununi.init(() => {
        const nununiSDK = new NununiSDK('nununi ID');

        nununiSDK.setProductsAPIVersion('v1');
        nununiSDK.setSuggestionAPIVersion('v1');
        nununiSDK.setCupidClassify(true);
        nununiSDK.setLimit(32);
        nununiSDK.setSort(2);
        nununiSDK.renderSearchBar();
        nununiSDK.renderProductList();
      });
    </script>
</body>
```

## 樣式覆寫
以下是原生樣式：
![img](https://i.imgur.com/cwJI4rQ.png)

只要加上 id 選擇器的權重，就可輕鬆覆蓋原生樣式。

#### search bar 修改範例
```css
#nununi-searchbar .nununi-searchbar-iconwrapper {
// 請加入欲修改的樣式
  background-color: #dda0dd;
}
```
#### product list 修改範例
```css
#nununi-productlist .nununi-productblock-name {
// 請加入欲修改的樣式
  color: #2f4f4f;
  font-size: 18px;
}
```
#### classify 修改範例
```css
#cupid-classify {
// 請加入欲修改的樣式
  background-color:#e2e2e2;
  padding:20px;
}
#cupid-classify .cupid-tag{
// 請加入欲修改的樣式
  display: inline-block
  font-size: 14px;
  background: #d4aaaa;
  border: 1px solid #ccc;
}
```

## 錯誤處理
### html file  問題排解
沒有畫面，空白一片，請查看 console 的錯誤顯示，有以下的情況：

1. ID 未填入時，console 會出現以下 Message：  
![](https://i.imgur.com/kVJe9Q6.png)

2. 未在 html 內放置 nununi-searchbar、nununi-productlist 區塊，console 會出現以下 Message：  
![](https://imgur.com/Z1ugYlO.png)  
![](https://imgur.com/4vPRzNx.png)

3. 開啟 cupid-classify 功能但未在 html 內放置 cupid-classify 區塊，console 會出現以下 Message：  
![](https://i.imgur.com/CBXTZ0f.png)

### Api error 排解
當 API 出現 Error 時，畫面呈現：
![](https://i.imgur.com/5hLc4yv.png)

當請求 nununi API 失敗時

```jsonld=
{
  "errcode": 10000
  "errmsg": "Request to nununi API failed."
  "result": ""
}
```

## nununi API 方法說明

```javascript
const nununiSDK = new NununiSDK('nununi ID');

// init setting ...

(async() => {
  // 取得 AI 推薦的建議搜尋字
  console.log(await nununiSDK.getSuggestions('女 短褲'));

  // 根據搜尋條件取得產品
  const conditions = {
    text: '外套',
    priceRange: '300-500',
    page: 1,
    limit: 32,
    sort: 2,
  };
  console.log(await nununiSDK.getProducts(conditions));
})();
```
### getSuggestions()
`params`

Field	|Type	|Description
---|---|---
keyword	|string	|輸入 input 要查找的關鍵字

`response`
```jsonld
{
  "errcode": 0,
  "errmsg": "ACK",
  "result": {
    "suggest": [
      "牛仔 短褲 女",
      "襯衫 短褲 女",
      ...
    ]
  }
}
```

### getProducts()
`params`

Field	|Type	|Description
---|---|---
text `不可為空`	|字串	| 要查找的關鍵字
priceRange	|字串	|要查找的價格範圍，以 `-` 隔開價格，若該價格為空則不填入。<br>ex: `"0-100"` 代表價格為 0 ~ 100<br>`"0-"` 代表價格為 0 ~ 無設限<br>`"-100"` 代表價格為 無設限 ~ 100<br>`""` 代表價格不設限
page	|整數	|頁碼，起始為1
limit	|整數	|每頁商品數量。32 or 64 or 80
sort	|整數	|預設為1。1(價格由低到高) or 2(價格由高到低) or 11(最新上架)

`response` 會回傳商品以及分頁資料
```jsonld
{
  "errcode": 0,
  "errmsg": "ACK",
  "result": {
    "items": [
      {
        "productId": "xxxxxxxxxx",
        "productName": "xxxxxxxxxx",
        "url": "https://xxx.xxx.xxx/xxx",
        "productImageUrl": "https://xxx.xxx.xxx/xxx.xxx",
        "productPrice": 600,
        "productPriceCurrency": "TWD",
        "productSalePrice": 500,
        "productSalePriceCurrency": "TWD",
        "productAvailability": true
      },
      ...
    ],
    "paging": {
      "limit": 32,
      "currentPage": 1,
      "totalPages": 1,
      "first": "/search/v1/5556667777/products?text=%E5%A4%96%E5%A5%97&priceRange=300-500&page=1&limit=32&sort=2,
      "previous": null,
      "next": null,
      "last": "/search/v1/5556667777/products?text=%E5%A4%96%E5%A5%97&priceRange=300-500&page=1&limit=32&sort=2"
    },
    "sorting": {
      "currentType": 2,
      "availableTypes": [
        1,
        2,
        11
      ]
    }
  }
}
```


###### tags: `nununi`
