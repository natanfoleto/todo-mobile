import { useState } from "react";
import { 
  View, 
  Image, 
  TextInput, 
  TouchableOpacity, 
  Text, 
  FlatList,
  Alert
} from "react-native";

import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view"

import colors from "tailwindcss/colors"

import { Feather } from "@expo/vector-icons"

import { useTodoStore } from "@/store/todo-store";

import { Task, TodoProps } from "@/components/task";

import logo from "@/assets/logo.png"
import clipboard from "@/assets/clipboard.png"

export default function Home() {
  const todoStore = useTodoStore();

  const [name, setName] = useState("")

  function handleAddTodo() {
    if (todoStore.todos.findIndex(todo => todo.title === name) === 0)
      return Alert.alert("To-do existe", "Já existe um to-do na lista com essa descrição")

    if (!name) 
      return Alert.alert("To-do sem descrição", "Digite uma descrição da sua tarefa na caixa de texto")

    const todo = { title: name, completed: false }

    todoStore.add(todo)

    setName("")
  }

  function handleRemoveTodo(title: string) {
    Alert.alert("Remover o to-do?", `${title}`, [
      { text: "Cancelar" },
      {
        text: "Remover",
        onPress: () => todoStore.remove(title)
      },
    ])
  }

  function handleChangeTodo(title: string) {
    todoStore.change(title)
  }

  return (
    <View className="flex-1 items-center">
      <Image 
        source={logo}
        className="mt-16"
      />

      <View className="w-full flex-1 bg-zinc-800 mt-16">
        
        <View className="flex-row gap-2 px-6 -mt-8 mb-6">
          <TextInput 
            placeholder="Adicione uma nova tarefa"
            placeholderTextColor={colors.zinc[400]}
            value={name}
            onChangeText={setName}
            onSubmitEditing={handleAddTodo}
            returnKeyType="next"
            className="flex-1 p-4 rounded-md bg-zinc-50 font-body"
          />

          <TouchableOpacity 
            onPress={handleAddTodo} 
            className="p-4 rounded-md bg-blue-400 items-center justify-center"
          >
            <Feather name="plus-circle" size={24} color={colors.zinc[200]} />
          </TouchableOpacity>
        </View>

        <View className="px-6 pb-28">
          <View className="flex-row justify-between mb-5">
            <View className="flex-row items-center gap-2">
              <Text className="text-blue-400 font-bold">Criadas</Text>
              <Text className="bg-zinc-600 font-bold text-zinc-300 py-0.5 px-2 rounded-sm">
                {todoStore.todos.length}
              </Text>
            </View>
      
            <View className="flex-row items-center gap-2">
              <Text className="text-violet-400 font-bold">Conluídas</Text>
              <Text className="bg-zinc-600 font-bold text-zinc-300 py-0.5 px-2 rounded-sm">
                {todoStore.todos.filter(todo => todo.completed).length}
              </Text>
            </View>
          </View>

          <FlatList 
            data={todoStore.todos}
            keyExtractor={todos => todos.title}
            renderItem={({ item }) => (
              <Task 
                todo={item}
                onRemove={() => handleRemoveTodo(item.title)}
                onChange={() => handleChangeTodo(item.title)}
              />
            )}
            showsVerticalScrollIndicator={false}
            ListEmptyComponent={() => (
              <View className="w-full h-52 items-center justify-center border-t-[1px] border-zinc-700">
                <Image source={clipboard} />

                <Text className="mt-4 text-zinc-500 font-bold">Você ainda não tem tarefas criadas</Text>
                <Text className="text-zinc-600">Crie tarefas e organize seus itens a fazer</Text>
              </View>
            )}
          />
        </View>
      </View>
    </View>
  )
}