import { SuggestionContainer } from '../styles/Suggestion.styled';

const Suggestion = ({ searchResult }: { searchResult: string[] }) => {
  return (
    <SuggestionContainer>
      <div className='recommendTitle'>추천 검색어</div>
      <ul>
        {searchResult.map((v, i) => (
          <li className='recommendText' key={i}>
            🔍 {v}
          </li>
        ))}
      </ul>
    </SuggestionContainer>
  );
};

export default Suggestion;
