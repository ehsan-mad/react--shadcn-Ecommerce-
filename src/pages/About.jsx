import React from "react";
import {
  Zap,
  ShoppingCart,
  Award,
  Users,
  MapPin,
  Mail,
  Phone,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const About = () => {
  return (
    <div className="container mx-auto px-4 py-12">
      {/* Hero Section */}
      <section className="mb-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div>
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              About EcomTech
            </h1>
            <p className="text-lg text-gray-600 mb-8">
              We're on a mission to make technology accessible to everyone.
              Founded in 2018, EcomTech has grown from a small startup to a
              trusted online retailer serving customers worldwide.
            </p>
            <div className="flex flex-wrap gap-4">
              <Button asChild size="lg">
                <Link to="/collections">Browse Products</Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link to="/contact">Contact Us</Link>
              </Button>
            </div>
          </div>
          <div className="rounded-lg overflow-hidden shadow-xl">
            <img
              src="/images/about-hero.jpg"
              alt="EcomTech team"
              className="w-full h-auto"
              onError={(e) => {
                e.target.src =
                  "https://images.unsplash.com/photo-1552581234-26160f608093?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80";
              }}
            />
          </div>
        </div>
      </section>

      {/* Our Story Section */}
      <section className="mb-16">
        <div className="max-w-3xl mx-auto text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Our Story</h2>
          <div className="w-20 h-1 bg-primary mx-auto mb-6"></div>
          <p className="text-lg text-gray-600">
            From humble beginnings to becoming your trusted technology partner
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div className="order-2 md:order-1">
            <h3 className="text-2xl font-semibold mb-4">How We Started</h3>
            <p className="text-gray-600 mb-4">
              EcomTech began in a small apartment with just two founders who
              shared a passion for making technology more accessible. What
              started as a small online store quickly grew as customers
              appreciated our honest approach, fair pricing, and exceptional
              customer service.
            </p>
            <p className="text-gray-600 mb-4">
              By 2020, we had expanded our product range and team, moving to a
              larger warehouse facility to meet growing demand. Today, we serve
              thousands of customers across the country, offering the latest
              tech products with the same dedication to service that defined our
              early days.
            </p>
          </div>
          <div className="order-1 md:order-2 rounded-lg overflow-hidden shadow-lg">
            <img
              src="/images/our-story.jpg"
              alt="EcomTech founding story"
              className="w-full h-auto"
              onError={(e) => {
                e.target.src =
                  "https://images.unsplash.com/photo-1519389950473-47ba0277781c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80";
              }}
            />
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="mb-16 bg-gray-50 py-16 px-4 rounded-xl">
        <div className="max-w-3xl mx-auto text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Our Values</h2>
          <div className="w-20 h-1 bg-primary mx-auto mb-6"></div>
          <p className="text-lg text-gray-600">
            The principles that guide everything we do
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white p-8 rounded-lg shadow-md text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 text-primary mb-6">
              <Zap size={28} />
            </div>
            <h3 className="text-xl font-semibold mb-3">Innovation</h3>
            <p className="text-gray-600">
              We constantly seek out the latest technologies and innovative
              solutions to offer our customers cutting-edge products.
            </p>
          </div>

          <div className="bg-white p-8 rounded-lg shadow-md text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 text-primary mb-6">
              <Award size={28} />
            </div>
            <h3 className="text-xl font-semibold mb-3">Quality</h3>
            <p className="text-gray-600">
              We carefully curate our product selection, ensuring that every
              item meets our high standards for performance and reliability.
            </p>
          </div>

          <div className="bg-white p-8 rounded-lg shadow-md text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 text-primary mb-6">
              <Users size={28} />
            </div>
            <h3 className="text-xl font-semibold mb-3">Customer Focus</h3>
            <p className="text-gray-600">
              We put our customers at the center of everything we do, providing
              exceptional service and support at every step.
            </p>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="mb-16">
        <div className="max-w-3xl mx-auto text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Meet Our Team</h2>
          <div className="w-20 h-1 bg-primary mx-auto mb-6"></div>
          <p className="text-lg text-gray-600">
            The passionate people behind EcomTech
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {[
            {
              name: "Alex Johnson",
              role: "Founder & CEO",
              image: "https://images.deepai.org/machine-learning-models/5a5ecda96cbf4a30bf40fb78550f0ddc/origami.jpg",
            },
            {
              name: "Sarah Chen",
              role: "CTO",
              image: "https://images.deepai.org/art-image/422c52ceb7fa4d12974988f3ddf272c9/dr-doom-aa8a44.jpg",
            },
            {
              name: "Michael Rodriguez",
              role: "Head of Operations",
              image: "https://images.deepai.org/art-image/fe2d7bc58ea14b58b8475aeda839a1af/samurai-bc0226-thumb.jpg",
            },
            {
              name: "Emily Taylor",
              role: "Customer Experience Lead",
              image: "https://images.deepai.org/art-image/7d089e11c3974413a34e5567f5db0e0f/egypt-2051f7-thumb.jpg",
            },
          ].map((member, index) => (
            <div
              key={index}
              className="bg-white rounded-lg overflow-hidden shadow-md"
            >
              <img
                src={member.image}
                alt={member.name}
                className="w-full h-64 object-cover"
              />
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-1">{member.name}</h3>
                <p className="text-gray-600 mb-4">{member.role}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Testimonials */}
      <section className="mb-16 bg-gray-50 py-16 px-4 rounded-xl">
        <div className="max-w-3xl mx-auto text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">What Our Customers Say</h2>
          <div className="w-20 h-1 bg-primary mx-auto mb-6"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              quote:
                "EcomTech has been my go-to for tech purchases for years. Their customer service is unmatched and the product quality is always excellent.",
              author: "David M.",
              location: "New York, NY",
            },
            {
              quote:
                "I appreciate how EcomTech makes technology accessible with their detailed product descriptions and helpful support team.",
              author: "Lisa K.",
              location: "Austin, TX",
            },
            {
              quote:
                "Fast shipping, great prices, and a seamless shopping experience. What more could you ask for?",
              author: "Robert J.",
              location: "Seattle, WA",
            },
          ].map((testimonial, index) => (
            <div key={index} className="bg-white p-8 rounded-lg shadow-md">
              <div className="text-primary mb-4">
                {[...Array(5)].map((_, i) => (
                  <span key={i} className="text-yellow-400">
                    ★
                  </span>
                ))}
              </div>
              <p className="text-gray-600 mb-6 italic">"{testimonial.quote}"</p>
              <div>
                <p className="font-semibold">{testimonial.author}</p>
                <p className="text-gray-500 text-sm">{testimonial.location}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Contact Section */}
      <section className="mb-16">
        <div className="max-w-3xl mx-auto text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Get In Touch</h2>
          <div className="w-20 h-1 bg-primary mx-auto mb-6"></div>
          <p className="text-lg text-gray-600">
            Have questions? We're here to help!
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white p-8 rounded-lg shadow-md text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 text-primary mb-6">
              <MapPin size={28} />
            </div>
            <h3 className="text-xl font-semibold mb-3">Our Location</h3>
            <p className="text-gray-600">
              123 Tech Avenue
              <br />
              San Francisco, CA 94107
            </p>
          </div>

          <div className="bg-white p-8 rounded-lg shadow-md text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 text-primary mb-6">
              <Mail size={28} />
            </div>
            <h3 className="text-xl font-semibold mb-3">Email Us</h3>
            <p className="text-gray-600">
              support@ecomtech.com
              <br />
              sales@ecomtech.com
            </p>
          </div>

          <div className="bg-white p-8 rounded-lg shadow-md text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 text-primary mb-6">
              <Phone size={28} />
            </div>
            <h3 className="text-xl font-semibold mb-3">Call Us</h3>
            <p className="text-gray-600">
              +1 (555) 123-4567
              <br />
              Mon-Fri, 9am-6pm PST
            </p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-primary text-white rounded-xl p-12 text-center">
        <h2 className="text-3xl font-bold mb-4">Ready to Shop?</h2>
        <p className="text-lg mb-8 max-w-2xl mx-auto">
          Explore our wide range of tech products and find exactly what you
          need. With fast shipping and our satisfaction guarantee, you'll be
          glad you chose EcomTech.
        </p>
        <Button asChild size="lg" variant="secondary">
          <Link to="/collections">Shop Now</Link>
        </Button>
      </section>
    </div>
  );
};

export default About;
