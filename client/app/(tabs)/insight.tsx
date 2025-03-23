
// import React, { useState, useEffect } from "react";
// import { View, Text, FlatList, TextInput, TouchableOpacity, Alert } from "react-native";
// import { collection, getDocs, addDoc, orderBy, query, serverTimestamp } from "firebase/firestore";
// import { db } from "../../firebaseConfig";

// interface Insight {
//   id: string;
//   text: string;
//   createdAt: any;
// }

// // Helper function that handles both string and Date inputs
// function parseFirestoreDate(dateInput: any): Date {
//   if (typeof dateInput === "string") {
//     const cleaned = dateInput.replace(" at ", " ").replace(" UTC", "");
//     const parsed = new Date(cleaned);
//     return isNaN(parsed.getTime()) ? new Date() : parsed;
//   } else if (dateInput instanceof Date) {
//     return dateInput;
//   }
//   return new Date();
// }

// export default function Insights() {
//   const [insights, setInsights] = useState<Insight[]>([]);
//   const [newInsight, setNewInsight] = useState("");
//   const [loading, setLoading] = useState(false);

//   const fetchInsights = async () => {
//     try {
//       const insightsRef = collection(db, "insights");
//       const q = query(insightsRef, orderBy("createdAt", "desc"));
//       const querySnapshot = await getDocs(q);
//       const insightsArray: Insight[] = [];
      
//       querySnapshot.forEach((doc) => {
//         const data = doc.data();
//         insightsArray.push({
//           id: doc.id,
//           text: data.text,
//           createdAt: data.createdAt?.toDate() || new Date()
//         });
//       });
      
//       setInsights(insightsArray);
//     } catch (error) {
//       Alert.alert("Error", "Failed to fetch insights");
//       console.error("Firestore error: ", error);
//     }
//   };

//   useEffect(() => {
//     fetchInsights();
//   }, []);

//   const handleAddInsight = async () => {
//     if (!newInsight.trim()) {
//       Alert.alert("Validation", "Please enter your insight");
//       return;
//     }

//     setLoading(true);
//     try {
//       await addDoc(collection(db, "insights"), {
//         text: newInsight.trim(),
//         createdAt: serverTimestamp()
//       });

//       setNewInsight("");
//       await fetchInsights();
//     } catch (error) {
//       Alert.alert("Error", "Failed to post insight");
//       console.error("Post error:", error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <View className="flex-1 bg-gray-100 p-4">
//       <Text className="text-2xl font-bold text-center mb-4">Interview Insights</Text>
      
//       {/* Create a new insight */}
//       <View className="mb-4">
//         <TextInput
//           placeholder="Share your interview experience..."
//           placeholderTextColor="#666"
//           value={newInsight}
//           onChangeText={setNewInsight}
//           className="border border-gray-300 rounded p-3 mb-4"
//           multiline
//         />
        
//         <TouchableOpacity 
//           className="bg-blue-500 rounded p-3" 
//           onPress={handleAddInsight} 
//           disabled={loading}
//         >
//           <Text className="text-white text-center font-semibold">
//             {loading ? "Posting..." : "Post Insight"}
//           </Text>
//         </TouchableOpacity>
//       </View>
      
//       {/* Display insights */}
//       <FlatList
//         data={insights}
//         keyExtractor={(item) => item.id}
//         renderItem={({ item }) => (
//           <View className="bg-white rounded shadow p-4 mb-4">
//             {item.text && (
//               <Text className="text-gray-800 mb-2">{item.text}</Text>
//             )}
//             <Text className="text-gray-500 text-xs">
//               {item.createdAt
//                 ? parseFirestoreDate(item.createdAt).toLocaleString()
//                 : "Unknown date"}
//             </Text>
//           </View>
//         )}
//         ListEmptyComponent={
//           <Text className="text-center text-gray-500">No insights available</Text>
//         }
//       />
//     </View>
//   );
// }

import React, { useState, useEffect } from "react";
import { View, Text, FlatList, TextInput, TouchableOpacity, Alert } from "react-native";
import { collection, getDocs, addDoc, orderBy, query, serverTimestamp } from "firebase/firestore";
import { auth, db } from "../../firebaseConfig"; // Ensure auth is imported

interface Insight {
  id: string;
  text: string;
  username: string;
  createdAt: any;
}

// Helper function that handles both string and Date inputs
function parseFirestoreDate(dateInput: any): Date {
  if (typeof dateInput === "string") {
    const cleaned = dateInput.replace(" at ", " ").replace(" UTC", "");
    const parsed = new Date(cleaned);
    return isNaN(parsed.getTime()) ? new Date() : parsed;
  } else if (dateInput instanceof Date) {
    return dateInput;
  }
  return new Date();
}

export default function Insights() {
  const [insights, setInsights] = useState<Insight[]>([]);
  const [newInsight, setNewInsight] = useState("");
  const [loading, setLoading] = useState(false);

  const fetchInsights = async () => {
    try {
      const insightsRef = collection(db, "insights");
      const q = query(insightsRef, orderBy("createdAt", "desc"));
      const querySnapshot = await getDocs(q);
      const insightsArray: Insight[] = [];
      
      querySnapshot.forEach((doc) => {
        const data = doc.data();
        insightsArray.push({
          id: doc.id,
          text: data.text,
          username: data.username || "Anonymous", // Default to Anonymous if no username
          createdAt: data.createdAt?.toDate() || new Date()
        });
      });
      
      setInsights(insightsArray);
    } catch (error) {
      Alert.alert("Error", "Failed to fetch insights");
      console.error("Firestore error: ", error);
    }
  };

  useEffect(() => {
    fetchInsights();
  }, []);

  const handleAddInsight = async () => {
    if (!newInsight.trim()) {
      Alert.alert("Validation", "Please enter your insight");
      return;
    }

    const user = auth.currentUser;
    if (!user) {
      Alert.alert("Error", "You must be logged in to post an insight");
      return;
    }

    setLoading(true);
    try {
      await addDoc(collection(db, "insights"), {
        text: newInsight.trim(),
        username: user.displayName || "Anonymous",
        createdAt: serverTimestamp()
      });

      setNewInsight("");
      await fetchInsights();
    } catch (error) {
      Alert.alert("Error", "Failed to post insight");
      console.error("Post error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View className="flex-1 bg-gray-100 p-4">
      <Text className="text-2xl font-bold text-center mb-4">Interview Insights</Text>
      
      {/* Create a new insight */}
      <View className="mb-4">
        <TextInput
          placeholder="Share your interview experience..."
          placeholderTextColor="#666"
          value={newInsight}
          onChangeText={setNewInsight}
          className="border border-gray-300 rounded p-3 mb-4"
          multiline
        />
        
        <TouchableOpacity 
          className="bg-blue-500 rounded p-3" 
          onPress={handleAddInsight} 
          disabled={loading}
        >
          <Text className="text-white text-center font-semibold">
            {loading ? "Posting..." : "Post Insight"}
          </Text>
        </TouchableOpacity>
      </View>
      
      {/* Display insights */}
      <FlatList
        data={insights}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View className="bg-white rounded shadow p-4 mb-4">
            <Text className="font-semibold text-blue-500">{item.username}</Text>
            {item.text && (
              <Text className="text-gray-800 mb-2">{item.text}</Text>
            )}
            <Text className="text-gray-500 text-xs">
              {item.createdAt
                ? parseFirestoreDate(item.createdAt).toLocaleString()
                : "Unknown date"}
            </Text>
          </View>
        )}
        ListEmptyComponent={
          <Text className="text-center text-gray-500">No insights available</Text>
        }
      />
    </View>
  );
}
