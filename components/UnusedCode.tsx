import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import React, { useEffect } from "react";
import {
  Animated,
  Dimensions,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const { width } = Dimensions.get("window");

// ─── Mock Data (replace with your real API calls) ───────────────────────────
const USER_NAME = "Sarah";
const FLUID_TAKEN = 850;
const FLUID_LIMIT = 1500;
const MEDICATIONS_TODAY = 3;
const MEDICATIONS_TAKEN = 1;
const NEXT_MED = {
  name: "Blood Pressure Pill",
  time: "2:00 PM",
  dosage: "100mg",
};
const UPCOMING_APPOINTMENTS = [
  {
    title: "Dialysis Session",
    date: "Feb 3",
    time: "9:00 AM",
    location: "Renal Center",
  },
  {
    title: "Dr. Chen Follow-up",
    date: "Feb 7",
    time: "11:30 AM",
    location: "Nephrology Clinic",
  },
];

// ─── Helpers ─────────────────────────────────────────────────────────────────
const fluidPercent = Math.min((FLUID_TAKEN / FLUID_LIMIT) * 100, 100);
const medPercent = Math.min((MEDICATIONS_TAKEN / MEDICATIONS_TODAY) * 100, 100);

function getGreeting() {
  const hour = new Date().getHours();
  if (hour < 12) return "Good morning";
  if (hour < 18) return "Good afternoon";
  return "Good evening";
}

// ─── Pulse Animation Hook ───────────────────────────────────────────────────
function usePulse() {
  const scale = new Animated.Value(1);
  const opacity = new Animated.Value(0.6);

  useEffect(() => {
    const pulse = Animated.loop(
      Animated.sequence([
        Animated.parallel([
          Animated.timing(scale, {
            toValue: 1.5,
            duration: 1000,
            useNativeDriver: true,
          }),
          Animated.timing(opacity, {
            toValue: 0,
            duration: 1000,
            useNativeDriver: true,
          }),
        ]),
        Animated.parallel([
          Animated.timing(scale, {
            toValue: 1,
            duration: 0,
            useNativeDriver: true,
          }),
          Animated.timing(opacity, {
            toValue: 0.6,
            duration: 0,
            useNativeDriver: true,
          }),
        ]),
      ])
    );
    pulse.start();
    return () => pulse.stop();
  }, []);

  return { scale, opacity };
}

// ─── Pulse Ring Component ────────────────────────────────────────────────────
function PulseRing({ color, size = 12 }: { color: string; size?: number }) {
  const { scale, opacity } = usePulse();
  return (
    <Animated.View
      style={{
        position: "absolute",
        width: size,
        height: size,
        borderRadius: size / 2,
        backgroundColor: color,
        opacity,
        transform: [{ scale }],
      }}
    />
  );
}

// ─── Circular Progress ───────────────────────────────────────────────────────
function CircularProgress({
  percent,
  size,
  strokeWidth,
  color,
  bgColor,
  label,
  value,
}: {
  percent: number;
  size: number;
  strokeWidth: number;
  color: string;
  bgColor: string;
  label: string;
  value: string;
}) {
  const radius = size / 2;

  return (
    <View style={{ alignItems: "center", justifyContent: "center" }}>
      {/* Outer ring background */}
      <View
        style={{
          width: size,
          height: size,
          borderRadius: radius,
          borderWidth: strokeWidth,
          borderColor: bgColor,
          alignItems: "center",
          justifyContent: "center",
          position: "relative",
        }}
      >
        {/* Center content */}
        <View style={{ alignItems: "center", zIndex: 2 }}>
          <Text
            style={{
              fontSize: 18,
              fontWeight: "800",
              color: "#fff",
              letterSpacing: -0.5,
            }}
          >
            {value}
          </Text>
          <Text
            style={{
              fontSize: 9,
              fontWeight: "600",
              color: "rgba(255,255,255,0.5)",
              textTransform: "uppercase",
              letterSpacing: 0.8,
              marginTop: 1,
            }}
          >
            {label}
          </Text>
        </View>
      </View>

      {/* Foreground arc */}
      <View
        style={{
          position: "absolute",
          width: size,
          height: size,
          borderRadius: radius,
        }}
        // overflow="hidden"
      >
        <View
          style={{
            position: "absolute",
            width: size,
            height: size,
            borderRadius: radius,
            borderWidth: strokeWidth,
            borderColor: color,
            borderTopColor: "transparent",
            transform: [{ rotate: `${(percent / 100) * 360 - 90}deg` }],
          }}
        />
      </View>
    </View>
  );
}

// ─── Main Home Screen ────────────────────────────────────────────────────────
export default function Home() {
  const router = useRouter();

  return (
    <View style={styles.root}>
      <ScrollView
        style={styles.scroll}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* ═══════════════════════════════════════════════
            HEADER — Rich layered gradient with glowing orbs
        ═══════════════════════════════════════════════ */}
        <LinearGradient
          colors={["#0f172a", "#1e293b", "#0f172a"]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.header}
        >
          {/* Decorative orbs for depth */}
          <View style={styles.orbTopRight} />
          <View style={styles.orbTopRightInner} />
          <View style={styles.orbMidLeft} />
          <View style={styles.orbBottom} />
          <View style={styles.orbBottomSmall} />

          <SafeAreaView style={styles.headerInner}>
            {/* Top Row: Greeting + Avatar */}
            <View style={styles.headerTopRow}>
              <View>
                <Text style={styles.greeting}>{getGreeting()},</Text>
                <View style={styles.nameRow}>
                  <Text style={styles.userName}>{USER_NAME}</Text>
                  <Text style={{ fontSize: 20 }}>👋</Text>
                </View>
              </View>

              <TouchableOpacity style={styles.notifBtn}>
                <View style={styles.notifDot}>
                  <PulseRing color="#ef4444" size={16} />
                  <View style={styles.notifDotInner} />
                </View>
                <Ionicons name="notifications-outline" size={22} color="#fff" />
              </TouchableOpacity>
            </View>

            {/* ── Circular Progress Cards ── */}
            <View style={styles.progressRow}>
              {/* Fluid Circle */}
              <TouchableOpacity
                style={styles.progressCard}
                onPress={() => router.push("/(tabs)/fluid")}
                activeOpacity={0.8}
              >
                <LinearGradient
                  colors={["rgba(14,165,233,0.15)", "rgba(14,165,233,0.05)"]}
                  style={styles.progressCardBg}
                >
                  <View style={styles.progressCardInner}>
                    <CircularProgress
                      percent={fluidPercent}
                      size={88}
                      strokeWidth={8}
                      color="#38bdf8"
                      bgColor="rgba(56,189,248,0.15)"
                      label="ml"
                      value={`${FLUID_TAKEN}`}
                    />
                    <View style={styles.progressLabel}>
                      <View style={styles.progressLabelIconRow}>
                        <Ionicons
                          name="water-outline"
                          size={13}
                          color="#38bdf8"
                        />
                        <Text
                          style={[
                            styles.progressLabelText,
                            { color: "#38bdf8" },
                          ]}
                        >
                          Fluid
                        </Text>
                      </View>
                      <Text style={styles.progressLabelSub}>
                        of {FLUID_LIMIT}ml limit
                      </Text>
                    </View>
                  </View>
                </LinearGradient>
              </TouchableOpacity>

              {/* Medication Circle */}
              <TouchableOpacity
                style={styles.progressCard}
                onPress={() => router.push("/(tabs)/meds")}
                activeOpacity={0.8}
              >
                <LinearGradient
                  colors={["rgba(139,92,246,0.15)", "rgba(139,92,246,0.05)"]}
                  style={styles.progressCardBg}
                >
                  <View style={styles.progressCardInner}>
                    <CircularProgress
                      percent={medPercent}
                      size={88}
                      strokeWidth={8}
                      color="#a78bfa"
                      bgColor="rgba(167,139,250,0.15)"
                      label="taken"
                      value={`${MEDICATIONS_TAKEN}/${MEDICATIONS_TODAY}`}
                    />
                    <View style={styles.progressLabel}>
                      <View style={styles.progressLabelIconRow}>
                        <Ionicons
                          name="medical-outline"
                          size={13}
                          color="#a78bfa"
                        />
                        <Text
                          style={[
                            styles.progressLabelText,
                            { color: "#a78bfa" },
                          ]}
                        >
                          Meds
                        </Text>
                      </View>
                      <Text style={styles.progressLabelSub}>
                        {MEDICATIONS_TODAY - MEDICATIONS_TAKEN} remaining
                      </Text>
                    </View>
                  </View>
                </LinearGradient>
              </TouchableOpacity>

              {/* Health Status */}
              <TouchableOpacity style={styles.progressCard} activeOpacity={0.8}>
                <LinearGradient
                  colors={["rgba(52,211,153,0.15)", "rgba(52,211,153,0.05)"]}
                  style={styles.progressCardBg}
                >
                  <View style={styles.progressCardInner}>
                    <View style={styles.healthIconWrap}>
                      <View style={styles.healthIconBg}>
                        <PulseRing color="#34d399" size={52} />
                        <Ionicons
                          name="heart-outline"
                          size={28}
                          color="#34d399"
                        />
                      </View>
                    </View>
                    <View style={styles.progressLabel}>
                      <View style={styles.progressLabelIconRow}>
                        <View
                          style={[
                            styles.statusDot,
                            { backgroundColor: "#34d399" },
                          ]}
                        />
                        <Text
                          style={[
                            styles.progressLabelText,
                            { color: "#34d399" },
                          ]}
                        >
                          Health
                        </Text>
                      </View>
                      <Text style={styles.progressLabelSub}>Looking good!</Text>
                    </View>
                  </View>
                </LinearGradient>
              </TouchableOpacity>
            </View>
          </SafeAreaView>
        </LinearGradient>

        {/* ═══════════════════════════════════════════════
            NEXT MEDICATION — Glowing pill card
        ═══════════════════════════════════════════════ */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Next Up</Text>
          <TouchableOpacity onPress={() => router.push("/(tabs)/meds")}>
            <Text style={styles.sectionSeeAll}>View all →</Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity
          style={styles.nextMedOuter}
          onPress={() => router.push("/(tabs)/meds")}
          activeOpacity={0.88}
        >
          <LinearGradient
            colors={["#1e1b4b", "#312e81"]}
            style={styles.nextMedCard}
          >
            {/* Glow behind */}
            <View style={styles.nextMedGlow} />

            <View style={styles.nextMedLeft}>
              <View style={styles.nextMedIconWrap}>
                <Ionicons name="medical-outline" size={22} color="#a78bfa" />
              </View>
              <View>
                <Text style={styles.nextMedName}>{NEXT_MED.name}</Text>
                <Text style={styles.nextMedDose}>
                  {NEXT_MED.dosage} · 1 tablet
                </Text>
              </View>
            </View>

            <View style={styles.nextMedTimeBadge}>
              <Ionicons name="alarm-outline" size={14} color="#a78bfa" />
              <Text style={styles.nextMedTime}>{NEXT_MED.time}</Text>
            </View>
          </LinearGradient>
        </TouchableOpacity>

        {/* ═══════════════════════════════════════════════
            QUICK ACTIONS — Glassy rounded buttons
        ═══════════════════════════════════════════════ */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Quick Actions</Text>
        </View>

        <View style={styles.quickRow}>
          {[
            {
              icon: "water-outline",
              label: "Add Fluid",
              color: "#38bdf8",
              bg: "#0ea5e9",
              route: "/(tabs)/fluid",
            },
            {
              icon: "medical-outline",
              label: "Medications",
              color: "#a78bfa",
              bg: "#8b5cf6",
              route: "/(tabs)/meds",
            },
            {
              icon: "clipboard-outline",
              label: "Reports",
              color: "#34d399",
              bg: "#10b981",
              route: "/",
            },
            {
              icon: "person-outline",
              label: "Profile",
              color: "#fb923c",
              bg: "#f97316",
              route: "/",
            },
          ].map((action, i) => (
            <TouchableOpacity
              key={i}
              style={styles.quickAction}
              onPress={() => router.push(action.route as any)}
              activeOpacity={0.82}
            >
              <LinearGradient
                colors={[action.bg + "22", action.bg + "08"]}
                style={styles.quickIconWrap}
              >
                <Ionicons
                  name={action.icon as any}
                  size={22}
                  color={action.color}
                />
              </LinearGradient>
              <Text style={styles.quickLabel}>{action.label}</Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* ═══════════════════════════════════════════════
            APPOINTMENTS — Elegant list cards
        ═══════════════════════════════════════════════ */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Appointments</Text>
          <TouchableOpacity>
            <Text style={styles.sectionSeeAll}>See all →</Text>
          </TouchableOpacity>
        </View>

        {UPCOMING_APPOINTMENTS.map((appt, i) => (
          <TouchableOpacity key={i} style={styles.apptCard} activeOpacity={0.9}>
            {/* Left accent line */}
            <View
              style={[
                styles.apptAccent,
                { backgroundColor: i === 0 ? "#38bdf8" : "#a78bfa" },
              ]}
            />

            <View style={styles.apptDateBox}>
              <Text style={styles.apptDateMonth}>
                {appt.date.split(" ")[0]}
              </Text>
              <Text style={styles.apptDateDay}>{appt.date.split(" ")[1]}</Text>
            </View>

            <View style={styles.apptInfo}>
              <Text style={styles.apptTitle}>{appt.title}</Text>
              <View style={styles.apptMeta}>
                <Ionicons name="time-outline" size={12} color="#94a3b8" />
                <Text style={styles.apptMetaText}>{appt.time}</Text>
                <Text style={styles.apptMetaDot}>•</Text>
                <Ionicons name="location-outline" size={12} color="#94a3b8" />
                <Text style={styles.apptMetaText}>{appt.location}</Text>
              </View>
            </View>

            <View
              style={[
                styles.apptArrow,
                {
                  backgroundColor:
                    i === 0 ? "rgba(56,189,248,0.1)" : "rgba(167,139,250,0.1)",
                },
              ]}
            >
              <Ionicons
                name="chevron-forward-outline"
                size={16}
                color={i === 0 ? "#38bdf8" : "#a78bfa"}
              />
            </View>
          </TouchableOpacity>
        ))}

        {/* ═══════════════════════════════════════════════
            DAILY TIP — Soft bottom card
        ═══════════════════════════════════════════════ */}
        <View style={styles.tipCard}>
          <View style={styles.tipIconWrap}>
            <Ionicons name="bulb-outline" size={20} color="#fbbf24" />
          </View>
          <View style={styles.tipContent}>
            <Text style={styles.tipTitle}>Daily Tip</Text>
            <Text style={styles.tipText}>
              Staying hydrated within your limit helps your kidneys work more
              efficiently. Track every sip! 💧
            </Text>
          </View>
        </View>

        <View style={{ height: 34 }} />
      </ScrollView>
    </View>
  );
}

// ─── Styles ──────────────────────────────────────────────────────────────────
const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: "#f0f4f8",
  },
  scroll: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 10,
  },

  // ── Header ──
  header: {
    paddingBottom: 30,
    overflow: "hidden",
    position: "relative",
  },
  // Orbs
  orbTopRight: {
    position: "absolute",
    top: -60,
    right: -50,
    width: 200,
    height: 200,
    borderRadius: 100,
    backgroundColor: "rgba(14,165,233,0.13)",
  },
  orbTopRightInner: {
    position: "absolute",
    top: -20,
    right: -10,
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: "rgba(56,189,248,0.18)",
  },
  orbMidLeft: {
    position: "absolute",
    top: 80,
    left: -40,
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: "rgba(139,92,246,0.1)",
  },
  orbBottom: {
    position: "absolute",
    bottom: -40,
    right: 60,
    width: 140,
    height: 140,
    borderRadius: 70,
    backgroundColor: "rgba(52,211,153,0.08)",
  },
  orbBottomSmall: {
    position: "absolute",
    bottom: 10,
    left: 100,
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: "rgba(251,191,36,0.07)",
  },

  headerInner: {
    paddingHorizontal: 22,
    paddingTop: 14,
  },
  headerTopRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 28,
  },
  greeting: {
    fontSize: 14,
    color: "rgba(255,255,255,0.45)",
    fontWeight: "500",
    letterSpacing: 0.4,
  },
  nameRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginTop: 3,
  },
  userName: {
    fontSize: 28,
    color: "#fff",
    fontWeight: "800",
    letterSpacing: -0.8,
  },
  notifBtn: {
    width: 44,
    height: 44,
    borderRadius: 14,
    backgroundColor: "rgba(255,255,255,0.07)",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.1)",
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
  },
  notifDot: {
    position: "absolute",
    top: 8,
    right: 8,
    width: 8,
    height: 8,
    alignItems: "center",
    justifyContent: "center",
  },
  notifDotInner: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#ef4444",
    zIndex: 1,
  },

  // Progress Cards Row
  progressRow: {
    flexDirection: "row",
    gap: 10,
  },
  progressCard: {
    flex: 1,
    borderRadius: 20,
    overflow: "hidden",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.08)",
  },
  progressCardBg: {
    flex: 1,
    borderRadius: 20,
  },
  progressCardInner: {
    padding: 14,
    alignItems: "center",
    gap: 12,
  },
  healthIconWrap: {
    width: 88,
    height: 88,
    alignItems: "center",
    justifyContent: "center",
  },
  healthIconBg: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: "rgba(52,211,153,0.15)",
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
  },
  progressLabel: {
    alignItems: "center",
    gap: 2,
  },
  progressLabelIconRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
  },
  progressLabelText: {
    fontSize: 11,
    fontWeight: "700",
    letterSpacing: 0.6,
    textTransform: "uppercase",
  },
  progressLabelSub: {
    fontSize: 10,
    color: "rgba(255,255,255,0.35)",
    fontWeight: "500",
  },
  statusDot: {
    width: 7,
    height: 7,
    borderRadius: 4,
  },

  // ── Section Headers ──
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 22,
    marginTop: 26,
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "800",
    color: "#0f172a",
    letterSpacing: -0.4,
  },
  sectionSeeAll: {
    fontSize: 13,
    color: "#38bdf8",
    fontWeight: "600",
  },

  // ── Next Medication ──
  nextMedOuter: {
    marginHorizontal: 22,
    borderRadius: 20,
    overflow: "hidden",
    shadowColor: "#8b5cf6",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.25,
    shadowRadius: 16,
    elevation: 8,
  },
  nextMedCard: {
    borderRadius: 20,
    paddingVertical: 18,
    paddingHorizontal: 18,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    position: "relative",
    overflow: "hidden",
  },
  nextMedGlow: {
    position: "absolute",
    top: -30,
    right: -30,
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: "rgba(167,139,250,0.2)",
  },
  nextMedLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: 14,
    zIndex: 1,
  },
  nextMedIconWrap: {
    width: 50,
    height: 50,
    borderRadius: 16,
    backgroundColor: "rgba(167,139,250,0.18)",
    alignItems: "center",
    justifyContent: "center",
  },
  nextMedName: {
    fontSize: 15,
    fontWeight: "700",
    color: "#fff",
    letterSpacing: -0.2,
  },
  nextMedDose: {
    fontSize: 12,
    color: "rgba(255,255,255,0.45)",
    marginTop: 2,
  },
  nextMedTimeBadge: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    backgroundColor: "rgba(167,139,250,0.2)",
    paddingHorizontal: 12,
    paddingVertical: 7,
    borderRadius: 22,
    zIndex: 1,
  },
  nextMedTime: {
    fontSize: 13,
    fontWeight: "700",
    color: "#a78bfa",
  },

  // ── Quick Actions ──
  quickRow: {
    flexDirection: "row",
    paddingHorizontal: 22,
    gap: 10,
  },
  quickAction: {
    flex: 1,
    backgroundColor: "#fff",
    borderRadius: 18,
    paddingVertical: 18,
    alignItems: "center",
    gap: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.07,
    shadowRadius: 8,
    elevation: 3,
    borderWidth: 1,
    borderColor: "rgba(0,0,0,0.04)",
  },
  quickIconWrap: {
    width: 50,
    height: 50,
    borderRadius: 16,
    alignItems: "center",
    justifyContent: "center",
  },
  quickLabel: {
    fontSize: 11,
    fontWeight: "700",
    color: "#475569",
    textAlign: "center",
    letterSpacing: 0.1,
  },

  // ── Appointments ──
  apptCard: {
    marginHorizontal: 22,
    marginBottom: 10,
    backgroundColor: "#fff",
    borderRadius: 18,
    paddingVertical: 16,
    paddingHorizontal: 16,
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 2,
    borderWidth: 1,
    borderColor: "rgba(0,0,0,0.04)",
    overflow: "hidden",
  },
  apptAccent: {
    position: "absolute",
    left: 0,
    top: 0,
    bottom: 0,
    width: 4,
    borderRadius: 0,
  },
  apptDateBox: {
    width: 48,
    height: 52,
    borderRadius: 14,
    backgroundColor: "#f1f5f9",
    alignItems: "center",
    justifyContent: "center",
    gap: 0,
    marginLeft: 6,
  },
  apptDateMonth: {
    fontSize: 10,
    fontWeight: "700",
    color: "#64748b",
    textTransform: "uppercase",
    letterSpacing: 0.6,
  },
  apptDateDay: {
    fontSize: 18,
    fontWeight: "800",
    color: "#0f172a",
    letterSpacing: -0.5,
  },
  apptInfo: {
    flex: 1,
  },
  apptTitle: {
    fontSize: 14,
    fontWeight: "700",
    color: "#0f172a",
    marginBottom: 4,
    letterSpacing: -0.2,
  },
  apptMeta: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
  },
  apptMetaText: {
    fontSize: 12,
    color: "#94a3b8",
    fontWeight: "500",
  },
  apptMetaDot: {
    fontSize: 8,
    color: "#cbd5e1",
  },
  apptArrow: {
    width: 34,
    height: 34,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
  },

  // ── Daily Tip ──
  tipCard: {
    marginHorizontal: 22,
    marginTop: 22,
    backgroundColor: "#fefce8",
    borderRadius: 18,
    paddingVertical: 18,
    paddingHorizontal: 18,
    flexDirection: "row",
    alignItems: "flex-start",
    gap: 14,
    borderWidth: 1,
    borderColor: "#fef08a",
    shadowColor: "#fbbf24",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 3,
  },
  tipIconWrap: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: "#fef9c3",
    alignItems: "center",
    justifyContent: "center",
    flexShrink: 0,
  },
  tipContent: {
    flex: 1,
  },
  tipTitle: {
    fontSize: 13,
    fontWeight: "700",
    color: "#92400e",
    marginBottom: 3,
    letterSpacing: 0.2,
  },
  tipText: {
    fontSize: 12,
    color: "#78716c",
    lineHeight: 18,
    fontWeight: "500",
  },
});

