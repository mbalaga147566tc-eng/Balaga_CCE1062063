import React, { useEffect, useState } from 'react';
import { Pressable, SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native';

type AttendanceStatus = 'present' | 'absent';

type Student = {
  id: number;
  name: string;
  status: AttendanceStatus | null;
};

type AttendanceSummary = {
  total: number;
  present: number;
  absent: number;
};

const initialStudents: Student[] = [
  { id: 1, name: 'Kent Ryan P. Villanosa', status: null },
  { id: 2, name: 'Jhon Dave J Ledesma', status: null },
  { id: 3, name: 'Mark Joseph V Catolico', status: null },
  { id: 4, name: 'Rene Clert Baterbonia', status: null },
];

export default function Lab08Screen() {
  const [students, setStudents] = useState<Student[]>([]);
  const [summary, setSummary] = useState<AttendanceSummary>({ total: 0, present: 0, absent: 0 });

  useEffect(() => {
    setStudents(initialStudents);
  }, []);

  useEffect(() => {
    const presentCount = students.filter((student) => student.status === 'present').length;
    const absentCount = students.filter((student) => student.status === 'absent').length;

    setSummary({
      total: students.length,
      present: presentCount,
      absent: absentCount,
    });
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

  const getInitials = (name: string) =>
    name
      .split(' ')
      .filter(Boolean)
      .slice(0, 2)
      .map((part) => part[0])
      .join('');

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.eyebrow}>CLASSROOM • TODAY</Text>
        <Text style={styles.title}>Attendance</Text>
        <Text style={styles.subtitle}>Mark each student present or absent.</Text>

        <View style={styles.summaryCard}>
          <View style={styles.summaryItem}>
            <Text style={styles.summaryNumber}>{summary.total}</Text>
            <Text style={styles.summaryLabel}>STUDENTS</Text>
          </View>
          <View style={styles.summaryDivider} />
          <View style={styles.summaryItem}>
            <Text style={[styles.summaryNumber, styles.presentSummaryNumber]}>{summary.present}</Text>
            <Text style={styles.summaryLabel}>PRESENT</Text>
          </View>
          <View style={styles.summaryDivider} />
          <View style={styles.summaryItem}>
            <Text style={[styles.summaryNumber, styles.absentSummaryNumber]}>{summary.absent}</Text>
            <Text style={styles.summaryLabel}>ABSENT</Text>
          </View>
        </View>

        <View style={styles.listHeading}>
          <Text style={styles.sectionTitle}>Class list</Text>
          <Text style={styles.markedCount}>{summary.present + summary.absent} of {summary.total} marked</Text>
        </View>

        {students.map((student) => {
          const isPresent = student.status === 'present';
          const isAbsent = student.status === 'absent';

          return (
            <View key={student.id} style={styles.studentCard}>
              <View style={styles.studentHeader}>
                <View style={styles.avatar}>
                  <Text style={styles.avatarText}>{getInitials(student.name)}</Text>
                </View>
                <View style={styles.studentDetails}>
                  <Text style={styles.studentName}>{student.name}</Text>
                  <Text style={[styles.statusText, isPresent && styles.presentStatus, isAbsent && styles.absentStatus]}>
                    {isPresent ? 'Present' : isAbsent ? 'Absent' : 'Not marked'}
                  </Text>
                </View>
              </View>

              <View style={styles.buttonRow}>
                <Pressable
                  accessibilityRole="button"
                  accessibilityState={{ selected: isPresent }}
                  accessibilityLabel={`Mark ${student.name} present`}
                  style={({ pressed }) => [
                    styles.button,
                    isPresent && styles.presentButtonActive,
                    pressed && styles.buttonPressed,
                  ]}
                  onPress={() => updateAttendance(student.id, 'present')}
                >
                  <Text style={[styles.buttonText, isPresent && styles.activeButtonText]}>Present</Text>
                </Pressable>

                <Pressable
                  accessibilityRole="button"
                  accessibilityState={{ selected: isAbsent }}
                  accessibilityLabel={`Mark ${student.name} absent`}
                  style={({ pressed }) => [
                    styles.button,
                    isAbsent && styles.absentButtonActive,
                    pressed && styles.buttonPressed,
                  ]}
                  onPress={() => updateAttendance(student.id, 'absent')}
                >
                  <Text style={[styles.buttonText, isAbsent && styles.activeButtonText]}>Absent</Text>
                </Pressable>
              </View>

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
    backgroundColor: '#f1f5f9',
  },
  container: {
    padding: 20,
    paddingBottom: 40,
  },
  eyebrow: {
    color: '#2563eb',
    fontSize: 11,
    fontWeight: '800',
    letterSpacing: 1.4,
    marginBottom: 6,
  },
  title: {
    fontSize: 30,
    fontWeight: '800',
    color: '#172554',
  },
  subtitle: {
    fontSize: 15,
    color: '#64748b',
    marginTop: 4,
    marginBottom: 20,
  },
  summaryCard: {
    flexDirection: 'row',
    backgroundColor: '#172554',
    borderRadius: 18,
    paddingVertical: 19,
    marginBottom: 24,
  },
  summaryItem: {
    flex: 1,
    alignItems: 'center',
  },
  summaryNumber: {
    fontSize: 24,
    fontWeight: '800',
    color: '#ffffff',
  },
  presentSummaryNumber: {
    color: '#86efac',
  },
  absentSummaryNumber: {
    color: '#fca5a5',
  },
  summaryLabel: {
    fontSize: 10,
    fontWeight: '700',
    letterSpacing: 0.7,
    color: '#bfdbfe',
    marginTop: 5,
  },
  summaryDivider: {
    width: 1,
    backgroundColor: '#475569',
    marginVertical: 4,
  },
  listHeading: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'baseline',
    marginBottom: 10,
  },
  sectionTitle: {
    fontSize: 19,
    fontWeight: '800',
    color: '#172554',
  },
  markedCount: {
    fontSize: 12,
    fontWeight: '600',
    color: '#64748b',
  },
  studentCard: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 15,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#e2e8f0',
  },
  studentHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 14,
  },
  avatar: {
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: '#dbeafe',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 11,
  },
  avatarText: {
    color: '#1d4ed8',
    fontSize: 13,
    fontWeight: '800',
  },
  studentDetails: {
    flex: 1,
  },
  studentName: {
    fontSize: 16,
    fontWeight: '700',
    color: '#1e293b',
  },
  buttonRow: {
    flexDirection: 'row',
    gap: 9,
  },
  button: {
    flex: 1,
    paddingVertical: 11,
    paddingHorizontal: 14,
    borderRadius: 9,
    backgroundColor: '#f1f5f9',
    borderWidth: 1,
    borderColor: '#dbe3ee',
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonPressed: {
    opacity: 0.8,
  },
  presentButtonActive: {
    backgroundColor: '#16a34a',
    borderColor: '#16a34a',
  },
  absentButtonActive: {
    backgroundColor: '#dc2626',
    borderColor: '#dc2626',
  },
  buttonText: {
    fontWeight: '600',
    color: '#334155',
  },
  activeButtonText: {
    color: '#ffffff',
  },
  statusText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#64748b',
    marginTop: 2,
  },
  presentStatus: {
    color: '#16a34a',
  },
  absentStatus: {
    color: '#dc2626',
  },
});
