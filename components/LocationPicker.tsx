import {
  StyleSheet,
  Text,
  View,
  Modal,
  Platform,
  TouchableOpacity,
  TextInput,
} from "react-native";
import React from "react";
import { WebView } from "react-native-webview";

interface LocationPickerProps {
  visible: boolean;
}

const LocationPicker = ({ visible }: LocationPickerProps) => {
  const generateMapHtml = (lat: number, lng: number) => {
    return `
      <!DOCTYPE html>
      <html>
        <head>
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <link rel="stylesheet" href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css" />
          <script src="https://unpkg.com/leaflet@1.9.4/dist/leaflet.js"></script>
          <style>
            * { margin: 0; padding: 0; }
            #map { height: 100vh; width: 100%; }
          </style>
        </head>
        <body>
          <div id="map"></div>
          <script>
            const map = L.map('map').setView([${lat}, ${lng}], 15);
            L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(map);
            const marker = L.marker([${lat}, ${lng}], { draggable: true }).addTo(map);
            
            marker.on('dragend', (e) => {
              const pos = marker.getLatLng();
              window.ReactNativeWebView.postMessage(JSON.stringify({
                type: 'location',
                latitude: pos.lat,
                longitude: pos.lng
              }));
            });
            
            map.on('click', (e) => {
              marker.setLatLng(e.latlng);
              window.ReactNativeWebView.postMessage(JSON.stringify({
                type: 'location',
                latitude: e.latlng.lat,
                longitude: e.latlng.lng
              }));
            });
          </script>
        </body>
      </html>
    `;
  };

  return (
    <Modal visible={visible} animationType="slide">
      <View style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity>
            <Text style={styles.closeBtn}>✕</Text>
          </TouchableOpacity>
          <Text style={styles.title}>Select Location</Text>
          <View style={{ width: 32 }} />
        </View>

        <View style={styles.searchBox}>
          <Text style={styles.searchIcon}>🔍</Text>
          <TextInput
            style={styles.searchInput}
            placeholder="Search places in Bengaluru..."
            placeholderTextColor="#999"
            // value={searchQuery}
            // onChangeText={handleSearch}
          />
        </View>

        {/* Map */}
        <WebView source={{ html: generateMapHtml(12.8452, 77.6602) }} />
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff" },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 16,
    paddingTop: Platform.OS === "ios" ? 50 : 16,
    backgroundColor: "#10b981",
  },
  closeBtn: { fontSize: 24, color: "#fff", fontWeight: "bold" },
  title: { fontSize: 18, fontWeight: "bold", color: "#fff" },
  searchBox: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f5f5f5",
    margin: 12,
    paddingHorizontal: 12,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#ddd",
  },
  searchIcon: { fontSize: 18, marginRight: 8 },
  searchInput: { flex: 1, paddingVertical: 12, fontSize: 16, color: "#000" },
  results: {
    maxHeight: 150,
    marginHorizontal: 12,
    marginBottom: 8,
    backgroundColor: "#fff",
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#ddd",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  resultItem: {
    flexDirection: "row",
    alignItems: "center",
    padding: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#f0f0f0",
  },
  resultIcon: { fontSize: 18, marginRight: 10 },
  resultText: { flex: 1, fontSize: 14, color: "#000" },
  map: { flex: 1, marginHorizontal: 12, borderRadius: 10, overflow: "hidden" },
  addressBox: {
    padding: 16,
    backgroundColor: "#f9f9f9",
    marginHorizontal: 12,
    marginTop: 8,
    borderRadius: 10,
  },
  addressLabel: { fontSize: 14, color: "#333", fontWeight: "500" },
  buttons: { flexDirection: "row", gap: 12, padding: 16 },
  btn: {
    flex: 1,
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: "center",
    backgroundColor: "#f0f0f0",
  },
  btnPrimary: { backgroundColor: "#10b981" },
  btnText: { fontSize: 16, color: "#333", fontWeight: "600" },
  btnPrimaryText: { color: "#fff" },
});

export default LocationPicker;