//dfjkfkjffkjfjkfdfkfkldjjkfdjfdjdfkfdjfddfjdkdf

// import { Ionicons } from "@expo/vector-icons";
// import { LinearGradient } from "expo-linear-gradient";
// import { useRouter } from "expo-router";
// import React from "react";
// import {
//   Dimensions,
//   ScrollView,
//   StyleSheet,
//   Text,
//   TouchableOpacity,
//   View,
// } from "react-native";
// import { SafeAreaView } from "react-native-safe-area-context";

// const { width } = Dimensions.get("window");

// // ─── Mock Data (replace with your real API calls) ───────────────────────────
// const USER_NAME = "Sarah";
// const FLUID_TAKEN = 850;
// const FLUID_LIMIT = 1500;
// const MEDICATIONS_TODAY = 3;
// const MEDICATIONS_TAKEN = 1;
// const NEXT_MED = {
//   name: "Blood Pressure Pill",
//   time: "2:00 PM",
//   dosage: "100mg",
// };
// const UPCOMING_APPOINTMENTS = [
//   {
//     title: "Dialysis Session",
//     date: "Feb 3",
//     time: "9:00 AM",
//     location: "Renal Center",
//   },
//   {
//     title: "Dr. Chen Follow-up",
//     date: "Feb 7",
//     time: "11:30 AM",
//     location: "Nephrology Clinic",
//   },
// ];

