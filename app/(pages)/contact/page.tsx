export default function ContactPage() {
  return (
    <div className="flex items-center justify-center h-screen">
      <div className="flex w-full max-w-4xl">
        {/* Left side - Contact Form */}
        <div className="w-1/2 p-8 ">
          <h2 className="text-4xl mb-4">Contact Us</h2>
          <form>
            {/* Name Field */}
            <div className="mb-4">
              <label
                htmlFor="name"
                className="block text-sm font-medium text-primary"
              >
                Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                className="mt-1 p-2 border rounded-md w-full bg-secondary"
              />
            </div>

            {/* Contact Number Field */}
            <div className="mb-4">
              <label
                htmlFor="contactNumber"
                className="block text-sm font-medium text-gray-600"
              >
                Contact Number
              </label>
              <input
                type="tel"
                id="contactNumber"
                name="contactNumber"
                className="mt-1 p-2 border rounded-md w-full bg-secondary"
              />
            </div>

            {/* Email Address Field */}
            <div className="mb-4">
              <label
                htmlFor="email"
                className="block text-sm font-medium text-primary"
              >
                Email Address
              </label>
              <input
                type="email"
                id="email"
                name="email"
                className="mt-1 p-2 border rounded-md w-full bg-secondary"
              />
            </div>

            {/* Message Field */}
            <div className="mb-4">
              <label
                htmlFor="message"
                className="block text-sm font-medium text-primary"
              >
                Message
              </label>
              <textarea
                id="message"
                name="message"
                rows="4"
                className="mt-1 p-2 border rounded-md w-full bg-secondary"
              ></textarea>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600"
            >
              Submit
            </button>
          </form>
        </div>

        {/* Divider */}
        <div className="w-1/12 border-l border-gray-300" />

        {/* Right side - Contact Details */}
        <div className="w-1/2 p-8">
          <h2 className="text-2xl mb-4">Contact Details</h2>
          <p>Email: example@example.com</p>
          <p>Phone: +123 456 7890</p>
          <p>Address: 123 Main Street, City</p>
        </div>
      </div>
    </div>
  );
}
