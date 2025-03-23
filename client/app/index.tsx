
// import { Text, View, TouchableOpacity } from "react-native";
// import { useRouter } from "expo-router"; // Import router for navigation
// import "./global.css";

// export default function Index() {
//   const router = useRouter();

//   return (
//     <View className="flex-1 justify-center items-center bg-gray-900 px-6">
//       <Text className="text-4xl font-bold text-white mb-4">Welcome to AlumSphere</Text>
//       <Text className="text-lg text-gray-300 text-center mb-8">
//         Connect with alumni, explore opportunities, and grow together.
//       </Text>

//       {/* Sign In Button */}
//       <TouchableOpacity
//         className="bg-blue-500 w-full py-3 rounded-lg mb-4"
//         onPress={() => router.push("/signin")}
//       >
//         <Text className="text-white text-center text-lg font-semibold">Sign In</Text>
//       </TouchableOpacity>

//       {/* Sign Up Button */}
//       <TouchableOpacity
//         className="border border-blue-500 w-full py-3 rounded-lg"
//         onPress={() => router.push("/signup")}
//       >
//         <Text className="text-blue-400 text-center text-lg font-semibold">Sign Up</Text>
//       </TouchableOpacity>
//     </View>
//   );
// }

import { Text, View, TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";
import { MaterialCommunityIcons } from "@expo/vector-icons"; // Import icons
import "./global.css";

export default function Index() {
  const router = useRouter();

  return (
    <View className="flex-1 justify-center items-center bg-gray-900 px-6">
      <MaterialCommunityIcons name="account-group" size={80} color="white" className="mb-4" />
      <Text className="text-4xl font-bold text-white mb-4">Welcome to AlumSphere</Text>
      <Text className="text-lg text-gray-300 text-center mb-8">
        Connect with alumni, explore opportunities, and grow together.
      </Text>

      {/* Sign In Button */}
      <TouchableOpacity
        className="bg-blue-500 w-full py-3 rounded-lg flex-row items-center justify-center mb-4"
        onPress={() => router.push("/signin")}
      >
        <MaterialCommunityIcons name="login" size={24} color="white" className="mr-2" />
        <Text className="text-white text-center text-lg font-semibold">Sign In</Text>
      </TouchableOpacity>

      {/* Sign Up Button */}
      <TouchableOpacity
        className="border border-blue-500 w-full py-3 rounded-lg flex-row items-center justify-center"
        onPress={() => router.push("/signup")}
      >
        <MaterialCommunityIcons name="account-plus" size={24} color="#3b82f6" className="mr-2" />
        <Text className="text-blue-400 text-center text-lg font-semibold">Sign Up</Text>
      </TouchableOpacity>
    </View>
  );
}
