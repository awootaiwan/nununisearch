import React from 'react'
import LazyLoad from 'react-lazyload';
import { withTranslation } from 'react-i18next';

function ProductBlock({product, t, barMode}){
  const outOfStock = t('productBlock.outofStock');
  const backgroundProductImg = {
    backgroundImage: `url('${product.productImageUrl}')`
  }

  return (
    <div className={`default-style ${barMode} nununi-productblock`}>
      <a className="nununi-productblock-href" href={product.url} title={product.productName} data-cupid-product-id={product.productId}>
        <LazyLoad height={200} offset={100}>
          <div className="nununi-productblock-img" style={backgroundProductImg}>
            {
              !product.productAvailability ?
              <div className="outofStock">{outOfStock}</div> :
              ''
            }
          </div>
        </LazyLoad>
        <div className="nununi-productblock-detail">
          <div className="nununi-productblock-name">{product.productName}</div>
          <div className="nununi-productblock-price">
            {
              product.productSalePrice ?
              <div className="on-sale">{product.productPriceCurrency} {product.productPrice.toLocaleString('en-US')}</div> :
              <div>{product.productPriceCurrency} {product.productPrice.toLocaleString('en-US')}</div>
            }
            {
              product.productSalePrice ?
              <div className="sale-price">{product.productSalePriceCurrency} {product.productSalePrice.toLocaleString('en-US')}</div> :
              ''
            }
          </div>
        </div>
      </a>
    </div>
  )
}

export default withTranslation()(ProductBlock);
