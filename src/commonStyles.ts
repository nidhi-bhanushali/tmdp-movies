import styled from "styled-components";

export const StyledMovieList = styled.div<{ height?: string }>`
  height: ${({ height }) => (height ? height : "calc(100vh - 150px)")};
  overflow-y: auto;
  margin-top: 24px;
  > h2 {
    color: #fff;
    text-align: center;
  }
  > .sentinel {
    height: 20px;
  }
`;
