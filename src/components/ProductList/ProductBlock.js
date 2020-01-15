import React from 'react'
import LazyLoad from 'react-lazyload';
import { withTranslation } from 'react-i18next';

function ProductBlock({product, t, barMode}){
  const outOfStock = t('productBlock.outofStock');
  const preOrder = t('productBlock.preOrder');

  const backgroundProductImg = {
    backgroundImage: `url('${product.productImageUrl}')`
  }

  const originPrice = product.productPrice.toLocaleString('en-US');
  const salePrice = product.productSalePrice.toLocaleString('en-US');

  return (
    <div className={`default-style ${barMode} nununi-productblock`}>
      <a className="nununi-productblock-href" href={product.url} title={product.productName} data-cupid-product-id={product.productId}>
        <LazyLoad height={200} offset={100}>
          <div className="nununi-productblock-img" style={backgroundProductImg}>
            {
              (product.productAvailability ===  'out of stock') ?
              <div className="outofStock">{outOfStock}</div> :
              ''
            }
            {
              (product.productAvailability ===  'preorder') ?
              <div className="preOrder">{preOrder}</div> :
              ''
            }
          </div>
        </LazyLoad>
        <div className="nununi-productblock-detail">
          <div className="nununi-productblock-name">{product.productName}</div>
          <div className="nununi-productblock-price">
            {
              (originPrice === salePrice) ?
              <div className="origin-price"></div> :
              <div className="origin-price">{product.productPriceCurrency} {originPrice}</div>
            }
            <div className="sale-price">{product.productSalePriceCurrency} {salePrice}</div>
          </div>
        </div>
      </a>
    </div>
  )
}

export default withTranslation()(ProductBlock);
