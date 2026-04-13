type WelcomeEmailProps = {
  userName: string;
};

export function WelcomeEmail({ userName }: WelcomeEmailProps) {
  return (
    <div>
      <h1>Welcome to Augment Skills Academy</h1>
      <p>Hi {userName}, your account is ready. Start your first course now.</p>
    </div>
  );
}
