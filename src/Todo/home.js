import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { BsBookmarksFill } from "react-icons/bs";
import { DoneBtn } from "./newTask/doneBtn";
import { collection, onSnapshot } from "@firebase/firestore";
import app from "../firebase";
const Home = () => {
  const [data, setData] = useState([]);

  const getData = async () => {
    await onSnapshot(collection(app, "todoTask"), (snapshot) =>
      setData(snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })))
    );
  };

  useEffect(() => {
    getData();
  });
  return (
    <Container>
      <Wrapper>
        {data?.map((data) => {
          return (
            <TaskHolder>
              <Icon>
                <BsBookmarksFill />
              </Icon>
              <TaskTitle>{data.task}</TaskTitle>
              <DoneBtn id={data.id} />
            </TaskHolder>
          );
        })}
      </Wrapper>
    </Container>
  );
};

export default Home;

const TaskTitle = styled.div`
  flex: 1;
  padding: 0 20px;
  font-weight: bold;
  font-size: 17px;
`;

const Icon = styled.div`
  font-size: 35px;
  color: green;
`;

const TaskHolder = styled.div`
  width: 50%;
  height: 70px;
  background: white;
  border-radius: 10px;
  display: flex;
  align-items: center;
  padding: 0 5px;
  flex-direction: row;
  margin: 10px 0;
`;
const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  min-height: 89vh;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;
const Container = styled.div`
  width: 100%;
  height: 100%;
  min-height: 89vh;
  background: rgb(234, 234, 234);
`;
