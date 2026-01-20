import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useState } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import { ProgressBar } from "@/components/ProgressBar";
import { useQuizCategoryStore } from "@/store/quizStore";
import { QuizQuestion } from "@/types/quiz";
import { Ionicons } from "@expo/vector-icons";
import * as Haptics from "expo-haptics";
import { LinearGradient } from "expo-linear-gradient";

const category = () => {
  const router = useRouter();
  const { categoryId } = useLocalSearchParams<{ categoryId: string }>();
  const { quizCategories } = useQuizCategoryStore();

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showExplanation, setShowExplanation] = useState(false);
  const [score, setScore] = useState(0);
  const [answeredQuestions, setAnsweredQuestions] = useState<boolean[]>([]);

  const selectedQuizCategory = quizCategories.find((t) => t.id == categoryId);

  if (!selectedQuizCategory) {
    return (
      <View className="flex-1 items-center justify-center bg-blue-50">
        <Text className="text-lg text-gray-600">Category not found</Text>
        <TouchableOpacity
          onPress={() => router.back()}
          className="mt-4 bg-blue-500 px-6 py-3 rounded-lg"
        >
          <Text className="text-white font-semibold">Go Back</Text>
        </TouchableOpacity>
      </View>
    );
  }

  if (
    !selectedQuizCategory.questions ||
    selectedQuizCategory.questions.length === 0
  ) {
    return (
      <View className="flex-1 items-center justify-center bg-blue-50">
        <Text className="text-lg text-gray-600">No questions available</Text>
        <TouchableOpacity
          onPress={() => router.back()}
          className="mt-4 bg-blue-500 px-6 py-3 rounded-lg"
        >
          <Text className="text-white font-semibold">Go Back</Text>
        </TouchableOpacity>
      </View>
    );
  }

  const currentQuestion: QuizQuestion | undefined =
    selectedQuizCategory?.questions[currentQuestionIndex];

  const isLastQuestion =
    currentQuestionIndex === selectedQuizCategory?.questions.length - 1;

  //Function the handle answerSelected
  const handleAnswerSelect = (index: number) => {
    if (selectedAnswer !== null) return;

    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    setSelectedAnswer(index);
    setShowExplanation(true);

    const isCorrect = index === currentQuestion?.correctAnswer;
    if (isCorrect) {
      setScore(score + 1);
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    } else {
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
    }

    const newsAnswered = [...answeredQuestions];
    newsAnswered[currentQuestionIndex] = true;
    setAnsweredQuestions(newsAnswered);
    console.log(index);
  };

  //Function to handleNext
  const handleNext = () => {
    if (isLastQuestion) {
      router.push({
        pathname: "/(tabs)/quiz/result",
        params: {
          score: score.toString(),
          total: selectedQuizCategory.questions!.length.toString(),
          categoryTitle: selectedQuizCategory.title,
        },
      });
    } else {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setSelectedAnswer(null);
      setShowExplanation(false);
    }
  };

  //  Getting proper style for the option
  const getOptionStyle = (index: number) => {
    if (selectedAnswer === null) {
      return styles.option;
    }

    if (index === currentQuestion.correctAnswer) {
      return [styles.option, styles.optionCorrect];
    }

    if (index === selectedAnswer && index !== currentQuestion.correctAnswer) {
      return [styles.option, styles.optionIncorrect];
    }

    return [styles.option, styles.optionFaded];
  };

  return (
    <View className="flex-1 bg-blue-50">
      <LinearGradient colors={["#F0F9FF", "#E0F2FE", "#FFFFFF"]} />
      <ScrollView className="flex-1 p-4">
        {/* Progress Bar Section */}
        <View className="flex-1">
          {selectedQuizCategory?.questions?.length ? (
            <ProgressBar
              current={currentQuestionIndex + 1}
              total={selectedQuizCategory.questions.length}
            />
          ) : null}
        </View>

        {/* Progress Text */}
        <View className="mb-5">
          <Text className="text-sm text-[#64748b] font-semibold mt-2">
            Question {currentQuestionIndex + 1} of{" "}
            {selectedQuizCategory?.questions.length}
          </Text>
        </View>

        {/*Category Badge  */}
        <View className="flex-row items-center mb-5">
          <View
            className="w-2 h-2 bg-red-800 rounded-full mr-2"
            style={{ backgroundColor: selectedQuizCategory?.color }}
          ></View>
          <Text className="text-base text-slate-500 font-semibold uppercase tracking-[0.5px]">
            {selectedQuizCategory?.title}
          </Text>
        </View>

        {/* Question */}
        <Text className="text-[26px] font-bold text-slate-800 leading-[36px] mb-6">
          {currentQuestion?.question}
        </Text>

        {/* Options */}
        <View className="flex gap-2">
          {currentQuestion?.options.map((option, index) => {
            const isSelected = selectedAnswer === index;
            const isCorrect = index === currentQuestion.correctAnswer;
            const showIcon =
              selectedAnswer !== null && (isCorrect || isSelected);

            return (
              <TouchableOpacity
                key={index}
                onPress={() => handleAnswerSelect(index)}
                disabled={selectedAnswer !== null}
                activeOpacity={0.7}
              >
                <View style={getOptionStyle(index)}>
                  <View style={styles.optionContent}>
                    <View style={styles.optionNumber}>
                      <Text style={styles.optionNumberText}>
                        {String.fromCharCode(65 + index)}
                      </Text>
                    </View>
                    <Text style={styles.optionText}>{option}</Text>
                  </View>
                  {showIcon && (
                    <View className="ml-2">
                      {isCorrect ? (
                        <Ionicons
                          name="checkmark-outline"
                          size={26}
                          color={"green"}
                        />
                      ) : (
                        <Ionicons
                          name="close-outline"
                          size={26}
                          color={"red"}
                        />
                      )}
                    </View>
                  )}
                </View>
              </TouchableOpacity>
            );
          })}
        </View>

        {showExplanation && (
          <View className="mt-6 bg-white rounded-[16px] p-5 border-l-4 border-blue-500 ">
            <View className="mb-2">
              <Text className="text-[18px] font-bold text-slate-800">
                {selectedAnswer === currentQuestion?.correctAnswer
                  ? "✅ Correct"
                  : "❌ Not quite"}
              </Text>
            </View>
            <Text className="text-[15px] text-[#475569] leading-6">
              {currentQuestion?.explanation}
            </Text>
          </View>
        )}
      </ScrollView>

      {showExplanation && (
        <View className="absolute bottom-0 left-0 right-0 p-5 bg-transparent">
          <TouchableOpacity
            onPress={handleNext}
            activeOpacity={0.8}
            className="flex-row items-center justify-center py-4 rounded-[16px] gap-2"
            style={{
              backgroundColor: selectedQuizCategory.color,
              shadowColor: "#000",
              shadowOffset: { width: 0, height: 4 },
              shadowOpacity: 0.15,
              shadowRadius: 12,
              elevation: 5,
            }}
          >
            <Text className="text-[18px] font-bold text-white">
              {isLastQuestion ? "See Results" : "Next Question"}
            </Text>
            <Ionicons
              name="chevron-forward-outline"
              size={20}
              color={"white"}
            />
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

export default category;

const styles = StyleSheet.create({
  option: {
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    padding: 18,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderWidth: 2,
    borderColor: "#e2e8f0",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 8,
    elevation: 2,
  },
  optionContent: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  optionCorrect: {
    borderColor: "#22c55e",
    backgroundColor: "#f0fdf4",
  },
  optionIncorrect: {
    borderColor: "#ef4444",
    backgroundColor: "#fef2f2",
  },
  optionFaded: {
    opacity: 0.5,
  },
  optionNumber: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: "#f1f5f9",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  optionNumberText: {
    fontSize: 16,
    fontWeight: "700" as const,
    color: "#475569",
  },
  optionText: {
    fontSize: 16,
    color: "#1e293b",
    lineHeight: 24,
    flex: 1,
  },
  iconContainer: {
    marginLeft: 8,
  },
});
