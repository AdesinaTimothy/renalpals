import AccountComp from "@/components/AccountComp";
import { useAuthStore } from "@/store/authStore";
import React from "react";
import { Alert, StyleSheet, Text, View } from "react-native";

const settings = () => {
  const signOut = useAuthStore((state) => state.signOut);

  const handleSignOut = async () => {
    try {
      await signOut();
      Alert.alert("Signed out", "You have successfully signed out.");
    } catch (error) {
      console.error("Error signing out:", error);
      Alert.alert("Error", "Something went wrong while signing out.");
    }
  };

  return (
    <View className="flex-1 p-4 ">
      <View className="flex-row gap-5 items-center">
        <View className="bg-green-500 p-4 rounded-full h-16 w-16 items-center justify-center">
          <Text className="text-white text-2xl font-bold">T</Text>
        </View>
        <View className="flex gap-1">
          <Text className="text-gray-900 font-bold">Timothy</Text>
          <Text className="text-gray-500">timobest121@gmail.com</Text>
        </View>
      </View>

      <View className="flex gap-1 mt-6">
        <View>
          <Text className="text-MD text-gray-500">Resources</Text>
        </View>

        <View className="flex gap-2 ">
          <AccountComp
            label="Rate in App Store"
            leftIcon="star-half"
            leftIconColor="#FFFFFF"
            leftIconBg="#32ADE6"
            rightIcon="chevron-forward"
            rightIconColor="#6B7280"
            href="/meds"
            onPress={() => console.log("Custom press!")}
            disabled={false}
          />
          <AccountComp
            label="Feature Request"
            leftIcon="hand-right"
            leftIconColor="#FFFFFF"
            leftIconBg="#5856D6"
            rightIcon="chevron-forward"
            rightIconColor="#6B7280"
            href="/meds"
            onPress={() => console.log("Custom press!")}
            disabled={false}
          />
          <AccountComp
            label="App Feedback"
            leftIcon="chatbox-ellipses"
            leftIconColor="#FFFFFF"
            leftIconBg="#9966CC"
            rightIcon="chevron-forward"
            rightIconColor="#6B7280"
            href="/meds"
            onPress={() => console.log("Custom press!")}
            disabled={false}
          />

          <AccountComp
            label="Help & Support"
            leftIcon="help-circle"
            leftIconColor="#FFFFFF"
            leftIconBg="#00C7BE"
            rightIcon="chevron-forward"
            rightIconColor="#6B7280"
            href="/meds"
            onPress={() => console.log("Custom press!")}
            disabled={false}
          />
        </View>
      </View>

      <View className="flex gap-1 mt-6">
        <View>
          <Text className="text-MD text-gray-500">Legal</Text>
        </View>

        <View className="flex gap-2 ">
          <AccountComp
            label="Terms and Conditions"
            leftIcon="document-text"
            leftIconColor="#FFFFFF"
            leftIconBg="#FF9500"
            rightIcon="chevron-forward"
            rightIconColor="#6B7280"
            href="/meds"
            onPress={() => console.log("Custom press!")}
            disabled={false}
          />
          <AccountComp
            label="Privacy Policy"
            leftIcon="document-lock"
            leftIconColor="#FFFFFF"
            leftIconBg="#9F6CB8"
            rightIcon="chevron-forward"
            rightIconColor="#6B7280"
            href="/meds"
            onPress={() => console.log("Custom press!")}
            disabled={false}
          />
          <AccountComp
            label="Support Email"
            leftIcon="mail"
            leftIconColor="#FFFFFF"
            leftIconBg="#34C759"
            rightIcon="chevron-forward"
            rightIconColor="#6B7280"
            href="/meds"
            onPress={() => console.log("Custom press!")}
            disabled={false}
          />
        </View>
      </View>
      <View className="flex gap-1 mt-6">
        <View>
          <Text className="text-MD text-gray-500">Account</Text>
        </View>

        <View className="flex gap-2 ">
          <AccountComp
            label="Logout"
            leftIcon="log-out"
            leftIconColor="#FFFFFF"
            leftIconBg="#DC4661"
            rightIcon="chevron-forward"
            rightIconColor="#6B7280"
            href="/meds"
            onPress={handleSignOut}
            disabled={false}
          />
          <AccountComp
            label="Delete Account"
            leftIcon="trash"
            leftIconColor="#FFFFFF"
            leftIconBg="#FF3B30"
            rightIcon="chevron-forward"
            rightIconColor="#6B7280"
            href="/meds"
            onPress={() => console.log("Custom press!")}
            disabled={false}
          />
        </View>
      </View>
    </View>
  );
};

export default settings;

const styles = StyleSheet.create({});
