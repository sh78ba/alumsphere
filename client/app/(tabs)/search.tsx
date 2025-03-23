import React, { useState, useEffect } from 'react';
import { 
  View, 
  Text, 
  TextInput, 
  FlatList, 
  TouchableOpacity, 
  Image, 
  Modal, 
  ScrollView,
  SafeAreaView 
} from 'react-native';
import { Feather } from '@expo/vector-icons';
import { StatusBar } from 'expo-status-bar';

// Generate 50 fake Indian profiles with company, role, branch and college info
const generateProfiles = () => {
  const firstNames = [
    'Aditya', 'Arjun', 'Aarav', 'Ananya', 'Diya', 'Ishaan', 'Kavya', 'Neha', 
    'Priya', 'Rahul', 'Riya', 'Rohan', 'Sanya', 'Tanvi', 'Vihaan', 'Zara',
    'Arnav', 'Anika', 'Aryan', 'Advait', 'Dhruv', 'Ishita', 'Kabir', 'Kiara',
    'Meera', 'Neel', 'Avni', 'Vedant', 'Aisha', 'Vivaan'
  ];
  
  const lastNames = [
    'Sharma', 'Patel', 'Singh', 'Kumar', 'Agarwal', 'Gupta', 'Joshi', 'Reddy', 
    'Nair', 'Mehta', 'Chatterjee', 'Verma', 'Iyer', 'Malhotra', 'Das', 'Rao',
    'Chowdhury', 'Mukherjee', 'Shah', 'Trivedi', 'Desai', 'Menon', 'Saxena', 'Bose',
    'Kapoor', 'Banerjee', 'Tiwari', 'Sethi', 'Khanna', 'Bhatia'
  ];
  
  const companies = [
    'Google', 'Microsoft', 'Amazon', 'Flipkart', 'Uber', 'Swiggy', 'Zomato', 'Infosys', 
    'TCS', 'Wipro', 'IBM', 'Adobe', 'Apple', 'Meta', 'Twitter', 'Paytm', 'Ola', 'PhonePe',
    'Accenture', 'Deloitte', 'KPMG', 'EY', 'Goldman Sachs', 'JP Morgan', 'Morgan Stanley',
    'Razorpay', 'CRED', 'Myntra', 'PayPal', 'Intuit', 'Walmart Labs', 'Oracle', 'SAP',
    'Dell', 'Intel', 'AMD', 'Nvidia', 'Qualcomm', 'Cisco', 'Samsung', 'HCL', 'L&T Infotech'
  ];
  
  const roles = [
    'Software Engineer', 'SDE', 'Full Stack Developer', 'Frontend Developer', 
    'Backend Developer', 'Data Scientist', 'ML Engineer', 'DevOps Engineer', 
    'Android Developer', 'iOS Developer', 'UI/UX Designer', 'Product Manager', 
    'QA Engineer', 'Cloud Engineer', 'Systems Engineer'
  ];
  
  const branches = [
    'CSE', 'ECE', 'EE', 'Civil', 'Mechanical', 'Chemical', 'IT', 'Aerospace'
  ];
  
  const nits = [
    'NIT Warangal', 'NIT Trichy', 'NIT Surathkal', 'NIT Rourkela', 'NIT Calicut',
    'NIT Allahabad', 'NIT Durgapur', 'NIT Jaipur', 'NIT Kurukshetra', 'NIT Silchar',
    'NIT Hamirpur', 'NIT Jalandhar', 'NIT Srinagar', 'NIT Manipur', 'NIT Meghalaya',
    'NIT Nagaland', 'NIT Patna', 'NIT Delhi', 'NIT Goa', 'NIT Puducherry',
    'NIT Sikkim', 'NIT Arunachal Pradesh', 'NIT Mizoram', 'NIT Uttarakhand', 'NIT Andhra Pradesh'
  ];
  
  const years = [2019, 2020, 2021, 2022, 2023];
  
  const profiles = [];
  
  // Generate 50 random profiles
  for (let i = 1; i <= 50; i++) {
    const firstName = firstNames[Math.floor(Math.random() * firstNames.length)];
    const lastName = lastNames[Math.floor(Math.random() * lastNames.length)];
    const company = companies[Math.floor(Math.random() * companies.length)];
    const role = roles[Math.floor(Math.random() * roles.length)];
    const branch = branches[Math.floor(Math.random() * branches.length)];
    const college = nits[Math.floor(Math.random() * nits.length)];
    const year = years[Math.floor(Math.random() * years.length)];
    const gender = Math.random() > 0.5 ? 'men' : 'women';
    const avatarNumber = Math.floor(Math.random() * 70) + 1;
    
    profiles.push({
      id: i.toString(),
      name: `${firstName} ${lastName}`,
      role: role,
      company: company,
      branch: branch,
      college: college,
      graduationYear: year,
      connections: Math.floor(Math.random() * 900) + 100,
      avatar: `https://randomuser.me/api/portraits/${gender}/${avatarNumber}.jpg`,
      bio: `${role} at ${company} | ${branch} graduate from ${college} | Batch of ${year}`,
      skills: ['React Native', 'JavaScript', 'TypeScript', 'Node.js', 'Python', 'Java'].sort(() => 0.5 - Math.random()).slice(0, 3 + Math.floor(Math.random() * 4))
    });
  }
  
  return profiles;
};

