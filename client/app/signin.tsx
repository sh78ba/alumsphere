

// import { useState } from "react";
// import { View, Text, TextInput, TouchableOpacity, Alert } from "react-native";
// import { useRouter } from "expo-router";
// import { 
//   AuthError,
//   signInWithEmailAndPassword
// } from "firebase/auth";
// import { auth, storage } from "../firebaseConfig"; // Import initialized instances

// export default function SignIn() {
//   const router = useRouter();
//   const [email, setEmail] = useState<string>("");
//   const [password, setPassword] = useState<string>("");
//   const [loading, setLoading] = useState<boolean>(false);

//   const handleSignIn = async (): Promise<void> => {
//     if (!email || !password) {
//       Alert.alert("Error", "Please fill in all fields");
//       return;
//     }

//     setLoading(true);
//     try {
//       const userCredential = await signInWithEmailAndPassword(
//         auth,
//         email,
//         password
//       );
//       console.log("User signed in:", userCredential.user.uid);
//       router.push("/home");
//     } catch (error) {
//       handleAuthError(error as AuthError);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleAuthError = (error: AuthError): void => {
//     switch (error.code) {
//       case "auth/invalid-email":
//         Alert.alert("Error", "Invalid email address");
//         break;
//       case "auth/user-disabled":
//         Alert.alert("Error", "User account is disabled");
//         break;
//       case "auth/user-not-found":
//         Alert.alert("Error", "User not found");
//         break;
//       case "auth/wrong-password":
//         Alert.alert("Error", "Incorrect password");
//         break;
//       case "auth/too-many-requests":
//         Alert.alert("Error", "Too many attempts, try again later");
//         break;
//       default:
//         Alert.alert("Error", "Authentication failed");
//         console.error("Auth error:", error);
//     }
//   };

//   return (
//     <View className="flex-1 justify-center items-center bg-gray-900 px-6">
//       <Text className="text-3xl font-bold text-white mb-6">Sign In</Text>

//       <TextInput
//         placeholder="Email"
//         placeholderTextColor="#ccc"
//         className="w-full bg-gray-800 text-white p-3 rounded-lg mb-4"
//         value={email}
//         onChangeText={setEmail}
//         autoCapitalize="none"
//         keyboardType="email-address"
//         textContentType="emailAddress"
//       />

//       <TextInput
//         placeholder="Password"
//         placeholderTextColor="#ccc"
//         secureTextEntry
//         className="w-full bg-gray-800 text-white p-3 rounded-lg mb-6"
//         value={password}
//         onChangeText={setPassword}
//         textContentType="password"
//       />

//       <TouchableOpacity
//         className={`bg-blue-500 w-full py-3 rounded-lg mb-4 ${
//           loading ? "opacity-50" : ""
//         }`}
//         onPress={handleSignIn}
//         disabled={loading}
//       >
//         <Text className="text-white text-center text-lg font-semibold">
//           {loading ? "Signing In..." : "Sign In"}
//         </Text>
//       </TouchableOpacity>

//       <TouchableOpacity 
//         onPress={() => router.push("/signup")}
//         disabled={loading}
//       >
//         <Text className="text-blue-400">
//           Don't have an account? Sign Up
//         </Text>
//       </TouchableOpacity>
//     </View>
//   );
// }

import { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Alert } from "react-native";
import { useRouter } from "expo-router";
import { AuthError, signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebaseConfig"; // Import initialized instance
import { MaterialCommunityIcons } from "@expo/vector-icons"; 

export default function SignIn() {
  const router = useRouter();
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const handleSignIn = async (): Promise<void> => {
    if (!email || !password) {
      Alert.alert("Error", "Please fill in all fields");
      return;
    }

    setLoading(true);
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      console.log("User signed in:", userCredential.user.uid);
      router.push("/home");
    } catch (error) {
      handleAuthError(error as AuthError);
    } finally {
      setLoading(false);
    }
  };

  const handleAuthError = (error: AuthError): void => {
    switch (error.code) {
      case "auth/invalid-email":
        Alert.alert("Error", "Invalid email address");
        break;
      case "auth/user-disabled":
        Alert.alert("Error", "User account is disabled");
        break;
      case "auth/user-not-found":
        Alert.alert("Error", "User not found");
        break;
      case "auth/wrong-password":
        Alert.alert("Error", "Incorrect password");
        break;
      case "auth/too-many-requests":
        Alert.alert("Error", "Too many attempts, try again later");
        break;
      default:
        Alert.alert("Error", "Authentication failed");
        console.error("Auth error:", error);
    }
  };

  return (
    <View className="flex-1 justify-center items-center bg-gray-900 px-6">
      <Text className="text-3xl font-bold text-white mb-6">Sign In</Text>

      {/* Email Input */}
      <View className="w-full flex-row items-center bg-gray-800 p-3 rounded-lg mb-4">
        <MaterialCommunityIcons name="email-outline" size={24} color="#ccc" />
        <TextInput
          placeholder="Email"
          placeholderTextColor="#ccc"
          className="flex-1 text-white ml-3"
          value={email}
          onChangeText={setEmail}
          autoCapitalize="none"
          keyboardType="email-address"
          textContentType="emailAddress"
        />
      </View>

      {/* Password Input */}
      <View className="w-full flex-row items-center bg-gray-800 p-3 rounded-lg mb-6">
        <MaterialCommunityIcons name="lock-outline" size={24} color="#ccc" />
        <TextInput
          placeholder="Password"
          placeholderTextColor="#ccc"
          secureTextEntry
          className="flex-1 text-white ml-3"
          value={password}
          onChangeText={setPassword}
          textContentType="password"
        />
      </View>

      {/* Sign In Button */}
      <TouchableOpacity
        className={`bg-blue-500 w-full py-3 rounded-lg mb-4 ${loading ? "opacity-50" : ""}`}
        onPress={handleSignIn}
        disabled={loading}
      >
        <Text className="text-white text-center text-lg font-semibold">
          {loading ? "Signing In..." : "Sign In"}
        </Text>
      </TouchableOpacity>

      {/* Sign Up Link */}
      <TouchableOpacity onPress={() => router.push("/signup")} disabled={loading}>
        <Text className="text-blue-400">Don't have an account? Sign Up</Text>
      </TouchableOpacity>
    </View>
  );
}