// // ─── Helper ──────────────────────────────────────────────────────────────────
// const fluidPercent = Math.min((FLUID_TAKEN / FLUID_LIMIT) * 100, 100);
// const medPercent = Math.min((MEDICATIONS_TAKEN / MEDICATIONS_TODAY) * 100, 100);

// function getGreeting() {
//   const hour = new Date().getHours();
//   if (hour < 12) return "Good morning";
//   if (hour < 18) return "Good afternoon";
//   return "Good evening";
// }

// // ─── Components ──────────────────────────────────────────────────────────────

// /** Animated circular progress ring */
// function ProgressRing({
//   radius,
//   stroke,
//   progress,
//   color,
//   bgColor,
//   children,
// }: {
//   radius: number;
//   stroke: number;
//   progress: number;
//   color: string;
//   bgColor: string;
//   children?: React.ReactNode;
// }) {
//   const circumference = 2 * Math.PI * radius;
//   const strokeDashoffset = circumference - (progress / 100) * circumference;

//   return (
//     <View style={{ alignItems: "center", justifyContent: "center" }}>
//       <View style={{ position: "absolute", zIndex: 1 }}>{children}</View>
//       <View>
//         {/* Background circle */}
//         <View
//           style={{
//             width: radius * 2 + stroke,
//             height: radius * 2 + stroke,
//             borderRadius: radius + stroke / 2,
//             borderWidth: stroke,
//             borderColor: bgColor,
//             position: "absolute",
//           }}
//         />
//         {/* Foreground arc using a rotated border trick */}
//         <View
//           style={{
//             width: radius * 2 + stroke,
//             height: radius * 2 + stroke,
//             borderRadius: radius + stroke / 2,
//             borderWidth: stroke,
//             borderColor: color,
//             borderTopColor: "transparent",
//             borderRightColor: progress > 25 ? color : "transparent",
//             borderBottomColor: progress > 50 ? color : "transparent",
//             borderLeftColor: progress > 75 ? color : "transparent",
//             transform: [{ rotate: `${(progress / 100) * 360 - 90}deg` }],
//           }}
//         />
//       </View>
//     </View>
//   );
// }

