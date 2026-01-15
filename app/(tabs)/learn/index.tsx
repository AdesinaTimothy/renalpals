import "@/global.css";
import { useArticleStore } from "@/store/articleStore";
import { shadows } from "@/styles/shadows";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";

export default function Quiz() {
  const router = useRouter();
  const { articles, setArticles } = useArticleStore();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchArticles();
  }, []);

  const fetchArticles = async () => {
    try {
      const response = await fetch(
        `${process.env.EXPO_PUBLIC_SUPABASE_URL}/rest/v1/articles?select=*`,
        {
          headers: {
            apikey: process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY!,
            Authorization: `Bearer ${process.env
              .EXPO_PUBLIC_SUPABASE_ANON_KEY!}`,
          },
        }
      );

      const data = await response.json();
      setArticles(data);
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
            Educational resources about dialysis treatment
          </Text>

          <View className=" flex gap-4">
            {articles.map((topic) => {
              return (
                <TouchableOpacity
                  key={topic.id}
                  activeOpacity={0.7}
                  onPress={() => router.push(`/learn/${topic.id}`)}
                  className="flex-row bg-white rounded-2xl gap-3 px-5 py-5 shadow-md"
                  style={shadows.card}
                >
                  <View
                    className="w-16 h-16 rounded-2xl items-center justify-center"
                    style={{ backgroundColor: topic.color }}
                  >
                    <Ionicons name={topic.icon} size={24} color="white" />
                  </View>

                  <View className="flex-1">
                    <Text className="text-2xl font-bold text-gray-800 mb-1">
                      {topic.title}
                    </Text>
                    <Text className="text-base text-gray-600 mb-1">
                      {topic.description}
                    </Text>
                  </View>
                </TouchableOpacity>
              );
            })}

            {/* <LearnDetails /> */}

            <View className="flex items-center justify-center mt-4">
              <Text className="text-lg text-gray-600 mb-8">
                📚 Take your time tol earn and understand
              </Text>
            </View>
          </View>
        </View>
        <View></View>
      </ScrollView>
    </View>
  );
}
