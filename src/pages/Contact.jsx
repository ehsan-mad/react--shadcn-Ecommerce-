import React, { useState } from "react";
import { MapPin, Mail, Phone, Clock, MessageSquare, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });

  const [formStatus, setFormStatus] = useState({
    submitted: false,
    success: false,
    message: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSelectChange = (value) => {
    setFormData((prev) => ({
      ...prev,
      subject: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Simulate form submission
    setFormStatus({
      submitted: true,
      success: true,
      message: "Thank you for your message! We'll get back to you shortly.",
    });

    // In a real application, you would send the form data to your server here
    console.log("Form submitted:", formData);

    // Reset form after successful submission
    setFormData({
      name: "",
      email: "",
      phone: "",
      subject: "",
      message: "",
    });
  };

  return (
    <div className="container mx-auto px-4 py-12">
      {/* Hero Section */}
      <section className="mb-16 text-center">
        <h1 className="text-4xl md:text-5xl font-bold mb-6">Contact Us</h1>
        <p className="text-lg text-gray-600 max-w-3xl mx-auto">
          Have questions about our products, orders, or need technical support?
          We're here to help! Choose the most convenient way to reach us below.
        </p>
      </section>

      {/* Contact Information Cards */}
      <section className="mb-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-white p-6 rounded-lg shadow-md flex flex-col items-center text-center">
            <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-primary/10 text-primary mb-4">
              <Phone size={24} />
            </div>
            <h3 className="text-lg font-semibold mb-2">Call Us</h3>
            <p className="text-gray-600 mb-2">+1 (555) 123-4567</p>
            <p className="text-sm text-gray-500">For immediate assistance</p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md flex flex-col items-center text-center">
            <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-primary/10 text-primary mb-4">
              <Mail size={24} />
            </div>
            <h3 className="text-lg font-semibold mb-2">Email Us</h3>
            <p className="text-gray-600 mb-2">support@ecomtech.com</p>
            <p className="text-sm text-gray-500">
              We'll respond within 24 hours
            </p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md flex flex-col items-center text-center">
            <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-primary/10 text-primary mb-4">
              <MapPin size={24} />
            </div>
            <h3 className="text-lg font-semibold mb-2">Visit Us</h3>
            <p className="text-gray-600 mb-2">
              123 Tech Avenue, San Francisco, CA 94107
            </p>
            <p className="text-sm text-gray-500">Our headquarters</p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md flex flex-col items-center text-center">
            <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-primary/10 text-primary mb-4">
              <Clock size={24} />
            </div>
            <h3 className="text-lg font-semibold mb-2">Business Hours</h3>
            <p className="text-gray-600 mb-2">Mon-Fri: 9am-6pm PST</p>
            <p className="text-sm text-gray-500">Weekend: Closed</p>
          </div>
        </div>
      </section>

      {/* Contact Form and Map Section */}
      <section className="mb-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <div className="bg-white p-8 rounded-lg shadow-md">
            <div className="flex items-center gap-3 mb-6">
              <MessageSquare className="text-primary" size={24} />
              <h2 className="text-2xl font-bold">Send Us a Message</h2>
            </div>

            {formStatus.submitted && formStatus.success ? (
              <div className="bg-green-50 border border-green-200 text-green-700 p-4 rounded-md mb-6">
                {formStatus.message}
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label
                      htmlFor="name"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Full Name *
                    </label>
                    <Input
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="John Doe"
                      required
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Email Address *
                    </label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="john@example.com"
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label
                      htmlFor="phone"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Phone Number
                    </label>
                    <Input
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="+1 (555) 123-4567"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="subject"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Subject *
                    </label>
                    <Select
                      value={formData.subject}
                      onValueChange={handleSelectChange}
                      required
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select a subject" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="general">General Inquiry</SelectItem>
                        <SelectItem value="support">
                          Technical Support
                        </SelectItem>
                        <SelectItem value="orders">Order Status</SelectItem>
                        <SelectItem value="returns">
                          Returns & Refunds
                        </SelectItem>
                        <SelectItem value="feedback">Feedback</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="message"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Message *
                  </label>
                  <Textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="How can we help you?"
                    rows={5}
                    required
                  />
                </div>

                <div className="flex items-center">
                  <input
                    id="privacy"
                    name="privacy"
                    type="checkbox"
                    className="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded"
                    required
                  />
                  <label
                    htmlFor="privacy"
                    className="ml-2 block text-sm text-gray-700"
                  >
                    I agree to the{" "}
                    <a
                      href="/privacy-policy"
                      className="text-primary hover:underline"
                    >
                      Privacy Policy
                    </a>
                  </label>
                </div>

                <Button
                  type="submit"
                  className="w-full flex items-center justify-center gap-2"
                >
                  <Send size={16} />
                  Send Message
                </Button>
              </form>
            )}
          </div>

          {/* Map */}
          <div className="bg-white p-8 rounded-lg shadow-md">
            <div className="flex items-center gap-3 mb-6">
              <MapPin className="text-primary" size={24} />
              <h2 className="text-2xl font-bold">Our Location</h2>
            </div>
            <div className="h-[400px] bg-gray-200 rounded-md overflow-hidden">
              {/* Replace with your actual map component or embed code */}
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m26!1m12!1m3!1d1085.4673035216263!2d90.41573172420395!3d23.780797258004732!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!4m11!3e6!4m3!3m2!1d23.7804076!2d90.4161209!4m5!1s0x3755c79c1e7f822f%3A0x6c343f84ca86b6c9!2sNavana%20Tower!3m2!1d23.7805279!2d90.4163104!5e0!3m2!1sen!2sbd!4v1744558950072!5m2!1sen!2sbd"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Our Location"
              ></iframe>
            </div>
            <div className="mt-4">
              <h3 className="font-semibold mb-2">EcomTech Headquarters</h3>
              <p className="text-gray-600">
                123 Navana Avenue
                <br />
                Gulshan, Dhaka CA 94107
                <br />
                Bangladesh
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="mb-16">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold mb-4">
              Frequently Asked Questions
            </h2>
            <div className="w-20 h-1 bg-primary mx-auto mb-6"></div>
            <p className="text-lg text-gray-600">
              Find quick answers to common questions
            </p>
          </div>

          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="item-1">
              <AccordionTrigger className="text-left">
                How can I track my order?
              </AccordionTrigger>
              <AccordionContent>
                You can track your order by logging into your account and
                visiting the "Order History" section. Alternatively, you can use
                the tracking number provided in your shipping confirmation
                email.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-2">
              <AccordionTrigger className="text-left">
                What is your return policy?
              </AccordionTrigger>
              <AccordionContent>
                We offer a 30-day return policy for most products. Items must be
                in their original condition with all packaging and accessories.
                Some products may have specific return conditions, which will be
                noted on the product page.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-3">
              <AccordionTrigger className="text-left">
                How long does shipping take?
              </AccordionTrigger>
              <AccordionContent>
                Standard shipping typically takes 3-5 business days within the
                continental US. Expedited shipping options are available at
                checkout. International shipping times vary by destination,
                usually between 7-14 business days.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-4">
              <AccordionTrigger className="text-left">
                Do you offer international shipping?
              </AccordionTrigger>
              <AccordionContent>
                Yes, we ship to most countries worldwide. Shipping costs and
                delivery times vary by location. Please note that international
                orders may be subject to import duties and taxes, which are the
                responsibility of the recipient.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-5">
              <AccordionTrigger className="text-left">
                How can I cancel or modify my order?
              </AccordionTrigger>
              <AccordionContent>
                If you need to cancel or modify your order, please contact our
                customer service team as soon as possible. We can usually
                accommodate changes if the order hasn't been processed yet. Once
                an order has shipped, it cannot be modified, but you can return
                it according to our return policy.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="bg-primary/5 rounded-xl p-12 text-center mb-16">
        <h2 className="text-2xl font-bold mb-4">Stay Updated</h2>
        <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
          Subscribe to our newsletter to receive updates on new products,
          special offers, and tech tips.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
          <Input
            type="email"
            placeholder="Your email address"
            className="flex-grow"
          />
          <Button>Subscribe</Button>
        </div>
      </section>

      {/* Support Channels */}
      <section className="mb-16">
        <div className="max-w-3xl mx-auto text-center mb-10">
          <h2 className="text-3xl font-bold mb-4">More Ways to Connect</h2>
          <div className="w-20 h-1 bg-primary mx-auto mb-6"></div>
          <p className="text-lg text-gray-600">
            We're available across multiple channels to serve you better
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white p-8 rounded-lg shadow-md text-center">
            <h3 className="text-xl font-semibold mb-3">Live Chat</h3>
            <p className="text-gray-600 mb-4">
              Chat with our support team in real-time during business hours.
            </p>
            <Button variant="outline" className="w-full">
              Start Chat
            </Button>
          </div>

          <div className="bg-white p-8 rounded-lg shadow-md text-center">
            <h3 className="text-xl font-semibold mb-3">Help Center</h3>
            <p className="text-gray-600 mb-4">
              Browse our knowledge base for detailed guides and tutorials.
            </p>
            <Button variant="outline" className="w-full">
              Visit Help Center
            </Button>
          </div>

          <div className="bg-white p-8 rounded-lg shadow-md text-center">
            <h3 className="text-xl font-semibold mb-3">Social Media</h3>
            <p className="text-gray-600 mb-4">
              Connect with us on your favorite social platforms.
            </p>
            <div className="flex justify-center gap-4">
              <a href="#" className="text-gray-600 hover:text-primary">
                <svg
                  className="w-6 h-6"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path
                    fillRule="evenodd"
                    d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"
                    clipRule="evenodd"
                  />
                </svg>
              </a>
              <a href="#" className="text-gray-600 hover:text-primary">
                <svg
                  className="w-6 h-6"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path
                    fillRule="evenodd"
                    d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z"
                    clipRule="evenodd"
                  />
                </svg>
              </a>
              <a href="#" className="text-gray-600 hover:text-primary">
                <svg
                  className="w-6 h-6"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;
