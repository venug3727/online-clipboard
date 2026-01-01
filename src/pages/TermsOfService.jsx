import React from "react";
import { Link } from "react-router-dom";
import { FileText, AlertTriangle, Shield, Ban, Scale, Globe, Gavel, Mail } from "lucide-react";
import { Helmet } from "@dr.pogodin/react-helmet";

export default function TermsOfService() {
    const lastUpdated = "January 1, 2026";
    const effectiveDate = "January 1, 2026";

    const sections = [
        {
            id: "acceptance",
            title: "Acceptance of Terms",
            icon: FileText,
            content: (
                <>
                    <p className="mb-4">
                        By accessing or using CloudClip ("Service", "we", "us", or "our"), you agree to be bound by these
                        Terms of Service ("Terms"). If you disagree with any part of these terms, you may not access the Service.
                    </p>
                    <p>
                        These Terms apply to all visitors, users, and others who access or use the Service. By using CloudClip,
                        you represent that you are at least 13 years of age. If you are under 18, you must have parental or
                        guardian consent to use this Service.
                    </p>
                </>
            ),
        },
        {
            id: "description",
            title: "Service Description",
            icon: Globe,
            content: (
                <>
                    <p className="mb-4">CloudClip provides the following services:</p>
                    <ul className="list-disc list-inside space-y-2 text-gray-600 dark:text-gray-400">
                        <li><strong>Clipboard Sharing:</strong> Temporarily share text, code, or data between devices using a unique 4-digit code. Content expires automatically after 15 minutes.</li>
                        <li><strong>File Sharing:</strong> Upload and share files up to 50MB with unique access codes. Files are stored temporarily and automatically deleted after the selected expiration period (default: 7 days).</li>
                        <li><strong>URL Shortening:</strong> Create shortened URLs with optional custom paths and expiration dates.</li>
                        <li><strong>QR Code Generation:</strong> Generate QR codes for URLs, text, or other content.</li>
                    </ul>
                    <p className="mt-4">
                        The Service is provided on an "as-is" and "as-available" basis. We reserve the right to modify,
                        suspend, or discontinue any part of the Service at any time without prior notice.
                    </p>
                </>
            ),
        },
        {
            id: "user-responsibilities",
            title: "User Responsibilities",
            icon: Shield,
            content: (
                <>
                    <p className="mb-4">When using CloudClip, you agree to:</p>
                    <ul className="list-disc list-inside space-y-2 text-gray-600 dark:text-gray-400">
                        <li>Use the Service only for lawful purposes and in accordance with these Terms.</li>
                        <li>Not share content that you do not have the right to distribute.</li>
                        <li>Maintain the confidentiality of any access codes or encryption keys you create.</li>
                        <li>Take responsibility for all content you share through the Service.</li>
                        <li>Not attempt to circumvent any security measures or access restrictions.</li>
                        <li>Not use the Service to transmit malware, viruses, or harmful code.</li>
                        <li>Not use automated systems or bots to access the Service without permission.</li>
                    </ul>
                    <p className="mt-4 text-gray-600 dark:text-gray-400">
                        <strong>Important:</strong> You are solely responsible for the content you share. While our Service
                        offers encryption options, we cannot guarantee the absolute security of shared content. Use our
                        confidential mode for sensitive information.
                    </p>
                </>
            ),
        },
        {
            id: "prohibited-content",
            title: "Prohibited Content and Uses",
            icon: Ban,
            content: (
                <>
                    <p className="mb-4">You may not use CloudClip to share, upload, or distribute:</p>
                    <ul className="list-disc list-inside space-y-2 text-gray-600 dark:text-gray-400">
                        <li>Illegal content or content that violates any applicable law or regulation.</li>
                        <li>Content that infringes on intellectual property rights of others.</li>
                        <li>Malware, viruses, trojans, or any malicious software.</li>
                        <li>Child sexual abuse material (CSAM) or any content exploiting minors.</li>
                        <li>Content promoting violence, terrorism, or hate speech.</li>
                        <li>Personal information of others without their consent (doxxing).</li>
                        <li>Spam, phishing content, or deceptive materials.</li>
                        <li>Content that violates export control laws or sanctions.</li>
                    </ul>
                    <div className="mt-4 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl">
                        <p className="text-red-700 dark:text-red-400 flex items-start gap-2">
                            <AlertTriangle className="h-5 w-5 flex-shrink-0 mt-0.5" />
                            <span>
                                <strong>Warning:</strong> We cooperate with law enforcement agencies and may report illegal
                                content or activities. Violations may result in immediate termination of access and legal action.
                            </span>
                        </p>
                    </div>
                </>
            ),
        },
        {
            id: "limitations",
            title: "Service Limitations",
            icon: AlertTriangle,
            content: (
                <>
                    <p className="mb-4">The following limitations apply to our Service:</p>
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="border-b border-gray-200 dark:border-gray-700">
                                    <th className="py-3 px-4 font-semibold text-gray-900 dark:text-white">Feature</th>
                                    <th className="py-3 px-4 font-semibold text-gray-900 dark:text-white">Limitation</th>
                                </tr>
                            </thead>
                            <tbody className="text-gray-600 dark:text-gray-400">
                                <tr className="border-b border-gray-100 dark:border-gray-800">
                                    <td className="py-3 px-4">File Size</td>
                                    <td className="py-3 px-4">Maximum 50MB per file</td>
                                </tr>
                                <tr className="border-b border-gray-100 dark:border-gray-800">
                                    <td className="py-3 px-4">Clipboard Expiry</td>
                                    <td className="py-3 px-4">15 minutes (non-configurable)</td>
                                </tr>
                                <tr className="border-b border-gray-100 dark:border-gray-800">
                                    <td className="py-3 px-4">File Expiry</td>
                                    <td className="py-3 px-4">1-30 days (user-selected)</td>
                                </tr>
                                <tr>
                                    <td className="py-3 px-4">Access Codes</td>
                                    <td className="py-3 px-4">4-digit numeric codes</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <p className="mt-4 text-gray-600 dark:text-gray-400">
                        We reserve the right to modify these limitations at any time. Excessive usage that impacts
                        service performance may result in temporary or permanent restrictions.
                    </p>
                </>
            ),
        },
        {
            id: "intellectual-property",
            title: "Intellectual Property",
            icon: Scale,
            content: (
                <>
                    <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Our Intellectual Property</h4>
                    <p className="mb-4 text-gray-600 dark:text-gray-400">
                        The Service, including its original content, features, and functionality, is owned by CloudClip
                        and is protected by international copyright, trademark, and other intellectual property laws.
                    </p>

                    <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Your Content</h4>
                    <p className="mb-4 text-gray-600 dark:text-gray-400">
                        You retain all rights to the content you share through CloudClip. By using our Service, you grant
                        us a limited, non-exclusive license to store, process, and transmit your content solely for the
                        purpose of providing the Service. This license terminates when your content is deleted from our systems.
                    </p>

                    <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Copyright Infringement</h4>
                    <p className="text-gray-600 dark:text-gray-400">
                        If you believe content on CloudClip infringes your copyright, please contact us with details of the
                        alleged infringement. We will investigate and take appropriate action, including removing infringing
                        content if necessary.
                    </p>
                </>
            ),
        },
        {
            id: "disclaimers",
            title: "Disclaimers and Limitation of Liability",
            icon: Gavel,
            content: (
                <>
                    <div className="p-4 bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-xl mb-4">
                        <p className="text-yellow-800 dark:text-yellow-300 font-medium">
                            PLEASE READ THIS SECTION CAREFULLY AS IT LIMITS OUR LIABILITY
                        </p>
                    </div>

                    <h4 className="font-semibold text-gray-900 dark:text-white mb-2">No Warranty</h4>
                    <p className="mb-4 text-gray-600 dark:text-gray-400">
                        THE SERVICE IS PROVIDED "AS IS" AND "AS AVAILABLE" WITHOUT WARRANTIES OF ANY KIND, EITHER EXPRESS
                        OR IMPLIED, INCLUDING BUT NOT LIMITED TO IMPLIED WARRANTIES OF MERCHANTABILITY, FITNESS FOR A
                        PARTICULAR PURPOSE, OR NON-INFRINGEMENT.
                    </p>

                    <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Limitation of Liability</h4>
                    <p className="mb-4 text-gray-600 dark:text-gray-400">
                        TO THE MAXIMUM EXTENT PERMITTED BY LAW, CLOUDCLIP SHALL NOT BE LIABLE FOR ANY INDIRECT, INCIDENTAL,
                        SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES, INCLUDING BUT NOT LIMITED TO LOSS OF PROFITS, DATA,
                        USE, OR GOODWILL, ARISING OUT OF OR IN CONNECTION WITH YOUR USE OF THE SERVICE.
                    </p>

                    <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Data Loss</h4>
                    <p className="text-gray-600 dark:text-gray-400">
                        We are not responsible for any loss of data or content shared through the Service. Content is
                        automatically deleted after expiration, and we do not maintain backups of user content. You are
                        responsible for maintaining your own copies of important data.
                    </p>
                </>
            ),
        },
        {
            id: "termination",
            title: "Termination",
            icon: Ban,
            content: (
                <>
                    <p className="mb-4">
                        We may terminate or suspend your access to the Service immediately, without prior notice or liability,
                        for any reason, including but not limited to:
                    </p>
                    <ul className="list-disc list-inside space-y-2 text-gray-600 dark:text-gray-400 mb-4">
                        <li>Breach of these Terms of Service</li>
                        <li>Sharing prohibited content</li>
                        <li>Engaging in fraudulent or illegal activities</li>
                        <li>Excessive usage impacting service performance</li>
                        <li>Request from law enforcement or government agencies</li>
                    </ul>
                    <p className="text-gray-600 dark:text-gray-400">
                        Upon termination, your right to use the Service will immediately cease. All provisions of these Terms
                        which by their nature should survive termination shall survive, including ownership provisions, warranty
                        disclaimers, and limitations of liability.
                    </p>
                </>
            ),
        },
        {
            id: "governing-law",
            title: "Governing Law",
            icon: Gavel,
            content: (
                <>
                    <p className="mb-4 text-gray-600 dark:text-gray-400">
                        These Terms shall be governed by and construed in accordance with applicable laws, without regard to
                        conflict of law principles.
                    </p>
                    <p className="text-gray-600 dark:text-gray-400">
                        Any disputes arising from or relating to these Terms or the Service shall be resolved through good
                        faith negotiation. If negotiation fails, disputes shall be submitted to binding arbitration or the
                        courts of competent jurisdiction.
                    </p>
                </>
            ),
        },
        {
            id: "changes",
            title: "Changes to Terms",
            icon: FileText,
            content: (
                <p className="text-gray-600 dark:text-gray-400">
                    We reserve the right to modify or replace these Terms at any time. If a revision is material, we will
                    provide at least 30 days' notice prior to any new terms taking effect by posting the updated Terms on
                    this page. What constitutes a material change will be determined at our sole discretion. By continuing
                    to access or use our Service after those revisions become effective, you agree to be bound by the revised Terms.
                </p>
            ),
        },
        {
            id: "contact",
            title: "Contact Us",
            icon: Mail,
            content: (
                <>
                    <p className="mb-4">If you have any questions about these Terms of Service, please contact us:</p>
                    <div className="glass rounded-xl p-6">
                        <p className="text-gray-700 dark:text-gray-300">
                            <strong>Email:</strong>{" "}
                            <a href="mailto:legal@cloudclip.app" className="text-indigo-600 dark:text-indigo-400 hover:underline">
                                legal@cloudclip.app
                            </a>
                        </p>
                        <p className="text-gray-700 dark:text-gray-300 mt-2">
                            <strong>Website:</strong>{" "}
                            <Link to="/about" className="text-indigo-600 dark:text-indigo-400 hover:underline">
                                Contact Page
                            </Link>
                        </p>
                    </div>
                </>
            ),
        },
    ];

    return (
        <div className="max-w-4xl mx-auto">
            <Helmet>
                <title>Terms of Service | CloudClip</title>
                <meta name="description" content="CloudClip Terms of Service - Read our terms and conditions for using our clipboard sharing and file transfer services." />
            </Helmet>

            {/* Header */}
            <div className="text-center mb-12">
                <div className="inline-flex items-center justify-center p-3 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-2xl shadow-lg shadow-indigo-500/30 mb-6">
                    <FileText className="h-8 w-8 text-white" />
                </div>
                <h1 className="text-4xl font-display font-bold text-gray-900 dark:text-white mb-4">
                    Terms of Service
                </h1>
                <p className="text-gray-600 dark:text-gray-400">
                    Effective Date: {effectiveDate} | Last updated: {lastUpdated}
                </p>
            </div>

            {/* Introduction */}
            <div className="glass rounded-2xl p-6 mb-8">
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                    Welcome to CloudClip. These Terms of Service govern your use of our clipboard sharing, file transfer,
                    URL shortening, and QR code generation services. By using CloudClip, you agree to these terms.
                    Please read them carefully.
                </p>
            </div>

            {/* Table of Contents */}
            <div className="glass rounded-2xl p-6 mb-8">
                <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Table of Contents</h2>
                <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
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

            {/* Footer Agreement */}
            <div className="mt-12 p-6 bg-gradient-to-r from-indigo-500/10 to-purple-500/10 rounded-2xl border border-indigo-200 dark:border-indigo-800 text-center">
                <p className="text-gray-700 dark:text-gray-300">
                    By using CloudClip, you acknowledge that you have read, understood, and agree to be bound by these Terms of Service.
                </p>
            </div>

            {/* Navigation Links */}
            <div className="mt-8 flex flex-wrap gap-4 justify-center">
                <Link
                    to="/privacy"
                    className="px-6 py-3 bg-gray-100 dark:bg-gray-800 rounded-xl text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                >
                    Privacy Policy
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
