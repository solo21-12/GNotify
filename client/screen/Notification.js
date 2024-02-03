// NotificationsScreen.js
import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList } from 'react-native';

const NotificationsScreen = () => {
  const [notifications, setNotifications] = useState([
    { id: 1, messageText: 'New message 1', status: 'Unseen' },
    { id: 2, messageText: 'New message 2', status: 'Unseen' },
    { id: 3, messageText: 'New message 2', status: 'Unseen' },
    { id: 4, messageText: 'New message 2', status: 'Unseen' },
    { id: 5, messageText: 'New message 2', status: 'Unseen' },
    { id: 6, messageText: 'New message 2', status: 'Unseen' },
    { id: 7, messageText: 'New message 2', status: 'Unseen' },
    // Add more notifications as needed
  ]);

  const handleNotificationPress = (id) => {
    // Update the status of the clicked notification
    const updatedNotifications = notifications.map((notification) =>
      notification.id === id ? { ...notification, status: 'Seen' } : notification
    );
    setNotifications(updatedNotifications);
  };

  const handleDeleteNotification = (id) => {
    // Delete the notification with the given id
    const updatedNotifications = notifications.filter((notification) => notification.id !== id);
    setNotifications(updatedNotifications);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Notifications</Text>
      <FlatList
        data={notifications}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={[styles.notificationItem, { backgroundColor: item.status === 'Unseen' ? '#ff6738' : '#ffae8c' }]}>
            <TouchableOpacity
              style={styles.notificationContent}
              onPress={() => handleNotificationPress(item.id)}
            >
              <Text style={[styles.messageText, { color: item.status === 'Unseen' ? '#fff' : '#000' }]}>
                {item.messageText}
              </Text>
           
            </TouchableOpacity>

            {item.status === 'Seen' && (
              <TouchableOpacity
                style={styles.deleteButton}
                onPress={() => handleDeleteNotification(item.id)}
              >
                <Text style={styles.deleteButtonText}>X</Text>
              </TouchableOpacity>
            )}
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
    paddingTop: 50,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#ff6738',
    textAlign: 'center',
    marginBottom: 20,
  },
  notificationItem: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  },
  notificationContent: {
    flex: 1,
  },
  messageText: {
    fontSize: 16,
    marginBottom: 5,
  },
  statusText: {
    fontSize: 14,
  },
  deleteButton: {
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 5,
  },
  deleteButtonText: {
    color: '#ff6738',
    fontWeight: 'bold',
    fontSize: 18,
  },
});

export default NotificationsScreen;