// /** A single stat card on the header */
// function StatBadge({
//   icon,
//   label,
//   value,
//   color,
// }: {
//   icon: string;
//   label: string;
//   value: string;
//   color: string;
// }) {
//   return (
//     <View
//       style={[
//         styles.statBadge,
//         { backgroundColor: color + "18", borderColor: color + "30" },
//       ]}
//     >
//       <View style={[styles.statIcon, { backgroundColor: color + "22" }]}>
//         <Ionicons name={icon as any} size={16} color={color} />
//       </View>
//       <Text style={[styles.statValue, { color }]}>{value}</Text>
//       <Text style={styles.statLabel}>{label}</Text>
//     </View>
//   );
// }

// // ─── Main Screen ─────────────────────────────────────────────────────────────
// export default function Home() {
//   const router = useRouter();

//   return (
//     <View style={styles.root}>
//       <ScrollView
//         style={styles.scroll}
//         showsVerticalScrollIndicator={false}
//         contentContainerStyle={styles.scrollContent}
//       >
//         {/* ══════════ HEADER ══════════ */}
//         <LinearGradient
//           colors={["#1e3a5f", "#0f2d4a", "#162d4a"]}
//           start={{ x: 0, y: 0 }}
//           end={{ x: 1, y: 1 }}
//           style={styles.header}
//         >
//           {/* Decorative blobs */}
//           <View style={styles.blobTopRight} />
//           <View style={styles.blobBottomLeft} />

