import { Globe, Leaf, Mail, MapPin, Phone, Shield, Users } from 'lucide-react'
import Image from 'next/image'
import React from 'react'



const page = () => {
  return (
    <div>
      <div className="bg-black text-center text-white py-12 px-4">
        <h1 className="text-3xl font-bold mb-4">About TravelApp</h1>
        <p className="text-lg max-w-2xl mx-auto">
          We're on a mission to make world exploration accessible, inspiring, and <br /> unforgettable for everyone.
        </p>
      </div>

      <div className="bg-gray-50 py-12">
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-2 sm:grid-cols-4 gap-8 text-center">

          <div>
            <p className="text-3xl font-bold text-yellow-500">500+</p>
            <p className="text-gray-600 mt-2">Destinations</p>
          </div>

          <div>
            <p className="text-3xl font-bold text-yellow-500">50K+</p>
            <p className="text-gray-600 mt-2">Happy Travelers</p>
          </div>

          <div>
            <p className="text-3xl font-bold text-yellow-500">10+</p>
            <p className="text-gray-600 mt-2">Years Experience</p>
          </div>

          <div>
            <p className="text-3xl font-bold text-yellow-500">4.9</p>
            <p className="text-gray-600 mt-2">Average Rating</p>
          </div>

        </div>
      </div>

      <div className="bg-gray-50 py-16 px-4">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl font-semibold mb-6">Our Mission</h2>
          <p className="text-gray-700 text-lg mb-4">
            At TravelApp, we believe that travel has the power to transform lives. Our mission is to connect travelers with extraordinary experiences that broaden perspectives, create lasting memories, and foster a deeper understanding of our beautiful world.
          </p>
          <p className="text-gray-700 text-lg">
            Founded in 2014, we've grown from a small team of passionate travelers to a global community of explorers. We partner with local guides, sustainable accommodations, and responsible tour operators to ensure every journey makes a positive impact.
          </p>
        </div>
      </div>

      <div className="flex justify-center items-center py-12">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row flex-wrap justify-center gap-6">

          {/* Feature 1 */}
          <div className="flex flex-col items-start gap-3 bg-white p-6 rounded-2xl shadow-md hover:shadow-xl transition-shadow duration-300 w-full sm:w-72">
            <div className="p-3 bg-yellow-100 rounded-full flex items-center justify-center">
              <Globe className="w-5 h-5 text-yellow-600" />
            </div>
            <h3 className="font-semibold text-gray-900 text-lg">Explore Responsibly</h3>
            <p className="text-gray-500 text-sm">
              We promote sustainable tourism that respects local cultures and environments.
            </p>
          </div>

          {/* Feature 2 */}
          <div className="flex flex-col items-start gap-3 bg-white p-6 rounded-2xl shadow-md hover:shadow-xl transition-shadow duration-300 w-full sm:w-72">
            <div className="p-3 bg-yellow-100 rounded-full flex items-center justify-center">
              <Leaf className="w-5 h-5 text-yellow-600" />
            </div>
            <h3 className="font-semibold text-gray-900 text-lg">Passion for Travel</h3>
            <p className="text-gray-500 text-sm">
              Every trip we plan is crafted with love and attention to detail.
            </p>
          </div>

          {/* Feature 3 */}
          <div className="flex flex-col items-start gap-3 bg-white p-6 rounded-2xl shadow-md hover:shadow-xl transition-shadow duration-300 w-full sm:w-72">
            <div className="p-3 bg-yellow-100 rounded-full flex items-center justify-center">
              <Shield className="w-5 h-5 text-yellow-600" />
            </div>
            <h3 className="font-semibold text-gray-900 text-lg">Trust & Safety</h3>
            <p className="text-gray-500 text-sm">
              Your safety and security are our top priorities on every journey.
            </p>
          </div>

          {/* Feature 4 */}
          <div className="flex flex-col items-start gap-3 bg-white p-6 rounded-2xl shadow-md hover:shadow-xl transition-shadow duration-300 w-full sm:w-72">
            <div className="p-3 bg-yellow-100 rounded-full flex items-center justify-center">
              <Users className="w-5 h-5 text-yellow-600" />
            </div>
            <h3 className="font-semibold text-gray-900 text-lg">Community First</h3>
            <p className="text-gray-500 text-sm">
              We support local communities and create authentic connections.
            </p>
          </div>

        </div>
      </div>

      <section className="bg-white py-20">
        {/* Header */}
        <div className="text-center mb-14 px-4">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-3">
            Meet Our Team
          </h2>
          <p className="text-gray-500 max-w-xl mx-auto">
            The passionate people behind your unforgettable travel experiences.
          </p>
        </div>

        {/* Cards */}
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">

          {/* Card 1 */}
          <div className="bg-white rounded-2xl shadow-md hover:shadow-xl transition overflow-hidden text-center">
            <div className="w-full h-64  flex items-center justify-center text-gray-400 text-sm">

              <Image
                src="/Admin-1-2.jpg"
                alt="Sarah Johnson"
                width={300}
                height={256}
                className="object-cover w-full h-64"
              />
            </div>
            <div className="p-6">
              <h3 className="font-semibold text-lg text-gray-900 mb-1">
                Ismoil
              </h3>
              <p className="text-sm font-medium text-yellow-500 mb-2">
                CEO & Founder
              </p>
              <p className="text-sm text-gray-500">
                18+ years in travel industry
              </p>
            </div>
          </div>

          {/* Card 2 */}
          <div className="bg-white rounded-2xl shadow-md hover:shadow-xl transition overflow-hidden text-center">
            <div className="w-full h-64 bg-gray-200 flex items-center justify-center text-gray-400 text-sm">
              <Image
                src="/Admin2.jpg"
                alt="Sarah Johnson"
                width={300}
                height={256}
                className="object-cover w-full h-64"
              />
            </div>
            <div className="p-6">
              <h3 className="font-semibold text-lg text-gray-900 mb-1">
                Michael Chen
              </h3>
              <p className="text-sm font-medium text-gray-800 mb-2">
                Head of Operations
              </p>
              <p className="text-sm text-gray-500">
                Expert in logistics & planning
              </p>
            </div>
          </div>

          {/* Card 3 */}
          <div className="bg-white rounded-2xl shadow-md hover:shadow-xl transition overflow-hidden text-center">
            <div className="w-full h-64 bg-gray-200 flex items-center justify-center text-gray-400 text-sm">
              <Image
                src="/Admin3.jpg"
                alt="Sarah Johnson"
                width={300}
                height={256}
                className="object-cover w-full h-64"
              />
            </div>
            <div className="p-6">
              <h3 className="font-semibold text-lg text-gray-900 mb-1">
                Emily Rodriguez
              </h3>
              <p className="text-sm font-medium text-yellow-500 mb-2">
                Travel Experience Lead
              </p>
              <p className="text-sm text-gray-500">
                Curates unique adventures
              </p>
            </div>
          </div>

          {/* Card 4 */}
          <div className="bg-white rounded-2xl shadow-md hover:shadow-xl transition overflow-hidden text-center">
            <div className="w-full h-64 bg-gray-200 flex items-center justify-center text-gray-400 text-sm">
             <Image
                src="/"
                alt="Sarah Johnson"
                width={300}
                height={255}
                className="object-cover w-full h-64"
              />
            </div>
            <div className="p-6">
              <h3 className="font-semibold text-lg text-gray-900 mb-1">
                David Kim
              </h3>
              <p className="text-sm font-medium text-yellow-500 mb-2">
                Customer Success Manager
              </p>
              <p className="text-sm text-gray-500">
                Dedicated to your satisfaction
              </p>
            </div>
          </div>

        </div>
      </section>

      <section className="bg-gray-50 py-20">
        <div className="text-center mb-12 px-4">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900">
            Get In Touch
          </h2>
        </div>

        <div className="max-w-6xl mx-auto px-4 grid grid-cols-1 sm:grid-cols-3 gap-8">

          {/* Email Card */}
          <div className="bg-white rounded-2xl shadow-md p-8 text-center hover:shadow-xl transition duration-300">
            <div className="w-14 h-14 mx-auto mb-4 flex items-center justify-center bg-yellow-50 rounded-full text-yellow-500">
              <Mail className="w-7 h-7" />
            </div>
            <h3 className="font-semibold text-lg text-gray-900 mb-1">Email Us</h3>
            <p className="text-sm text-gray-500">hello@travelapp.com</p>
          </div>

          {/* Call Card */}
          <div className="bg-white rounded-2xl shadow-md p-8 text-center hover:shadow-xl transition duration-300">
            <div className="w-14 h-14 mx-auto mb-4 flex items-center justify-center bg-yellow-50 rounded-full text-yellow-500">
              <Phone className="w-7 h-7" />
            </div>
            <h3 className="font-semibold text-lg text-gray-900 mb-1">Call Us</h3>
            <p className="text-sm text-gray-500">+1 (555) 123-4567</p>
          </div>

          {/* Visit Card */}
          <div className="bg-white rounded-2xl shadow-md p-8 text-center hover:shadow-xl transition duration-300">
            <div className="w-14 h-14 mx-auto mb-4 flex items-center justify-center bg-yellow-50 rounded-full text-yellow-500">
              <MapPin className="w-7 h-7" />
            </div>
            <h3 className="font-semibold text-lg text-gray-900 mb-1">Visit Us</h3>
            <p className="text-sm text-gray-500">123 Travel Street, NYC</p>
          </div>

        </div>
      </section>

      <div className="flex flex-col items-center justify-center py-[120px]   mt-[30px] bg-[#171717] text-center px-6">
        <h1 className="text-4xl sm:text-5xl font-extrabold text-white mb-4">
          Ready to Start Your Adventure?
        </h1>
        <p className="text-gray-300 text-lg sm:text-xl mb-6 max-w-xl">
          Join thousands of travelers who trust TravelApp for their journeys around the world.
        </p>
        <button className="bg-yellow-500 hover:bg-yellow-700 active:bg-yellow-800 text-white font-semibold py-3 px-8 rounded-xl shadow-lg transition-all duration-300">
          Create Free Account
        </button>
      </div>



    </div>
  )
}

export default page