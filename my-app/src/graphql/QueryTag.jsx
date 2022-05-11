import {gql} from "@apollo/client";

const QueryTag = gql`
  query MyQuery3 {
    tag {
      tag
    }
  }
`;

export default QueryTag;
