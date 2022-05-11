import {gql} from "@apollo/client";

const QueryPeople = gql`
  query MyQuery2 {
    people {
      people
    }
  }
`;
export default QueryPeople;