//           <SafeAreaView style={styles.headerInner}>
//             {/* Top Row */}
//             <View style={styles.headerTopRow}>
//               <View>
//                 <Text style={styles.greeting}>{getGreeting()},</Text>
//                 <Text style={styles.userName}>{USER_NAME} ✨</Text>
//               </View>
//               <TouchableOpacity style={styles.avatarBtn}>
//                 <LinearGradient
//                   colors={["#38bdf8", "#6366f1"]}
//                   style={styles.avatar}
//                 >
//                   <Text style={styles.avatarText}>
//                     {USER_NAME.charAt(0).toUpperCase()}
//                   </Text>
//                 </LinearGradient>
//               </TouchableOpacity>
//             </View>

//             {/* Stat Badges */}
//             <View style={styles.statRow}>
//               <StatBadge
//                 icon="water-outline"
//                 label="Fluid"
//                 value={`${FLUID_TAKEN}ml`}
//                 color="#38bdf8"
//               />
//               <StatBadge
//                 icon="medical-outline"
//                 label="Meds"
//                 value={`${MEDICATIONS_TAKEN}/${MEDICATIONS_TODAY}`}
//                 color="#a78bfa"
//               />
//               <StatBadge
//                 icon="heart-outline"
//                 label="Status"
//                 value="Good"
//                 color="#34d399"
//               />
//             </View>
//           </SafeAreaView>
//         </LinearGradient>

