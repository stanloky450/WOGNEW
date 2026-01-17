export default function AuthLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <div id="auth-isolation-layout">
          {children}
        </div>
      </body>
    </html>
  )
}
