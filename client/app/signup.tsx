import { View, Text, TextInput, TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";

export default function SignUp() {
  const router = useRouter();

  return (
    <View className="flex-1 justify-center items-center bg-gray-900 px-6">
      <Text className="text-3xl font-bold text-white mb-6">Sign Up</Text>

      <TextInput
        placeholder="Full Name"
        placeholderTextColor="#ccc"
        className="w-full bg-gray-800 text-white p-3 rounded-lg mb-4"
      />

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

      <TouchableOpacity className="bg-green-500 w-full py-3 rounded-lg mb-4">
        <Text className="text-white text-center text-lg font-semibold">Sign Up</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => router.push("/signin")}>
        <Text className="text-blue-400">Already have an account? Sign In</Text>
      </TouchableOpacity>
    </View>
  );
}
