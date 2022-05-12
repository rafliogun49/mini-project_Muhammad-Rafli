import {useMutation, useQuery, useSubscription} from "@apollo/client";
import {message} from "antd";
import {useEffect, useState} from "react";
import Filter from "./component/Filter";
import KanbanBoard from "./component/KanbanBoard";
import KanbanCard from "./component/KanbanCard";
import TitleText from "./component/TitleText";
import AddData from "./graphql/AddData";
import AddPeople from "./graphql/AddPeople";
import AddTag from "./graphql/AddTag";
import DeleteData from "./graphql/DeleteData";
import DeletePeople from "./graphql/DeletePeople";
import DeleteTag from "./graphql/DeleteTag";
import QueryCard from "./graphql/QueryCard";
import QueryPeople from "./graphql/QueryPeople";
import QueryTag from "./graphql/QueryTag";
import SubscribeCard from "./graphql/SubscribeCard";
import UpdateCard from "./graphql/UpdateCard";
import UpdateStatus from "./graphql/UpdateStatus";
// data dummy buat testing UI aja

function App() {
  //query
  const {data: dataTask, loading, error} = useQuery(QueryCard);
  const {data: peoplesData, loading: loadingPeoples} = useQuery(QueryPeople);
  const {data: tagsData, loading: loadingTags} = useQuery(QueryTag);

  //query data from people and tags
  const uniquePeopleList = peoplesData?.people;
  const getTagList = tagsData?.tag;
  useEffect(() => peoplesData, [peoplesData]);
  useEffect(() => tagsData, [tagsData]);

  // mutation
  const [addData, {loading: loadingAddTask}] = useMutation(AddData, {
    refetchQueries: [QueryCard],
  });
  const [deleteData, {loading: loadingDeleteTask}] = useMutation(DeleteData, {
    refetchQueries: [QueryCard],
  });
  const [updateStatus] = useMutation(UpdateStatus, {
    refetchQueries: [QueryCard],
  });

  const [updateCard, {loading: loadingUpdateCard}] = useMutation(UpdateCard, {
    refetchQueries: [QueryCard, QueryPeople, QueryTag],
  });

  const [addPeople] = useMutation(AddPeople, {
    refetchQueries: [QueryPeople, QueryCard],
  });
  const [deletePeople] = useMutation(DeletePeople, {
    refetchQueries: [QueryPeople, QueryCard],
  });

  const [addTag] = useMutation(AddTag, {
    refetchQueries: [QueryTag, QueryCard],
  });
  const [deleteTag] = useMutation(DeleteTag, {
    refetchQueries: [QueryTag, QueryCard],
  });

  if (loading || loadingPeoples || loadingPeoples) {
    return "Loading...";
  }
  if (error) {
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
    console.log(newTag, oldTag);
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
        card_id: dataId,
        status: statusTask,
      },
    });
  };

  return (
    <>
      <TitleText />
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
      />
    </>
  );
}

export default App;
