import React from 'react';
import { motion } from 'framer-motion';
import { MessageSquare, Shield, AlertTriangle, CheckCircle, XCircle, Globe, Users, FileText } from 'lucide-react';

const CommunicationGuidelines: React.FC = () => {
  return (
    <motion.section
      id="communication-guidelines"
      className="min-h-screen bg-white py-16 px-8"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      viewport={{ once: true }}
      role="region"
      aria-labelledby="communication-guidelines-title"
    >
      <div className="max-w-3xl mx-auto py-12 prose prose-lg max-w-none">
        {/* Breadcrumb */}
        <motion.div
          className="text-sm text-gray-500 mb-6"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.1 }}
          viewport={{ once: true }}
        >
          HR / Policies & Guidelines / Communication Guidelines
        </motion.div>

        {/* Hero Banner */}
        <motion.div
          className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 mb-8 text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.2 }}
          viewport={{ once: true }}
        >
          <div className="flex justify-center mb-4">
            <div className="p-3 bg-white/20 rounded-lg">
              <MessageSquare className="w-8 h-8 text-white" />
            </div>
          </div>
          <motion.h1 
            id="communication-guidelines-title"
            className="text-4xl font-extrabold text-white mb-2 font-manrope tracking-tight"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.3 }}
            viewport={{ once: true }}
          >
            Communication Guidelines
          </motion.h1>
        </motion.div>

        {/* Online Communication */}
        <motion.div
          className="mb-12"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.4 }}
          viewport={{ once: true }}
        >
          <h2 className="text-2xl font-semibold text-gray-900 mb-6 font-manrope flex items-center">
            <Globe className="w-6 h-6 mr-3 text-blue-600" />
            Online Communication
          </h2>

          <p className="text-lg leading-relaxed mb-6 text-gray-700">
            We encourage HYBE Members to freely communicate online and use social media.
          </p>

          <p className="text-lg leading-relaxed mb-6 text-gray-700">
            However, due to the nature of the industry, all members of HYBE should expect attention from the <strong>public, fans, and customers</strong>, whether they desire it or not. For this reason, any posts and photos we upload can be interpreted or used differently from our intention.
          </p>

          <p className="text-lg leading-relaxed mb-6 text-gray-700">
            Even posts about trivial or private things may negatively impact all members and artists, including yourself.
          </p>
        </motion.div>

        <hr className="border-gray-300 my-8" />

        {/* Objective */}
        <motion.div
          className="mb-12"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.5 }}
          viewport={{ once: true }}
        >
          <h2 className="text-2xl font-semibold text-gray-900 mb-6 font-manrope flex items-center">
            <Shield className="w-6 h-6 mr-3 text-green-600" />
            Objective
          </h2>

          <p className="text-lg leading-relaxed mb-6 text-gray-700">
            These guidelines were established to prevent the risks and damage that may be caused in the process of online communications and using social media.
          </p>

          <div className="bg-red-50 border-l-4 border-red-500 p-6 mb-6">
            <p className="text-lg font-semibold text-red-800">
              <strong>Posting classified information on social media is strictly prohibited.</strong><br />
              (See the "Note on disclosure of information on the company and artists\" section.)
            </p>
          </div>

          <p className="text-lg leading-relaxed text-gray-700">
            The Online Communication Guidelines are measures to protect our employees, artists, and the company. We ask that you voluntarily and actively adhere to the guidelines.
          </p>
        </motion.div>

        <hr className="border-gray-300 my-8" />

        {/* Violations */}
        <motion.div
          className="mb-12"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="text-2xl font-semibold text-gray-900 mb-6 font-manrope flex items-center">
            <AlertTriangle className="w-6 h-6 mr-3 text-red-600" />
            Violations
          </h2>

          <ul className="list-disc ml-6 space-y-3 text-lg text-gray-700">
            <li>In case of violation, you may be requested to delete posts and be subject to personnel disadvantages (sanctions for violating the company's regulations) as per the internal procedure.</li>
            <li>Even if the post itself has no problem, the company may request deletion if it becomes controversial among the public, fans, or customers.</li>
          </ul>
        </motion.div>

        <hr className="border-gray-300 my-8" />

        {/* Platforms */}
        <motion.div
          className="mb-12"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.7 }}
          viewport={{ once: true }}
        >
          <h2 className="text-2xl font-semibold text-gray-900 mb-6 font-manrope">
            Platforms subject to the Online Communication Guidelines
          </h2>

          <div className="space-y-4">
            <div>
              <p className="text-lg leading-relaxed text-gray-700">
                <strong>Social media platforms:</strong> Twitter, Facebook, Instagram, TikTok, Snapchat, Weibo, YouTube, Youku, KakaoStory, Clubhouse, <em>any local social media platform</em>.
              </p>
            </div>
            <div>
              <p className="text-lg leading-relaxed text-gray-700">
                <strong>Messenger tools / DMs & profiles:</strong> KakaoTalk, Line, Band, WeChat, WhatsApp, etc.
              </p>
            </div>
            <div>
              <p className="text-lg leading-relaxed text-gray-700">
                <strong>Online communities & info-sharing sites:</strong> Wikipedia, Namuwiki, Podcasts, Daum Cafe, theqoo, Instiz, etc.
              </p>
            </div>
            <div>
              <p className="text-lg leading-relaxed text-gray-700">
                <strong>Job-finding & review platforms:</strong> LinkedIn, Blind, Kredit Job, JobPlanet, Remember, OCC Mundial, Jobtify, Computrabajo, etc.
              </p>
            </div>
            <div>
              <p className="text-lg leading-relaxed text-gray-700">
                <strong>Online blog platforms & personal websites</strong>
              </p>
            </div>
            <div>
              <p className="text-lg leading-relaxed text-gray-700">
                <strong>Company-operated communities:</strong> Weverse or any similar platform
              </p>
            </div>
          </div>

          <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mt-6">
            <h3 className="text-xl font-semibold text-gray-900 mb-3">In case of LinkedIn</h3>
            <ul className="list-disc ml-6 space-y-2 text-gray-700">
              <li><strong>Never</strong> respond to any work-related request sent by a stranger via direct messages.</li>
              <li>An individual's opinion can be mistaken as the company's; do <strong>not</strong> repost or respond to a post or link other than those uploaded by the company's official account.</li>
            </ul>
          </div>
        </motion.div>

        <hr className="border-gray-300 my-8" />

        {/* Types of information allowed */}
        <motion.div
          className="mb-12"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="text-2xl font-semibold text-gray-900 mb-6 font-manrope flex items-center">
            <CheckCircle className="w-6 h-6 mr-3 text-green-600" />
            Types of information allowed for disclosure
          </h2>

          <ul className="list-disc ml-6 space-y-3 text-lg text-gray-700">
            <li><strong>Company name and department</strong> — <em>Be aware that if you reveal these, any personal matter may be interpreted as related to the company.</em></li>
            <li>You should indicate the title of the position as designated by the company, and after resignation, clearly express that you are no longer related to HYBE by updating your profile.</li>
            <li><strong>Content related to HYBE community business & HYBE's artists</strong> — only information already disclosed by the company (official/fan content, media reports, announcements).</li>
            <li><strong>Content adhering to these guidelines and the checklist</strong> (see below).</li>
          </ul>
        </motion.div>

        <hr className="border-gray-300 my-8" />

        {/* Note on disclosure */}
        <motion.div
          className="mb-12"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.9 }}
          viewport={{ once: true }}
        >
          <h2 className="text-2xl font-semibold text-gray-900 mb-6 font-manrope flex items-center">
            <XCircle className="w-6 h-6 mr-3 text-red-600" />
            Note on disclosure of information on the company and artists
          </h2>

          <ul className="list-disc ml-6 space-y-3 text-lg text-gray-700">
            <li>Do <strong>not</strong> disclose any classified information on the company, artists, trainees, or external staff.</li>
            <li>Do <strong>not</strong> reveal artists' undisclosed activities, schedules, plans, whereabouts, or current location.</li>
            <li>Do <strong>not</strong> mention classified business information (albums, concerts, business plans) or disclose work outcomes.</li>
            <li>Do <strong>not</strong> disclose other companies' essential information obtained from industry contacts.</li>
            <li>Observe the "Standards for taking photos in the new office building and external disclosure" (contact Corporate RM).</li>
          </ul>
        </motion.div>

        <hr className="border-gray-300 my-8" />

        {/* Prohibition of postings */}
        <motion.div
          className="mb-12"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 1.0 }}
          viewport={{ once: true }}
        >
          <h2 className="text-2xl font-semibold text-gray-900 mb-6 font-manrope">
            Prohibition of postings with inappropriate intent or content
          </h2>

          <ul className="list-disc ml-6 space-y-3 text-lg text-gray-700">
            <li>Do <strong>not</strong> post personal grievances, complaints, or suggestions about the company, members, artists, trainees, or staff.</li>
            <li>Do <strong>not</strong> share, retweet, or repost content intended for promotions or criticism.</li>
            <li>Do <strong>not</strong> overly praise HYBE or its artists / members, or post biased content.</li>
            <li>Do <strong>not</strong> create an account in the company name without permission.</li>
          </ul>
        </motion.div>

        <hr className="border-gray-300 my-8" />

        {/* Prohibition of response */}
        <motion.div
          className="mb-12"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 1.1 }}
          viewport={{ once: true }}
        >
          <h2 className="text-2xl font-semibold text-gray-900 mb-6 font-manrope">
            Prohibition of response to business-related legal issues and risk situations
          </h2>

          <ul className="list-disc ml-6 space-y-3 text-lg text-gray-700">
            <li>Any remarks, comments, or responses without permission from the company are strictly prohibited.</li>
            <li>Only the head of department or an approved person may comment publicly, with CEO approval.</li>
            <li>If you discover issues requiring confirmation, notify Corporate RM immediately.</li>
          </ul>
        </motion.div>

        <hr className="border-gray-300 my-8" />

        {/* Responsibilities */}
        <motion.div
          className="mb-12"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 1.2 }}
          viewport={{ once: true }}
        >
          <h2 className="text-2xl font-semibold text-gray-900 mb-6 font-manrope">
            Responsibilities and obligations on postings
          </h2>

          <ul className="list-disc ml-6 space-y-3 text-lg text-gray-700">
            <li>Individuals are responsible for issues arising from their personal online activities.</li>
            <li>All postings should be made with discretion, understanding that online content may never be fully deleted.</li>
            <li>When making a public remark, clearly state that it is <strong>your personal opinion</strong>, not the company's.</li>
          </ul>
        </motion.div>

        <hr className="border-gray-300 my-8" />

        {/* Online etiquette */}
        <motion.div
          className="mb-12"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 1.3 }}
          viewport={{ once: true }}
        >
          <h2 className="text-2xl font-semibold text-gray-900 mb-6 font-manrope flex items-center">
            <Users className="w-6 h-6 mr-3 text-purple-600" />
            Online etiquette and respect for the public
          </h2>

          <ul className="list-disc ml-6 space-y-3 text-lg text-gray-700">
            <li>Respect others' opinions; do not criticize or attack.</li>
            <li>Avoid depreciating or discriminatory remarks, hatred, insults, obscene language, or swearing against disadvantaged people or minorities.</li>
            <li>Do <strong>not</strong> post comments on articles or content about other idol groups or entertainment agencies.</li>
          </ul>
        </motion.div>

        <hr className="border-gray-300 my-8" />

        {/* Copyright compliance */}
        <motion.div
          className="mb-12"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 1.4 }}
          viewport={{ once: true }}
        >
          <h2 className="text-2xl font-semibold text-gray-900 mb-6 font-manrope">
            Compliance with copyright and portrait rights
          </h2>

          <ul className="list-disc ml-6 space-y-3 text-lg text-gray-700">
            <li>Do <strong>not</strong> upload or share protected content (music, movies, photos, videos, software, etc.) without permission.</li>
            <li>Do <strong>not</strong> use copyrights, trademarks, or publicity rights without authorization.</li>
            <li>Do <strong>not</strong> upload images of celebrities or public figures that may infringe portrait rights.</li>
          </ul>
        </motion.div>

        <hr className="border-gray-300 my-8" />

        {/* Note on possibilities */}
        <motion.div
          className="mb-12"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 1.5 }}
          viewport={{ once: true }}
        >
          <h2 className="text-2xl font-semibold text-gray-900 mb-6 font-manrope">
            Note on possibilities of being publicized
          </h2>

          <p className="text-lg leading-relaxed mb-6 text-gray-700">
            All postings and comments (even personal content) should be posted carefully, considering that:
          </p>

          <ul className="list-disc ml-6 space-y-3 text-lg text-gray-700">
            <li>We operate globally; meaning can vary by time, region, culture.</li>
            <li>Before posting, review the checklist below.</li>
          </ul>
        </motion.div>

        <hr className="border-gray-300 my-8" />

        {/* Checklist */}
        <motion.div
          className="mb-12"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 1.6 }}
          viewport={{ once: true }}
        >
          <h2 className="text-2xl font-semibold text-gray-900 mb-6 font-manrope">
            Checklist before posting (answer <strong>YES</strong> to all)
          </h2>

          <div className="overflow-x-auto">
            <table className="w-full border-collapse border border-gray-300 rounded-lg">
              <thead>
                <tr className="bg-gray-50">
                  <th className="border border-gray-300 px-4 py-3 text-left font-semibold text-gray-900">Question</th>
                  <th className="border border-gray-300 px-4 py-3 text-center font-semibold text-gray-900">YES / NO</th>
                </tr>
              </thead>
              <tbody>
                {[
                  'Is the content or information okay to be reported to or cited by media?',
                  'Is the content or information okay to remain publicly available online?',
                  'Is the content or information already known to the public or fans?',
                  'Can you take responsibility for any consequences?'
                ].map((question, index) => (
                  <tr key={index} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                    <td className="border border-gray-300 px-4 py-3 text-gray-700">{question}</td>
                    <td className="border border-gray-300 px-4 py-3 text-center text-gray-500">_____</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>

        <hr className="border-gray-300 my-8" />

        {/* Examples and Guides */}
        <motion.div
          className="mb-12"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 1.7 }}
          viewport={{ once: true }}
        >
          <h2 className="text-2xl font-semibold text-gray-900 mb-6 font-manrope flex items-center">
            <FileText className="w-6 h-6 mr-3 text-blue-600" />
            Examples and Guides
          </h2>

          <div className="space-y-8">
            {/* Example 1 */}
            <div className="bg-green-50 border border-green-200 rounded-lg p-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Example 1</h3>
              <ul className="list-disc ml-6 space-y-2 text-gray-700 mb-4">
                <li>Uploading a post saying "It was meaningful" after a TXT fan-sign event finishes.</li>
                <li>Posting "I like the third track" with a cover image of an album already released.</li>
                <li>Posting "Watched <em>Frozen</em> in the company. Such fun" with an image after Culture Day finishes.</li>
              </ul>
              <div className="bg-green-100 border border-green-300 rounded p-3">
                <p className="text-green-800 font-medium">
                  <strong>You can post</strong> these, provided you clarify it is your personal opinion, not the company's official stance.
                </p>
              </div>
            </div>

            {/* Example 2 */}
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Example 2</h3>
              <ul className="list-disc ml-6 space-y-2 text-gray-700 mb-4">
                <li>Posting a photo of the vacant concert hall after BTS's concert finishes.</li>
                <li>Posting a photo of merchandise purchased at the pop-up store without waiting.</li>
              </ul>
              <div className="bg-yellow-100 border border-yellow-300 rounded p-3">
                <p className="text-yellow-800 font-medium">
                  <strong>Allowed only</strong> in public spaces where fans can access.<br />
                  Do <strong>not</strong> post anything that may be perceived as undue privilege.
                </p>
              </div>
            </div>

            {/* Example 3 */}
            <div className="bg-red-50 border border-red-200 rounded-lg p-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Example 3</h3>
              <ul className="list-disc ml-6 space-y-2 text-gray-700 mb-4">
                <li>Uploading a post saying "It is an honor to introduce the vision of the company" during a company briefing session.</li>
              </ul>
              <div className="bg-red-100 border border-red-300 rounded p-3">
                <p className="text-red-800 font-medium">
                  <strong>Not allowed</strong> because the session is not fully disclosed to the public.
                </p>
              </div>
            </div>

            {/* Example 4 */}
            <div className="bg-red-50 border border-red-200 rounded-lg p-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Example 4</h3>
              <ul className="list-disc ml-6 space-y-2 text-gray-700 mb-4">
                <li>Uploading "It was such a demanding issue to deal with" after resolving an issue regarding TXT.</li>
                <li>Uploading a video or image you worked on with "Meaningful work".</li>
              </ul>
              <div className="bg-red-100 border border-red-300 rounded p-3">
                <p className="text-red-800 font-medium">
                  Refrain from revealing specific job details or anything that can be publicized.
                </p>
              </div>
            </div>

            {/* Example 5 */}
            <div className="bg-orange-50 border border-orange-200 rounded-lg p-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Example 5</h3>
              <ul className="list-disc ml-6 space-y-2 text-gray-700 mb-4">
                <li>Posting "Love you, TXT members" on Weverse.</li>
                <li>Participating in a BTS hashtag event on Weverse.</li>
              </ul>
              <div className="bg-orange-100 border border-orange-300 rounded p-3">
                <p className="text-orange-800 font-medium">
                  Remember that anonymity may be broken; events are meant for customers/fans, not employees.
                </p>
              </div>
            </div>

            {/* Example 6 */}
            <div className="bg-red-50 border border-red-200 rounded-lg p-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Example 6</h3>
              <ul className="list-disc ml-6 space-y-2 text-gray-700 mb-4">
                <li>Leaving a comment "BTS Namjoon is the best" on an acquaintance's post.</li>
              </ul>
              <div className="bg-red-100 border border-red-300 rounded p-3">
                <p className="text-red-800 font-medium">
                  Do <strong>not</strong> directly mention artists (real names, stage names, nicknames).
                </p>
              </div>
            </div>
          </div>
        </motion.div>

        <hr className="border-gray-300 my-8" />

        {/* Revision history */}
        <motion.div
          className="mb-12"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 1.8 }}
          viewport={{ once: true }}
        >
          <h2 className="text-2xl font-semibold text-gray-900 mb-6 font-manrope">
            Revision history
          </h2>
          <p className="text-gray-600 italic">
            <em>Last updated — [add date when publishing]</em>
          </p>
        </motion.div>
      </div>
    </motion.section>
  );
};

export default CommunicationGuidelines;