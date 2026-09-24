import React from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";

const schedules = [
  {
    courseNo: "2063",
    code: "CCE 106",
    title: "APPLICATION DEVELOPMENT AND EMERGING TECHNOLOGIES",
    units: "3.0",
    day: "M-Sa",
    term: "1st Term",
    time: "10:00 AM - 12:00 PM",
    room: "VC",
    teacher: "Lowell Jay C. Orcullo",
  },
  {
    courseNo: "2066",
    code: "IT 17",
    title: "SOCIAL AND PROFESSIONAL ISSUES",
    units: "3.0",
    day: "M-Sa",
    term: "1st Term",
    time: "12:30 PM - 1:30 PM",
    room: "VC",
    teacher: "Lowell Jay C. Orcullo",
  },
  {
    courseNo: "2034",
    code: "IT 12",
    title: "SYSTEMS INTEGRATION & ARCHITECTURE",
    units: "3.0",
    day: "M-Sa",
    term: "1st Term",
    time: "3:30 PM - 5:30 PM",
    room: "VC",
    teacher: "Genrhey Guhao Barba",
  },
  {
    courseNo: "2023",
    code: "IT 11",
    title: "NETWORKING 2",
    units: "3.0",
    day: "M-Sa",
    term: "1st Term",
    time: "5:30 PM - 7:30 PM",
    room: "VC",
    teacher: "Xian Rhel S. Cadiogan",
  },
  {
    courseNo: "2022",
    code: "IT 14",
    title: "PROFESSIONAL TRACK FOR IT 5",
    units: "3.0",
    day: "M-Sa",
    term: "2nd Term",
    time: "3:30 PM - 5:30 PM",
    room: "VC",
    teacher: "Pending",
  },
  {
    courseNo: "2035",
    code: "IT 13",
    title: "PROFESSIONAL TRACK FOR IT 4",
    units: "3.0",
    day: "M-Sa",
    term: "2nd Term",
    time: "5:30 PM - 7:30 PM",
    room: "VC",
    teacher: "Pending",
  },
  {
    courseNo: "2036",
    code: "IT 10",
    title: "IT ELECTIVE 3",
    units: "3.0",
    day: "M-Sa",
    term: "2nd Term",
    time: "7:30 PM - 9:30 PM",
    room: "VC",
    teacher: "Pending",
  },
];

