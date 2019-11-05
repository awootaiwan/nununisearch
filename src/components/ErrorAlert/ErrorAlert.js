import React from 'react';
import styled from 'styled-components';
import { withTranslation } from 'react-i18next';

const Div = styled.div`
  color: #721c24;
  background-color: #f8d7da;
  border: 1px solid transparent;
  border-color: #f5c6cb;
  margin: 1rem;
  padding: .75rem 1.25rem;
  border-radius: .25rem;
`;

function ErrorAlert(data) {
  return (
    <Div role="alert">
      {data.errmsg}  {t('alert')}
    </Div>
  )
}

export default withTranslation()(ErrorAlert);
