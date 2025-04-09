import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Image,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import * as Location from 'expo-location';
// import { useTheme } from '../context/ThemeContext';
// import { useTheme } from '../context/themeContext';
import { useTheme } from '@/context/ThemeContext';

const VIBE_TAGS = [
  'Lit 🔥',
  'Chill 😎',
  'Romantic 💕',
  'Foodie 🍽️',
  'Active 🏃',
  'Creative 🎨',
  'Music 🎵',
  'Study 📚',
];

export default function CreateVibeScreen({ navigation }) {
  const { theme } = useTheme();
  const [caption, setCaption] = useState('');
  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedTags, setSelectedTags] = useState([]);
  const [location, setLocation] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    (async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status === 'granted') {
        const location = await Location.getCurrentPositionAsync({});
        setLocation(location);
      }
    })();
  }, []);

  const pickImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    
    if (status !== 'granted') {
      alert('Sorry, we need camera roll permissions to make this work!');
      return;
    }

    const result = await ImagePicker.launchImagePickerAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 0.8,
    });

    if (!result.canceled) {
      setSelectedImage(result.assets[0].uri);
    }
  };

  const toggleTag = (tag) => {
    if (selectedTags.includes(tag)) {
      setSelectedTags(selectedTags.filter((t) => t !== tag));
    } else {
      setSelectedTags([...selectedTags, tag]);
    }
  };

  const handlePost = async () => {
    if (!selectedImage || !caption || selectedTags.length === 0) {
      alert('Please fill in all fields and select at least one tag');
      return;
    }

    setLoading(true);
    try {
      // TODO: Implement post creation logic
      // 1. Upload image to storage
      // 2. Create post in database with location, caption, tags
      // 3. Update vibe zones
      
      // For now, we'll just simulate a delay
      await new Promise((resolve) => setTimeout(resolve, 1000));
      
      navigation.navigate('Map');
    } catch (error) {
      console.error('Error creating post:', error);
      alert('Failed to create post. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView
      style={[styles.container, { backgroundColor: theme.colors.background }]}
      contentContainerStyle={styles.contentContainer}
    >
      <TouchableOpacity
        style={[styles.imagePickerContainer, { backgroundColor: theme.colors.surface }]}
        onPress={pickImage}
      >
        {selectedImage ? (
          <Image source={{ uri: selectedImage }} style={styles.selectedImage} />
        ) : (
          <Text style={[styles.imagePickerText, { color: theme.colors.textSecondary }]}>
            Tap to select an image
          </Text>
        )}
      </TouchableOpacity>

      <TextInput
        style={[styles.input, { backgroundColor: theme.colors.surface, color: theme.colors.text }]}
        placeholder="What's the vibe?"
        placeholderTextColor={theme.colors.textSecondary}
        value={caption}
        onChangeText={setCaption}
        multiline
      />

      <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>
        Select Vibe Tags
      </Text>
      
      <View style={styles.tagsContainer}>
        {VIBE_TAGS.map((tag) => (
          <TouchableOpacity
            key={tag}
            style={[
              styles.tag,
              {
                backgroundColor: selectedTags.includes(tag)
                  ? theme.colors.primary
                  : theme.colors.surface,
              },
            ]}
            onPress={() => toggleTag(tag)}
          >
            <Text
              style={[
                styles.tagText,
                {
                  color: selectedTags.includes(tag)
                    ? '#FFFFFF'
                    : theme.colors.textSecondary,
                },
              ]}
            >
              {tag}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <TouchableOpacity
        style={[
          styles.postButton,
          { backgroundColor: theme.colors.primary },
          loading && { opacity: 0.7 },
        ]}
        onPress={handlePost}
        disabled={loading}
      >
        {loading ? (
          <ActivityIndicator color="#FFFFFF" />
        ) : (
          <Text style={styles.postButtonText}>Post Vibe</Text>
        )}
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainer: {
    padding: 20,
  },
  imagePickerContainer: {
    width: '100%',
    height: 200,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
    overflow: 'hidden',
  },
  selectedImage: {
    width: '100%',
    height: '100%',
  },
  imagePickerText: {
    fontSize: 16,
  },
  input: {
    borderRadius: 8,
    padding: 12,
    marginBottom: 20,
    fontSize: 16,
    minHeight: 100,
    textAlignVertical: 'top',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  tagsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 20,
  },
  tag: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    marginRight: 8,
    marginBottom: 8,
  },
  tagText: {
    fontSize: 14,
  },
  postButton: {
    width: '100%',
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
  },
  postButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
}); 