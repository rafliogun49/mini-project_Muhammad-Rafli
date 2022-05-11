import {useMutation, useQuery, useSubscription} from "@apollo/client";
import {message} from "antd";
import {useEffect, useState} from "react";
import Filter from "./component/Filter";
import KanbanBoard from "./component/KanbanBoard";
import KanbanCard from "./component/KanbanCard";
import TitleText from "./component/TitleText";
import AddData from "./graphql/AddData";
import AddPeople from "./graphql/AddPeople";
import DeleteData from "./graphql/DeleteData";
import QueryCard from "./graphql/QueryCard";
import QueryPeople from "./graphql/QueryPeople";
import QueryTag from "./graphql/QueryTag";
import SubscribeCard from "./graphql/SubscribeCard";
import UpdateCard from "./graphql/UpdateCard";
import UpdateStatus from "./graphql/UpdateStatus";
// data dummy buat testing UI aja

const tagList = ["Development", "Design", "Research", "Coordination", "Testing"];

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
  const [updateStatus, {loading: loadingUpdateStatus}] = useMutation(UpdateStatus, {
    refetchQueries: [QueryCard],
  });

  const [updateCard, {loading: loadingUpdateCard}] = useMutation(UpdateCard, {
    refetchQueries: [QueryCard],
  });

  const [addPeople, {loading: loadingAddPeople}] = useMutation(AddPeople, {
    refetchQueries: [QueryCard],
  });

  if (loading) {
    return "Loading...";
  }
  if (error) {
    return `error: ${error}`;
  }

  const updatePeoples = (newValue) => {
    // let differences = newValue.filter((x) => !peoples.includes(x));
    // setPeoples((oldTaskData) => [...oldTaskData, ...differences]);
  };

  const updateTags = (newValue) => {
    // let differences = newValue.filter((x) => !tags.includes(x));
    // setTags((oldTaskData) => [...oldTaskData, ...differences]);
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

  const addingPeople = (dataId, people) => {
    addPeople({
      variables: {
        id: dataId,
        people: people,
      },
    });
  };

  return (
    <>
      <TitleText />
      <Filter />
      <KanbanBoard
        dataTask={dataTask.card}
        addTask={addTask}
        updateTags={updateTags}
        updatePeoples={updatePeoples}
        updateTask={updateTask}
        deleteTask={deleteTask}
        loadingAddTask={loadingAddTask}
        loadingDeleteTask={loadingDeleteTask}
        updateStatusTask={updateStatusTask}
        uniquePeopleList={uniquePeopleList}
        getTagList={getTagList}
        addingPeople={addingPeople}
      />
    </>
  );
}

export default App;
