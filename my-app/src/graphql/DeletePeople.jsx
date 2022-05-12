import {gql} from "@apollo/client";

const DeletePeople = gql`
  mutation DeletePeople($_eq: String!, $_eq1: Int!) {
    delete_people(where: {people: {_eq: $_eq}, card_id: {_eq: $_eq1}}) {
      returning {
        card_id
        id
        people
      }
    }
  }
`;

export default DeletePeople;
