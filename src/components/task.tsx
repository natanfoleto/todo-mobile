import { View, Text, TouchableOpacity, Image } from "react-native";
import colors from "tailwindcss/colors"

import { Feather } from "@expo/vector-icons"

import check from "@/assets/check.png";
import checked from "@/assets/checked.png";

export interface TodoProps {
  title: string;
  completed: boolean;
}

interface TaskProps {
  todo: TodoProps;
  onRemove: () => void;
  onChange: () => void;
}

export function Task({ todo, onRemove, onChange }: TaskProps) {
  return (
    <View 
      className="
        w-full 
        h-16 
        flex-row 
        items-center
        bg-zinc-700 
        rounded-md
        px-3
        mb-2
      "
    >
      <TouchableOpacity onPress={onChange}>
        <Image source={todo.completed ? checked : check} />
      </TouchableOpacity>

      <Text 
        className={`
          flex-1 
          text-zinc-300 
          mx-2
          ${todo.completed && "text-zinc-500 line-through"}
        `}
      >
        {todo.title}
      </Text>

      <TouchableOpacity onPress={onRemove}>
        <Feather 
          name="trash-2" 
          size={18}
          color={colors.zinc[400]}
        />
      </TouchableOpacity>
    </View>
  )
}