//         {/* ══════════ FLUID + MED CARDS ══════════ */}
//         <View style={styles.cardRow}>
//           {/* Fluid Card */}
//           <TouchableOpacity
//             style={styles.cardHalf}
//             onPress={() => router.push("/(tabs)/fluid")}
//             activeOpacity={0.85}
//           >
//             <LinearGradient
//               colors={["#0ea5e9", "#0284c7"]}
//               style={styles.cardGradient}
//             >
//               <View style={styles.cardGradientInner}>
//                 <View style={styles.cardHeader}>
//                   <View style={styles.cardIconWrap}>
//                     <Ionicons name="water-outline" size={18} color="#fff" />
//                   </View>
//                   <Ionicons
//                     name="chevron-forward-outline"
//                     size={16}
//                     color="rgba(255,255,255,0.6)"
//                   />
//                 </View>

//                 <Text style={styles.cardTitle}>Fluid</Text>

//                 {/* Mini progress bar */}
//                 <View style={styles.miniBarBg}>
//                   <View
//                     style={[
//                       styles.miniBarFill,
//                       {
//                         width: `${fluidPercent}%`,
//                         backgroundColor:
//                           fluidPercent > 80 ? "#f87171" : "#7dd3fc",
//                       },
//                     ]}
//                   />
//                 </View>

//                 <Text style={styles.cardValue}>
//                   {FLUID_TAKEN}
//                   <Text style={styles.cardValueSub}>/{FLUID_LIMIT} ml</Text>
//                 </Text>
//                 <Text style={styles.cardPercent}>
//                   {fluidPercent.toFixed(0)}% of daily limit
//                 </Text>
//               </View>
//             </LinearGradient>
//           </TouchableOpacity>

//           {/* Medication Card */}
//           <TouchableOpacity
//             style={styles.cardHalf}
//             onPress={() => router.push("/(tabs)/meds")}
//             activeOpacity={0.85}
//           >
//             <LinearGradient
//               colors={["#8b5cf6", "#7c3aed"]}
//               style={styles.cardGradient}
//             >
//               <View style={styles.cardGradientInner}>
//                 <View style={styles.cardHeader}>
//                   <View style={styles.cardIconWrap}>
//                     <Ionicons name="medical-outline" size={18} color="#fff" />
//                   </View>
//                   <Ionicons
//                     name="chevron-forward-outline"
//                     size={16}
//                     color="rgba(255,255,255,0.6)"
//                   />
//                 </View>

//                 <Text style={styles.cardTitle}>Medication</Text>

//                 <View style={styles.miniBarBg}>
//                   <View
//                     style={[
//                       styles.miniBarFill,
//                       {
//                         width: `${medPercent}%`,
//                         backgroundColor: "#c4b5fd",
//                       },
//                     ]}
//                   />
//                 </View>

//                 <Text style={styles.cardValue}>
//                   {MEDICATIONS_TAKEN}
//                   <Text style={styles.cardValueSub}>
//                     /{MEDICATIONS_TODAY} taken
//                   </Text>
//                 </Text>
//                 <Text style={styles.cardPercent}>
//                   {MEDICATIONS_TODAY - MEDICATIONS_TAKEN} remaining today
//                 </Text>
//               </View>
//             </LinearGradient>
//           </TouchableOpacity>
//         </View>

//         {/* ══════════ NEXT MEDICATION ══════════ */}
//         <View style={styles.sectionHeader}>
//           <Text style={styles.sectionTitle}>Next Medication</Text>
//         </View>

//         <TouchableOpacity
//           style={styles.nextMedCard}
//           onPress={() => router.push("/(tabs)/meds")}
//           activeOpacity={0.9}
//         >
//           <View style={styles.nextMedLeft}>
//             <View style={styles.nextMedIconWrap}>
//               <Ionicons name="alarm-outline" size={22} color="#8b5cf6" />
//             </View>
//             <View>
//               <Text style={styles.nextMedName}>{NEXT_MED.name}</Text>
//               <Text style={styles.nextMedDose}>{NEXT_MED.dosage}</Text>
//             </View>
//           </View>
//           <View style={styles.nextMedTimeBadge}>
//             <Ionicons name="time-outline" size={13} color="#8b5cf6" />
//             <Text style={styles.nextMedTime}>{NEXT_MED.time}</Text>
//           </View>
//         </TouchableOpacity>

//         {/* ══════════ QUICK ACTIONS ══════════ */}
//         <View style={styles.sectionHeader}>
//           <Text style={styles.sectionTitle}>Quick Actions</Text>
//         </View>

//         <View style={styles.quickRow}>
//           {[
//             {
//               icon: "water-outline",
//               label: "Add Fluid",
//               color: "#0ea5e9",
//               route: "/(tabs)/fluid",
//             },
//             {
//               icon: "medical-outline",
//               label: "Medications",
//               color: "#8b5cf6",
//               route: "/(tabs)/meds",
//             },
//             {
//               icon: "clipboard-outline",
//               label: "Reports",
//               color: "#10b981",
//               route: "/",
//             },
//             {
//               icon: "settings-outline",
//               label: "Settings",
//               color: "#f59e0b",
//               route: "/",
//             },
//           ].map((action, i) => (
//             <TouchableOpacity
//               key={i}
//               style={styles.quickAction}
//               onPress={() => router.push(action.route as any)}
//               activeOpacity={0.85}
//             >
//               <View
//                 style={[
//                   styles.quickIconWrap,
//                   { backgroundColor: action.color + "12" },
//                 ]}
//               >
//                 <Ionicons
//                   name={action.icon as any}
//                   size={22}
//                   color={action.color}
//                 />
//               </View>
//               <Text style={styles.quickLabel}>{action.label}</Text>
//             </TouchableOpacity>
//           ))}
//         </View>

