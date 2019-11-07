import React from 'react';
import Autosuggest from 'react-autosuggest';
import styled, { keyframes } from 'styled-components';
import { withTranslation } from 'react-i18next';

const rotate = keyframes`
  to {
    transform: rotate(360deg);
  }
`;

const SearchInput = styled.div`
  display: flex;
  flex-flow: row nowrap;
  justify-content: flex-end;

  .nununi-searchbar {
    &-container {
      position: relative;
    }

    &-iconwrapper {
      box-sizing: border-box;
      position: absolute;
      right: 0;
      width: 40px;
      height: 100%;
      border: 1px solid ${props => props.theme.colorBorder};
      border-radius: 0 5px 5px 0;
      background-color: ${props => props.theme.colorBtnBg};
      z-index: 2;

      .search {
        width: 100%;
        height: 100%;
        cursor: pointer;

        &:hover {
          background-color: ${props => props.theme.colorBtnBg_hover};
          border-color: ${props => props.theme.colorBtnBg_hover};
        }

        &-circle {
          position: absolute;
          top: calc(50% - 13px);
          left: calc(50% - 13px);
          width: 13px;
          height: 13px;
          border: 3px solid ${props => props.theme.colorIcon};
          border-radius: 100px;
        }

        &-stick {
          position: absolute;
          left: 50%;
          top: calc(50% + 4px);
          width: 12px;
          height: 4px;
          transform: rotate(45deg);
          background-color: ${props => props.theme.colorIcon};
          border-top-right-radius: 5px;
          border-bottom-right-radius: 5px;
        }
      }

      .spinner {
        position: absolute;
        top: calc(50% - 11px);
        left: calc(50% - 11px);
        width: 18px;
        height: 18px;
        border-radius: 50px;
        border: 3px dotted  ${props => props.theme.colorIcon};
        animation: ${rotate} 1.2s linear infinite;
      }
    }
  }

  .react-autosuggest {
    &__container {
      position: relative;
    }

    &__input {
      box-sizing: content-box;
      padding: 10px 20px;
      font-family: 'Helvetica, sans-serif';
      font-weight: 300;
      font-size: 14px;
      border: 1px solid #999;
      border-radius: 4px;
      outline: none;
    }

    &__suggestions {
      &-container {
        &--open {
          position: absolute;
          top: 100%;
          width: 100%;
          border: 1px solid #999;
          background-color: #fff;
          font-family: 'Helvetica, sans-serif';
          font-weight: 300;
          font-size: 16px;
          border-bottom-left-radius: 4px;
          border-bottom-right-radius: 4px;
          z-index: 2;
        }
      }

      &-list {
        margin: 0;
        padding: 0;
        list-style-type: none;
      }
    }

    &__suggestion {
      padding: 10px 20px;
      cursor: pointer;

      &--highlighted {
        background-color: #ddd;
      }
    }
  }
`;

class SearchBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: '',
      suggestions: [],
      isLoading: false,
      errcode: 0,
      errmsg: 0
    };
  }

  checkError = () => {
    if (this.state.errcode !== 0){
      console.log(this.state.errmsg);
    }
  }

  // 呼叫 api
  getMatchingOptions = async (value) => {
    const escapedValue = value.trim();
    const { errcode, errmsg, result } = await this.props.getSuggestion(escapedValue);
    const { suggest } = result;

    this.setState({errcode, errmsg});
    this.checkError();

    if (escapedValue === '' || !suggest || suggest.length === 0 ) {
      this.setState({ isLoading: false });
      return [];
    } else if (suggest.length > 0) {
      const suggestArray = Array.from(suggest);
      this.setState({ isLoading: false });
      return suggestArray;
    }
  }
  // input 的 onChange屬性
  onChange = (event, { newValue }) => {
    this.setState({
      value: newValue,
      isLoading: true,
    });
  };

  onSearch = (text) => {
    if (text !== '') {
      const url = new URL(window.location.href);
      url.searchParams.set('text', text);
      url.searchParams.set('page', 1);
      url.searchParams.set('priceRange', '');
      window.location = url.href;
    }
  }

  // 渲染 suggestions
  renderSuggestion = (suggestion) => <div onClick={(event) => this.onSearch(event.target.textContent)}>
                                        {suggestion}
                                      </div>;

  // 設定當suggestion 被點擊時, 什麼資料設為input value
  getSuggestionValue = (suggestion) => {
    this.setState({ isLoading: false });
    return suggestion
  };

  // 輸入內容後,找尋Suggestions
  onSuggestionsFetchRequested = async ({ value }) => {
    this.setState({
      suggestions: await this.getMatchingOptions(value),
      loading: false,
    });
  };

  onSuggestionsClearRequested = () => {
    this.setState({
      suggestions: [],
      isLoading: false,
    });
  };

  render() {
    const { value, suggestions, isLoading } = this.state;
    const INPUT_PLACEHOLD = this.props.t('searchPlaceholder');

    // input 屬性的設定
    const inputProps = {
      placeholder: INPUT_PLACEHOLD,
      value,
      onChange: this.onChange,
    };

    return (
      <SearchInput className={'nununi-searchbar-wrapper'}>
        <div className={'nununi-searchbar-container'}>
          <div className='nununi-searchbar-iconwrapper'>
            {isLoading ? (
              <div className="spinner"></div>
            ) : (
              <div
                className="search"
                onClick={() => this.onSearch(this.state.value)}
              >
                <div className="search-circle"></div>
                <div className="search-stick"></div>
              </div>
            )}
          </div>

          <Autosuggest
            suggestions={suggestions}
            onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
            onSuggestionsClearRequested={this.onSuggestionsClearRequested}
            onSuggestionSelected={this.onSuggestionSelected}
            getSuggestionValue={this.getSuggestionValue}
            renderSuggestion={this.renderSuggestion}
            inputProps={inputProps}
            highlightFirstSuggestion={true}
          />
        </div>
      </SearchInput>
    );
  }
}

export default withTranslation()(SearchBar);
