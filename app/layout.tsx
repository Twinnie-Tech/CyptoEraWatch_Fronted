export const metadata = {
  title: 'Crypto News',
  description: 'Best blogs in world of crypto currency',
}
import "../css/output.css";
import Nav from "@components/Nav";
import Provider from "@components/Provider";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { UserProvider } from "./context/UserContext";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <ToastContainer />
        <Provider session={null}>
          <div className="main">
            <div className="gradient">

            </div>
          </div>
          <main className="app">
            <Nav />
            <UserProvider>
            {children}
            </UserProvider>
          </main>
        </Provider>
      </body>
    </html>
  )
}