export default function HomeScreen() {
  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.content}
      showsVerticalScrollIndicator={false}
    >
      <View style={styles.header}>
        <Text style={styles.portal}>STUDENT PORTAL</Text>
        <Text style={styles.title}>My Schedule</Text>
        <Text style={styles.subtitle}>
          Your complete class schedule
        </Text>
      </View>

      <View style={styles.summary}>
        <View style={styles.summaryItem}>
          <Text style={styles.summaryNumber}>7</Text>
          <Text style={styles.summaryLabel}>SUBJECTS</Text>
        </View>

        <View style={styles.divider} />

        <View style={styles.summaryItem}>
          <Text style={styles.summaryNumber}>21</Text>
          <Text style={styles.summaryLabel}>UNITS</Text>
        </View>

        <View style={styles.divider} />

        <View style={styles.summaryItem}>
          <Text style={styles.summaryNumber}>M-Sa</Text>
          <Text style={styles.summaryLabel}>DAYS</Text>
        </View>
      </View>

      <Text style={styles.sectionTitle}>Class Schedule</Text>

      {schedules.map((item) => (
        <View key={item.courseNo} style={styles.card}>
          <View style={styles.cardHeader}>
            <View style={styles.courseHeader}>
              <Text style={styles.code}>{item.code}</Text>
              <Text style={styles.courseNumber}>
                Course No. {item.courseNo}
              </Text>
            </View>

            <View style={styles.termBadge}>
              <Text style={styles.termText}>{item.term}</Text>
            </View>
          </View>

          <Text style={styles.courseTitle}>{item.title}</Text>

          <View style={styles.teacherBox}>
            <Text style={styles.label}>TEACHER</Text>
            <Text style={styles.teacherName}>{item.teacher}</Text>
          </View>

          <View style={styles.infoRow}>
            <View style={styles.infoBox}>
              <Text style={styles.label}>TIME</Text>
              <Text style={styles.value}>{item.time}</Text>
            </View>

            <View style={styles.infoBox}>
              <Text style={styles.label}>DAY</Text>
              <Text style={styles.value}>{item.day}</Text>
            </View>
          </View>

          <View style={styles.footerInfo}>
            <View>
              <Text style={styles.label}>ROOM</Text>
              <Text style={styles.value}>{item.room}</Text>
            </View>

            <View>
              <Text style={styles.label}>UNITS</Text>
              <Text style={styles.value}>{item.units}</Text>
            </View>

            <View>
              <Text style={styles.label}>COURSE</Text>
              <Text style={styles.value}>{item.courseNo}</Text>
            </View>
          </View>
        </View>
      ))}

      <View style={styles.bottom}>
        <Text style={styles.bottomText}>
          Academic Schedule
        </Text>
        <Text style={styles.bottomSubtext}>
          Student Portal
        </Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F1F5F9",
  },

  content: {
    padding: 20,
    paddingTop: 55,
    paddingBottom: 40,
  },

  header: {
    marginBottom: 20,
  },

  portal: {
    fontSize: 12,
    fontWeight: "700",
    color: "#64748B",
    letterSpacing: 2,
  },

  title: {
    fontSize: 32,
    fontWeight: "800",
    color: "#0F172A",
    marginTop: 6,
  },

  subtitle: {
    fontSize: 15,
    color: "#64748B",
    marginTop: 5,
  },

  summary: {
    backgroundColor: "#172554",
    borderRadius: 20,
    paddingVertical: 22,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
  },

  summaryItem: {
    flex: 1,
    alignItems: "center",
  },

  summaryNumber: {
    color: "#FFFFFF",
    fontSize: 21,
    fontWeight: "800",
  },

  summaryLabel: {
    color: "#CBD5E1",
    fontSize: 10,
    fontWeight: "700",
    marginTop: 5,
  },

  divider: {
    width: 1,
    height: 38,
    backgroundColor: "#64748B",
  },

  sectionTitle: {
    fontSize: 21,
    fontWeight: "800",
    color: "#0F172A",
    marginTop: 28,
    marginBottom: 15,
  },

  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 18,
    padding: 18,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: "#E2E8F0",
  },

  cardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
  },

  courseHeader: {
    flex: 1,
  },

  code: {
    fontSize: 21,
    fontWeight: "800",
    color: "#2563EB",
  },

  courseNumber: {
    fontSize: 11,
    color: "#94A3B8",
    marginTop: 3,
  },

  termBadge: {
    backgroundColor: "#EFF6FF",
    borderRadius: 15,
    paddingHorizontal: 10,
    paddingVertical: 6,
  },

  termText: {
    color: "#2563EB",
    fontSize: 10,
    fontWeight: "800",
  },

  courseTitle: {
    fontSize: 16,
    fontWeight: "800",
    color: "#1E293B",
    lineHeight: 23,
    marginTop: 15,
    marginBottom: 14,
  },

  teacherBox: {
    backgroundColor: "#F8FAFC",
    borderRadius: 10,
    padding: 12,
    borderLeftWidth: 3,
    borderLeftColor: "#2563EB",
    marginBottom: 12,
  },

  teacherName: {
    fontSize: 14,
    fontWeight: "700",
    color: "#334155",
    marginTop: 4,
  },

  infoRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },

  infoBox: {
    width: "48%",
    backgroundColor: "#F8FAFC",
    borderRadius: 10,
    padding: 11,
  },

  label: {
    fontSize: 9,
    fontWeight: "800",
    color: "#94A3B8",
    letterSpacing: 1,
  },

  value: {
    fontSize: 13,
    fontWeight: "700",
    color: "#334155",
    marginTop: 4,
  },

  footerInfo: {
    flexDirection: "row",
    justifyContent: "space-between",
    borderTopWidth: 1,
    borderTopColor: "#E2E8F0",
    marginTop: 13,
    paddingTop: 13,
  },

  bottom: {
    alignItems: "center",
    marginTop: 10,
    marginBottom: 20,
  },

  bottomText: {
    fontSize: 12,
    fontWeight: "700",
    color: "#64748B",
  },

  bottomSubtext: {
    fontSize: 11,
    color: "#94A3B8",
    marginTop: 3,
  },
});