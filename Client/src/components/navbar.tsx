// src/components/Navbar.tsx
import { Link } from 'react-router-dom'

const Navbar = () => {
  return (
    <nav className="bg-blue-500 p-4 shadow-md">
      <ul className="flex space-x-6">
        <li>
          <Link to="/" className="text-white hover:text-gray-200">
            Accueil
          </Link>
        </li>
        <li>
          <Link to="/admin/event/1" className="text-white hover:text-gray-200">
            Admin
          </Link>
        </li>
        <li>
          <Link to="/event/1" className="text-white hover:text-gray-200">
            Participant
          </Link>
        </li>
        <li>
          <Link to="/event/1/question/1" className="text-white hover:text-gray-200">
            Question
          </Link>
        </li>
         <li>
          <Link to="GestureCanvas" className="text-white hover:text-gray-200">
            Gesture
          </Link>
        </li>
      </ul>
    </nav>
  )
}

export default Navbar
