import React from "react";
import { Link } from "react-router-dom";
import { Shield, Database, Clock, Globe, Mail, Lock, Eye, Trash2, Cookie } from "lucide-react";
import { Helmet } from "@dr.pogodin/react-helmet";

export default function PrivacyPolicy() {
    const lastUpdated = "January 1, 2026";

    const sections = [
        {
            id: "information-collected",
            title: "Information We Collect",
            icon: Database,
            content: (
                <>
                    <p className="mb-4">We collect information to provide and improve our services. The types of information we collect include:</p>

                    <h4 className="font-semibold text-gray-900 dark:text-white mt-4 mb-2">1. Content You Share</h4>
                    <ul className="list-disc list-inside space-y-2 text-gray-600 dark:text-gray-400 ml-4">
                        <li><strong>Clipboard Content:</strong> Text, code, or data you choose to share through our clipboard feature. This content is stored temporarily and automatically deleted after 15 minutes.</li>
                        <li><strong>Files:</strong> Documents, images, or other files you upload for sharing. Files are stored on secure cloud servers (Cloudinary) and automatically deleted after the expiration period you select (default: 7 days, maximum: 30 days).</li>
                        <li><strong>URLs:</strong> Links you shorten using our URL shortening service, along with any optional expiration settings.</li>
                    </ul>

                    <h4 className="font-semibold text-gray-900 dark:text-white mt-4 mb-2">2. Technical Information</h4>
                    <ul className="list-disc list-inside space-y-2 text-gray-600 dark:text-gray-400 ml-4">
                        <li><strong>Device Information:</strong> Browser type, operating system, and device type for service optimization.</li>
                        <li><strong>Usage Data:</strong> Pages visited, features used, and interaction patterns to improve our service.</li>
                        <li><strong>IP Address:</strong> Collected for security, fraud prevention, and to comply with legal requirements.</li>
                    </ul>

                    <h4 className="font-semibold text-gray-900 dark:text-white mt-4 mb-2">3. Information from Third Parties</h4>
                    <p className="text-gray-600 dark:text-gray-400">
                        We use Google AdSense for advertising, which may collect information about your browsing activity. Please refer to <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer" className="text-indigo-600 dark:text-indigo-400 hover:underline">Google's Privacy Policy</a> for details.
                    </p>
                </>
            ),
        },
        {
            id: "how-we-use",
            title: "How We Use Your Information",
            icon: Eye,
            content: (
                <ul className="list-disc list-inside space-y-3 text-gray-600 dark:text-gray-400">
                    <li><strong>Provide Services:</strong> To enable clipboard sharing, file transfers, URL shortening, and QR code generation.</li>
                    <li><strong>Security:</strong> To protect against fraud, abuse, and unauthorized access to our services.</li>
                    <li><strong>Improvement:</strong> To analyze usage patterns and improve our platform's functionality and user experience.</li>
                    <li><strong>Communication:</strong> To respond to your inquiries and provide customer support when needed.</li>
                    <li><strong>Legal Compliance:</strong> To comply with applicable laws, regulations, and legal processes.</li>
                    <li><strong>Advertising:</strong> To display relevant advertisements through Google AdSense to support our free service.</li>
                </ul>
            ),
        },
        {
            id: "data-storage",
            title: "Data Storage and Retention",
            icon: Clock,
            content: (
                <>
                    <p className="mb-4">We retain your data only for as long as necessary to provide our services:</p>
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="border-b border-gray-200 dark:border-gray-700">
                                    <th className="py-3 px-4 font-semibold text-gray-900 dark:text-white">Data Type</th>
                                    <th className="py-3 px-4 font-semibold text-gray-900 dark:text-white">Retention Period</th>
                                </tr>
                            </thead>
                            <tbody className="text-gray-600 dark:text-gray-400">
                                <tr className="border-b border-gray-100 dark:border-gray-800">
                                    <td className="py-3 px-4">Clipboard Content</td>
                                    <td className="py-3 px-4">15 minutes (auto-deleted)</td>
                                </tr>
                                <tr className="border-b border-gray-100 dark:border-gray-800">
                                    <td className="py-3 px-4">Shared Files</td>
                                    <td className="py-3 px-4">7-30 days (user-selected, auto-deleted)</td>
                                </tr>
                                <tr className="border-b border-gray-100 dark:border-gray-800">
                                    <td className="py-3 px-4">Shortened URLs</td>
                                    <td className="py-3 px-4">Until expiration or 1 year maximum</td>
                                </tr>
                                <tr>
                                    <td className="py-3 px-4">Technical Logs</td>
                                    <td className="py-3 px-4">90 days</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <p className="mt-4 text-gray-600 dark:text-gray-400">
                        <strong>Storage Location:</strong> Data is stored on secure cloud infrastructure provided by MongoDB Atlas (database) and Cloudinary (file storage), with servers located in various regions to ensure fast and reliable service.
                    </p>
                </>
            ),
        },
        {
            id: "data-security",
            title: "Data Security",
            icon: Lock,
            content: (
                <>
                    <p className="mb-4">We implement industry-standard security measures to protect your data:</p>
                    <ul className="list-disc list-inside space-y-2 text-gray-600 dark:text-gray-400">
                        <li><strong>Encryption:</strong> All data transmitted to and from our service is encrypted using TLS/SSL protocols.</li>
                        <li><strong>Confidential Mode:</strong> For sensitive content, we offer an optional encryption feature where content is encrypted before storage using strong encryption algorithms (Fernet/AES-128).</li>
                        <li><strong>Access Controls:</strong> Access to user data is restricted to authorized personnel only.</li>
                        <li><strong>Secure Infrastructure:</strong> Our cloud providers maintain SOC 2 compliance and implement robust security practices.</li>
                        <li><strong>Automatic Deletion:</strong> All shared content is automatically deleted after the specified expiration period.</li>
                    </ul>
                </>
            ),
        },
        {
            id: "third-party",
            title: "Third-Party Services",
            icon: Globe,
            content: (
                <>
                    <p className="mb-4">We use the following third-party services to operate CloudClip:</p>
                    <ul className="list-disc list-inside space-y-3 text-gray-600 dark:text-gray-400">
                        <li>
                            <strong>MongoDB Atlas:</strong> Database hosting for storing metadata and content.
                            <a href="https://www.mongodb.com/legal/privacy-policy" target="_blank" rel="noopener noreferrer" className="text-indigo-600 dark:text-indigo-400 hover:underline ml-1">Privacy Policy</a>
                        </li>
                        <li>
                            <strong>Cloudinary:</strong> Cloud storage for file uploads and delivery.
                            <a href="https://cloudinary.com/privacy" target="_blank" rel="noopener noreferrer" className="text-indigo-600 dark:text-indigo-400 hover:underline ml-1">Privacy Policy</a>
                        </li>
                        <li>
                            <strong>Google AdSense:</strong> Advertising service that may use cookies and collect browsing data.
                            <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer" className="text-indigo-600 dark:text-indigo-400 hover:underline ml-1">Privacy Policy</a>
                        </li>
                        <li>
                            <strong>Netlify/Vercel:</strong> Hosting and deployment services.
                        </li>
                    </ul>
                </>
            ),
        },
        {
            id: "cookies",
            title: "Cookies and Tracking",
            icon: Cookie,
            content: (
                <>
                    <p className="mb-4">We use cookies and similar technologies for the following purposes:</p>
                    <ul className="list-disc list-inside space-y-2 text-gray-600 dark:text-gray-400">
                        <li><strong>Essential Cookies:</strong> Required for basic functionality, such as remembering your theme preference (dark/light mode).</li>
                        <li><strong>Analytics Cookies:</strong> Help us understand how visitors interact with our website.</li>
                        <li><strong>Advertising Cookies:</strong> Used by Google AdSense to display relevant advertisements.</li>
                    </ul>
                    <p className="mt-4 text-gray-600 dark:text-gray-400">
                        You can control cookie preferences through your browser settings. Note that disabling certain cookies may affect the functionality of our service.
                    </p>
                </>
            ),
        },
        {
            id: "your-rights",
            title: "Your Rights",
            icon: Shield,
            content: (
                <>
                    <p className="mb-4">Depending on your location, you may have the following rights regarding your personal data:</p>
                    <ul className="list-disc list-inside space-y-2 text-gray-600 dark:text-gray-400">
                        <li><strong>Access:</strong> Request information about the data we hold about you.</li>
                        <li><strong>Deletion:</strong> Request deletion of your personal data (note: shared content auto-deletes after expiration).</li>
                        <li><strong>Correction:</strong> Request correction of inaccurate personal data.</li>
                        <li><strong>Portability:</strong> Request a copy of your data in a portable format.</li>
                        <li><strong>Objection:</strong> Object to processing of your personal data for certain purposes.</li>
                        <li><strong>Opt-out of Advertising:</strong> You can opt out of personalized advertising by visiting <a href="https://www.google.com/settings/ads" target="_blank" rel="noopener noreferrer" className="text-indigo-600 dark:text-indigo-400 hover:underline">Google Ads Settings</a>.</li>
                    </ul>
                    <p className="mt-4 text-gray-600 dark:text-gray-400">
                        To exercise any of these rights, please contact us using the information provided below.
                    </p>
                </>
            ),
        },
        {
            id: "contact",
            title: "Contact Us",
            icon: Mail,
            content: (
                <>
                    <p className="mb-4">If you have questions about this Privacy Policy or wish to exercise your rights, please contact us:</p>
                    <div className="glass rounded-xl p-6 mt-4">
                        <p className="text-gray-700 dark:text-gray-300">
                            <strong>Email:</strong>{" "}
                            <a href="mailto:privacy@cloudclip.app" className="text-indigo-600 dark:text-indigo-400 hover:underline">
                                privacy@cloudclip.app
                            </a>
                        </p>
                        <p className="text-gray-700 dark:text-gray-300 mt-2">
                            <strong>Website:</strong>{" "}
                            <Link to="/about" className="text-indigo-600 dark:text-indigo-400 hover:underline">
                                Contact Page
                            </Link>
                        </p>
                    </div>
                    <p className="mt-4 text-sm text-gray-500 dark:text-gray-500">
                        We aim to respond to all privacy-related inquiries within 30 days.
                    </p>
                </>
            ),
        },
    ];

    return (
        <div className="max-w-4xl mx-auto">
            <Helmet>
                <title>Privacy Policy | CloudClip</title>
                <meta name="description" content="CloudClip Privacy Policy - Learn how we collect, use, and protect your data when you use our clipboard sharing and file transfer services." />
            </Helmet>

            {/* Header */}
            <div className="text-center mb-12">
                <div className="inline-flex items-center justify-center p-3 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-2xl shadow-lg shadow-indigo-500/30 mb-6">
                    <Shield className="h-8 w-8 text-white" />
                </div>
                <h1 className="text-4xl font-display font-bold text-gray-900 dark:text-white mb-4">
                    Privacy Policy
                </h1>
                <p className="text-gray-600 dark:text-gray-400">
                    Last updated: {lastUpdated}
                </p>
            </div>

            {/* Introduction */}
            <div className="glass rounded-2xl p-6 mb-8">
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                    At CloudClip, we take your privacy seriously. This Privacy Policy explains how we collect, use,
                    disclose, and safeguard your information when you use our clipboard sharing, file transfer,
                    URL shortening, and QR code generation services. Please read this policy carefully.
                </p>
            </div>

            {/* Table of Contents */}
            <div className="glass rounded-2xl p-6 mb-8">
                <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Table of Contents</h2>
                <ul className="space-y-2">
                    {sections.map((section, index) => (
                        <li key={section.id}>
                            <a
                                href={`#${section.id}`}
                                className="text-indigo-600 dark:text-indigo-400 hover:underline flex items-center gap-2"
                            >
                                <span className="text-gray-400">{index + 1}.</span>
                                {section.title}
                            </a>
                        </li>
                    ))}
                </ul>
            </div>

            {/* Sections */}
            <div className="space-y-8">
                {sections.map((section, index) => {
                    const Icon = section.icon;
                    return (
                        <section key={section.id} id={section.id} className="glass rounded-2xl p-6 scroll-mt-24">
                            <div className="flex items-center gap-4 mb-6">
                                <div className="p-2.5 bg-gradient-to-br from-indigo-500/10 to-purple-500/10 rounded-xl">
                                    <Icon className="h-6 w-6 text-indigo-600 dark:text-indigo-400" />
                                </div>
                                <h2 className="text-2xl font-display font-bold text-gray-900 dark:text-white">
                                    {index + 1}. {section.title}
                                </h2>
                            </div>
                            <div className="text-gray-700 dark:text-gray-300 leading-relaxed">
                                {section.content}
                            </div>
                        </section>
                    );
                })}
            </div>

            {/* Footer Note */}
            <div className="mt-12 p-6 bg-gradient-to-r from-indigo-500/10 to-purple-500/10 rounded-2xl border border-indigo-200 dark:border-indigo-800">
                <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Changes to This Policy</h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm">
                    We may update this Privacy Policy from time to time. We will notify you of any changes by posting
                    the new Privacy Policy on this page and updating the "Last updated" date. We encourage you to
                    review this Privacy Policy periodically for any changes.
                </p>
            </div>

            {/* Navigation Links */}
            <div className="mt-8 flex flex-wrap gap-4 justify-center">
                <Link
                    to="/terms"
                    className="px-6 py-3 bg-gray-100 dark:bg-gray-800 rounded-xl text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                >
                    Terms of Service
                </Link>
                <Link
                    to="/about"
                    className="px-6 py-3 bg-gray-100 dark:bg-gray-800 rounded-xl text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                >
                    About Us
                </Link>
            </div>
        </div>
    );
}