const PROFILES = generateProfiles();

const SearchScreen = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredProfiles, setFilteredProfiles] = useState(PROFILES);
  const [filterModalVisible, setFilterModalVisible] = useState(false);
  const [sortModalVisible, setSortModalVisible] = useState(false);
  const [activeProfile, setActiveProfile] = useState(null);
  const [profileModalVisible, setProfileModalVisible] = useState(false);
  
  // Filter state
  const [filters, setFilters] = useState({
    branch: [],
    college: [],
    year: [],
    company: [],
    role: []
  });
  
  // Sort option
  const [sortOption, setSortOption] = useState('relevance');
  
  // Get unique options for each filter
  const filterOptions = {
    branch: [...new Set(PROFILES.map(profile => profile.branch))],
    college: [...new Set(PROFILES.map(profile => profile.college))],
    year: [...new Set(PROFILES.map(profile => profile.graduationYear))].sort(),
    company: [...new Set(PROFILES.map(profile => profile.company))],
    role: [...new Set(PROFILES.map(profile => profile.role))]
  };

  // Apply search and filters
  useEffect(() => {
    let results = PROFILES;
    
    // Apply search
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      results = results.filter(profile => 
        profile.name.toLowerCase().includes(query) ||
        profile.company.toLowerCase().includes(query) ||
        profile.role.toLowerCase().includes(query) ||
        profile.college.toLowerCase().includes(query) ||
        profile.branch.toLowerCase().includes(query) ||
        profile.bio.toLowerCase().includes(query)
      );
    }
    
    // Apply filters
    Object.keys(filters).forEach(key => {
      if (filters[key].length > 0) {
        if (key === 'year') {
          results = results.filter(profile => 
            filters[key].includes(profile.graduationYear)
          );
        } else {
          results = results.filter(profile => 
            filters[key].includes(profile[key])
          );
        }
      }
    });
    
    // Apply sorting
    if (sortOption === 'name') {
      results = [...results].sort((a, b) => a.name.localeCompare(b.name));
    } else if (sortOption === 'company') {
      results = [...results].sort((a, b) => a.company.localeCompare(b.company));
    } else if (sortOption === 'connections') {
      results = [...results].sort((a, b) => b.connections - a.connections);
    } else if (sortOption === 'year') {
      results = [...results].sort((a, b) => b.graduationYear - a.graduationYear);
    }
    
    setFilteredProfiles(results);
  }, [searchQuery, filters, sortOption]);

  const toggleFilter = (type, value) => {
    setFilters(prev => {
      const newFilters = { ...prev };
      
      if (newFilters[type].includes(value)) {
        newFilters[type] = newFilters[type].filter(item => item !== value);
      } else {
        newFilters[type] = [...newFilters[type], value];
      }
      
      return newFilters;
    });
  };
  
  const clearFilters = () => {
    setFilters({
      branch: [],
      college: [],
      year: [],
      company: [],
      role: []
    });
  };
  
  const getActiveFilterCount = () => {
    return Object.values(filters).reduce((count, filterArray) => count + filterArray.length, 0);
  };
  
  const openProfileModal = (profile) => {
    setActiveProfile(profile);
    setProfileModalVisible(true);
  };

  const renderProfileItem = ({ item }) => (
    <TouchableOpacity 
      className="bg-white p-4 mb-3 rounded-xl"
      onPress={() => openProfileModal(item)}
    >
      <View className="flex-row">
        <Image 
          source={{ uri: item.avatar }} 
          className="w-16 h-16 rounded-full" 
        />
        <View className="ml-3 flex-1">
          <Text className="font-bold text-gray-800 text-lg">{item.name}</Text>
          <Text className="text-purple-600">{item.role} at {item.company}</Text>
          <Text className="text-gray-500 text-sm">{item.college} • {item.branch}</Text>
          <Text className="text-gray-400 text-xs">Class of {item.graduationYear} • {item.connections} connections</Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  // Filter Modal
  const FilterModal = () => (
    <Modal
      animationType="slide"
      transparent={true}
      visible={filterModalVisible}
      onRequestClose={() => setFilterModalVisible(false)}
    >
      <View className="flex-1 bg-gray-900/60">
        <View className="h-full mt-20 bg-white rounded-t-3xl">
          <View className="p-4 border-b border-gray-200">
            <View className="flex-row justify-between items-center">
              <TouchableOpacity onPress={() => setFilterModalVisible(false)}>
                <Text className="text-gray-500">Cancel</Text>
              </TouchableOpacity>
              <Text className="font-bold text-xl text-gray-800">Filters</Text>
              <TouchableOpacity onPress={clearFilters}>
                <Text className="text-purple-600">Clear All</Text>
              </TouchableOpacity>
            </View>
          </View>
          
          <ScrollView className="p-4">
            {/* Branch Filter */}
            <View className="mb-6">
              <Text className="font-bold text-lg text-gray-800 mb-3">Branch</Text>
              <View className="flex-row flex-wrap">
                {filterOptions.branch.map(branch => (
                  <TouchableOpacity 
                    key={branch}
                    className={`px-3 py-2 rounded-full mr-2 mb-2 ${filters.branch.includes(branch) ? 'bg-purple-600' : 'bg-gray-100'}`}
                    onPress={() => toggleFilter('branch', branch)}
                  >
                    <Text className={filters.branch.includes(branch) ? 'text-white' : 'text-gray-700'}>
                      {branch}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>
            
            {/* College Filter */}
            <View className="mb-6">
              <Text className="font-bold text-lg text-gray-800 mb-3">College</Text>
              <View className="flex-row flex-wrap">
                {filterOptions.college.map(college => (
                  <TouchableOpacity 
                    key={college}
                    className={`px-3 py-2 rounded-full mr-2 mb-2 ${filters.college.includes(college) ? 'bg-purple-600' : 'bg-gray-100'}`}
                    onPress={() => toggleFilter('college', college)}
                  >
                    <Text className={filters.college.includes(college) ? 'text-white' : 'text-gray-700'} numberOfLines={1}>
                      {college}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>
            
            {/* Year Filter */}
            <View className="mb-6">
              <Text className="font-bold text-lg text-gray-800 mb-3">Graduation Year</Text>
              <View className="flex-row flex-wrap">
                {filterOptions.year.map(year => (
                  <TouchableOpacity 
                    key={year}
                    className={`px-3 py-2 rounded-full mr-2 mb-2 ${filters.year.includes(year) ? 'bg-purple-600' : 'bg-gray-100'}`}
                    onPress={() => toggleFilter('year', year)}
                  >
                    <Text className={filters.year.includes(year) ? 'text-white' : 'text-gray-700'}>
                      {year}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>
            
            {/* Company Filter */}
            <View className="mb-6">
              <Text className="font-bold text-lg text-gray-800 mb-3">Company</Text>
              <View className="flex-row flex-wrap">
                {filterOptions.company.slice(0, 15).map(company => (
                  <TouchableOpacity 
                    key={company}
                    className={`px-3 py-2 rounded-full mr-2 mb-2 ${filters.company.includes(company) ? 'bg-purple-600' : 'bg-gray-100'}`}
                    onPress={() => toggleFilter('company', company)}
                  >
                    <Text className={filters.company.includes(company) ? 'text-white' : 'text-gray-700'}>
                      {company}
                    </Text>
                  </TouchableOpacity>
                ))}
                <TouchableOpacity className="px-3 py-2 rounded-full mr-2 mb-2 bg-gray-100">
                  <Text className="text-purple-600">+ More</Text>
                </TouchableOpacity>
              </View>
            </View>
            
            {/* Role Filter */}
            <View className="mb-6">
              <Text className="font-bold text-lg text-gray-800 mb-3">Role</Text>
              <View className="flex-row flex-wrap">
                {filterOptions.role.map(role => (
                  <TouchableOpacity 
                    key={role}
                    className={`px-3 py-2 rounded-full mr-2 mb-2 ${filters.role.includes(role) ? 'bg-purple-600' : 'bg-gray-100'}`}
                    onPress={() => toggleFilter('role', role)}
                  >
                    <Text className={filters.role.includes(role) ? 'text-white' : 'text-gray-700'}>
                      {role}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>
          </ScrollView>
          
          <View className="p-4 border-t border-gray-200">
            <TouchableOpacity 
              className="bg-purple-600 p-3 rounded-xl items-center"
              onPress={() => setFilterModalVisible(false)}
            >
              <Text className="text-white font-bold text-lg">Apply Filters</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );

  // Sort Modal
  const SortModal = () => (
    <Modal
      animationType="slide"
      transparent={true}
      visible={sortModalVisible}
      onRequestClose={() => setSortModalVisible(false)}
    >
      <View className="flex-1 bg-gray-900/60">
        <View className="h-1/2 mt-auto bg-white rounded-t-3xl">
          <View className="p-4 border-b border-gray-200">
            <View className="flex-row justify-between items-center">
              <TouchableOpacity onPress={() => setSortModalVisible(false)}>
                <Text className="text-gray-500">Cancel</Text>
              </TouchableOpacity>
              <Text className="font-bold text-xl text-gray-800">Sort By</Text>
              <TouchableOpacity>
                <Text className="text-white">Done</Text>
              </TouchableOpacity>
            </View>
          </View>
          
          <View className="p-4">
            <TouchableOpacity 
              className="py-3 border-b border-gray-100 flex-row justify-between items-center"
              onPress={() => {
                setSortOption('relevance');
                setSortModalVisible(false);
              }}
            >
              <Text className="text-lg text-gray-800">Relevance</Text>
              {sortOption === 'relevance' && <Feather name="check" size={20} color="#8B5CF6" />}
            </TouchableOpacity>
            
            <TouchableOpacity 
              className="py-3 border-b border-gray-100 flex-row justify-between items-center"
              onPress={() => {
                setSortOption('name');
                setSortModalVisible(false);
              }}
            >
              <Text className="text-lg text-gray-800">Name</Text>
              {sortOption === 'name' && <Feather name="check" size={20} color="#8B5CF6" />}
            </TouchableOpacity>
            
            <TouchableOpacity 
              className="py-3 border-b border-gray-100 flex-row justify-between items-center"
              onPress={() => {
                setSortOption('company');
                setSortModalVisible(false);
              }}
            >
              <Text className="text-lg text-gray-800">Company</Text>
              {sortOption === 'company' && <Feather name="check" size={20} color="#8B5CF6" />}
            </TouchableOpacity>
            
            <TouchableOpacity 
              className="py-3 border-b border-gray-100 flex-row justify-between items-center"
              onPress={() => {
                setSortOption('connections');
                setSortModalVisible(false);
              }}
            >
              <Text className="text-lg text-gray-800">Connections</Text>
              {sortOption === 'connections' && <Feather name="check" size={20} color="#8B5CF6" />}
            </TouchableOpacity>
            
            <TouchableOpacity 
              className="py-3 flex-row justify-between items-center"
              onPress={() => {
                setSortOption('year');
                setSortModalVisible(false);
              }}
            >
              <Text className="text-lg text-gray-800">Graduation Year</Text>
              {sortOption === 'year' && <Feather name="check" size={20} color="#8B5CF6" />}
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );

  // Profile Modal
  const ProfileModal = () => {
    if (!activeProfile) return null;
    
    return (
      <Modal
        animationType="slide"
        transparent={false}
        visible={profileModalVisible}
        onRequestClose={() => setProfileModalVisible(false)}
      >
        <SafeAreaView className="flex-1 bg-white">
          <View className="p-4 border-b border-gray-200 flex-row items-center">
            <TouchableOpacity onPress={() => setProfileModalVisible(false)}>
              <Feather name="arrow-left" size={24} color="#111827" />
            </TouchableOpacity>
            <Text className="font-bold text-xl text-gray-800 ml-4">Profile</Text>
          </View>
          
          <ScrollView>
            {/* Cover Photo */}
            <View className="h-32 bg-purple-100" />
            
            {/* Profile Info */}
            <View className="px-4 pb-4">
              <View className="flex-row justify-between items-end -mt-16">
                <Image 
                  source={{ uri: activeProfile.avatar }} 
                  className="w-28 h-28 rounded-full border-4 border-white" 
                />
                <View className="flex-row">
                  <TouchableOpacity className="bg-gray-100 p-2 rounded-full mr-2">
                    <Feather name="message-circle" size={20} color="#111827" />
                  </TouchableOpacity>
                  <TouchableOpacity className="bg-purple-600 p-2 rounded-full">
                    <Feather name="user-plus" size={20} color="white" />
                  </TouchableOpacity>
                </View>
              </View>
              
              <Text className="font-bold text-2xl text-gray-800 mt-3">{activeProfile.name}</Text>
              <Text className="text-purple-600 text-lg">{activeProfile.role} at {activeProfile.company}</Text>
              <Text className="text-gray-500">{activeProfile.college} • {activeProfile.branch}</Text>
              <Text className="text-gray-400 text-sm">Class of {activeProfile.graduationYear} • {activeProfile.connections} connections</Text>
              
              <View className="flex-row mt-4 mb-6">
                <TouchableOpacity className="bg-purple-600 px-4 py-2 rounded-lg mr-3">
                  <Text className="text-white font-bold">Connect</Text>
                </TouchableOpacity>
                <TouchableOpacity className="bg-gray-100 px-4 py-2 rounded-lg">
                  <Text className="text-gray-700">Message</Text>
                </TouchableOpacity>
              </View>
              
              <View className="border-t border-gray-200 pt-4 mb-6">
                <Text className="font-bold text-lg text-gray-800 mb-2">About</Text>
                <Text className="text-gray-600 leading-6">
                  {activeProfile.bio}
                </Text>
              </View>
              
              <View className="border-t border-gray-200 pt-4 mb-6">
                <Text className="font-bold text-lg text-gray-800 mb-2">Skills</Text>
                <View className="flex-row flex-wrap">
                  {activeProfile.skills.map((skill, index) => (
                    <View key={index} className="bg-gray-100 px-3 py-2 rounded-full mr-2 mb-2">
                      <Text className="text-gray-700">{skill}</Text>
                    </View>
                  ))}
                </View>
              </View>
              
              <View className="border-t border-gray-200 pt-4 mb-6">
                <Text className="font-bold text-lg text-gray-800 mb-2">Education</Text>
                <View className="flex-row mb-2">
                  <View className="w-10 h-10 bg-gray-200 rounded-lg items-center justify-center mr-3">
                    <Feather name="book-open" size={20} color="#4B5563" />
                  </View>
                  <View>
                    <Text className="font-bold text-gray-800">{activeProfile.college}</Text>
                    <Text className="text-gray-600">{activeProfile.branch}, Class of {activeProfile.graduationYear}</Text>
                  </View>
                </View>
              </View>
              
              <View className="border-t border-gray-200 pt-4 mb-6">
                <Text className="font-bold text-lg text-gray-800 mb-2">Experience</Text>
                <View className="flex-row">
                  <View className="w-10 h-10 bg-gray-200 rounded-lg items-center justify-center mr-3">
                    <Feather name="briefcase" size={20} color="#4B5563" />
                  </View>
                  <View>
                    <Text className="font-bold text-gray-800">{activeProfile.company}</Text>
                    <Text className="text-gray-600">{activeProfile.role}</Text>
                    <Text className="text-gray-400 text-sm">2021 - Present</Text>
                  </View>
                </View>
              </View>
            </View>
          </ScrollView>
        </SafeAreaView>
      </Modal>
    );
  };

  return (
    <SafeAreaView className="flex-1 bg-gray-50">
      <StatusBar style="dark" />
      
      {/* Header */}
      <View className="p-4 bg-white border-b border-gray-200">
        <Text className="font-bold text-lg text-gray-800 mb-4">People Search</Text>
        
        {/* Search Bar */}
        <View className="flex-row items-center bg-gray-100 px-3 py-2 rounded-lg">
          <Feather name="search" size={20} color="#9CA3AF" />
          <TextInput
            className="flex-1 ml-2 text-gray-800"
            placeholder="Search by name, company, role..."
            placeholderTextColor="#9CA3AF"
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
          {searchQuery ? (
            <TouchableOpacity onPress={() => setSearchQuery('')}>
              <Feather name="x" size={20} color="#9CA3AF" />
            </TouchableOpacity>
          ) : null}
        </View>
        
        {/* Filter and Sort buttons */}
        <View className="flex-row mt-4">
          <TouchableOpacity 
            className="flex-1 flex-row items-center justify-center mr-2 py-2 rounded-lg bg-gray-100"
            onPress={() => setFilterModalVisible(true)}
          >
            <Feather name="filter" size={18} color={getActiveFilterCount() > 0 ? "#8B5CF6" : "#4B5563"} />
            <Text className={`ml-2 ${getActiveFilterCount() > 0 ? "text-purple-600 font-bold" : "text-gray-700"}`}>
              Filter
              {getActiveFilterCount() > 0 ? ` (${getActiveFilterCount()})` : ""}
            </Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            className="flex-1 flex-row items-center justify-center py-2 rounded-lg bg-gray-100"
            onPress={() => setSortModalVisible(true)}
          >
            <Feather name="sliders" size={18} color="#4B5563" />
            <Text className="ml-2 text-gray-700">Sort</Text>
          </TouchableOpacity>
        </View>
      </View>
      
      {/* Results Count */}
      <View className="p-4 flex-row justify-between items-center">
        <Text className="text-gray-700">
          {filteredProfiles.length} {filteredProfiles.length === 1 ? 'result' : 'results'} found
        </Text>
        
        {getActiveFilterCount() > 0 && (
          <TouchableOpacity onPress={clearFilters}>
            <Text className="text-purple-600">Clear filters</Text>
          </TouchableOpacity>
        )}
      </View>
      
      {/* Results List */}
      <FlatList
        data={filteredProfiles}
        renderItem={renderProfileItem}
        keyExtractor={item => item.id}
        contentContainerStyle={{ padding: 12 }}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <View className="p-6 items-center">
            <Feather name="search" size={48} color="#D1D5DB" />
            <Text className="text-gray-500 mt-3 text-center">No results found. Try adjusting your search or filters.</Text>
          </View>
        }
      />
      
      {/* Modals */}
      <FilterModal />
      <SortModal />
      <ProfileModal />
    </SafeAreaView>
  );
};

export default SearchScreen;