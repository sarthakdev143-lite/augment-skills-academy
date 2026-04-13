import { Document, Page, StyleSheet, Text, View } from "@react-pdf/renderer";

const styles = StyleSheet.create({
  page: { padding: 40 },
  title: { fontSize: 28, marginBottom: 20 },
  line: { fontSize: 14, marginBottom: 8 },
});

type CertificatePdfProps = {
  studentName: string;
  courseName: string;
  completionDate: string;
  certificateId: string;
};

export function CertificatePdf(props: CertificatePdfProps) {
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View>
          <Text style={styles.title}>Certificate of Completion</Text>
          <Text style={styles.line}>This certifies {props.studentName}</Text>
          <Text style={styles.line}>completed {props.courseName}</Text>
          <Text style={styles.line}>on {props.completionDate}</Text>
          <Text style={styles.line}>Certificate ID: {props.certificateId}</Text>
        </View>
      </Page>
    </Document>
  );
}