//         {/* ══════════ UPCOMING APPOINTMENTS ══════════ */}
//         <View style={styles.sectionHeader}>
//           <Text style={styles.sectionTitle}>Appointments</Text>
//           <TouchableOpacity>
//             <Text style={styles.sectionSeeAll}>See all →</Text>
//           </TouchableOpacity>
//         </View>

//         {UPCOMING_APPOINTMENTS.map((appt, i) => (
//           <View key={i} style={styles.apptCard}>
//             <View style={styles.apptDateBox}>
//               <Text style={styles.apptDateMonth}>
//                 {appt.date.split(" ")[0]}
//               </Text>
//               <Text style={styles.apptDateDay}>{appt.date.split(" ")[1]}</Text>
//             </View>
//             <View style={styles.apptInfo}>
//               <Text style={styles.apptTitle}>{appt.title}</Text>
//               <View style={styles.apptMeta}>
//                 <Ionicons name="time-outline" size={12} color="#94a3b8" />
//                 <Text style={styles.apptMetaText}>{appt.time}</Text>
//                 <Text style={styles.apptMetaDot}>•</Text>
//                 <Ionicons name="location-outline" size={12} color="#94a3b8" />
//                 <Text style={styles.apptMetaText}>{appt.location}</Text>
//               </View>
//             </View>
//             <TouchableOpacity style={styles.apptArrow}>
//               <Ionicons
//                 name="chevron-forward-outline"
//                 size={18}
//                 color="#cbd5e1"
//               />
//             </TouchableOpacity>
//           </View>
//         ))}

//         {/* Bottom spacer */}
//         <View style={{ height: 30 }} />
//       </ScrollView>
//     </View>
//   );
// }

// // ─── Styles ──────────────────────────────────────────────────────────────────
// const styles = StyleSheet.create({
//   root: {
//     flex: 1,
//     backgroundColor: "#f1f5f9",
//   },
//   scroll: {
//     flex: 1,
//   },
//   scrollContent: {
//     paddingBottom: 20,
//   },

//   // ── Header ──
//   header: {
//     paddingBottom: 28,
//     overflow: "hidden",
//     position: "relative",
//   },
//   blobTopRight: {
//     position: "absolute",
//     top: -40,
//     right: -40,
//     width: 160,
//     height: 160,
//     borderRadius: 80,
//     backgroundColor: "rgba(56,189,248,0.12)",
//   },
//   blobBottomLeft: {
//     position: "absolute",
//     bottom: -30,
//     left: -30,
//     width: 120,
//     height: 120,
//     borderRadius: 60,
//     backgroundColor: "rgba(99,102,241,0.15)",
//   },
//   headerInner: {
//     paddingHorizontal: 22,
//     paddingTop: 16,
//   },
//   headerTopRow: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     alignItems: "flex-end",
//     marginBottom: 24,
//   },
//   greeting: {
//     fontSize: 15,
//     color: "rgba(255,255,255,0.55)",
//     fontWeight: "500",
//     letterSpacing: 0.3,
//   },
//   userName: {
//     fontSize: 26,
//     color: "#fff",
//     fontWeight: "700",
//     letterSpacing: -0.5,
//     marginTop: 2,
//   },
//   avatarBtn: {},
//   avatar: {
//     width: 44,
//     height: 44,
//     borderRadius: 22,
//     alignItems: "center",
//     justifyContent: "center",
//     shadowColor: "#6366f1",
//     shadowOffset: { width: 0, height: 4 },
//     shadowOpacity: 0.4,
//     shadowRadius: 8,
//   },
//   avatarText: {
//     fontSize: 18,
//     fontWeight: "700",
//     color: "#fff",
//   },
//   statRow: {
//     flexDirection: "row",
//     gap: 10,
//   },
//   statBadge: {
//     flex: 1,
//     borderRadius: 14,
//     paddingVertical: 12,
//     paddingHorizontal: 10,
//     alignItems: "center",
//     borderWidth: 1,
//   },
//   statIcon: {
//     width: 32,
//     height: 32,
//     borderRadius: 10,
//     alignItems: "center",
//     justifyContent: "center",
//     marginBottom: 6,
//   },
//   statValue: {
//     fontSize: 15,
//     fontWeight: "700",
//   },
//   statLabel: {
//     fontSize: 11,
//     color: "rgba(255,255,255,0.5)",
//     marginTop: 2,
//     fontWeight: "500",
//   },

