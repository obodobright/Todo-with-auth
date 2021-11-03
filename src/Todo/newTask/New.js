import React, { useState } from "react";
import styled from "styled-components";
import app from "../../firebase";
import { addDoc, collection } from "firebase/firestore";
import { useHistory } from "react-router";

export const New = () => {
  const history = useHistory();
  const [task, setTask] = useState("");

  const addNewTask = async () => {
    const collectionRef = collection(app, "todoTask");
    const payload = { task, done: false };

    await addDoc(collectionRef, payload);

    setTask("");
    history.push("/");
  };
  return (
    <Container>
      <Wrapper>
        <Form>
          <Input
            placeholder="Add new Task"
            value={task}
            onChange={(e) => setTask(e.target.value)}
          />
          <Button onClick={addNewTask}>Add Task</Button>
        </Form>
      </Wrapper>
    </Container>
  );
};

const Button = styled.div`
  width: 70%;
  height: 40px;
  background: green;
  margin-top: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 18px;
  font-weight: 600;
  color: white;
  border-radius: 7px;
  transition: all 350ms;

  :hover {
    cursor: pointer;
    border: 1px solid green;
    background: white;
    color: green;
  }
`;
const Input = styled.input`
  width: 300px;
  height: 40px;
  border-radius: 5px;
  outline: none;
  border: 1px solid green;
  padding-left: 5px;
`;
const Form = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const Wrapper = styled.div`
  width: 100%;
  height: 80%;
  min-height: 80vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const Container = styled.div`
  width: 100%;
  min-height: 80vh;
  height: 100%;
`;
