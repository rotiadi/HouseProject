import React, { useEffect } from "react";
import ActivityCard from "./ActivityCard";
import { fetchAllTaskOfUser } from "../../api/activities";

const Activities = ({ useTranslation }) => {
  const [totalTasks, setTotalTasks] = React.useState(0);
  const [totalWork, setTotalWork] = React.useState(0);
  const [totalPersonal, setTotalPersonal] = React.useState(0);

  const [totalWIP, setTotalWIP] = React.useState(0);
  const [workWIP, setWorkWIP] = React.useState(0);
  const [personalWIP, setPersonalWIP] = React.useState(0);

  const [totalOver, setTotalOver] = React.useState(0);
  const [workOver, setWorkOver] = React.useState(0);
  const [personalOver, setPersonalOver] = React.useState(0);

  const [totalNew, setTotalNew] = React.useState(0);
  const [workNew, setWorkNew] = React.useState(0);
  const [personalNew, setPersonalNew] = React.useState(0);

  const [totalCompleted, setTotalCompleted] = React.useState(0);
  const [workCompleted, setWorkCompleted] = React.useState(0);
  const [personalCompleted, setPersonalCompleted] = React.useState(0);

  useEffect(() => {
    const getData = async () => {
      const data = await fetchAllTaskOfUser();
      if (data) {
        setTotalTasks(data.length);
        setTotalWork(data.filter((task) => task.type === "Work").length);
        setTotalPersonal(
          data.filter((task) => task.type === "Personal").length
        );

        setTotalWIP(
          data.filter(
            (task) => task.status === "Pending" || task.status === "In Progress"
          ).length
        );
        setWorkWIP(
          data.filter(
            (task) =>
              task.type === "Work" &&
              (task.status === "Pending" || task.status === "In Progress")
          ).length
        );
        setPersonalWIP(
          data.filter(
            (task) =>
              task.type === "Personal" &&
              (task.status === "Pending" || task.status === "In Progress")
          ).length
        );

        setTotalOver(
          data.filter(
            (task) =>
              task.status !== "Completed" &&
              new Date(task.due_date) < new Date()
          ).length
        );
        setWorkOver(
          data.filter(
            (task) =>
              task.type === "Work" &&
              task.status !== "Completed" &&
              new Date(task.due_date) < new Date()
          ).length
        );
        setPersonalOver(
          data.filter(
            (task) =>
              task.type === "Personal" &&
              task.status !== "Completed" &&
              new Date(task.due_date) < new Date()
          ).length
        );

        setTotalNew(data.filter((task) => task.status === "New").length);
        setWorkNew(
          data.filter((task) => task.type === "Work" && task.status === "New")
            .length
        );
        setPersonalNew(
          data.filter(
            (task) => task.type === "Personal" && task.status === "New"
          ).length
        );

        setTotalCompleted(
          data.filter((task) => task.status === "Completed").length
        );
        setWorkCompleted(
          data.filter(
            (task) => task.type === "Work" && task.status === "Completed"
          ).length
        );
        setPersonalCompleted(
          data.filter(
            (task) => task.type === "Personal" && task.status === "Completed"
          ).length
        );
      }
    };
    getData();
  }, []);

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "1fr 1fr 1fr 1fr 1fr",
        fontSize: "1.2rem",
        fontWeight: "bold",
        gap: "2rem",
        padding: "1rem",
      }}
    >
      <ActivityCard
        useTranslation={useTranslation}
        cardContent={{
          title: "Total",
          value: totalTasks,
          child: [
            { title: "Work", value: totalWork },
            { title: "Personal", value: totalPersonal },
          ],
        }}
      />

      <ActivityCard
        useTranslation={useTranslation}
        cardContent={{
          title: "WIP",
          value: totalWIP,
          child: [
            { title: "Work", value: workWIP },
            { title: "Personal", value: personalWIP },
          ],
        }}
      />

      <ActivityCard
        useTranslation={useTranslation}
        cardContent={{
          title: "Overdue",
          value: totalOver,
          child: [
            { title: "Work", value: workOver },
            { title: "Personal", value: personalOver },
          ],
        }}
      />

      <ActivityCard
        useTranslation={useTranslation}
        cardContent={{
          title: "New",
          value: totalNew,
          child: [
            { title: "Work", value: workNew },
            { title: "Personal", value: personalNew },
          ],
        }}
      />

      <ActivityCard
        useTranslation={useTranslation}
        cardContent={{
          title: "Completed",
          value: totalCompleted,
          child: [
            { title: "Work", value: workCompleted },
            { title: "Personal", value: personalCompleted },
          ],
        }}
      />
    </div>
  );
};

export default Activities;
