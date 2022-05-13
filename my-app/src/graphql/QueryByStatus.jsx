import {gql} from "@apollo/client";

const QueryByStatus = gql`
  query QueryByStatus($_eq: String!) {
    card(where: {status: {_eq: $_eq}}) {
      date
      description
      id
      priority
      status
      title
      card_tag {
        tag
      }
      card_people {
        people
      }
    }
  }
`;
export default QueryByStatus;
