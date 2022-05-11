import {gql} from "@apollo/client";

const UpdateCard = gql`
  mutation UpdateCard(
    $id: Int!
    $priority: Int
    $description: String
    $date: String
    $status: String!
  ) {
    update_card_by_pk(
      pk_columns: {id: $id}
      _set: {date: $date, description: $description, priority: $priority, status: $status}
    ) {
      date
      description
      id
      priority
      status
      title
    }
  }
`;

export default UpdateCard;
