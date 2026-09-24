import React, { useState } from 'react';
import {
  Alert,
  FlatList,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

export default function Layout() {
  const [taskTitle, setTaskTitle] = useState('');
  const [dueDate, setDueDate] = useState('');

  const [tasks, setTasks] = useState([
    {
      id: '1',
      title: 'Finish React Native Activity',
      dueDate: 'Sep 05, 2026',
      completed: false,
    },
    {
      id: '2',
      title: 'Submit Database Assignment',
      dueDate: 'Sep 07, 2026',
      completed: true,
    },
    {
      id: '3',
      title: 'Study for Programming Quiz',
      dueDate: 'Sep 09, 2026',
      completed: false,
    },
    {
      id: '4',
      title: 'Read Documentation',
      dueDate: 'Sep 10, 2026',
      completed: true,
    },
  ]);

  const pendingCount = tasks.filter(
    (item) => !item.completed
  ).length;

  const completedCount = tasks.filter(
    (item) => item.completed
  ).length;

  const addTask = () => {
    if (
      taskTitle.trim() === '' ||
      dueDate.trim() === ''
    ) {
      Alert.alert(
        'Missing Information',
        'Please enter the task title and due date.'
      );
      return;
    }

    const newTask = {
      id: Date.now().toString(),
      title: taskTitle.trim(),
      dueDate: dueDate.trim(),
      completed: false,
    };

    setTasks([newTask, ...tasks]);
    setTaskTitle('');
    setDueDate('');

    Alert.alert('Success', 'New task added!');
  };

  const toggleTask = (id) => {
    setTasks(
      tasks.map((item) =>
        item.id === id
          ? {
              ...item,
              completed: !item.completed,
            }
          : item
      )
    );
  };

  const deleteTask = (id) => {
    Alert.alert(
      'Delete Task',
      'Do you want to delete this task?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: () => {
            setTasks(
              tasks.filter((item) => item.id !== id)
            );

            Alert.alert(
              'Deleted',
              'Task deleted successfully!'
            );
          },
        },
      ]
    );
  };

  const renderTask = ({ item }) => {
    return (
      <View style={styles.taskCard}>
        <TouchableOpacity
          style={[
            styles.statusCircle,
            item.completed && styles.statusCircleCompleted,
          ]}
          onPress={() => toggleTask(item.id)}
          activeOpacity={0.7}
        />

        <View style={styles.taskContent}>
          <Text
            style={[
              styles.taskTitle,
              item.completed && styles.completedTitle,
            ]}
          >
            {item.title}
          </Text>

          <Text style={styles.taskDate}>
            Due {item.dueDate}
          </Text>
        </View>

        <TouchableOpacity
          style={styles.deleteButton}
          onPress={() => deleteTask(item.id)}
          activeOpacity={0.7}
        >
          <Text style={styles.deleteText}>
            DELETE
          </Text>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar
        barStyle="dark-content"
        backgroundColor="#FAF9FF"
      />

      <View style={styles.container}>
        <FlatList
          data={tasks}
          keyExtractor={(item) => item.id}
          renderItem={renderTask}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.listContent}
          ListHeaderComponent={
            <>
              <View style={styles.topBar}>
                <View>
                  <Text style={styles.smallText}>
                    GOOD MORNING
                  </Text>

                  <Text style={styles.headerTitle}>
                    My Tasks
                  </Text>
                </View>

                <View style={styles.calendarIcon}>
                  <Text style={styles.calendarText}>
                    CAL
                  </Text>
                </View>
              </View>

              <Text style={styles.subtitle}>
                Stay organized and get things done.
              </Text>

              <View style={styles.profileCard}>
                <View style={styles.avatar}>
                  <Text style={styles.avatarText}>
                    MB
                  </Text>
                </View>

                <View style={styles.profileInfo}>
                  <Text style={styles.studentName}>
                    Mavy Balaga
                  </Text>

                  <Text style={styles.program}>
                    BS Information Technology
                  </Text>

                  <Text style={styles.studentStatus}>
                    Student Account
                  </Text>
                </View>
              </View>

              <View style={styles.statsContainer}>
                <View style={styles.statCard}>
                  <View style={styles.statIconPurple}>
                    <Text style={styles.statIconText}>
                      P
                    </Text>
                  </View>

                  <View>
                    <Text style={styles.statNumber}>
                      {pendingCount}
                    </Text>

                    <Text style={styles.statLabel}>
                      Pending Tasks
                    </Text>
                  </View>
                </View>

                <View style={styles.statCard}>
                  <View style={styles.statIconGreen}>
                    <Text style={styles.statIconText}>
                      C
                    </Text>
                  </View>

                  <View>
                    <Text style={styles.statNumber}>
                      {completedCount}
                    </Text>

                    <Text style={styles.statLabel}>
                      Completed
                    </Text>
                  </View>
                </View>
              </View>

              <Text style={styles.sectionTitle}>
                Add New Task
              </Text>

              <View style={styles.inputContainer}>
                <Text style={styles.inputIcon}>
                  T
                </Text>

                <TextInput
                  style={styles.input}
                  placeholder="Task title"
                  placeholderTextColor="#A5A1B5"
                  value={taskTitle}
                  onChangeText={setTaskTitle}
                />
              </View>

              <View style={styles.inputContainer}>
                <Text style={styles.inputIcon}>
                  D
                </Text>

                <TextInput
                  style={styles.input}
                  placeholder="Due date e.g. Sep 12, 2026"
                  placeholderTextColor="#A5A1B5"
                  value={dueDate}
                  onChangeText={setDueDate}
                />
              </View>

              <TouchableOpacity
                style={styles.addButton}
                onPress={addTask}
                activeOpacity={0.8}
              >
                <Text style={styles.addButtonText}>
                  + Add Task
                </Text>
              </TouchableOpacity>

              <View style={styles.taskHeader}>
                <Text style={styles.sectionTitle}>
                  My Task List
                </Text>

                <Text style={styles.taskTotal}>
                  {tasks.length} Tasks
                </Text>
              </View>
            </>
          }
        />

        <View style={styles.bottomNav}>
          <TouchableOpacity style={styles.navItem}>
            <Text style={styles.activeNavIcon}>
              T
            </Text>

            <Text style={styles.activeNavText}>
              Tasks
            </Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.navItem}>
            <Text style={styles.navIcon}>
              C
            </Text>

            <Text style={styles.navText}>
              Calendar
            </Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.navItem}>
            <Text style={styles.navIcon}>
              S
            </Text>

            <Text style={styles.navText}>
              Stats
            </Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.navItem}>
            <Text style={styles.navIcon}>
              P
            </Text>

            <Text style={styles.navText}>
              Profile
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#FAF9FF',
  },

  container: {
    flex: 1,
    backgroundColor: '#FAF9FF',
  },

  listContent: {
    paddingHorizontal: 20,
    paddingTop: 12,
    paddingBottom: 90,
  },

  topBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  smallText: {
    fontSize: 10,
    color: '#9A94AC',
    fontWeight: '600',
    letterSpacing: 1,
    marginBottom: 3,
  },

  headerTitle: {
    fontSize: 29,
    fontWeight: '700',
    color: '#292238',
  },

  subtitle: {
    color: '#9892A5',
    fontSize: 12,
    marginTop: 3,
    marginBottom: 18,
  },

  calendarIcon: {
    width: 42,
    height: 42,
    borderRadius: 14,
    backgroundColor: '#EEE9FF',
    justifyContent: 'center',
    alignItems: 'center',
  },

  calendarText: {
    color: '#6C45D9',
    fontSize: 10,
    fontWeight: '700',
  },

  profileCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 17,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 14,
    shadowColor: '#6C45D9',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.07,
    shadowRadius: 12,
    elevation: 3,
  },

  avatar: {
    width: 58,
    height: 58,
    borderRadius: 29,
    backgroundColor: '#E9DFFF',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 14,
  },

  avatarText: {
    fontSize: 19,
    fontWeight: '700',
    color: '#6C45D9',
  },

  profileInfo: {
    flex: 1,
  },

  studentName: {
    fontSize: 17,
    fontWeight: '700',
    color: '#302941',
    marginBottom: 4,
  },

  program: {
    fontSize: 11,
    color: '#777084',
    marginBottom: 3,
  },

  studentStatus: {
    fontSize: 10,
    color: '#A39CAC',
  },

  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },

  statCard: {
    width: '48%',
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 13,
    flexDirection: 'row',
    alignItems: 'center',
    elevation: 2,
  },

  statIconPurple: {
    width: 34,
    height: 34,
    borderRadius: 11,
    backgroundColor: '#F0EBFF',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 9,
  },

  statIconGreen: {
    width: 34,
    height: 34,
    borderRadius: 11,
    backgroundColor: '#E4F8EE',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 9,
  },

  statIconText: {
    color: '#7652D9',
    fontSize: 13,
    fontWeight: '700',
  },

  statNumber: {
    fontSize: 20,
    fontWeight: '700',
    color: '#302941',
  },

  statLabel: {
    fontSize: 9,
    color: '#9892A5',
    marginTop: 1,
  },

  sectionTitle: {
    fontSize: 17,
    fontWeight: '700',
    color: '#302941',
    marginBottom: 10,
  },

  inputContainer: {
    height: 48,
    backgroundColor: '#FFFFFF',
    borderRadius: 13,
    borderWidth: 1,
    borderColor: '#EEEAF4',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 13,
    marginBottom: 8,
  },

  inputIcon: {
    color: '#9A78E8',
    fontSize: 14,
    fontWeight: '700',
    marginRight: 9,
  },

  input: {
    flex: 1,
    color: '#302941',
    fontSize: 13,
  },

  addButton: {
    backgroundColor: '#673DE6',
    height: 47,
    borderRadius: 13,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 3,
    marginBottom: 22,
    elevation: 4,
  },

  addButtonText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '700',
  },

  taskHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  taskTotal: {
    color: '#9B95A8',
    fontSize: 11,
    marginBottom: 10,
  },

  taskCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 15,
    padding: 13,
    marginBottom: 9,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#F0EDF5',
  },

  statusCircle: {
    width: 23,
    height: 23,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#C5BED4',
    marginRight: 12,
  },

  statusCircleCompleted: {
    backgroundColor: '#6D49DF',
    borderColor: '#6D49DF',
  },

  taskContent: {
    flex: 1,
  },

  taskTitle: {
    fontSize: 13,
    fontWeight: '600',
    color: '#393344',
    marginBottom: 4,
  },

  completedTitle: {
    color: '#AAA4B3',
    textDecorationLine: 'line-through',
  },

  taskDate: {
    fontSize: 10,
    color: '#A19AAE',
  },

  deleteButton: {
    backgroundColor: '#FFF0F5',
    paddingHorizontal: 9,
    paddingVertical: 9,
    borderRadius: 9,
    marginLeft: 8,
  },

  deleteText: {
    color: '#E66B9B',
    fontSize: 9,
    fontWeight: '700',
  },

  bottomNav: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 67,
    backgroundColor: '#FFFFFF',
    borderTopWidth: 1,
    borderTopColor: '#F0EDF5',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingBottom: 4,
  },

  navItem: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 70,
  },

  activeNavIcon: {
    color: '#673DE6',
    fontSize: 14,
    fontWeight: '700',
    marginBottom: 3,
  },

  activeNavText: {
    color: '#673DE6',
    fontSize: 9,
    fontWeight: '700',
  },

  navIcon: {
    color: '#AAA4B5',
    fontSize: 14,
    fontWeight: '700',
    marginBottom: 3,
  },

  navText: {
    color: '#AAA4B5',
    fontSize: 9,
  },
});
