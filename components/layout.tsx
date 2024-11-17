
import Link from 'next/link'

export default function Layout({ children }) {
  return (
    <div className="min-h-screen flex flex-col">
      <header className="bg-blue-600 text-white p-4">
        <nav className="container mx-auto flex justify-between items-center">
          <Link href="/" className="text-2xl font-bold">
            Südtirol Taxi & Mietwagen
          </Link>
          <div className="space-x-4">
            <Link href="/customer" className="hover:underline">Kunden</Link>
            <Link href="/driver" className="hover:underline">Fahrer</Link>
            <Link href="/admin" className="hover:underline">Admin</Link>
          </div>
        </nav>
      </header>
      <main className="flex-grow container mx-auto p-4">
        {children}
      </main>
      <footer className="bg-gray-200 p-4">
        <div className="container mx-auto text-center">
          © 2023 Südtirol Taxi & Mietwagen
        </div>
      </footer>
    </div>
  )
}
