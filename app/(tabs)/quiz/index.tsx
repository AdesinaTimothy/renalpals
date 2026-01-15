import { BookOpen, Heart, Apple, Sun } from "lucide-react-native";
import { useRouter } from "expo-router";
import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Animated,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { quizCategories } from "@/mocks/quiz-data";
import { shadows } from "@/styles/shadows";
import { Ionicons } from "@expo/vector-icons";

export default function QuizCategoriesScreen() {
  const router = useRouter();

  return (
    <View className="flex-1 bg-blue-50">
      <LinearGradient colors={["#F0F9FF", "#E0F2FE", "#FFFFFF"]} />
      <ScrollView className="flex-1">
        <View className="py-6 px-4">
          <Text className="text-xl text-gray-600 mb-8">
            Test your knowledge about dialysis treatment 🧠
          </Text>

          <View className=" flex gap-4">
            {quizCategories.map((quiz) => {
              return (
                <TouchableOpacity
                  key={quiz.id}
                  activeOpacity={0.7}
                  onPress={() => router.push(`/quiz/${quiz.id}`)}
                  className="flex-row items-center bg-white rounded-2xl gap-3 px-5 py-5 shadow-md"
                  style={shadows.card}
                >
                  <View
                    className="w-16 h-16 rounded-2xl items-center justify-center"
                    style={{ backgroundColor: quiz.color }}
                  >
                    <Ionicons name={quiz.icon} size={24} color="white" />
                  </View>

                  <View className="flex-1">
                    <Text className="text-2xl font-bold text-gray-800 mb-1">
                      {quiz.title}
                    </Text>
                    <Text className="text-base text-gray-600 mb-1">
                      {quiz.description}
                    </Text>
                    <Text className="text-base text-gray-600 mb-1">
                      {quiz.questions.length} questions
                    </Text>
                  </View>
                </TouchableOpacity>
              );
            })}

            <View className="flex items-center justify-center mt-4">
              <Text className="text-lg text-gray-600 mb-8">
                💙 Test your knowledge about dialysis treatment
              </Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}
