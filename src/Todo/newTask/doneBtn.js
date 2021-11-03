import React, { useEffect } from "react";
import styled from "styled-components";
import { BsCheckCircleFill } from "react-icons/bs";
import app from "../../firebase";
import { updateDoc, doc } from "@firebase/firestore";

export const DoneBtn = ({ id }) => {
  const UpdateData = async () => {
    const docRef = doc(app, "todoTask", id);
    await updateDoc(docRef, {
      done: true,
    });
  };
  useEffect(() => {
    UpdateData(id);
  });

  return (
    <CompleteIcon onClick={() => console.log("clicked")}>
      <BsCheckCircleFill />
    </CompleteIcon>
  );
};
const CompleteIcon = styled.div`
  font-size: 35px;
  color: green;
  cursor: pointer;
`;
