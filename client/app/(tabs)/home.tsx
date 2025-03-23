import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity, FlatList, Modal, TextInput, ScrollView, SafeAreaView } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { Feather } from '@expo/vector-icons';

// Make sure to install:
// npm install nativewind
// npm install tailwindcss --save-dev
// npx tailwindcss init

const initialPosts = [
  {
    id: '1',
    author: {
      name: 'Mia Johnson',
      avatar: 'https://randomuser.me/api/portraits/women/8.jpg',
      handle: '@miajohnson'
    },
    content: 'Just completed my latest project using React Native and NativeWind. The development experience was amazing!',
    timestamp: '34m ago',
    likes: 42,
    comments: 7,
    isLiked: false
  },
  {
    id: '2',
    author: {
      name: 'Alex Chen',
      avatar: 'https://randomuser.me/api/portraits/men/22.jpg',
      handle: '@alexchendev'
    },
    content: 'Who else is attending the React Native Summit next month? Looking forward to connecting with fellow developers!',
    timestamp: '2h ago',
    likes: 89,
    comments: 24,
    isLiked: false
  },
  {
    id: '3',
    author: {
      name: 'Sarah Miller',
      avatar: 'https://randomuser.me/api/portraits/women/44.jpg',
      handle: '@sarahcodes'
    },
    content: 'Hot take: Tailwind CSS is the best styling approach for modern web and mobile development. Change my mind.',
    timestamp: '5h ago',
    likes: 156,
    comments: 47,
    isLiked: true
  },
];

