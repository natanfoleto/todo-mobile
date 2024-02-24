import { TodoProps } from "@/components/task";

export function add(todos: TodoProps[], newTodo: TodoProps) {
  const existingTodo = todos.find(({ title }) => title === newTodo.title)

  if (!existingTodo) return [...todos, newTodo]

  return todos
}

export function remove(todos: TodoProps[], title: string) {
  return todos.filter(todo => todo.title !== title)
}

export function change(todos: TodoProps[], title: string) {
  const updatedTodos = todos.map((todo) => 
    todo.title === title
    ? {
        ...todo,
        completed: !todo.completed
      } 
      : todo
  )

  return updatedTodos
}