import {gql} from "@apollo/client";

const UpdateStatus = gql`
  mutation UpdatingStatus($id: Int!, $status: String!) {
    update_card_by_pk(pk_columns: {id: $id}, _set: {status: $status}) {
      date
      description
      id
      priority
      status
      title
    }
  }
`;

export default UpdateStatus;
