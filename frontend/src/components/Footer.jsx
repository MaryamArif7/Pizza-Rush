import {
  FaTwitter,
  FaLinkedinIn,
} from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-gradient-to-r from-yellow-600 via-red-500 to-orange-600 text-white py-16">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          <div>
            <h3 className="text-2xl font-bold mb-4 ">About Us</h3>
            <p className="text-gray-200 text-sm">
              We serve the best pizzas in town with fresh ingredients, fast
              delivery, and customizable options to suit every taste. Join the
              pizza revolution today!
            </p>
          </div>

          <div>
            <h3 className="text-2xl font-bold mb-4">Quick Links</h3>
            <ul className="text-gray-200 text-sm space-y-2">
              <li>
                <a href="/about" className="hover:text-yellow-300">
                  About Us
                </a>
              </li>
              <li>
                <a href="/contact" className="hover:text-yellow-300">
                  Contact
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-2xl font-bold mb-4">Follow Us</h3>
            <div className="flex space-x-4">
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-200 hover:text-yellow-300"
              >
                <FaTwitter size={24} />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-200 hover:text-yellow-300"
              >
                <FaLinkedinIn size={24} />
              </a>
            </div>
          </div>

          <div>
            <h3 className="text-2xl font-bold mb-4">Contact Us</h3>
            <p className="text-gray-200 text-sm">
              Have a question? We're here to help! Reach out to us via email or
              give us a call. Our team is ready to assist you with any inquiries
              or concerns.
            </p>
          </div>
        </div>

        <div className="mt-12 text-center border-t border-gray-700 pt-6">
          <p className="text-sm text-gray-400">
            &copy; Pizza Rush All Rights Reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
