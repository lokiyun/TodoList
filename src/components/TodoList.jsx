import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useRecoilState } from "recoil";
import { motion } from "framer-motion";

import { todoListState, currentTabState } from "../store/state";
import { EditBtn, CompleteBtn, DeleteBtn } from "./AllSvgs";
import { handleSave2Local } from "../utils/index";

const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
  width: 100%;
  padding: 1rem 2rem;
  box-sizing: border-box;
`;

const Item = styled.div`
  display: flex;
  flex-direction: column;
  background: radial-gradient(
    circle,
    rgba(180, 182, 218, 0.9) 0,
    rgba(226, 236, 253, 0.9) 100%
  );
  color: ${(props) => props.theme.body};
  margin: 0 1rem 1rem 0;
  height: 8rem;
  width: 18rem;
  border-radius: 0.5rem;
  padding: 1rem;
  position: relative;
  cursor: pointer;
`;

const TextArea = styled.textarea`
  padding: 1rem 0.5rem;
  height: 70%;
  line-break: anywhere;
  background-color: ${(props) => (props.edit ? "#fff" : "transparent")};
  border: ${(props) => (props.edit ? "1px solid #000" : "none")};
`;

const Actions = styled.div`
  display: flex;
  justify-content: flex-end;
  opacity: 0;

  transition: opacity 0.3s ease;

  ${Item}:hover & {
    opacity: 1;
  }
`;

const Action = styled(motion.div)`
  margin-left: 1rem;
`;

const TodoList = () => {
  const [todoList, setTodoList] = useRecoilState(todoListState);
  const [currentTab] = useRecoilState(currentTabState);
  const [editIndex, setEditIndex] = useState(-1);
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (editIndex > -1) {
      const textarea = document.querySelector(`#text-${editIndex}`)
      textarea.focus()
    }
    console.log(editIndex)
  }, [editIndex])


  const handleSave = (index) => {
    const temp = JSON.parse(JSON.stringify(todoList));
    temp[index].message = message;
    setTodoList(temp);
    setMessage("");
    setEditIndex(-1);
    handleSave2Local(temp);
  };

  const handleComplete = (index) => {
    const temp = JSON.parse(JSON.stringify(todoList));
    temp[index].type = 1;
    setTodoList(temp);
    handleSave2Local(todoList);
  };

  const handleChangeMessage = (e, index) => {
    setMessage(e.target.value);
  };

  const handleDelete = (index) => {
    const temp = JSON.parse(JSON.stringify(todoList));
    temp.splice(index, 1);
    setTodoList(temp);
    handleSave2Local(temp);
  };

  return (
    <Container>
      {todoList.map(
        (item, index) =>
          (item.type === currentTab || currentTab === 2) && (
            <Item key={index}>
              <TextArea
                id={`text-${index}`}
                disabled={editIndex !== index}
                defaultValue={item.message}
                onChange={(e) => handleChangeMessage(e, index)}
              ></TextArea>
              <Actions>
                <Action
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => {
                    if (editIndex === index) {
                      handleSave(index);
                    } else {
                      setEditIndex(index);
                      document.querySelector(`#text-${index}`).focus()
                    }
                  }}
                >
                  <EditBtn width={25} height={25} />
                </Action>
                {
                  item.type !== 1 && <Action
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => handleComplete(index)}
                >
                  <CompleteBtn width={25} height={25} color={"green"} />
                </Action>
                }
                <Action
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => handleDelete(index)}
                >
                  <DeleteBtn width={25} height={25} />
                </Action>
              </Actions>
            </Item>
          )
      )}
    </Container>
  );
};

export default TodoList;
