nununi-search 手冊
===

## 目錄

// 稍後找 table content 套件

## 安裝
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
        const nununi = new nununiSDK('你的nununi ID');

       /*Products API版本設定 default: latest */
        nununi.setProductsAPIVersion('v1');
        nununi.setSuggestionAPIVersion('v1');

       /* cupid classify 標籤開關 */
        nununi.setCupidClassify(true);

        /*頁面商品顯示數量設定
         32 or 64 or 80 */
        nununi.setLimit(64);

        /*頁面商品排序設定
         1($低到高) or 2($高到低) or 11(最新上架) */
        nununi.setSort(2);

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
import nununiSDK from "@awootaiwan/nununisearch";
const nununi = new nununiSDK("id");
```

## 如何使用

### 使用 search-bar 元件 ＋ suggestion 功能

1. 在HTML檔案內加入 `<div id="nununi-searchbar"></div>`
2. 下方的`設定區塊`內加入以下代碼，畫面會渲染出搜尋列。
```javascript
nununi.renderSearchBar();
```
### 使用 product-list 元件 ＋ site-search 功能 + classify 功能
1. 在HTML檔案內加入 `<div id="nununi-productlist"></div>`
2. 在HTML檔案內加入 `<div id="cupid-classify"></div>`
3. 下方的`設定區塊`內加入以下代碼，畫面會渲染出操作元件;在搜尋列內送出搜尋字，商品列表會渲染搜尋結果。
```javascript
nununi.renderProductList();
```
4. `classify` 標籤預設為 <font color="#006600">開啟</font>，若要 <font color="#dd0000">關閉</font>，請改成 `false`
```javascript
/* cupid classify 標籤開關 */
nununi.setCupidClassify(true);
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
        const nununi = new nununiSDK('你的nununi ID');

        nununi.setProductsAPIVersion('v1');
        nununi.setSuggestionAPIVersion('v1');
        nununi.setCupidClassify(true);
        nununi.setLimit(32);
        nununi.setSort(2);
        nununi.renderSearchBar();
        nununi.renderProductList();
      });
    </script>
</body>
```

## 樣式覆寫
### how to overwite css

## 錯誤處理
### App.js 內的throw error 排解教學
### Api error 排解

## nununi api 方法說明
input and output
### getSuggestions:
### getProduct


###### tags: `nununi`
