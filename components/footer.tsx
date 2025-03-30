export default function Footer() {
  return (
    <footer className="bg-gradient-to-r from-blue-900 to-red-900 text-white py-8">
      <div className="container px-4 md:px-6 text-center">
        <p className="text-sm text-gray-300">
          &copy; {new Date().getFullYear()} Coach John Leadership & Community Engagement Initiative
        </p>
        <p className="text-sm text-gray-300 mt-2">
          Delivering enriching experiences to foster a vibrant, positive community for all.
        </p>
      </div>
    </footer>
  )
}

