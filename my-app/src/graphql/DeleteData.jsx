import {gql} from "@apollo/client";

const DeleteData = gql`
  mutation MyMutation2($id: Int!) {
    delete_card_by_pk(id: $id) {
      id
    }
  }
`;
export default DeleteData;
