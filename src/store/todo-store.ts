import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware"

import AsyncSsyncStorage from "@react-native-async-storage/async-storage"

import * as todoInMemory from "./helpers/todo-in-memory";

import { TodoProps } from "@/components/task";

interface StateProps {
  todos: TodoProps[];
  add: (todo: TodoProps) => void;
  remove: (title: string) => void;
  change: (title: string) => void;
}

export const useTodoStore = create
(persist<StateProps>((set) => ({
  todos: [],
  add: (todo: TodoProps) => 
    set((state) => ({ todos: todoInMemory.add(state.todos, todo) })),
  remove: (title: string) => 
    set((state) => ({ todos: todoInMemory.remove(state.todos, title) })),
  change: (title: string) => 
    set((state) => ({ todos: todoInMemory.change(state.todos, title) }))
}), {
  name: "todo-mobile:todo",
  storage: createJSONStorage(() => AsyncSsyncStorage)
}))