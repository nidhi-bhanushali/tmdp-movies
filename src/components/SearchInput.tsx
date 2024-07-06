import styled from "styled-components";

const StyledInput = styled.input`
  display: flex;
  align-items: center;
  position: relative;
  transition: all 0.2s;
  outline: none;
  font-size: 16px;
  padding-left: 16px;
  padding-right: 16px;
  height: 38px;
  line-height: 38px;
  border-radius: 4px;
  border: 1px solid #dedede;
  background-color: #dedede;
  width: 320;
`;

interface SearchInputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {}

const SearchInput = (props: SearchInputProps) => {
  const { placeholder, ...rest } = props;
  return <StyledInput placeholder={placeholder ?? "Search"} {...rest} />;
};

export default SearchInput;
