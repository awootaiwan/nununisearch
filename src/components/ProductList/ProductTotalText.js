import React from 'react'
import { withTranslation } from 'react-i18next';

function ProductTotalText({paging, t}){
  const textRelate = t('productTotal.relateItem');
  const textTotal = t('productTotal.total');
  const textItem = t('productTotal.unit');
  const params = () => {
    const currentUrl = window.location.search;
    const searchParams = new URLSearchParams(currentUrl);
    return searchParams.get("text");
  }

  return (
    <div className="product-total">
      <span className="product-total-params">{ params() } </span>
      {textRelate}，{textTotal} 
      <span className="product-total-count">{paging.totalCount}</span>
      {textItem}
    </div>
  )
}

export default withTranslation()(ProductTotalText);
