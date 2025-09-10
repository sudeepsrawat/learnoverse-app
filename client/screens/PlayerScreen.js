import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import YoutubePlayer from 'react-native-youtube-iframe';

export default function PlayerScreen({ route }) {
  const { videoId, title } = route.params;
  const [playing, setPlaying] = useState(true);

  return (
    <View style={styles.container}>
      <Text numberOfLines={2} style={styles.title}>{title}</Text>
      <YoutubePlayer
        height={230}
        play={playing}
        videoId={videoId}
        onChangeState={state => {
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex:1, padding:10, backgroundColor:'#fff' },
  title: { fontSize:16, fontWeight:'600', marginBottom:10 }
});
