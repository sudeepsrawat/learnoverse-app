import React, { useEffect, useState } from 'react';
import { View, Text, ActivityIndicator, FlatList, Image, TouchableOpacity, StyleSheet } from 'react-native';
import axios from 'axios';
import { SERVER_URL } from '../config';   // ✅ use auto-detected server URL

export default function ListScreen({ navigation }) {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get(`${SERVER_URL}/videos`)
      .then(res => setVideos(res.data))
      .catch(err => console.error("API Error:", err.message))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <FlatList
      data={videos}
      keyExtractor={item => item.videoId}
      renderItem={({ item }) => (
        <TouchableOpacity
          style={styles.item}
          onPress={() =>
            navigation.navigate('Player', {
              videoId: item.videoId,
              title: item.title
            })
          }
        >
          <Image
            source={{ uri: item.thumbnails?.medium?.url || item.thumbnails?.default?.url }}
            style={styles.thumb}
          />
          <View style={styles.meta}>
            <Text numberOfLines={2} style={styles.title}>
              {item.title || item.videoId}
            </Text>
            <Text style={styles.channel}>
              {item.channelTitle || ''}
            </Text>
          </View>
        </TouchableOpacity>
      )}
    />
  );
}

const styles = StyleSheet.create({
  center: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  item: { flexDirection: 'row', padding: 10, borderBottomWidth: 1, borderColor: '#eee' },
  thumb: { width: 120, height: 70, backgroundColor: '#ddd' },
  meta: { flex: 1, paddingLeft: 10, justifyContent: 'center' },
  title: { fontWeight: '600' },
  channel: { color: '#666', marginTop: 4 }
});
