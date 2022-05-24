import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useRecoilState } from "recoil";
import { motion, AnimatePresence } from "framer-motion";
import { unstable_batchedUpdates } from "react-dom"

import { todoListState, currentTabState } from "../store/state";
import { EditBtn, CompleteBtn, DeleteBtn } from "./AllSvgs";
import { handleSave2Local } from "../utils/index";

const Container = styled.div`
  position: relative;
  display: flex;
  flex-wrap: wrap;
  width: 100%;
  padding: 1rem 2rem;
  box-sizing: border-box;
`;

const Success = styled.div`
  position: absolute;
  top: .5rem;
  right: .5rem;
  padding: 0.2rem 0.4rem;
  border: 1px solid #00b894;
  color: #00b894;
`

const Item = styled(motion.div)`
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
  padding: 0 0.5rem;
  height: 70%;
  line-break: anywhere;
  background-color: ${(props) => (props.edit ? "#fff" : "transparent")};
  border: ${(props) => (props.edit ? "1px solid #000" : "none")};
  font-size: 1.5rem;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: ${props => props.disabled ? 3 : -1};
  -webkit-box-orient: vertical;
  line-height: 1.9rem;
  resize: none;
  /* font-family: ${props => props.theme.fontFamily}; */
`;

const Actions = styled.div`
  display: flex;
  justify-content: flex-end;
  opacity: 0;
  margin-top: 0.5rem;

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
      setMessage(todoList[editIndex].message)
    }
  }, [editIndex])


  const handleSave = (index) => {
    const temp = JSON.parse(JSON.stringify(todoList));
    if (message !== "" && message !== todoList[editIndex].message) {
      temp[index].message = message;
      unstable_batchedUpdates(() => {
        setTodoList(temp);
        setMessage("");
        setEditIndex(-1);
      })
      
      handleSave2Local(temp);
    }
  }

  const handleComplete = (index) => {
    const temp = JSON.parse(JSON.stringify(todoList));
    temp[index].type = 1;
    setTodoList(temp);
    handleSave2Local(todoList);
  };

  const handleChangeMessage = (e, index) => {
    // 将message暂存到localstorage，setMessage时再统一保存
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
      <AnimatePresence>
      {todoList.map(
        (item, index) =>
          (item.type === currentTab || currentTab === 2) && (
            <Item key={index}
              initial={{ opacity: 0, x: 300 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -300 }}  
            >
              {
                item.type === 1 && <Success>Success</Success>
              }
              <TextArea
                id={`text-${index}`}
                disabled={editIndex !== index}
                defaultValue={item.message}
                onChange={(e) => handleChangeMessage(e, index)}
              ></TextArea>
              <Actions>
                {
                  item.type !== 1 && <Action
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => {
                    if (editIndex === index) {
                      handleSave(index);
                      setEditIndex(-1)
                    } else {
                      setEditIndex(index);
                      document.querySelector(`#text-${index}`).focus()
                    }
                  }}
                >
                  <EditBtn width={25} height={25} />
                </Action>
                }
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
      </AnimatePresence>
    </Container>
  );
};

export default TodoList;
