
import Nav from "@/components/Nav";

const ContactUs = () => {
  return (
    <div>
      <Nav />
      <div className="max-w-2xl mx-auto text-center py-12">
        <h1 className="text-4xl font-extrabold text-transparent bg-gradient-to-r from-yellow-500 to-red-600 bg-clip-text mb-6">
          Contact Us
        </h1>
        <p className="text-lg text-gray-700 mb-4">
          We’d love to hear from you! If you have any questions or feedback, feel free to reach out to us at:
        </p>
        <p className="text-xl font-semibold ">
          <a href="mailto:maryamarif1306@gmail.com" className="text-orange-600 hover:text-red-700">
            maryamarif1306@gmail.com
          </a>
        </p>
     
      </div>
    </div>
  );
};

export default ContactUs;
