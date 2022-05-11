import {gql} from "@apollo/client";

const AddData = gql`
  mutation AddData($title: String!, $status: String!) {
    insert_card_one(object: {title: $title, status: $status}) {
      id
      title
      status
    }
  }
`;
export default AddData;
