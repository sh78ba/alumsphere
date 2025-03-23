

// import React, { useState } from "react";
// import { View, Text, TextInput, TouchableOpacity, Alert } from "react-native";
// import { useRouter } from "expo-router";
// import {
//   createUserWithEmailAndPassword,
//   updateProfile,
//   AuthError,
// } from "firebase/auth";
// import { auth } from "../firebaseConfig";

// export default function SignUp() {
//   const router = useRouter();
//   const [email, setEmail] = useState<string>("");
//   const [password, setPassword] = useState<string>("");
//   const [confirmPassword, setConfirmPassword] = useState<string>("");
//   const [loading, setLoading] = useState<boolean>(false);

//   const handleSignUp = async (): Promise<void> => {
//     if (!email || !password || !confirmPassword) {
//       Alert.alert("Error", "Please fill in all fields");
//       return;
//     }

//     if (password !== confirmPassword) {
//       Alert.alert("Error", "Passwords do not match");
//       return;
//     }

//     setLoading(true);
//     try {
//       const userCredential = await createUserWithEmailAndPassword(
//         auth,
//         email,
//         password
//       );
//       // Optionally update the user's display name
//       await updateProfile(userCredential.user, {
//         displayName: email.split("@")[0],
//       });
//       Alert.alert("Success", "Account created successfully!");
//       router.push("/home");
//     } catch (error) {
//       handleAuthError(error as AuthError);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleAuthError = (error: AuthError): void => {
//     console.error("Signup error:", error);
//     switch (error.code) {
//       case "auth/email-already-in-use":
//         Alert.alert("Error", "Email already in use");
//         break;
//       case "auth/invalid-email":
//         Alert.alert("Error", "Invalid email address");
//         break;
//       case "auth/weak-password":
//         Alert.alert("Error", "Password should be at least 6 characters");
//         break;
//       case "auth/operation-not-allowed":
//         Alert.alert("Error", "Account creation is currently disabled");
//         break;
//       default:
//         Alert.alert("Error", "Account creation failed");
//     }
//   };

//   return (
//     <View className="flex-1 justify-center items-center bg-gray-900 px-6">
//       <Text className="text-3xl font-bold text-white mb-6">Create Account</Text>

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
//         className="w-full bg-gray-800 text-white p-3 rounded-lg mb-4"
//         value={password}
//         onChangeText={setPassword}
//         textContentType="password"
//       />

//       <TextInput
//         placeholder="Confirm Password"
//         placeholderTextColor="#ccc"
//         secureTextEntry
//         className="w-full bg-gray-800 text-white p-3 rounded-lg mb-6"
//         value={confirmPassword}
//         onChangeText={setConfirmPassword}
//         textContentType="password"
//       />

//       <TouchableOpacity
//         className={`bg-blue-500 w-full py-3 rounded-lg mb-4 ${
//           loading ? "opacity-50" : ""
//         }`}
//         onPress={handleSignUp}
//         disabled={loading}
//       >
//         <Text className="text-white text-center text-lg font-semibold">
//           {loading ? "Creating Account..." : "Sign Up"}
//         </Text>
//       </TouchableOpacity>

//       <TouchableOpacity onPress={() => router.push("/signin")} disabled={loading}>
//         <Text className="text-blue-400">Already have an account? Sign In</Text>
//       </TouchableOpacity>
//     </View>
//   );
// }

import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Alert } from "react-native";
import { useRouter } from "expo-router";
import {
  createUserWithEmailAndPassword,
  updateProfile,
  AuthError,
} from "firebase/auth";
import { auth } from "../firebaseConfig";

export default function SignUp() {
  const router = useRouter();
  const [username, setUsername] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const handleSignUp = async (): Promise<void> => {
    if (!username || !email || !password || !confirmPassword) {
      Alert.alert("Error", "Please fill in all fields");
      return;
    }

    if (password !== confirmPassword) {
      Alert.alert("Error", "Passwords do not match");
      return;
    }

    setLoading(true);
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      // Update profile with username
      await updateProfile(userCredential.user, {
        displayName: username,
      });
      Alert.alert("Success", "Account created successfully!");
      router.push("/home");
    } catch (error) {
      handleAuthError(error as AuthError);
    } finally {
      setLoading(false);
    }
  };

  const handleAuthError = (error: AuthError): void => {
    console.error("Signup error:", error);
    switch (error.code) {
      case "auth/email-already-in-use":
        Alert.alert("Error", "Email already in use");
        break;
      case "auth/invalid-email":
        Alert.alert("Error", "Invalid email address");
        break;
      case "auth/weak-password":
        Alert.alert("Error", "Password should be at least 6 characters");
        break;
      case "auth/operation-not-allowed":
        Alert.alert("Error", "Account creation is currently disabled");
        break;
      default:
        Alert.alert("Error", "Account creation failed");
    }
  };

  return (
    <View className="flex-1 justify-center items-center bg-gray-900 px-6">
      <Text className="text-3xl font-bold text-white mb-6">Create Account</Text>

      <TextInput
        placeholder="Username"
        placeholderTextColor="#ccc"
        className="w-full bg-gray-800 text-white p-3 rounded-lg mb-4"
        value={username}
        onChangeText={setUsername}
        autoCapitalize="none"
        textContentType="username"
      />

      <TextInput
        placeholder="Email"
        placeholderTextColor="#ccc"
        className="w-full bg-gray-800 text-white p-3 rounded-lg mb-4"
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
        keyboardType="email-address"
        textContentType="emailAddress"
      />

      <TextInput
        placeholder="Password"
        placeholderTextColor="#ccc"
        secureTextEntry
        className="w-full bg-gray-800 text-white p-3 rounded-lg mb-4"
        value={password}
        onChangeText={setPassword}
        textContentType="password"
      />

      <TextInput
        placeholder="Confirm Password"
        placeholderTextColor="#ccc"
        secureTextEntry
        className="w-full bg-gray-800 text-white p-3 rounded-lg mb-6"
        value={confirmPassword}
        onChangeText={setConfirmPassword}
        textContentType="password"
      />

      <TouchableOpacity
        className={`bg-blue-500 w-full py-3 rounded-lg mb-4 ${loading ? "opacity-50" : ""}`}
        onPress={handleSignUp}
        disabled={loading}
      >
        <Text className="text-white text-center text-lg font-semibold">
          {loading ? "Creating Account..." : "Sign Up"}
        </Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => router.push("/signin")} disabled={loading}>
        <Text className="text-blue-400">Already have an account? Sign In</Text>
      </TouchableOpacity>
    </View>
  );
}
