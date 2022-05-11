import {gql} from "@apollo/client";

const SubscribeCard = gql`
  subscription SubscribeData {
    card {
      date
      description
      id
      priority
      title
      card_tag {
        tag
      }
      card_status {
        status
      }
      card_people {
        people
      }
    }
  }
`;
export default SubscribeCard;
