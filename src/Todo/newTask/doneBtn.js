import React, { useEffect } from "react";
import styled from "styled-components";
import { BsCheckCircleFill } from "react-icons/bs";
import app from "../../firebase";
import { updateDoc, doc, addDoc } from "@firebase/firestore";

export const DoneBtn = ({ id }) => {
  const UpdateData = async (id) => {
    const docRef = doc(app, "todoTask", id);
    await updateDoc(docRef, {
      done: true,
    });
  };

  return (
    <CompleteIcon onClick={() => UpdateData(id)}>
      <BsCheckCircleFill />
    </CompleteIcon>
  );
};
const CompleteIcon = styled.div`
  font-size: 35px;
  color: green;
  cursor: pointer;
`;
