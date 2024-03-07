export const metadata = {
  title: 'Crypto News',
  description: 'Best blogs in world of crypto currency',
}
import "@styles/globals.css";
import Nav from "@components/Nav";
import Provider from "@components/Provider";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <Provider session={null}>
          <div className="main">
            <div className="gradient">

            </div>
          </div>
          <main className="app">
            <Nav />
            {children}
          </main>
        </Provider>
      </body>
    </html>
  )
}