const HomeScreen = () => {
  const [posts, setPosts] = useState(initialPosts);
  const [profileModalVisible, setProfileModalVisible] = useState(false);
  const [chatModalVisible, setChatModalVisible] = useState(false);
  const [newPostModalVisible, setNewPostModalVisible] = useState(false);
  const [newPostContent, setNewPostContent] = useState('');
  const [activeTab, setActiveTab] = useState('following');

  const toggleLike = (postId) => {
    setPosts(posts.map(post => {
      if (post.id === postId) {
        return {
          ...post,
          likes: post.isLiked ? post.likes - 1 : post.likes + 1,
          isLiked: !post.isLiked
        };
      }
      return post;
    }));
  };

  const addNewPost = () => {
    if (newPostContent.trim() === '') return;
    
    const newPost = {
      id: (posts.length + 1).toString(),
      author: {
        name: 'You',
        avatar: 'https://randomuser.me/api/portraits/men/85.jpg',
        handle: '@yourusername'
      },
      content: newPostContent,
      timestamp: 'Just now',
      likes: 0,
      comments: 0,
      isLiked: false
    };
    
    setPosts([newPost, ...posts]);
    setNewPostContent('');
    setNewPostModalVisible(false);
  };

  const renderPost = ({ item }) => (
    <View className="bg-white mb-3 p-4 rounded-xl">
      <View className="flex-row mb-3">
        <Image 
          source={{ uri: item.author.avatar }} 
          className="w-12 h-12 rounded-full" 
        />
        <View className="ml-3 flex-1">
          <View className="flex-row items-center justify-between">
            <Text className="font-bold text-gray-800 text-base">{item.author.name}</Text>
            <TouchableOpacity>
              <Feather name="more-horizontal" size={20} color="#9CA3AF" />
            </TouchableOpacity>
          </View>
          <Text className="text-gray-500 text-sm">{item.author.handle} • {item.timestamp}</Text>
        </View>
      </View>
      
      <Text className="text-gray-800 text-base mb-4 leading-6">{item.content}</Text>
      
      <View className="flex-row justify-between border-t border-gray-100 pt-3">
        <TouchableOpacity 
          className="flex-row items-center" 
          onPress={() => toggleLike(item.id)}
        >
          <Feather 
            name={item.isLiked ? "heart" : "heart"} 
            size={20} 
            color={item.isLiked ? "#F43F5E" : "#9CA3AF"} 
            style={item.isLiked ? {fontWeight: 'bold'} : {}}
          />
          <Text className={`ml-1 ${item.isLiked ? "text-pink-500" : "text-gray-500"}`}>
            {item.likes}
          </Text>
        </TouchableOpacity>
        
        <TouchableOpacity className="flex-row items-center">
          <Feather name="message-circle" size={20} color="#9CA3AF" />
          <Text className="ml-1 text-gray-500">{item.comments}</Text>
        </TouchableOpacity>
        
        <TouchableOpacity className="flex-row items-center">
          <Feather name="repeat" size={20} color="#9CA3AF" />
        </TouchableOpacity>
        
        <TouchableOpacity className="flex-row items-center">
          <Feather name="send" size={20} color="#9CA3AF" />
        </TouchableOpacity>
      </View>
    </View>
  );

  // Profile Modal
  const ProfileModal = () => (
    <Modal
      animationType="slide"
      transparent={true}
      visible={profileModalVisible}
      onRequestClose={() => setProfileModalVisible(false)}
    >
      <View className="flex-1 bg-gray-900/60">
        <View className="h-full w-3/4 bg-white">
          <SafeAreaView className="flex-1">
            <View className="p-5 border-b border-gray-200">
              <View className="flex-row justify-between items-center">
                <Text className="font-bold text-xl text-gray-800">Profile</Text>
                <TouchableOpacity onPress={() => setProfileModalVisible(false)}>
                  <Feather name="x" size={24} color="#111827" />
                </TouchableOpacity>
              </View>
            </View>
            
            <ScrollView className="flex-1 p-5">
              <View className="items-center mb-6">
                <Image 
                  source={{ uri: 'https://randomuser.me/api/portraits/men/85.jpg' }} 
                  className="w-24 h-24 rounded-full mb-4" 
                />
                <Text className="font-bold text-xl text-gray-800">Jamie Wilson</Text>
                <Text className="text-gray-500">@jamiewilson</Text>
                <View className="bg-gray-100 px-3 py-1 rounded-full mt-2">
                  <Text className="text-gray-600">Product Designer</Text>
                </View>
              </View>
              
              <View className="flex-row justify-between mb-6">
                <View className="items-center">
                  <Text className="font-bold text-lg text-gray-800">248</Text>
                  <Text className="text-gray-500">Posts</Text>
                </View>
                <View className="items-center">
                  <Text className="font-bold text-lg text-gray-800">1,843</Text>
                  <Text className="text-gray-500">Followers</Text>
                </View>
                <View className="items-center">
                  <Text className="font-bold text-lg text-gray-800">502</Text>
                  <Text className="text-gray-500">Following</Text>
                </View>
              </View>
              
              <View className="mb-6">
                <Text className="font-bold text-gray-800 mb-2">Bio</Text>
                <Text className="text-gray-600 leading-5">
                  Product designer based in San Francisco. Passionate about user experience and minimalist design aesthetics.
                </Text>
              </View>
              
              <TouchableOpacity className="bg-purple-600 py-3 rounded-lg items-center mb-4">
                <Text className="text-white font-bold">Edit Profile</Text>
              </TouchableOpacity>
              
              <View className="space-y-4">
                <TouchableOpacity className="flex-row items-center">
                  <Feather name="bookmark" size={20} color="#4B5563" />
                  <Text className="text-gray-700 ml-3">Saved Posts</Text>
                </TouchableOpacity>
                <TouchableOpacity className="flex-row items-center">
                  <Feather name="settings" size={20} color="#4B5563" />
                  <Text className="text-gray-700 ml-3">Settings</Text>
                </TouchableOpacity>
                <TouchableOpacity className="flex-row items-center">
                  <Feather name="help-circle" size={20} color="#4B5563" />
                  <Text className="text-gray-700 ml-3">Help Center</Text>
                </TouchableOpacity>
                <TouchableOpacity className="flex-row items-center mt-8">
                  <Feather name="log-out" size={20} color="#EF4444" />
                  <Text className="text-red-500 ml-3">Logout</Text>
                </TouchableOpacity>
              </View>
            </ScrollView>
          </SafeAreaView>
        </View>
      </View>
    </Modal>
  );

  // Chat Modal
  const ChatModal = () => (
    <Modal
      animationType="slide"
      transparent={false}
      visible={chatModalVisible}
      onRequestClose={() => setChatModalVisible(false)}
    >
      <SafeAreaView className="flex-1 bg-white">
        <View className="p-4 border-b border-gray-200 flex-row justify-between items-center">
          <TouchableOpacity onPress={() => setChatModalVisible(false)}>
            <Feather name="arrow-left" size={24} color="#111827" />
          </TouchableOpacity>
          <Text className="font-bold text-xl text-gray-800">Messages</Text>
          <TouchableOpacity>
            <Feather name="edit" size={24} color="#111827" />
          </TouchableOpacity>
        </View>
        
        <View className="p-4">
          <View className="bg-gray-100 rounded-full px-4 py-2 flex-row items-center mb-4">
            <Feather name="search" size={20} color="#9CA3AF" />
            <TextInput 
              placeholder="Search messages" 
              placeholderTextColor="#9CA3AF"
              className="ml-2 flex-1 text-gray-800"
            />
          </View>
        </View>
        
        <FlatList
          data={[
            { id: '1', name: 'Alex Chen', message: 'Hey, how\'s it going?', time: '2m ago', avatar: 'https://randomuser.me/api/portraits/men/22.jpg', unread: 2 },
            { id: '2', name: 'Sarah Miller', message: 'Thanks for the feedback!', time: '1h ago', avatar: 'https://randomuser.me/api/portraits/women/44.jpg', unread: 0 },
            { id: '3', name: 'Mia Johnson', message: 'Let\'s catch up this weekend', time: '3h ago', avatar: 'https://randomuser.me/api/portraits/women/8.jpg', unread: 0 },
          ]}
          keyExtractor={item => item.id}
          renderItem={({ item }) => (
            <TouchableOpacity className="p-4 flex-row items-center border-b border-gray-100">
              <View className="relative">
                <Image 
                  source={{ uri: item.avatar }}
                  className="w-14 h-14 rounded-full"
                />
                {item.unread > 0 && (
                  <View className="absolute top-0 right-0 bg-purple-600 w-5 h-5 rounded-full items-center justify-center">
                    <Text className="text-white text-xs font-bold">{item.unread}</Text>
                  </View>
                )}
              </View>
              <View className="ml-3 flex-1">
                <View className="flex-row justify-between">
                  <Text className="font-bold text-gray-800">{item.name}</Text>
                  <Text className="text-gray-500 text-sm">{item.time}</Text>
                </View>
                <Text 
                  className="text-gray-600"
                  numberOfLines={1}
                >
                  {item.message}
                </Text>
              </View>
            </TouchableOpacity>
          )}
        />
      </SafeAreaView>
    </Modal>
  );

  // New Post Modal
  const NewPostModal = () => (
    <Modal
      animationType="slide"
      transparent={false}
      visible={newPostModalVisible}
      onRequestClose={() => setNewPostModalVisible(false)}
    >
      <SafeAreaView className="flex-1 bg-white">
        <View className="p-4 border-b border-gray-200 flex-row justify-between items-center">
          <TouchableOpacity onPress={() => setNewPostModalVisible(false)}>
            <Text className="text-gray-500 font-medium">Cancel</Text>
          </TouchableOpacity>
          <Text className="font-bold text-xl text-gray-800">New Post</Text>
          <TouchableOpacity 
            onPress={addNewPost}
            disabled={newPostContent.trim() === ''}
          >
            <Text className={`font-medium ${newPostContent.trim() === '' ? 'text-purple-300' : 'text-purple-600'}`}>
              Post
            </Text>
          </TouchableOpacity>
        </View>
        
        <View className="p-4 flex-row">
          <Image 
            source={{ uri: 'https://randomuser.me/api/portraits/men/85.jpg' }}
            className="w-10 h-10 rounded-full"
          />
          <TextInput
            className="ml-3 flex-1 text-gray-800 text-base"
            placeholder="What's on your mind?"
            placeholderTextColor="#9CA3AF"
            multiline={true}
            value={newPostContent}
            onChangeText={setNewPostContent}
            autoFocus={true}
          />
        </View>
        
        <View className="p-4 mt-auto border-t border-gray-200">
          <View className="flex-row justify-between">
            <TouchableOpacity className="flex-row items-center">
              <Feather name="image" size={24} color="#9CA3AF" />
              <Text className="ml-2 text-gray-500">Media</Text>
            </TouchableOpacity>
            <TouchableOpacity className="flex-row items-center">
              <Feather name="link-2" size={24} color="#9CA3AF" />
              <Text className="ml-2 text-gray-500">Link</Text>
            </TouchableOpacity>
            <TouchableOpacity className="flex-row items-center">
              <Feather name="hash" size={24} color="#9CA3AF" />
              <Text className="ml-2 text-gray-500">Topic</Text>
            </TouchableOpacity>
          </View>
        </View>
      </SafeAreaView>
    </Modal>
  );

  return (
    <SafeAreaView className="flex-1 bg-gray-50">
      <StatusBar style="dark" />
      
      {/* Custom Header */}
      <View className="px-4 py-3 flex-row items-center justify-between bg-white">
        <TouchableOpacity onPress={() => setProfileModalVisible(true)}>
          <Image 
            source={{ uri: 'https://randomuser.me/api/portraits/men/85.jpg' }}
            className="w-10 h-10 rounded-full"
          />
        </TouchableOpacity>
        
        <Text className="font-bold text-xl text-purple-600">AlumSphere</Text>
        
        <TouchableOpacity onPress={() => setChatModalVisible(true)}>
          <View className="relative">
            <Feather name="message-square" size={24} color="#111827" />
            <View className="absolute -top-1 -right-1 bg-purple-600 w-4 h-4 rounded-full items-center justify-center">
              <Text className="text-white text-xs font-bold">2</Text>
            </View>
          </View>
        </TouchableOpacity>
      </View>
      
    
      
      {/* Post List */}
      <FlatList
        data={posts}
        renderItem={renderPost}
        keyExtractor={item => item.id}
        contentContainerStyle={{ padding: 12 }}
      />
      
      {/* Floating Action Button */}
      <TouchableOpacity 
        className="absolute bottom-6 right-6 bg-purple-600 w-14 h-14 rounded-full items-center justify-center shadow-lg"
        onPress={() => setNewPostModalVisible(true)}
      >
        <Feather name="plus" size={24} color="white" />
      </TouchableOpacity>
      
      {/* Modals */}
      <ProfileModal />
      <ChatModal />
      <NewPostModal />
    </SafeAreaView>
  );
};

export default HomeScreen;