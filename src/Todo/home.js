import React, { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import { BsFillBookmarkCheckFill, BsFillBookmarkDashFill } from "react-icons/bs";
import { DoneBtn } from "./newTask/doneBtn";
import { collection, onSnapshot, setDoc } from "@firebase/firestore";
import app from "../firebase";
import { AuthContext } from "./global/Authprovider";
import { doc, getDoc } from "firebase/firestore";
const Home = () => {
  const [data, setData] = useState([]);
  const [myUser, setMyUser] = useState(null);
  const { currentUser } = useContext(AuthContext);

  const getData = async () => {
    await onSnapshot(collection(app, "todoTask"), (snapshot) =>
      setData(snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })))
    );
  };
  // to get current user data
  const getCurrentUser = async () => {
    const docRef = doc(app, "userdata", currentUser.uid);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      return console.log(docSnap.data());
    }
  };
  console.log(myUser);
  console.log(currentUser);

  useEffect(() => {
    getData();
    getCurrentUser();
  }, []);
  return (
    <Container>
      <Wrapper>
        {/* <h1>Hello, {myUser?.username}</h1> */}

        {data?.map((data, i) => {
          return (
            <TaskHolder key={i}>
              {data?.done ? (
                <Icon>
                  <BsFillBookmarkCheckFill />
                </Icon>
              ) : (
                <Icon>
                  <BsFillBookmarkDashFill />
                </Icon>
              )}
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