//   // ── Cards Row ──
//   cardRow: {
//     flexDirection: "row",
//     gap: 12,
//     paddingHorizontal: 22,
//     marginTop: 22,
//   },
//   cardHalf: {
//     flex: 1,
//     borderRadius: 20,
//     overflow: "hidden",
//     shadowColor: "#000",
//     shadowOffset: { width: 0, height: 6 },
//     shadowOpacity: 0.15,
//     shadowRadius: 12,
//     elevation: 6,
//   },
//   cardGradient: {
//     flex: 1,
//     borderRadius: 20,
//   },
//   cardGradientInner: {
//     padding: 18,
//   },
//   cardHeader: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     alignItems: "center",
//     marginBottom: 12,
//   },
//   cardIconWrap: {
//     width: 36,
//     height: 36,
//     borderRadius: 12,
//     backgroundColor: "rgba(255,255,255,0.2)",
//     alignItems: "center",
//     justifyContent: "center",
//   },
//   cardTitle: {
//     fontSize: 13,
//     color: "rgba(255,255,255,0.7)",
//     fontWeight: "600",
//     letterSpacing: 0.5,
//     textTransform: "uppercase",
//     marginBottom: 10,
//   },
//   miniBarBg: {
//     height: 5,
//     borderRadius: 3,
//     backgroundColor: "rgba(255,255,255,0.2)",
//     overflow: "hidden",
//     marginBottom: 12,
//   },
//   miniBarFill: {
//     height: "100%",
//     borderRadius: 3,
//   },
//   cardValue: {
//     fontSize: 24,
//     fontWeight: "700",
//     color: "#fff",
//     letterSpacing: -0.5,
//   },
//   cardValueSub: {
//     fontSize: 13,
//     fontWeight: "500",
//     color: "rgba(255,255,255,0.55)",
//   },
//   cardPercent: {
//     fontSize: 11,
//     color: "rgba(255,255,255,0.5)",
//     marginTop: 4,
//     fontWeight: "500",
//   },

//   // ── Section Headers ──
//   sectionHeader: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     alignItems: "center",
//     paddingHorizontal: 22,
//     marginTop: 28,
//     marginBottom: 12,
//   },
//   sectionTitle: {
//     fontSize: 17,
//     fontWeight: "700",
//     color: "#1e293b",
//     letterSpacing: -0.3,
//   },
//   sectionSeeAll: {
//     fontSize: 13,
//     color: "#0ea5e9",
//     fontWeight: "600",
//   },

//   // ── Next Medication ──
//   nextMedCard: {
//     marginHorizontal: 22,
//     backgroundColor: "#fff",
//     borderRadius: 18,
//     paddingVertical: 16,
//     paddingHorizontal: 18,
//     flexDirection: "row",
//     alignItems: "center",
//     justifyContent: "space-between",
//     shadowColor: "#8b5cf6",
//     shadowOffset: { width: 0, height: 4 },
//     shadowOpacity: 0.12,
//     shadowRadius: 10,
//     elevation: 4,
//     borderWidth: 1,
//     borderColor: "#ede9fe",
//   },
//   nextMedLeft: {
//     flexDirection: "row",
//     alignItems: "center",
//     gap: 14,
//   },
//   nextMedIconWrap: {
//     width: 46,
//     height: 46,
//     borderRadius: 14,
//     backgroundColor: "#ede9fe",
//     alignItems: "center",
//     justifyContent: "center",
//   },
//   nextMedName: {
//     fontSize: 15,
//     fontWeight: "600",
//     color: "#1e293b",
//   },
//   nextMedDose: {
//     fontSize: 12,
//     color: "#94a3b8",
//     marginTop: 2,
//   },
//   nextMedTimeBadge: {
//     flexDirection: "row",
//     alignItems: "center",
//     gap: 5,
//     backgroundColor: "#ede9fe",
//     paddingHorizontal: 10,
//     paddingVertical: 6,
//     borderRadius: 20,
//   },
//   nextMedTime: {
//     fontSize: 13,
//     fontWeight: "600",
//     color: "#8b5cf6",
//   },

//   // ── Quick Actions ──
//   quickRow: {
//     flexDirection: "row",
//     paddingHorizontal: 22,
//     gap: 10,
//   },
//   quickAction: {
//     flex: 1,
//     backgroundColor: "#fff",
//     borderRadius: 16,
//     paddingVertical: 16,
//     alignItems: "center",
//     gap: 10,
//     shadowColor: "#000",
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.06,
//     shadowRadius: 6,
//     elevation: 3,
//   },
//   quickIconWrap: {
//     width: 48,
//     height: 48,
//     borderRadius: 14,
//     alignItems: "center",
//     justifyContent: "center",
//   },
//   quickLabel: {
//     fontSize: 11,
//     fontWeight: "600",
//     color: "#64748b",
//     textAlign: "center",
//   },

//   // ── Appointments ──
//   apptCard: {
//     marginHorizontal: 22,
//     marginBottom: 10,
//     backgroundColor: "#fff",
//     borderRadius: 16,
//     paddingVertical: 14,
//     paddingHorizontal: 16,
//     flexDirection: "row",
//     alignItems: "center",
//     gap: 14,
//     shadowColor: "#000",
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.05,
//     shadowRadius: 6,
//     elevation: 2,
//   },
//   apptDateBox: {
//     width: 46,
//     height: 50,
//     borderRadius: 12,
//     backgroundColor: "#f0f9ff",
//     borderWidth: 1,
//     borderColor: "#bae6fd",
//     alignItems: "center",
//     justifyContent: "center",
//     gap: 0,
//   },
//   apptDateMonth: {
//     fontSize: 10,
//     fontWeight: "700",
//     color: "#0ea5e9",
//     textTransform: "uppercase",
//     letterSpacing: 0.5,
//   },
//   apptDateDay: {
//     fontSize: 17,
//     fontWeight: "700",
//     color: "#0c4a6e",
//   },
//   apptInfo: {
//     flex: 1,
//   },
//   apptTitle: {
//     fontSize: 14,
//     fontWeight: "600",
//     color: "#1e293b",
//     marginBottom: 4,
//   },
//   apptMeta: {
//     flexDirection: "row",
//     alignItems: "center",
//     gap: 5,
//   },
//   apptMetaText: {
//     fontSize: 12,
//     color: "#94a3b8",
//   },
//   apptMetaDot: {
//     fontSize: 10,
//     color: "#cbd5e1",
//   },
//   apptArrow: {
//     width: 32,
//     height: 32,
//     borderRadius: 10,
//     backgroundColor: "#f1f5f9",
//     alignItems: "center",
//     justifyContent: "center",
//   },
// });
