import {gql} from "@apollo/client";

const GETDATA = gql`
  query MyQuery {
    card {
      date
      description
      id
      title
      card_people {
        people
      }
      card_tag {
        tag
      }
      priority
      status
    }
  }
`;

export default GETDATA;
