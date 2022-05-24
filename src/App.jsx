import React, { useState } from "react";
import styled from "styled-components";
import { useRecoilState } from "recoil";

import TodoList from "./components/TodoList";
import { todoListState, currentTabState } from "./store/state";
import { handleSave2Local } from "./utils/index";

const Container = styled.div`
  background-color: ${(props) => props.theme.body};
  color: ${(props) => props.theme.text};
  height: 100vh;
  width: 100vw;
  overflow-y: auto;

  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Title = styled.h1`
  letter-spacing: 1rem;
  height: 4rem;
  line-height: 4rem;
`;

const Input = styled.input`
  background-color: #000000;
  border: 1px solid #646464;
  outline: none;
  font-size: 1.5rem;
  padding: 0.5rem 1rem;
  color: #ffffff;
  border-radius: 0.5rem;
  &:hover,
  &:focus {
    border-color: #6c5ce7;
  }
`;

const Tabs = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 1rem;
`;

const Tab = styled.div`
  background-color: ${(props) => props.index === props.activeIndex ? '#0984e3': props.theme.text};
  color: ${(props) => props.index === props.activeIndex ? '#ffffff': props.theme.body};
  padding: 0.5rem 1rem;
  border-radius: 1rem;
  margin: 0 1rem;
  cursor: pointer;
  border: 1px solid transparent;
  transition: color 0.3s ease, background-color 0.3s ease;

  &:hover {
    background-color: ${(props) => props.theme.body};
    color: ${(props) => props.theme.text};
    border: 1px solid ${(props) => props.theme.text};
  }
`;

const App = () => {
  const [todoList, setTodoList] = useRecoilState(todoListState);
  const [currentTab, setCurrentTab] = useRecoilState(currentTabState);
  const [value, setValue] = useState("");

  const tabList = ["正在进行中", "已完成", "所有"];

  const handlePress = (e) => {
    if (value === '') return
    if (e.key === "Enter") {
      const list= [
        ...todoList,
        {
          type: 0,
          message: value,
          createdAt: Date.now(),
        },
      ]
      setTodoList(list);
      handleSave2Local(list)
      setValue("");
      
    }
  };
  return (
    <Container>
      <Title>ToDo List</Title>
      <Input
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onKeyPress={(e) => handlePress(e)}
      />
      <Tabs>
        {tabList.map((item, index) => (
          <Tab key={index} index={index} activeIndex={currentTab} onClick={() => setCurrentTab(index)}>
            {item}
          </Tab>
        ))}
      </Tabs>
      <TodoList />
    </Container>
  );
};

export default App;
