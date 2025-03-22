import { View, Text, TextInput, TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";

export default function SignIn() {
  const router = useRouter();

  return (
    <View className="flex-1 justify-center items-center bg-gray-900 px-6">
      <Text className="text-3xl font-bold text-white mb-6">Sign In</Text>

      <TextInput
        placeholder="Email"
        placeholderTextColor="#ccc"
        className="w-full bg-gray-800 text-white p-3 rounded-lg mb-4"
      />

      <TextInput
        placeholder="Password"
        placeholderTextColor="#ccc"
        secureTextEntry
        className="w-full bg-gray-800 text-white p-3 rounded-lg mb-6"
      />

      {/* Navigate to 'tabs/home' after signing in */}
      <TouchableOpacity
        className="bg-blue-500 w-full py-3 rounded-lg mb-4"
        onPress={() => router.push("/home")}
      >
        <Text className="text-white text-center text-lg font-semibold">Sign In</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => router.push("/signup")}>
        <Text className="text-blue-400">Don't have an account? Sign Up</Text>
      </TouchableOpacity>
    </View>
  );
}
