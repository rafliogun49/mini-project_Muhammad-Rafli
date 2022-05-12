import {gql} from "@apollo/client";

const DeleteTag = gql`
  mutation DeleteTag($_eq: String!, $_eq1: Int!) {
    delete_tag(where: {tag: {_eq: $_eq}, card_id: {_eq: $_eq1}}) {
      returning {
        card_id
        id
        tag
      }
    }
  }
`;

export default DeleteTag;
