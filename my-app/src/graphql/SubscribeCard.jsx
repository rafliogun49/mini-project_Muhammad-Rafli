import {gql} from "@apollo/client";

const SubscribeCard = gql`
  subscription MySubscription {
    card {
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
export default SubscribeCard;
