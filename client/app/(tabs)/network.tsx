import React, { useState } from 'react';
import { View, Text, ScrollView, Image, TouchableOpacity, SafeAreaView, StatusBar, Alert } from 'react-native';
import { Bell, Search, MessageSquare, UserPlus, Users, Briefcase, MapPin, ChevronRight, Plus, X, Check, Calendar, BookOpen, Star, Home, FileText, User } from 'lucide-react-native';
// Don't import NativeWind directly - it should be configured in your project setup

const NetworkScreen = () => {
  // State for managing invitations
  const [invitations, setInvitations] = useState([
    {
      id: 1,
      name: "Alexandra Johnson",
      title: "Senior Product Manager at TechCorp",
      mutual: 12,
      location: "San Francisco Bay Area",
      avatar: "https://placeholder.svg?height=60&width=60&text=AJ"
    },
    {
      id: 2,
      name: "Michael Chen",
      title: "Software Engineer at InnovateTech",
      mutual: 8,
      location: "New York City",
      avatar: "https://placeholder.svg?height=60&width=60&text=MC"
    }
  ]);

  // State for managing recommendations
  const [recommendations, setRecommendations] = useState([
    {
      id: 1,
      name: "Sarah Miller",
      title: "UX/UI Designer at DesignStudio",
      mutual: 8,
      company: "DesignStudio",
      avatar: "https://placeholder.svg?height=80&width=80&text=SM"
    },
    {
      id: 2,
      name: "David Wilson",
      title: "Marketing Director at BrandCo",
      mutual: 15,
      company: "BrandCo",
      avatar: "https://placeholder.svg?height=80&width=80&text=DW"
    },
    {
      id: 3,
      name: "Emily Zhang",
      title: "Data Scientist at AnalyticsPro",
      mutual: 6,
      company: "AnalyticsPro",
      avatar: "https://placeholder.svg?height=80&width=80&text=EZ"
    },
    {
      id: 4,
      name: "Robert Taylor",
      title: "Frontend Developer at WebTech",
      mutual: 11,
      company: "WebTech",
      avatar: "https://placeholder.svg?height=80&width=80&text=RT"
    }
  ]);

  // State for network stats
  const [networkStats, setNetworkStats] = useState({
    connections: 486,
    invitations: 4,
    notifications: 12
  });

  // Handle accepting an invitation
  const handleAcceptInvitation = (id) => {
    // Update invitations list
    setInvitations(invitations.filter(inv => inv.id !== id));
    
    // Update connection count
    setNetworkStats({
      ...networkStats,
      connections: networkStats.connections + 1,
      invitations: networkStats.invitations - 1
    });
    
    // Show confirmation
    Alert.alert("Connection Added", "You are now connected!");
  };

  // Handle ignoring an invitation
  const handleIgnoreInvitation = (id) => {
    // Update invitations list
    setInvitations(invitations.filter(inv => inv.id !== id));
    
    // Update invitation count
    setNetworkStats({
      ...networkStats,
      invitations: networkStats.invitations - 1
    });
  };

  // Handle sending a connection request
  const handleSendConnection = (id) => {
    // Remove from recommendations
    setRecommendations(recommendations.filter(rec => rec.id !== id));
    
    // Show confirmation
    Alert.alert("Invitation Sent", "Your connection request has been sent!");
  };

  return (
    <SafeAreaView className="flex-1 bg-gray-50">
      <StatusBar barStyle="dark-content" backgroundColor="#ffffff" />
      
    
      
      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        {/* Network Insights Card */}
        <View className="mx-4 mt-4 bg-white rounded-xl shadow-sm overflow-hidden">
          <View className="px-5 py-4 border-b border-gray-100">
            <Text className="text-lg font-bold text-gray-800">Your Network</Text>
            <Text className="text-sm text-gray-500 mt-1">Grow your network to discover new opportunities</Text>
          </View>
          
          <View className="flex-row px-2 py-4 justify-between">
            <TouchableOpacity 
              className="items-center flex-1 px-2"
              onPress={() => Alert.alert("Connections", "View all your connections")}
            >
              <View className="bg-blue-50 p-3 rounded-full mb-2">
                <Users size={22} color="#0A66C2" />
              </View>
              <Text className="text-sm font-medium text-gray-700">Connections</Text>
              <Text className="text-lg font-bold text-gray-900 mt-1">{networkStats.connections}</Text>
            </TouchableOpacity>
            
            <TouchableOpacity 
              className="items-center flex-1 px-2"
              onPress={() => Alert.alert("Invitations", "View all your invitations")}
            >
              <View className="bg-blue-50 p-3 rounded-full mb-2">
                <UserPlus size={22} color="#0A66C2" />
              </View>
              <Text className="text-sm font-medium text-gray-700">Invitations</Text>
              <Text className="text-lg font-bold text-gray-900 mt-1">{networkStats.invitations}</Text>
            </TouchableOpacity>
            
            <TouchableOpacity 
              className="items-center flex-1 px-2"
              onPress={() => Alert.alert("Notifications", "View all your notifications")}
            >
              <View className="bg-blue-50 p-3 rounded-full mb-2">
                <Bell size={22} color="#0A66C2" />
              </View>
              <Text className="text-sm font-medium text-gray-700">Notifications</Text>
              <Text className="text-lg font-bold text-gray-900 mt-1">{networkStats.notifications}</Text>
            </TouchableOpacity>
          </View>
        </View>
        
        {/* Weekly Network Stats */}
        <View className="mx-4 mt-5 bg-white rounded-xl shadow-sm overflow-hidden">
          <View className="px-5 py-4 border-b border-gray-100">
            <Text className="text-lg font-bold text-gray-800">Weekly Network Activity</Text>
          </View>
          
          <View className="px-5 py-4">
            <View className="flex-row justify-between items-center mb-3">
              <Text className="text-gray-700">Profile views</Text>
              <View className="flex-row items-center">
                <Text className="font-bold text-gray-900">38</Text>
                <Text className="text-green-600 text-xs ml-2">+12%</Text>
              </View>
            </View>
            
            <View className="flex-row justify-between items-center mb-3">
              <Text className="text-gray-700">Post impressions</Text>
              <View className="flex-row items-center">
                <Text className="font-bold text-gray-900">1,248</Text>
                <Text className="text-green-600 text-xs ml-2">+24%</Text>
              </View>
            </View>
            
            <View className="flex-row justify-between items-center">
              <Text className="text-gray-700">Search appearances</Text>
              <View className="flex-row items-center">
                <Text className="font-bold text-gray-900">76</Text>
                <Text className="text-green-600 text-xs ml-2">+8%</Text>
              </View>
            </View>
          </View>
        </View>
        
        {/* Invitations Section */}
        {invitations.length > 0 && (
          <View className="mx-4 mt-5 bg-white rounded-xl shadow-sm overflow-hidden">
            <View className="px-5 py-4 border-b border-gray-100 flex-row justify-between items-center">
              <Text className="text-lg font-bold text-gray-800">Pending Invitations</Text>
              <TouchableOpacity onPress={() => Alert.alert("All Invitations", "View all your invitations")}>
                <Text className="text-blue-600 font-semibold">See all ({networkStats.invitations})</Text>
              </TouchableOpacity>
            </View>
            
            {/* Invitation Items */}
            {invitations.map((person, index) => (
              <View key={person.id} className={`px-5 py-4 ${index !== invitations.length - 1 ? 'border-b border-gray-100' : ''}`}>
                <View className="flex-row">
                  <Image 
                    source={{ uri: person.avatar }} 
                    className="h-16 w-16 rounded-full border border-gray-200"
                  />
                  <View className="ml-3 flex-1 justify-center">
                    <Text className="font-bold text-gray-800 text-base">{person.name}</Text>
                    <Text className="text-gray-600 text-sm">{person.title}</Text>
                    
                    <View className="flex-row items-center mt-1">
                      <MapPin size={14} color="#6B7280" />
                      <Text className="text-gray-500 text-xs ml-1">{person.location}</Text>
                    </View>
                    
                    <View className="flex-row items-center mt-1">
                      <Users size={14} color="#6B7280" />
                      <Text className="text-gray-500 text-xs ml-1">{person.mutual} mutual connections</Text>
                    </View>
                  </View>
                </View>
                
                <View className="flex-row mt-3 justify-end">
                  <TouchableOpacity 
                    className="bg-white border border-gray-300 rounded-full px-5 py-2 mr-3 flex-row items-center"
                    onPress={() => handleIgnoreInvitation(person.id)}
                  >
                    <X size={16} color="#4B5563" />
                    <Text className="ml-1 font-medium text-gray-700">Ignore</Text>
                  </TouchableOpacity>
                  <TouchableOpacity 
                    className="bg-blue-600 rounded-full px-5 py-2 flex-row items-center"
                    onPress={() => handleAcceptInvitation(person.id)}
                  >
                    <Check size={16} color="#ffffff" />
                    <Text className="ml-1 font-medium text-white">Accept</Text>
                  </TouchableOpacity>
                </View>
              </View>
            ))}
          </View>
        )}
        
        {/* Upcoming Events */}
        <View className="mx-4 mt-5 bg-white rounded-xl shadow-sm overflow-hidden">
          <View className="px-5 py-4 border-b border-gray-100 flex-row justify-between items-center">
            <Text className="text-lg font-bold text-gray-800">Upcoming Events</Text>
            <TouchableOpacity onPress={() => Alert.alert("Events", "View all events")}>
              <Text className="text-blue-600 font-semibold">See all</Text>
            </TouchableOpacity>
          </View>
          
          <View className="px-5 py-4 border-b border-gray-100">
            <View className="flex-row">
              <View className="bg-blue-50 p-3 rounded-lg">
                <Calendar size={24} color="#0A66C2" />
              </View>
              <View className="ml-3 flex-1">
                <Text className="font-bold text-gray-800">Tech Networking Mixer</Text>
                <Text className="text-gray-600 text-sm">Thursday, 7:00 PM - 9:00 PM</Text>
                <Text className="text-gray-500 text-xs mt-1">28 connections attending</Text>
                
                <TouchableOpacity 
                  className="bg-blue-600 rounded-full px-4 py-2 mt-3 w-32 flex-row items-center justify-center"
                  onPress={() => Alert.alert("RSVP", "You've registered for this event!")}
                >
                  <Text className="text-white font-semibold">RSVP</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
          
          <View className="px-5 py-4">
            <View className="flex-row">
              <View className="bg-blue-50 p-3 rounded-lg">
                <Calendar size={24} color="#0A66C2" />
              </View>
              <View className="ml-3 flex-1">
                <Text className="font-bold text-gray-800">Product Management Workshop</Text>
                <Text className="text-gray-600 text-sm">Saturday, 10:00 AM - 2:00 PM</Text>
                <Text className="text-gray-500 text-xs mt-1">42 connections attending</Text>
                
                <TouchableOpacity 
                  className="bg-blue-600 rounded-full px-4 py-2 mt-3 w-32 flex-row items-center justify-center"
                  onPress={() => Alert.alert("RSVP", "You've registered for this event!")}
                >
                  <Text className="text-white font-semibold">RSVP</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
        
        {/* People You May Know */}
        <View className="mt-5 pb-6">
          <View className="px-5 mb-3 flex-row justify-between items-center">
            <Text className="text-lg font-bold text-gray-800">People you may know</Text>
            <TouchableOpacity onPress={() => Alert.alert("Recommendations", "View all recommendations")}>
              <Text className="text-blue-600 font-semibold">See all</Text>
            </TouchableOpacity>
          </View>
          
          <ScrollView 
            horizontal 
            showsHorizontalScrollIndicator={false} 
            contentContainerStyle={{ paddingLeft: 16, paddingRight: 8 }}
          >
            {recommendations.map((person) => (
              <View key={person.id} className="mr-4 w-64 bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm">
                <View className="h-24 bg-gradient-to-r from-blue-500 to-blue-600" />
                
                <View className="px-4 -mt-12 pb-4">
                  <Image 
                    source={{ uri: person.avatar }} 
                    className="h-20 w-20 rounded-full border-4 border-white bg-white"
                  />
                  
                  <Text className="font-bold text-gray-800 text-lg mt-2">{person.name}</Text>
                  <Text className="text-gray-600 text-sm">{person.title}</Text>
                  
                  <View className="flex-row items-center mt-2">
                    <Briefcase size={14} color="#6B7280" />
                    <Text className="text-gray-500 text-xs ml-1">{person.company}</Text>
                  </View>
                  
                  <View className="flex-row items-center mt-1">
                    <Users size={14} color="#6B7280" />
                    <Text className="text-gray-500 text-xs ml-1">{person.mutual} mutual connections</Text>
                  </View>
                  
                  <TouchableOpacity 
                    className="bg-white border border-blue-600 rounded-full px-4 py-2 mt-3 flex-row items-center justify-center"
                    onPress={() => handleSendConnection(person.id)}
                  >
                    <Plus size={16} color="#0A66C2" />
                    <Text className="ml-1 text-blue-600 font-semibold">Connect</Text>
                  </TouchableOpacity>
                </View>
              </View>
            ))}
          </ScrollView>
        </View>
        
        {/* Learning Section */}
        <View className="mx-4 mb-5 bg-white rounded-xl shadow-sm overflow-hidden">
          <View className="px-5 py-4 border-b border-gray-100 flex-row justify-between items-center">
            <Text className="text-lg font-bold text-gray-800">Learning & Development</Text>
            <TouchableOpacity onPress={() => Alert.alert("Learning", "View all courses")}>
              <Text className="text-blue-600 font-semibold">See all</Text>
            </TouchableOpacity>
          </View>
          
          <View className="px-5 py-4 border-b border-gray-100">
            <View className="flex-row">
              <View className="bg-blue-50 p-3 rounded-lg">
                <BookOpen size={24} color="#0A66C2" />
              </View>
              <View className="ml-3 flex-1">
                <Text className="font-bold text-gray-800">Advanced React Native Development</Text>
                <Text className="text-gray-600 text-sm">12 modules • 8 hours</Text>
                <View className="flex-row items-center mt-1">
                  <Star size={14} color="#F59E0B" fill="#F59E0B" />
                  <Star size={14} color="#F59E0B" fill="#F59E0B" />
                  <Star size={14} color="#F59E0B" fill="#F59E0B" />
                  <Star size={14} color="#F59E0B" fill="#F59E0B" />
                  <Star size={14} color="#F59E0B" />
                  <Text className="text-gray-500 text-xs ml-1">(4.8) • 2,456 learners</Text>
                </View>
              </View>
            </View>
          </View>
          
          <View className="px-5 py-4">
            <View className="flex-row">
              <View className="bg-blue-50 p-3 rounded-lg">
                <BookOpen size={24} color="#0A66C2" />
              </View>
              <View className="ml-3 flex-1">
                <Text className="font-bold text-gray-800">UI/UX Design Fundamentals</Text>
                <Text className="text-gray-600 text-sm">8 modules • 6 hours</Text>
                <View className="flex-row items-center mt-1">
                  <Star size={14} color="#F59E0B" fill="#F59E0B" />
                  <Star size={14} color="#F59E0B" fill="#F59E0B" />
                  <Star size={14} color="#F59E0B" fill="#F59E0B" />
                  <Star size={14} color="#F59E0B" fill="#F59E0B" />
                  <Star size={14} color="#F59E0B" fill="#F59E0B" />
                  <Text className="text-gray-500 text-xs ml-1">(4.9) • 3,782 learners</Text>
                </View>
              </View>
            </View>
          </View>
        </View>
        
        {/* Industry Connections */}
        <View className="mx-4 mb-6 bg-white rounded-xl shadow-sm overflow-hidden">
          <View className="px-5 py-4 border-b border-gray-100">
            <Text className="text-lg font-bold text-gray-800">Grow your network</Text>
            <Text className="text-sm text-gray-500 mt-1">Connect with people in your industry</Text>
          </View>
          
          {[
            { name: "Technology", count: 1250 },
            { name: "Marketing", count: 876 },
            { name: "Design", count: 543 },
            { name: "Finance", count: 329 }
          ].map((industry, index) => (
            <TouchableOpacity 
              key={index} 
              className={`px-5 py-4 ${index !== 3 ? 'border-b border-gray-100' : ''} flex-row justify-between items-center`}
              onPress={() => Alert.alert(industry.name, `View ${industry.name} professionals`)}
            >
              <View className="flex-row items-center">
                <View className="bg-blue-50 p-2 rounded-lg">
                  <Briefcase size={20} color="#0A66C2" />
                </View>
                <View className="ml-3">
                  <Text className="font-medium text-gray-800">{industry.name}</Text>
                  <Text className="text-gray-500 text-xs">{industry.count}+ professionals</Text>
                </View>
              </View>
              <ChevronRight size={20} color="#6B7280" />
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default NetworkScreen;