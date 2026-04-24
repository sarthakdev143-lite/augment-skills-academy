type EnrollmentConfirmationProps = {
  studentName: string;
  courseName: string;
  selectedTrack?: string;
};

export function EnrollmentConfirmation({
  studentName,
  courseName,
  selectedTrack,
}: EnrollmentConfirmationProps) {
  return (
    <div style={{ fontFamily: "Arial, sans-serif", color: "#111827", lineHeight: 1.6 }}>
      <h1 style={{ fontSize: "24px" }}>You're enrolled at Augment Skills Academy 🎉</h1>
      <p>Thank you {studentName}!</p>
      <p>
        We received your enrollment for {courseName}
        {selectedTrack ? ` (${selectedTrack})` : ""}.
      </p>
      <p>Our team will reach out within 24 hours to confirm your spot and share next steps.</p>
      <p>Reply to this email if you have questions.</p>
      <p>Team at Augment Skills Academy | augmentskillacademy@gmail.com</p>
    </div>
  );
}
