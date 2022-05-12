import {gql} from "@apollo/client";

const AddTag = gql`
  mutation AddTag($card_id: Int!, $tag: String!) {
    insert_tag(objects: {card_id: $card_id, tag: $tag}) {
      returning {
        card_id
        id
        tag
      }
    }
  }
`;

export default AddTag;
