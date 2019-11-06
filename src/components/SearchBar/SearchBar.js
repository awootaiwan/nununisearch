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
  position: relative;

  .icon-wrapper {
    box-sizing: border-box;
    position: absolute;
    width: 40px;
    height: 100%;
    border: 1px solid ${props => props.theme.colorBorder};
    border-radius: 0 5px 5px 0;
    background-color: ${props => props.theme.colorBtnBg};
    z-index: 2;

    &:hover {
      background-color: ${props => props.theme.colorBtnBg_hover};
      border-color: ${props => props.theme.colorBtnBg_hover};
    }

    .spinner {
      width: 20px;
      height: 20px;
      border-radius: 50px;
      border: 3px dotted  ${props => props.theme.colorIcon};
      position: absolute;
      top: 6px;
      right: 5px;
      z-index: 1;
      animation: ${rotate} 1.2s linear infinite;


      &-wrapper {
        position: relative;
        width: 100%;
        height: 100%;
        color: ${props => props.theme.colorIcon};
      }

    }
    .search {
      position: relative;
      text-align: center;

      &-wrapper {
        position: relative;
        color: ${props => props.theme.colorIcon};
        cursor: pointer;
        width: 100%;
        height: 100%;
      }
    
      &-circle {
        position: absolute;
        top: 6px;
        right: 9px;
        width: 17px;
        height: 17px;
        border: 3px solid ${props => props.theme.colorIcon};
        border-radius: 100px;
      }
    
      &-stick {
        position: absolute;
        right: 4px;
        bottom: -30px;
        width: 12px;
        height: 4px;
        transform: rotate(45deg);
        background-color: ${props => props.theme.colorIcon};
        border-top-right-radius: 5px;
        border-bottom-right-radius: 5px;
      }
    }
  }
`;

// Autosuggest 樣式
const theme = {
  container: {
    position: 'relative',
  },
  input: {
    boxSizing: 'content-box',
    maxWidth: '300px',
    height: '20px',
    padding: '10px 20px',
    fontFamily: 'Helvetica, sans-serif',
    fontWeight: 300,
    fontSize: '16px',
    border: '1px solid #999',
    borderRadius: '4px',
  },
  inputFocused: {
    outline: 'none',
  },
  suggestionsContainer: {
    display: 'none',
  },
  suggestionsContainerOpen: {
    display: 'block',
    position: 'absolute',
    top: '100%',
    width: '100%',
    border: '1px solid #999',
    backgroundColor: '#fff',
    fontFamily: 'Helvetica, sans-serif',
    fontWeight: 300,
    fontSize: '16px',
    borderBottomLeftRadius: '4px',
    borderBottomRightRadius: '4px',
    zIndex: 2,
  },
  suggestion: {
    cursor: 'pointer',
    padding: '0',
  },
  suggestionHighlighted: {
    backgroundColor: '#ddd',
  },
  suggestionsList: {
    margin: 0,
    padding: 0,
    listStyleType: 'none',
  },
};

const suggestInlineStyle = {
  padding: '10px 20px'
}

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
    const url = new URL(window.location.href);
    url.searchParams.set('text', text);
    url.searchParams.set('page', 1);
    url.searchParams.set('priceRange', '');
    window.location = url.href;
  }

  // 渲染 suggestions
  renderSuggestion = (suggestion) => <div
                                        style={suggestInlineStyle}
                                        onClick={(event) => this.onSearch(event.target.textContent)}
                                      >
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
      <React.Fragment>
        <SearchInput>
          <div className='icon-wrapper'>
            {isLoading ? (
              <div className="spinner-wrapper">
                <div className="spinner"></div>
              </div>
            ) : (
              <div className="search-wrapper">
                <div 
                  className="search"
                  onClick={() => this.onSearch(this.state.value)}
                >
                  <div className="search-circle"></div>
                  <div className="search-stick"></div>
                </div>
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
            theme={theme}
          />
        </SearchInput>
      </React.Fragment>
    );
  }
}

export default withTranslation()(SearchBar);
