// src/components/DataFilterScreen.tsx or App.tsx
import React, { useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Alert } from 'react-native';
// To implement actual file picking, you'd install and use:
// import * as DocumentPicker from 'expo-document-picker';

const DataFilterScreen: React.FC = () => {
  // State to potentially hold information about the selected file
  const [selectedFileInfo, setSelectedFileInfo] = useState<string | null>(null);

  const handleFilePick = async () => {
    // --- Placeholder for File Picking Logic ---
    // Here you would typically use expo-document-picker
    // Example (needs expo-document-picker installed: expo install expo-document-picker):
    try {
      const result = await DocumentPicker.getDocumentAsync({
        type: '',
        copyToCacheDirectory: true, // Recommended for handling files
      });

      if (!result.canceled && result.assets && result.assets.length > 0) {
        const asset = result.assets[0];
        console.log('File picked:', asset.uri, asset.name, asset.mimeType, asset.size);
        // Update state or handle the file URI (asset.uri)
        setSelectedFileInfo(`Selected: ${asset.name} (${asset.size ? (asset.size / 1024).toFixed(2) : 'N/A'} KB)`);
        // You would likely pass the file URI (asset.uri) to an upload function here
      } else {
         console.log('File picking cancelled or failed');
         setSelectedFileInfo(null); // Clear info if cancelled
      }
    } catch (error) {
      console.error('Error picking document:', error);
      Alert.alert('Error', 'Could not pick the file.');
      setSelectedFileInfo(null); // Clear info on error
    }

    // Simple placeholder alert for now:
    Alert.alert(
      'File Drop/Pick',
      'This area should trigger a file picker. Implement using expo-document-picker.'
    );
    // Placeholder state update:
    setSelectedFileInfo('Placeholder: File picker would be opened.');
    // --- End of Placeholder ---
  };

  const handleCustomizeParams = () => {
    Alert.alert('Customize Parameters', 'Navigate or open modal for customization.');
    // Add navigation or modal logic here
  };

  const handleRunFiltering = () => {
    if (!selectedFileInfo || selectedFileInfo.startsWith('Placeholder')) {
       Alert.alert('Run Filtering', 'Please select a file first.');
    } else {
       Alert.alert('Run Filtering', 'Starting data filtering process...');
       // Add data filtering logic here, possibly using the selected file info
    }
  };

  return (
    <View style={styles.container}>
      {/* --- Drop Zone --- */}
      <TouchableOpacity style={styles.dropZone} onPress={handleFilePick} activeOpacity={0.7}>
        <Text style={styles.dropZoneText}>DROP IN FILES</Text>
      </TouchableOpacity>

      {/* --- Info Box --- */}
      <View style={styles.infoBox}>
        <Text style={styles.infoText}>
          {selectedFileInfo ?? 'Info on file type, size, possible devices, etc.'}
        </Text>
      </View>

      {/* --- Buttons --- */}
      <TouchableOpacity
        style={[styles.button, styles.customizeButton]}
        onPress={handleCustomizeParams}
        activeOpacity={0.8}
      >
        <Text style={styles.buttonText}>Customize parameters for filtering</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.button, styles.runButton]}
        onPress={handleRunFiltering}
        activeOpacity={0.8}
      >
        <Text style={styles.buttonText}>Run data filtering →</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#808080', // Gray background
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  dropZone: {
    width: '90%', // Make it wide
    paddingVertical: 60, // Make it tall
    paddingHorizontal: 20,
    backgroundColor: '#ADD8E6', // Light blue background
    borderWidth: 1,
    borderColor: '#000000', // Black border
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 0, // No margin at the bottom, infoBox border touches
  },
  dropZoneText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000000', // Black text
    textAlign: 'center',
  },
  infoBox: {
    width: '90%', // Match drop zone width
    padding: 15,
    backgroundColor: '#FFFFFF', // White background
    borderWidth: 1,
    borderTopWidth: 0, // Remove top border to connect with dropzone visually
    borderColor: '#000000', // Black border
    marginBottom: 40, // Space before the buttons
    alignItems: 'center', // Center text horizontally
  },
  infoText: {
    fontSize: 14,
    color: '#333333', // Dark gray text
    textAlign: 'center',
  },
  button: {
    paddingVertical: 12,
    paddingHorizontal: 25,
    borderRadius: 20, // Rounded corners
    borderWidth: 1,
    borderColor: '#000000', // Black border
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20, // Space between buttons
    minWidth: '60%', // Ensure buttons have some minimum width
  },
  customizeButton: {
    backgroundColor: '#ADD8E6', // Light blue background
  },
  runButton: {
    backgroundColor: '#90EE90', // Light green background
  },
  buttonText: {
    fontSize: 16,
    color: '#000000', // Black text
    textAlign: 'center',
  },
});

export default DataFilterScreen; // Or export default App if this is your main App.tsx