import styled from 'styled-components';

export const SearchContainer = styled.div`
  h1 {
    text-align: center;
    margin: 0;
    font-size: 24px;
    margin: 40px;
    line-height: 1.6;
  }

  .searchInputContainer {
    position: relative;
    width: 500px;
    height: 80px;
    margin: auto;

    .magnifier {
      width: 100px;
      color: #a7afb7;
    }

    .searchInput {
      width: 100%;
      height: 100%;
      border-radius: 100px;
      padding: 20px 10px 20px 24px;
      box-sizing: border-box;
      font-size: 18px;

      &:focus {
        outline: 3px solid #007be9;
      }
    }

    .searchBtn {
      position: absolute;
      right: 15px;
      top: 15px;
      width: 50px;
      height: 50px;
      background-color: #007be9;
      border: none;
      border-radius: 100px;

      &:hover {
        cursor: pointer;
      }
    }
  }
`;
