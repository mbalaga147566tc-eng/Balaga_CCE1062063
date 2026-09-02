import React, { useState } from 'react';
import {
    Alert,
    FlatList,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native';

export default function App() {
  const [subject, setSubject] = useState('');
  const [date, setDate] = useState('');

  const [attendance, setAttendance] = useState([
    {
      id: '1',
      subject: 'Mobile Development',
      date: 'September 2, 2026',
      status: 'Present',
    },
    {
      id: '2',
      subject: 'Database Systems',
      date: 'September 1, 2026',
      status: 'Absent',
    },
    {
      id: '3',
      subject: 'Web Development',
      date: 'August 30, 2026',
      status: 'Present',
    },
  ]);

  // Count present and absent records
  const presentCount = attendance.filter(
    (item) => item.status === 'Present'
  ).length;

  const absentCount = attendance.filter(
    (item) => item.status === 'Absent'
  ).length;

  // Add a new attendance record
  const addAttendance = () => {
    if (subject.trim() === '' || date.trim() === '') {
      Alert.alert(
        'Missing Information',
        'Please enter the subject and date.'
      );
      return;
    }

    const newRecord = {
      id: Date.now().toString(),
      subject: subject,
      date: date,
      status: 'Present',
    };

    setAttendance([newRecord, ...attendance]);

    setSubject('');
    setDate('');

    Alert.alert('Success', 'Attendance record added!');
  };

  // Change Present to Absent or Absent to Present
  const toggleStatus = (id) => {
    setAttendance(
      attendance.map((item) =>
        item.id === id
          ? {
              ...item,
              status:
                item.status === 'Present' ? 'Absent' : 'Present',
            }
          : item
      )
    );
  };

  // Delete attendance record
  const deleteAttendance = (id) => {
    Alert.alert(
      'Delete Record',
      'Are you sure you want to delete this record?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: () => {
            setAttendance(
              attendance.filter((item) => item.id !== id)
            );

            Alert.alert('Deleted', 'Attendance record deleted.');
          },
        },
      ]
    );
  };

  // Display each attendance record
  const renderAttendance = ({ item }) => {
    return (
      <View style={styles.recordCard}>
        <View style={styles.recordInfo}>
          <Text style={styles.subjectText}>{item.subject}</Text>

          <Text style={styles.dateText}>
            Date: {item.date}
          </Text>

          <TouchableOpacity
            style={[
              styles.statusButton,
              item.status === 'Present'
                ? styles.presentButton
                : styles.absentButton,
            ]}
            onPress={() => toggleStatus(item.id)}
            activeOpacity={0.7}
          >
            <Text style={styles.statusText}>
              {item.status}
            </Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity
          style={styles.deleteButton}
          onPress={() => deleteAttendance(item.id)}
          activeOpacity={0.7}
        >
          <Text style={styles.deleteText}>DELETE</Text>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <View style={styles.container}>

      {/* Header */}
      <Text style={styles.title}>
        STUDENT ATTENDANCE
      </Text>

      {/* Student Information */}
      <View style={styles.studentCard}>
        <Text style={styles.studentName}>
          Student: Juan Dela Cruz
        </Text>

        <Text style={styles.program}>
          Program: Bachelor of Science in Information Technology
        </Text>
      </View>

      {/* Attendance Summary */}
      <View style={styles.summaryContainer}>

        <View style={[styles.summaryBox, styles.presentBox]}>
          <Text style={styles.summaryNumber}>
            {presentCount}
          </Text>

          <Text style={styles.summaryLabel}>
            PRESENT
          </Text>
        </View>

        <View style={[styles.summaryBox, styles.absentBox]}>
          <Text style={styles.summaryNumber}>
            {absentCount}
          </Text>

          <Text style={styles.summaryLabel}>
            ABSENT
          </Text>
        </View>

      </View>

      {/* Add Attendance */}
      <Text style={styles.sectionTitle}>
        ADD ATTENDANCE
      </Text>

      <TextInput
        style={styles.input}
        placeholder="Enter subject name"
        placeholderTextColor="#999"
        value={subject}
        onChangeText={setSubject}
      />

      <TextInput
        style={styles.input}
        placeholder="Enter date"
        placeholderTextColor="#999"
        value={date}
        onChangeText={setDate}
      />

      <TouchableOpacity
        style={styles.addButton}
        onPress={addAttendance}
        activeOpacity={0.7}
      >
        <Text style={styles.addButtonText}>
          + ADD RECORD
        </Text>
      </TouchableOpacity>

      {/* Attendance List */}
      <Text style={styles.sectionTitle}>
        ATTENDANCE RECORDS
      </Text>

      <FlatList
        data={attendance}
        keyExtractor={(item) => item.id}
        renderItem={renderAttendance}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.listContainer}
      />

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F4F6F8',
    paddingTop: 50,
    paddingHorizontal: 18,
  },

  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1E293B',
    textAlign: 'center',
    marginBottom: 15,
  },

  studentCard: {
    backgroundColor: '#2563EB',
    padding: 16,
    borderRadius: 12,
    marginBottom: 15,
  },

  studentName: {
    color: '#FFFFFF',
    fontSize: 17,
    fontWeight: 'bold',
    marginBottom: 5,
  },

  program: {
    color: '#DBEAFE',
    fontSize: 13,
  },

  summaryContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 18,
  },

  summaryBox: {
    width: '48%',
    paddingVertical: 15,
    borderRadius: 12,
    alignItems: 'center',
  },

  presentBox: {
    backgroundColor: '#DCFCE7',
  },

  absentBox: {
    backgroundColor: '#FEE2E2',
  },

  summaryNumber: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#1E293B',
  },

  summaryLabel: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#475569',
    marginTop: 3,
  },

  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#334155',
    marginBottom: 8,
    marginTop: 5,
  },

  input: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#CBD5E1',
    borderRadius: 10,
    paddingHorizontal: 14,
    paddingVertical: 11,
    fontSize: 15,
    marginBottom: 8,
  },

  addButton: {
    backgroundColor: '#16A34A',
    paddingVertical: 13,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 15,
  },

  addButtonText: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: 'bold',
  },

  listContainer: {
    paddingBottom: 30,
  },

  recordCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 14,
    marginBottom: 10,
    borderLeftWidth: 5,
    borderLeftColor: '#2563EB',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',

    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 2,
  },

  recordInfo: {
    flex: 1,
  },

  subjectText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1E293B',
    marginBottom: 4,
  },

  dateText: {
    fontSize: 13,
    color: '#64748B',
    marginBottom: 8,
  },

  statusButton: {
    alignSelf: 'flex-start',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },

  presentButton: {
    backgroundColor: '#22C55E',
  },

  absentButton: {
    backgroundColor: '#EF4444',
  },

  statusText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: 'bold',
  },

  deleteButton: {
    backgroundColor: '#FEE2E2',
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderRadius: 8,
    marginLeft: 8,
  },

  deleteText: {
    color: '#DC2626',
    fontSize: 11,
    fontWeight: 'bold',
  },
});