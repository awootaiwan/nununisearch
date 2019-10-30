import React from 'react';
import Autosuggest from 'react-autosuggest';
import debounce from 'lodash/debounce';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner, faSearch } from "@fortawesome/free-solid-svg-icons";
import styled, { keyframes } from 'styled-components';


const rotate = keyframes`
  to {
    transform: rotate(360deg);
  }
`;
const IconWrapper = styled.div`
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

  div {
    position: absolute;
    right: 10px;
    top: calc(100% - 32px)
  }

  .spinner-wrapper {
    color: ${props => props.theme.colorBtnText};
    animation: ${rotate} 1s linear infinite;
  }
  .search-wrapper {
    color: ${props => props.theme.colorBtnText};
    cursor: pointer;
  }
`;

const SearchInput = styled.div`
  display: flex;
  flex-flow: row nowrap;
  justify-content: flex-end;
  position: relative;
`;

// Autosuggest 樣式
const theme = {
  container: {
    position: 'relative',
  },
  input: {
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
    padding: '10px 20px',
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

const INPUT_PLACEHOLD = '請輸入搜尋關鍵字';
// how long the API debounced
const API_DEBOUNCED = 1000;

class SearchBar extends React.Component {
  constructor(props) {
    super(props);

    // Return a new debounced function 
    // TODO 接上api 後應該要刪除
    this.debouncedLoadSuggestions = debounce(this.loadSuggestions, API_DEBOUNCED);

    this.state = {
      value: '',
      suggestions: [],
      isLoading: false,
    };
  }

  loadSuggestions = (value) => {
    this.setState({
      isLoading: true,
    });

    // Fake an AJAX call
    // TODO 接上api後需要改寫
    setTimeout(() => {
      const suggestions = this.getMatchingOptions(value);

      if (value === this.state.value) {
        this.setState({
          isLoading: false,
          suggestions,
        });
      } else {
        // Ignore suggestions if input value changed
        this.setState({
          isLoading: false,
        });
      }
    }, 1000);
  }

  // input value and data 的比對，生成匹配suggestion 元素
  getMatchingOptions = (value) => {
    const escapedValue = value.trim();
    if (escapedValue === '') {
      return [];
    }
    const regex = new RegExp(escapedValue, 'i');
    return this.props.data.filter((dataItem) => regex.test(dataItem));
  }

  // input 的 onChange屬性
  // 有可能在這裡要發送 request 給 suggestion
  onChange = (event, { newValue }) => {
    this.setState({
      value: newValue,
    });
  };

  onSearch = () => {
    const url = new URL(window.location.href);
    const text = this.state.value;

    url.searchParams.set('text', text);
    window.location = url.href;
  }

  // 渲染 suggestions
  renderSuggestion = (suggestion) => <span>{suggestion}</span>;

  // 設定當suggestion 被點擊時, 什麼資料設為input value
  getSuggestionValue = (suggestion) => suggestion;

  // 輸入內容後,找尋Suggestions
  // TODO 接上api 後應該要改寫
  onSuggestionsFetchRequested = ({ value }) => {
    if (this.state.suggestions) {
      this.debouncedLoadSuggestions(value);
    }
  };

  onSuggestionsClearRequested = () => {
    this.setState({
      suggestions: [],
    });
  };

  render() {
    const { value, suggestions, isLoading } = this.state;

    // input 屬性的設定
    const inputProps = {
      placeholder: INPUT_PLACEHOLD,
      value,
      onChange: this.onChange,
    };

    return (
      <React.Fragment>
        <SearchInput>
          <IconWrapper>
          {isLoading ? (
            <div className="spinner-wrapper">
              <FontAwesomeIcon icon={faSpinner} />
            </div>
          ) : (
            <div className="search-wrapper">
              <FontAwesomeIcon icon={faSearch} onClick={this.onSearch} />
            </div>
          )}
          </IconWrapper>

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

export default SearchBar;
