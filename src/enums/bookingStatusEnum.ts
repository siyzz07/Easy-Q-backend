enum BookingStatus {
  PENDING = "pending",
  CONFIRMED = "confirmed",
  CANCELLED = "cancelled",
  COMPLETED = "completed",
  NO_SHOW = "no_show",
  RESCHEDULED = "rescheduled"
}

// in cancelaton
// check on cop
// • Cancel before X hours → Full refund
// • Cancel within X hours → Partial refund
// • No-show → No refund

// Before service time	✅
// After service started	❌
// Completed booking	❌
// Already cancelled	❌


// in reschedule
// Scenario	Allowed
// Before service time	✅
// After service started	❌
// Cancelled booking	❌
// Exceeded reschedule limit	❌

// • Max reschedules: 1 or 2
// • Reschedule before X hours
// • Slot availability must be checked
