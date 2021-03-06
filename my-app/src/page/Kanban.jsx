import {useMutation, useQuery, useSubscription} from "@apollo/client";
import {Spin} from "antd";
import KanbanBoard from "../component/KanbanBoard";
import TitleText from "../component/TitleText";
import AddData from "../graphql/AddData";
import AddPeople from "../graphql/AddPeople";
import AddTag from "../graphql/AddTag";
import DeleteData from "../graphql/DeleteData";
import DeletePeople from "../graphql/DeletePeople";
import DeleteTag from "../graphql/DeleteTag";
import QueryCard from "../graphql/QueryCard";
import QueryPeople from "../graphql/QueryPeople";
import QueryTag from "../graphql/QueryTag";
import SubscribeCard from "../graphql/SubscribeCard";
import UpdateCard from "../graphql/UpdateCard";
import UpdateStatus from "../graphql/UpdateStatus";
import {Layout} from "antd";
import Navbar from "../component/Navbar";
const {Content} = Layout;

const Kanban = () => {
  //query
  const {data: dataTask, loading, error} = useSubscription(SubscribeCard);
  const {data: peoplesData, loading: loadingPeoples, error: errorPeoples} = useQuery(QueryPeople);
  const {data: tagsData, loading: loadingTags, error: errorTags} = useQuery(QueryTag);
  //query data from people and tags
  const uniquePeopleList = peoplesData?.people;
  const getTagList = tagsData?.tag;

  // mutation
  const [addData, {loading: loadingAddTask}] = useMutation(AddData, {
    refetchQueries: [QueryCard],
  });
  const [deleteData, {loading: loadingDeleteTask}] = useMutation(DeleteData, {
    refetchQueries: [QueryCard],
  });
  const [updateStatus, {loading: loadingUpdateStatus}] = useMutation(UpdateStatus, {
    refetchQueries: [QueryCard],
  });

  const [updateCard, {loading: loadingUpdateCard}] = useMutation(UpdateCard, {
    refetchQueries: [QueryCard],
  });

  const [addPeople] = useMutation(AddPeople, {
    refetchQueries: [QueryCard],
  });
  const [deletePeople] = useMutation(DeletePeople, {
    refetchQueries: [QueryCard],
  });

  const [addTag] = useMutation(AddTag, {
    refetchQueries: [QueryCard],
  });
  const [deleteTag] = useMutation(DeleteTag, {
    refetchQueries: [QueryCard],
  });

  // const {data: subscribeData, loading: loadingSubscribeData} = useSubscription(SubscribeCard);

  if (loading || loadingPeoples || loadingTags) {
    return (
      <div
        style={{
          width: "100vw",
          height: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Spin size="large" />
      </div>
    );
  }
  if (error || errorPeoples || errorTags) {
    return `error: ${error}`;
  }

  const updatePeoples = (dataId, newListPeople, oldListPeople) => {
    if (newListPeople.length > oldListPeople.length) {
      let differences = newListPeople.filter((x) => !oldListPeople.includes(x));
      if (differences) {
        differences.map((p) => {
          return addPeople({
            variables: {
              card_id: dataId,
              people: p,
            },
          });
        });
      }
    } else if (newListPeople.length === oldListPeople.length) {
      let differenceNew = newListPeople.filter((x) => !oldListPeople.includes(x));
      let differenceOld = oldListPeople.filter((x) => !newListPeople.includes(x));
      differenceNew.map((people) => {
        return addPeople({
          variables: {
            card_id: dataId,
            people: people,
          },
        });
      });
      differenceOld.map((people) => {
        return deletePeople({
          variables: {
            _eq: people,
            _eq1: dataId,
          },
        });
      });
    } else {
      let differences = oldListPeople.filter((x) => !newListPeople.includes(x));
      if (differences) {
        differences.map((p) => {
          return deletePeople({
            variables: {
              _eq: p,
              _eq1: dataId,
            },
          });
        });
      }
    }
  };

  const updateTags = (dataId, newTag, oldTag) => {
    if (newTag.length > oldTag.length) {
      let differences = newTag.filter((x) => !oldTag.includes(x));
      if (differences) {
        differences.map((p) => {
          return addTag({
            variables: {
              card_id: dataId,
              tag: p,
            },
          });
        });
      }
    } else if (newTag.length === oldTag.length) {
      let differenceNew = newTag.filter((x) => !oldTag.includes(x));
      let differenceOld = oldTag.filter((x) => !newTag.includes(x));
      differenceNew.map((tag) => {
        return addTag({
          variables: {
            card_id: dataId,
            tag: tag,
          },
        });
      });
      differenceOld.map((tag) => {
        return deleteTag({
          variables: {
            _eq: tag,
            _eq1: dataId,
          },
        });
      });
    } else {
      let differences = oldTag.filter((x) => !newTag.includes(x));
      if (differences) {
        differences.map((p) => {
          return deleteTag({
            variables: {
              _eq: p,
              _eq1: dataId,
            },
          });
        });
      }
    }
  };

  const addTask = (newTitle, name) => {
    addData({
      variables: {
        title: newTitle,
        status: name,
      },
    });
  };

  const updateTask = (dataId, priority, description, date, status) => {
    updateCard({
      variables: {
        id: dataId,
        priority: priority,
        description: description,
        date: date,
        status: status,
      },
    });
  };

  const deleteTask = (dataId) => {
    deleteData({
      variables: {
        id: dataId,
      },
    });
  };

  const updateStatusTask = (dataId, statusTask) => {
    updateStatus({
      variables: {
        id: dataId,
        status: statusTask,
      },
    });
  };

  return (
    <Layout style={{background: "#fff"}}>
      <Navbar />
      <Content>
        <div className="kanban">
          <div className="title">
            <TitleText />
          </div>
          <KanbanBoard
            dataTask={dataTask.card}
            addTask={addTask}
            updateTags={updateTags}
            updatePeoples={updatePeoples}
            updateTask={updateTask}
            deleteTask={deleteTask}
            loadingAddTask={loadingAddTask}
            loadingDeleteTask={loadingDeleteTask}
            loadingUpdateCard={loadingUpdateCard}
            updateStatusTask={updateStatusTask}
            uniquePeopleList={uniquePeopleList}
            getTagList={getTagList}
            loadingUpdateStatus={loadingUpdateStatus}
          />
        </div>
      </Content>
    </Layout>
  );
};

export default Kanban;
