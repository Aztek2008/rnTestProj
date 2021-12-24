import React from 'react';
import {Platform, StyleSheet, Text, ScrollView, View} from 'react-native';

export const SystemInfo = () => {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.row}>
        <Text>OS</Text>
        <Text style={styles.value}>{Platform.OS}</Text>
      </View>
      <View style={styles.row}>
        <Text>OS Version</Text>
        <Text style={styles.value}>{Platform.Version}</Text>
      </View>

      {Platform.OS === 'android' && (
        <>
          <View style={styles.row}>
            <Text>Model</Text>
            <Text style={styles.value}>{Platform.constants.Model}</Text>
          </View>
          <View style={styles.row}>
            <Text>Brand</Text>
            <Text style={styles.value}>{Platform.constants.Brand}</Text>
          </View>
          <View style={styles.row}>
            <Text>UI</Text>
            <Text style={styles.value}>{Platform.constants.uiMode}</Text>
          </View>
          <View style={styles.row}>
            <Text>Serial</Text>
            <Text style={styles.value}>{Platform.constants.Serial}</Text>
          </View>
        </>
      )}

      {Platform.OS === 'ios' && (
        <View style={styles.row}>
          <Text>isPad</Text>
          <Text style={styles.value}>{Platform.isPad.toString()}</Text>
        </View>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  value: {
    fontWeight: '600',
    padding: 4,
    marginBottom: 8,
  },
  row: {
    flexDirection: 'row',
    width: '70%',
    height: 35,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});
