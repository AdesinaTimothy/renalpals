import { useQuizCategoryStore } from "@/store/quizStore";
import { shadows } from "@/styles/shadows";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";

export default function QuizCategoriesScreen() {
  const router = useRouter();
  const { quizCategories, setQuizCategories } = useQuizCategoryStore();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchQuizCategories();
  }, []);

  const fetchQuizCategories = async () => {
    try {
      const response = await fetch(
        `${process.env.EXPO_PUBLIC_SUPABASE_URL}/rest/v1/quiz_categories?select=*,quiz_questions(*)`,
        {
          headers: {
            apikey: process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY!,
            Authorization: `Bearer ${process.env
              .EXPO_PUBLIC_SUPABASE_ANON_KEY!}`,
          },
        }
      );

      const data = await response.json();

      // Transform the data to match your expected structure
      const transformedData = data.map((category: any) => ({
        ...category,
        questions: (category.quiz_questions || []).map((q: any) => ({
          id: q.id,
          question: q.question,
          options: q.options?.option || [], // Extract the array from the object
          correctAnswer: q.correct_answer, // Convert snake_case to camelCase
          explanation: q.explanation,
          category_id: q.category_id,
          created_at: q.created_at,
        })),
      }));

      setQuizCategories(transformedData);
      // console.log(quizCategories);
    } catch (error) {
      console.error("Error fetching articles:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <View className="flex-1 items-center justify-center bg-blue-50">
        <Text>Loading Learning contents...</Text>
      </View>
    );
  }

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
                      {quiz.questions?.length ?? 0} questions
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
