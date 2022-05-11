import {gql} from "@apollo/client";

const AddPeople = gql`
  mutation addPeople($card_id: Int!, $people: String!) {
    insert_people_one(object: {card_id: $card_id, people: $people}) {
      card_id
      id
      people
    }
  }
`;

export default AddPeople;
