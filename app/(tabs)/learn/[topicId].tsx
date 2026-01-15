import { ScrollView, StyleSheet, Text, View } from "react-native";
import React from "react";
import { useLocalSearchParams } from "expo-router";
import { learningTopics } from "@/mocks/learning-topics";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";

const topic = () => {
  const { topicId } = useLocalSearchParams<{ topicId: string }>();
  const topic = learningTopics.find((t) => t.id === topicId);

  if (!topic) {
    return (
      <View>
        <Text>Topic not found</Text>
      </View>
    );
  }

  return (
    <View className="flex-1 ">
      {/* Gradient background */}
      <LinearGradient
        colors={["#F0F9FF", "#E0F2FE", "#FFFFFF"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      >
        <ScrollView className="p-4">
          {/* Header badge */}
          <View
            className={`self-start px-4 py-2 rounded-full mb-5`}
            style={{ backgroundColor: topic.color }}
          >
            <Text className="text-white font-bold text-sm">{topic.title}</Text>
          </View>

          {/* Introduction */}
          <Text className="text-[17px] text-slate-900 font-medium leading-[26px] mb-8">
            {topic.content.introduction}
          </Text>

          {/* Sections */}
          <View className="flex flex-col gap-7">
            {topic.content.sections.map((section: any, index: number) => (
              <View
                key={index}
                className="bg-white rounded-2xl p-5 shadow-md"
                style={{
                  shadowColor: "#000",
                  shadowOffset: { width: 0, height: 2 },
                  shadowOpacity: 0.06,
                  shadowRadius: 8,
                  elevation: 2,
                }}
              >
                <Text className="text-[20px] font-bold text-slate-900 mb-3">
                  {section.title}
                </Text>
                <Text className="text-[15px] text-slate-600 leading-6 mb-4">
                  {section.content}
                </Text>

                {section.keyPoints && section.keyPoints.length > 0 && (
                  <View className="flex flex-col gap-3">
                    {section.keyPoints.map(
                      (point: string, pointIndex: number) => (
                        <View
                          key={pointIndex}
                          className="flex-row gap-2 items-start"
                        >
                          <Ionicons
                            name="checkmark-circle-outline"
                            size={20}
                            color="green"
                          />
                          <Text className="flex-1 text-[15px] text-slate-700 leading-[22px]">
                            {point}
                          </Text>
                        </View>
                      )
                    )}
                  </View>
                )}
              </View>
            ))}
          </View>

          {/* Footer */}
          <View className="mt-10 p-5 bg-blue-50 rounded-2xl">
            <Text className="text-[15px] text-blue-800 text-center leading-[22px]">
              💡 Remember to discuss any questions with your healthcare team
            </Text>
          </View>
        </ScrollView>
      </LinearGradient>
    </View>
  );
};

export default topic;

const styles = StyleSheet.create({});
