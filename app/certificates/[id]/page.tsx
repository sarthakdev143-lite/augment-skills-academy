import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { getCertificateVerificationRecord } from "@/lib/courses";
import { formatDate } from "@/lib/utils";

type PageProps = {
  params: Promise<{ id: string }>;
};

export default async function CertificateVerificationPage({ params }: PageProps) {
  const { id } = await params;
  const data = await getCertificateVerificationRecord(id);

  return (
    <main className="mx-auto max-w-3xl px-6 py-16">
      <Badge>Verification</Badge>
      <h1 className="mt-4 text-4xl font-semibold">Certificate verification</h1>
      {data ? (
        <Card className="mt-8">
          <p className="text-sm uppercase tracking-[0.18em] text-muted">
            Valid certificate
          </p>
          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            <div>
              <p className="text-sm text-muted">Certificate ID</p>
              <p className="mt-1 font-mono text-sm">{id}</p>
            </div>
            <div>
              <p className="text-sm text-muted">Completion date</p>
              <p className="mt-1 font-medium">{formatDate(data.completion_date)}</p>
            </div>
            <div>
              <p className="text-sm text-muted">Learner</p>
              <p className="mt-1 font-medium">{data.student_name}</p>
            </div>
            <div>
              <p className="text-sm text-muted">Course</p>
              <p className="mt-1 font-medium">{data.course_name}</p>
            </div>
          </div>
        </Card>
      ) : (
        <Card className="mt-8">
          <p className="text-lg font-semibold">Certificate not found</p>
          <p className="mt-3 text-sm leading-7 text-muted">
            Double-check the certificate ID or contact support if you believe
            this record should exist.
          </p>
        </Card>
      )}
    </main>
  );
}
