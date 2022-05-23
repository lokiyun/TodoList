import { atom } from 'recoil'

const list = JSON.parse(localStorage.getItem('list')) || []

export const todoListState = atom({
  key: 'todoListState',
  default: list
})

export const currentTabState = atom({
  key: 'currentTabState',
  default: 2
})