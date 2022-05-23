export const handleSave2Local = (todoList) => {
  const list = JSON.stringify(todoList)
  localStorage.setItem('list', list)
}