import {gql} from "@apollo/client";

const QueryByStatus = gql`
  subscription MySubscription($_eq: String!) {
    card(where: {status: {_eq: $_eq}}) {
      card_people {
        people
      }
      card_tag {
        tag
      }
      date
      description
      id
      priority
      status
      title
    }
  }
`;
export default QueryByStatus;
