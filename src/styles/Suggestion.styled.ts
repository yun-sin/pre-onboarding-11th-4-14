import styled from 'styled-components';

export const SuggestionContainer = styled.div`
  background-color: white;
  width: 500px;
  margin: auto;
  border-radius: 20px;
  padding: 20px 20px;

  .recommendTitle {
    color: gray;
    font-size: 12px;
    margin-bottom: 10px;
  }

  .recommendText {
    height: 30px;
    line-height: 30px;

    cursor: pointer;

    &.selected {
      background-color: skyblue;
      color: white;
    }
  }
`;
