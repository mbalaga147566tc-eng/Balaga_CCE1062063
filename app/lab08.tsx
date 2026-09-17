import React, { useEffect, useState } from 'react';
import { Pressable, SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native';

type AttendanceStatus = 'present' | 'absent';

type Student = {
  id: number;
  name: string;
  status: AttendanceStatus | null;
};

const initialStudents: Student[] = [
  { id: 1, name: 'Alice Johnson', status: null },
  { id: 2, name: 'Marcus Lee', status: null },
  { id: 3, name: 'Priya Patel', status: null },
  { id: 4, name: 'Daniel Kim', status: null },
];

export default function Lab08Screen() {
  const [students, setStudents] = useState<Student[]>([]);

  useEffect(() => {
    setStudents(initialStudents);
  }, []);

  useEffect(() => {
    const presentCount = students.filter((student) => student.status === 'present').length;
    const absentCount = students.filter((student) => student.status === 'absent').length;

    console.log(`Attendance summary: ${presentCount} present, ${absentCount} absent`);
  }, [students]);

  const updateAttendance = (studentId: number, nextStatus: AttendanceStatus) => {
    setStudents((currentStudents) =>
      currentStudents.map((student) =>
        student.id === studentId
          ? {
              ...student,
              // One status value means Present and Absent cannot both be active.
              status: nextStatus,
            }
          : student,
      ),
    );
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.title}>Attendance List</Text>

        {students.map((student) => {
          const isPresent = student.status === 'present';
          const isAbsent = student.status === 'absent';

          return (
            <View key={student.id} style={styles.studentCard}>
              <Text style={styles.studentName}>{student.name}</Text>

              <View style={styles.buttonRow}>
                <Pressable
                  style={[styles.button, isPresent && styles.presentButtonActive]}
                  onPress={() => updateAttendance(student.id, 'present')}
                >
                  <Text style={[styles.buttonText, isPresent && styles.activeButtonText]}>Present</Text>
                </Pressable>

                <Pressable
                  style={[styles.button, isAbsent && styles.absentButtonActive]}
                  onPress={() => updateAttendance(student.id, 'absent')}
                >
                  <Text style={[styles.buttonText, isAbsent && styles.activeButtonText]}>Absent</Text>
                </Pressable>
              </View>

              <Text style={styles.statusText}>
                Status: {student.status ? student.status : 'Not marked'}
              </Text>
            </View>
          );
        })}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#f4f7fb',
  },
  container: {
    padding: 20,
    paddingBottom: 32,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    marginBottom: 20,
    color: '#1f2937',
  },
  studentCard: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 14,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.08,
    shadowRadius: 6,
    elevation: 2,
  },
  studentName: {
    fontSize: 18,
    fontWeight: '600',
    color: '#111827',
    marginBottom: 12,
  },
  buttonRow: {
    flexDirection: 'row',
    gap: 10,
  },
  button: {
    flex: 1,
    paddingVertical: 10,
    paddingHorizontal: 14,
    borderRadius: 10,
    backgroundColor: '#e5e7eb',
    alignItems: 'center',
    justifyContent: 'center',
  },
  presentButtonActive: {
    backgroundColor: '#22c55e',
  },
  absentButtonActive: {
    backgroundColor: '#ef4444',
  },
  buttonText: {
    fontWeight: '600',
    color: '#374151',
  },
  activeButtonText: {
    color: '#ffffff',
  },
  statusText: {
    marginTop: 12,
    fontSize: 14,
    color: '#4b5563',
  },
});
