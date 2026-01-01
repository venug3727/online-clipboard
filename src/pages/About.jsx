import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
    Clipboard,
    FileText,
    Link as LinkIcon,
    QrCode,
    Shield,
    Zap,
    Globe,
    Mail,
    Send,
    CheckCircle,
    Heart,
    Users,
    Clock,
    Lock,
    Github,
    Twitter,
    Linkedin,
} from "lucide-react";
import { Helmet } from "@dr.pogodin/react-helmet";

export default function About() {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        subject: "",
        message: "",
    });
    const [formStatus, setFormStatus] = useState(null); // 'success', 'error', or null
    const [isSubmitting, setIsSubmitting] = useState(false);

    const features = [
        {
            icon: Clipboard,
            title: "Clipboard Sharing",
            description: "Share text, code, or data instantly with a unique 4-digit code. Perfect for quick transfers between devices.",
        },
        {
            icon: FileText,
            title: "File Sharing",
            description: "Upload files up to 50MB and share them securely. Files auto-delete after expiration for privacy.",
        },
        {
            icon: LinkIcon,
            title: "URL Shortening",
            description: "Create short, memorable links with optional custom paths and expiration dates.",
        },
        {
            icon: QrCode,
            title: "QR Code Generator",
            description: "Generate QR codes for any content - URLs, text, or contact information.",
        },
    ];

    const values = [
        {
            icon: Shield,
            title: "Privacy First",
            description: "Your data is encrypted and automatically deleted. We don't track or store more than necessary.",
        },
        {
            icon: Zap,
            title: "Speed & Simplicity",
            description: "No registration required. Share content in seconds with our intuitive interface.",
        },
        {
            icon: Globe,
            title: "Accessible Anywhere",
            description: "Works on any device with a browser. No apps to install, no accounts to create.",
        },
        {
            icon: Lock,
            title: "Secure by Design",
            description: "End-to-end encryption available for sensitive content. Your data, your control.",
        },
    ];

    const stats = [
        { value: "15min", label: "Clipboard Expiry" },
        { value: "50MB", label: "Max File Size" },
        { value: "24/7", label: "Availability" },
        { value: "0", label: "Accounts Required" },
    ];

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);

        // Simulate form submission
        // In production, you would send this to your backend or email service
        try {
            // For now, we'll just simulate a successful submission
            await new Promise((resolve) => setTimeout(resolve, 1000));

            // Open mailto link as fallback
            const mailtoLink = `mailto:contact@cloudclip.app?subject=${encodeURIComponent(
                formData.subject || "Contact from CloudClip"
            )}&body=${encodeURIComponent(
                `Name: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`
            )}`;

            window.location.href = mailtoLink;

            setFormStatus("success");
            setFormData({ name: "", email: "", subject: "", message: "" });
        } catch (error) {
            setFormStatus("error");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="max-w-6xl mx-auto">
            <Helmet>
                <title>About CloudClip | Secure File & Clipboard Sharing</title>
                <meta
                    name="description"
                    content="Learn about CloudClip - a secure, fast, and privacy-focused platform for clipboard sharing, file transfers, and URL shortening. No registration required."
                />
            </Helmet>

            {/* Hero Section */}
            <section className="text-center mb-16">
                <div className="inline-flex items-center justify-center p-4 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-2xl shadow-lg shadow-indigo-500/30 mb-6">
                    <Clipboard className="h-10 w-10 text-white" />
                </div>
                <h1 className="text-4xl md:text-5xl font-display font-bold text-gray-900 dark:text-white mb-6">
                    About{" "}
                    <span className="text-gradient">CloudClip</span>
                </h1>
                <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto leading-relaxed">
                    CloudClip is a modern, privacy-focused platform for sharing content across devices instantly.
                    No accounts, no downloads, no hassle — just quick, secure sharing.
                </p>
            </section>

            {/* Stats */}
            <section className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-16">
                {stats.map((stat, index) => (
                    <div
                        key={index}
                        className="glass rounded-2xl p-6 text-center card-hover"
                    >
                        <div className="text-3xl font-display font-bold text-gradient mb-2">
                            {stat.value}
                        </div>
                        <div className="text-sm text-gray-600 dark:text-gray-400">
                            {stat.label}
                        </div>
                    </div>
                ))}
            </section>

            {/* Mission Section */}
            <section className="glass rounded-3xl p-8 md:p-12 mb-16">
                <div className="flex items-center gap-3 mb-6">
                    <Heart className="h-8 w-8 text-pink-500" />
                    <h2 className="text-3xl font-display font-bold text-gray-900 dark:text-white">
                        Our Mission
                    </h2>
                </div>
                <div className="grid md:grid-cols-2 gap-8">
                    <div>
                        <p className="text-lg text-gray-600 dark:text-gray-400 leading-relaxed mb-4">
                            We believe sharing content between devices should be effortless. Whether you're transferring
                            a code snippet from your laptop to your phone, sending a quick file to a colleague, or creating
                            a shareable link — it should just work.
                        </p>
                        <p className="text-lg text-gray-600 dark:text-gray-400 leading-relaxed">
                            CloudClip was built to eliminate the friction of content sharing. No sign-ups, no app installs,
                            no complicated processes. Just visit, share, and go.
                        </p>
                    </div>
                    <div className="flex items-center justify-center">
                        <div className="relative">
                            <div className="absolute inset-0 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-full blur-3xl opacity-20" />
                            <div className="relative grid grid-cols-2 gap-4">
                                <div className="p-6 glass rounded-2xl flex flex-col items-center">
                                    <Clock className="h-8 w-8 text-indigo-500 mb-2" />
                                    <span className="text-sm text-gray-600 dark:text-gray-400">Auto-Delete</span>
                                </div>
                                <div className="p-6 glass rounded-2xl flex flex-col items-center">
                                    <Lock className="h-8 w-8 text-green-500 mb-2" />
                                    <span className="text-sm text-gray-600 dark:text-gray-400">Encrypted</span>
                                </div>
                                <div className="p-6 glass rounded-2xl flex flex-col items-center">
                                    <Zap className="h-8 w-8 text-yellow-500 mb-2" />
                                    <span className="text-sm text-gray-600 dark:text-gray-400">Instant</span>
                                </div>
                                <div className="p-6 glass rounded-2xl flex flex-col items-center">
                                    <Users className="h-8 w-8 text-purple-500 mb-2" />
                                    <span className="text-sm text-gray-600 dark:text-gray-400">No Account</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section className="mb-16">
                <h2 className="text-3xl font-display font-bold text-gray-900 dark:text-white text-center mb-10">
                    What You Can Do
                </h2>
                <div className="grid md:grid-cols-2 gap-6">
                    {features.map((feature, index) => {
                        const Icon = feature.icon;
                        return (
                            <div key={index} className="glass rounded-2xl p-6 card-hover">
                                <div className="flex items-start gap-4">
                                    <div className="p-3 bg-gradient-to-br from-indigo-500/10 to-purple-500/10 rounded-xl">
                                        <Icon className="h-6 w-6 text-indigo-600 dark:text-indigo-400" />
                                    </div>
                                    <div>
                                        <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                                            {feature.title}
                                        </h3>
                                        <p className="text-gray-600 dark:text-gray-400">
                                            {feature.description}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </section>

            {/* Values Section */}
            <section className="mb-16">
                <h2 className="text-3xl font-display font-bold text-gray-900 dark:text-white text-center mb-10">
                    Our Values
                </h2>
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {values.map((value, index) => {
                        const Icon = value.icon;
                        return (
                            <div key={index} className="glass rounded-2xl p-6 text-center card-hover">
                                <div className="inline-flex items-center justify-center p-3 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-xl mb-4">
                                    <Icon className="h-6 w-6 text-white" />
                                </div>
                                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                                    {value.title}
                                </h3>
                                <p className="text-sm text-gray-600 dark:text-gray-400">
                                    {value.description}
                                </p>
                            </div>
                        );
                    })}
                </div>
            </section>

            {/* Contact Section */}
            <section id="contact" className="glass rounded-3xl p-8 md:p-12 mb-16 scroll-mt-24">
                <div className="flex items-center gap-3 mb-8">
                    <Mail className="h-8 w-8 text-indigo-500" />
                    <h2 className="text-3xl font-display font-bold text-gray-900 dark:text-white">
                        Contact Us
                    </h2>
                </div>

                <div className="grid md:grid-cols-2 gap-8">
                    {/* Contact Info */}
                    <div>
                        <p className="text-lg text-gray-600 dark:text-gray-400 mb-6">
                            Have questions, feedback, or need support? We'd love to hear from you.
                            Reach out through any of the channels below.
                        </p>

                        <div className="space-y-4">
                            <div className="flex items-center gap-3 p-4 glass rounded-xl">
                                <Mail className="h-5 w-5 text-indigo-500" />
                                <div>
                                    <div className="text-sm text-gray-500 dark:text-gray-400">Email</div>
                                    <a
                                        href="mailto:contact@cloudclip.app"
                                        className="text-gray-900 dark:text-white hover:text-indigo-600 dark:hover:text-indigo-400"
                                    >
                                        contact@cloudclip.app
                                    </a>
                                </div>
                            </div>

                            <div className="flex items-center gap-3 p-4 glass rounded-xl">
                                <Shield className="h-5 w-5 text-green-500" />
                                <div>
                                    <div className="text-sm text-gray-500 dark:text-gray-400">Privacy Inquiries</div>
                                    <a
                                        href="mailto:privacy@cloudclip.app"
                                        className="text-gray-900 dark:text-white hover:text-indigo-600 dark:hover:text-indigo-400"
                                    >
                                        privacy@cloudclip.app
                                    </a>
                                </div>
                            </div>

                            <div className="flex items-center gap-3 p-4 glass rounded-xl">
                                <FileText className="h-5 w-5 text-purple-500" />
                                <div>
                                    <div className="text-sm text-gray-500 dark:text-gray-400">Legal</div>
                                    <a
                                        href="mailto:legal@cloudclip.app"
                                        className="text-gray-900 dark:text-white hover:text-indigo-600 dark:hover:text-indigo-400"
                                    >
                                        legal@cloudclip.app
                                    </a>
                                </div>
                            </div>
                        </div>

                        {/* Social Links */}
                        <div className="mt-8">
                            <div className="text-sm text-gray-500 dark:text-gray-400 mb-3">Follow Us</div>
                            <div className="flex gap-3">
                                <a
                                    href="https://github.com/cloudclip"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="p-3 glass rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                                    aria-label="GitHub"
                                >
                                    <Github className="h-5 w-5 text-gray-700 dark:text-gray-300" />
                                </a>
                                <a
                                    href="https://twitter.com/cloudclip"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="p-3 glass rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                                    aria-label="Twitter"
                                >
                                    <Twitter className="h-5 w-5 text-gray-700 dark:text-gray-300" />
                                </a>
                                <a
                                    href="https://linkedin.com/company/cloudclip"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="p-3 glass rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                                    aria-label="LinkedIn"
                                >
                                    <Linkedin className="h-5 w-5 text-gray-700 dark:text-gray-300" />
                                </a>
                            </div>
                        </div>
                    </div>

                    {/* Contact Form */}
                    <div>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div>
                                <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                    Name
                                </label>
                                <input
                                    type="text"
                                    id="name"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleInputChange}
                                    required
                                    className="input-modern"
                                    placeholder="Your name"
                                />
                            </div>

                            <div>
                                <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                    Email
                                </label>
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleInputChange}
                                    required
                                    className="input-modern"
                                    placeholder="your@email.com"
                                />
                            </div>

                            <div>
                                <label htmlFor="subject" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                    Subject
                                </label>
                                <input
                                    type="text"
                                    id="subject"
                                    name="subject"
                                    value={formData.subject}
                                    onChange={handleInputChange}
                                    className="input-modern"
                                    placeholder="How can we help?"
                                />
                            </div>

                            <div>
                                <label htmlFor="message" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                    Message
                                </label>
                                <textarea
                                    id="message"
                                    name="message"
                                    value={formData.message}
                                    onChange={handleInputChange}
                                    required
                                    rows={4}
                                    className="input-modern resize-none"
                                    placeholder="Tell us more..."
                                />
                            </div>

                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className="w-full py-3 px-6 bg-gradient-to-r from-indigo-500 to-purple-500 text-white font-semibold rounded-xl
                  hover:shadow-lg hover:shadow-indigo-500/30 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed
                  flex items-center justify-center gap-2"
                            >
                                {isSubmitting ? (
                                    <>
                                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                                        Sending...
                                    </>
                                ) : (
                                    <>
                                        <Send className="h-5 w-5" />
                                        Send Message
                                    </>
                                )}
                            </button>

                            {formStatus === "success" && (
                                <div className="flex items-center gap-2 p-3 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 rounded-xl">
                                    <CheckCircle className="h-5 w-5" />
                                    <span>Your email client should open. If not, please email us directly.</span>
                                </div>
                            )}

                            {formStatus === "error" && (
                                <div className="flex items-center gap-2 p-3 bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400 rounded-xl">
                                    <span>Something went wrong. Please try emailing us directly.</span>
                                </div>
                            )}
                        </form>
                    </div>
                </div>
            </section>

            {/* Legal Links */}
            <section className="text-center">
                <div className="inline-flex flex-wrap justify-center gap-4">
                    <Link
                        to="/privacy"
                        className="px-6 py-3 glass rounded-xl text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                    >
                        Privacy Policy
                    </Link>
                    <Link
                        to="/terms"
                        className="px-6 py-3 glass rounded-xl text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                    >
                        Terms of Service
                    </Link>
                </div>
                <p className="mt-8 text-gray-500 dark:text-gray-500 text-sm">
                    © {new Date().getFullYear()} CloudClip. All rights reserved.
                </p>
            </section>
        </div>
    );
}
