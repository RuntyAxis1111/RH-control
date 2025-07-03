import React from 'react';
import { motion } from 'framer-motion';
import { Plane, FileText, Clock, DollarSign, MapPin, Shield } from 'lucide-react';

const TravelPolicy: React.FC = () => {
  return (
    <motion.section
      id="travel-policy"
      className="min-h-screen bg-white py-16 px-8"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      viewport={{ once: true }}
      role="region"
      aria-labelledby="travel-policy-title"
    >
      <div className="max-w-6xl mx-auto">
        {/* Hero Banner */}
        <motion.div
          className="bg-gradient-to-r from-blue-900 to-blue-800 rounded-2xl p-8 mb-8"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.1 }}
          viewport={{ once: true }}
        >
          <div className="flex items-center space-x-4">
            <div className="p-3 bg-white/10 rounded-lg">
              <Plane className="w-8 h-8 text-white" />
            </div>
            <div>
              <motion.h2 
                id="travel-policy-title"
                className="text-4xl font-extrabold text-white mb-2 font-manrope tracking-tight"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.2 }}
                viewport={{ once: true }}
              >
                Travel Policy
              </motion.h2>
              <p className="text-blue-200 text-sm italic">
                Revised 2024-08-28
              </p>
            </div>
          </div>
        </motion.div>

        {/* Main Content */}
        <motion.div
          className="prose prose-lg max-w-none"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.3 }}
          viewport={{ once: true }}
        >
          {/* Section 1 */}
          <motion.div
            className="mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.4 }}
            viewport={{ once: true }}
          >
            <h3 id="section1" className="text-2xl font-semibold text-gray-900 mb-6 font-manrope flex items-center">
              <FileText className="w-6 h-6 mr-3 text-accent" />
              Section 1 — Travel Policy
            </h3>

            {/* Article 1 */}
            <div className="bg-gray-50 rounded-2xl p-6 mb-8">
              <h4 id="article1" className="text-xl font-semibold text-gray-900 mb-4 font-manrope">
                Article 1. Purpose
              </h4>
              <p className="text-lg leading-relaxed mb-6 text-gray-700">
                It is the company's policy that, within the principles of this document, employees will be reimbursed for authorized,
                reasonable travelling costs and other personal expenses necessarily and actually incurred on the company's business.
                The policy is designed to ensure that employees get reimbursed for all personal expenditure incurred in performance of their role.
              </p>
            </div>

            {/* Article 2 */}
            <div className="bg-blue-50 rounded-2xl p-6 mb-8">
              <h4 id="article2" className="text-xl font-semibold text-gray-900 mb-4 font-manrope">
                Article 2. Definitions
              </h4>
              
              <div className="space-y-4">
                <div>
                  <p className="text-lg leading-relaxed mb-2 text-gray-700">
                    1. <strong>"Employee"</strong> refers to any individual in our business, regardless of seniority (whether permanent, fixed-term or temporary),
                    consultants, contractors, and any other person providing services to us or acting on our behalf.
                  </p>
                </div>
                
                <div>
                  <p className="text-lg leading-relaxed mb-2 text-gray-700">
                    2. <strong>"Business trip"</strong> means that an employee temporarily moves to a workplace other than their main base by the order of the company, and is classified as follows:
                  </p>
                  <ul className="list-disc ml-6 space-y-1 text-lg text-gray-700">
                    <li>Business trips can be <strong>domestic</strong> or <strong>overseas</strong> depending on the location.</li>
                    <li>Business trips can be <strong>short-term</strong> or <strong>long-term</strong> depending on the period. A long-term business trip means that, under the order of the company, an employee temporarily moves to another workspace other than their main base <strong>for a period of 10 – 60 days</strong> to perform their duties.</li>
                  </ul>
                </div>
                
                <div>
                  <p className="text-lg leading-relaxed mb-2 text-gray-700">
                    3. <strong>Travel expenses</strong> include <em>business travel expenses</em> and <em>special expenses</em>.
                  </p>
                  <ul className="list-disc ml-6 space-y-1 text-lg text-gray-700">
                    <li>Business travel expenses include transportation, accommodation, communication, food, and laundry expenses.</li>
                    <li>Special expenses include business samples, performance tickets, etc. and must be approved by the responsible leader (Chief / President / GM) depending on the nature of the department's work.</li>
                  </ul>
                </div>
                
                <div>
                  <p className="text-lg leading-relaxed text-gray-700">
                    4. When traveling on a business trip, a separate <strong>travel allowance</strong> may be paid to the employee.
                  </p>
                </div>
              </div>
            </div>

            {/* Article 3 */}
            <div className="bg-green-50 rounded-2xl p-6 mb-8">
              <h4 id="article3" className="text-xl font-semibold text-gray-900 mb-4 font-manrope">
                Article 3. Authorization Procedure & Levels
              </h4>
              
              <ul className="space-y-3 text-lg text-gray-700">
                <li className="flex items-start">
                  <span className="text-green-600 mr-2">•</span>
                  <span>Leaders must use their discretion and are responsible for authorizing the reimbursement of reasonable travel and other business-related expenses, and working within agreed budgets for such costs.</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-600 mr-2">•</span>
                  <span>All travel shall be <strong>pre-authorized</strong> by the responsible leader.</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-600 mr-2">•</span>
                  <span>The employee is encouraged to submit the <strong>Travel Notification Form</strong> in Monday.com as early as possible to obtain best prices for flight, train and hotel.</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-600 mr-2">•</span>
                  <span>The Travel Notification Form within the guidelines described in this Travel Policy shall be <strong>automatically approved</strong>.</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-600 mr-2">•</span>
                  <span>If anybody needs additional expenses, this should be claimed and explained in the Notification Form. This also should be processed as regular expenses in RAMP.</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-600 mr-2">•</span>
                  <span>There shall be <strong>no self-authorization</strong> of expenses of any kind.</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-600 mr-2">•</span>
                  <span>Employees are expected to submit regular and timely expense claims, <strong>no later than 14 calendar days</strong> after the expense is incurred, directly on RAMP. Original receipts, not copies, must be attached/scanned. The receipt portion of air e-tickets must be attached.</span>
                </li>
              </ul>
            </div>

            {/* Article 4 */}
            <div className="bg-yellow-50 rounded-2xl p-6 mb-8">
              <h4 id="article4" className="text-xl font-semibold text-gray-900 mb-4 font-manrope">
                Article 4. Business Trip Process
              </h4>
              
              <div className="space-y-6">
                <div>
                  <h5 className="text-lg font-semibold text-gray-900 mb-3">1. Reservation Procedures</h5>
                  <ul className="list-disc ml-6 space-y-2 text-lg text-gray-700">
                    <li>When a reason for a business trip occurs, the responsible leader shall select and give business-trip instructions to the necessary personnel.</li>
                    <li>If an employee needs to go on a business trip, they must request and receive internal approval from the responsible leader.</li>
                    <li>Upon confirmation of the business trip, the employee must share all relevant information through e-mail to all organization members and register it on the calendar.</li>
                    <li>When two (2) or more employees are traveling together, appoint the main contact person and have him/her communicate with the decision maker and/or make a decision during travel time.</li>
                  </ul>
                </div>

                <div>
                  <h5 className="text-lg font-semibold text-gray-900 mb-3">2. Business Trip Preparation</h5>
                  <ul className="list-disc ml-6 space-y-2 text-lg text-gray-700">
                    <li>The representative shall reserve in advance for transportation and accommodation; calculate the necessary expenses; request payment from the Finance & Accounting Department.</li>
                    <li>The representative must sign up for traveler insurance for all business travelers, including themselves.</li>
                  </ul>
                </div>

                <div>
                  <h5 className="text-lg font-semibold text-gray-900 mb-3">3. Application for Advance Payment</h5>
                  <p className="text-lg leading-relaxed text-gray-700">
                    Advance payment for travel expenses is not possible. However, if an employee expects to use special expenses that cannot be covered with a corporate card during the business trip, the employee can contact the Finance team for guidance.
                  </p>
                </div>

                <div>
                  <h5 className="text-lg font-semibold text-gray-900 mb-3">4. Business Trip Closure and Reporting</h5>
                  <ul className="list-disc ml-6 space-y-2 text-lg text-gray-700">
                    <li>Upon the conclusion of the business trip, the representative shall report the results of the business trip to the responsible leader.</li>
                    <li>When settling expenses after the end of a business trip, claims must be made through the company's expense system.</li>
                  </ul>
                </div>

                <div>
                  <h5 className="text-lg font-semibold text-gray-900 mb-3">5. Spouse / Companion Travel</h5>
                  <p className="text-lg leading-relaxed text-gray-700">
                    The company will not reimburse travel and entertainment expenses incurred by a spouse or other individuals accompanying an employee on business.
                  </p>
                </div>

                <div>
                  <h5 className="text-lg font-semibold text-gray-900 mb-3">6. Other</h5>
                  <div className="space-y-2 text-lg text-gray-700">
                    <p>
                      If there are any threats to personal safety such as accidents or health problems that arise during the business trip, the employee shall notify the line manager and HRBP immediately so that proper measures can be taken.
                    </p>
                    <p>
                      If expense and insurance are required due to an accident during the business trip, a receipt for those expenses shall be submitted to the responsible department upon returning from the business trip.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Article 5 */}
            <div className="bg-purple-50 rounded-2xl p-6 mb-8">
              <h4 id="article5" className="text-xl font-semibold text-gray-900 mb-6 font-manrope flex items-center">
                <DollarSign className="w-6 h-6 mr-3 text-purple-600" />
                Article 5. Criteria for Travel Expenses & Allowances
              </h4>
              
              <div className="space-y-8">
                {/* Transportation, Accommodation & Travel Insurance */}
                <div>
                  <h5 className="text-lg font-semibold text-gray-900 mb-4">1. Transportation, Accommodation & Travel Insurance Policy</h5>
                  <ul className="list-disc ml-6 space-y-2 text-lg text-gray-700">
                    <li>Related expenses such as transportation, accommodation, and traveler's insurance must be reserved <strong>in advance</strong> before the business trip.</li>
                    <li>Reservations are carried out by companies designated by HYBE. However, if there are special circumstances, the decision will be made in consultation with the responsible department within the scope of these regulations. If it exceeds the scope of these regulations, the decision will be made in advance through consultation with the CHRO.</li>
                    <li>If there is a cost difference in the departure/return due to personal circumstances before or after the business trip, the difference shall be borne by the employee themselves.</li>
                  </ul>
                </div>

                {/* Transportation Expenses */}
                <div>
                  <h5 className="text-lg font-semibold text-gray-900 mb-4">2. Transportation Expenses</h5>
                  
                  <div className="mb-4">
                    <p className="text-lg leading-relaxed mb-4 text-gray-700">
                      1. <strong>Scope</strong> – airfare, rail fare, bus fare, vehicle fuel cost, taxi fare, parking fees, toll fees, airport transportation expenses, etc.
                    </p>
                    
                    <p className="text-lg leading-relaxed mb-4 text-gray-700">
                      2. <strong>Seat-class guidelines</strong>
                    </p>
                    
                    <div className="overflow-x-auto">
                      <table className="w-full border-collapse border border-gray-300 rounded-lg">
                        <thead>
                          <tr className="bg-gray-100">
                            <th className="border border-gray-300 px-4 py-2 text-left">&nbsp;</th>
                            <th className="border border-gray-300 px-4 py-2 text-left"><strong>Flight</strong></th>
                            <th className="border border-gray-300 px-4 py-2 text-left"><strong>Railroad</strong></th>
                            <th className="border border-gray-300 px-4 py-2 text-left"><strong>Bus</strong></th>
                            <th className="border border-gray-300 px-4 py-2 text-left"><strong>Note</strong></th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td className="border border-gray-300 px-4 py-2"><strong>Economy</strong></td>
                            <td className="border border-gray-300 px-4 py-2">Economy</td>
                            <td className="border border-gray-300 px-4 py-2">Standard</td>
                            <td className="border border-gray-300 px-4 py-2">Standard</td>
                            <td className="border border-gray-300 px-4 py-2">In the case of an emergency or special circumstances that make it difficult to use the appropriate grade, adjustments can be made through the CHRO's decision</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>

                  <div className="space-y-3 text-lg text-gray-700">
                    <p>3. <strong>Leadership / Artist protocol exceptions</strong> – see policy text (unchanged).</p>
                    <p>4. <strong>Own vehicle</strong> – fuel reimbursed per company standard; indicate purpose & distance.</p>
                    <p>5. <strong>Taxi / Ride-hailing</strong> – state purpose & reason; personal trips not covered.</p>
                    <p>6. <strong>Parking / Tolls</strong> – reimbursable with purpose stated (airport parking excluded).</p>
                    <p>7. <strong>Rental car</strong> (long-term trips ≥ 10 days, with prior approval) – guideline table:</p>
                  </div>

                  <div className="overflow-x-auto mt-4">
                    <table className="w-full border-collapse border border-gray-300 rounded-lg">
                      <thead>
                        <tr className="bg-gray-100">
                          <th className="border border-gray-300 px-4 py-2 text-left"><strong>Vehicle Class</strong></th>
                          <th className="border border-gray-300 px-4 py-2 text-left"><strong>Note</strong></th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td className="border border-gray-300 px-4 py-2">Standard type<br/>Use of vehicle &lt; $100 USD /day</td>
                          <td className="border border-gray-300 px-4 py-2">In the case of an emergency or special circumstances that make it difficult to use the appropriate level, adjustments can be made through the responsible leader</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* Accommodation */}
                <div>
                  <h5 className="text-lg font-semibold text-gray-900 mb-4">3. Accommodation</h5>
                  
                  <div className="overflow-x-auto">
                    <table className="w-full border-collapse border border-gray-300 rounded-lg">
                      <thead>
                        <tr className="bg-gray-100">
                          <th className="border border-gray-300 px-4 py-2 text-left">Region</th>
                          <th className="border border-gray-300 px-4 py-2 text-left">Allowance</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td className="border border-gray-300 px-4 py-2">USA, Canada, Europe</td>
                          <td className="border border-gray-300 px-4 py-2">3-4★ hotel or ≤ $500 USD /night</td>
                        </tr>
                        <tr>
                          <td className="border border-gray-300 px-4 py-2">Rest of world</td>
                          <td className="border border-gray-300 px-4 py-2">3-4★ hotel or ≤ $300 USD /night</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>

                  <p className="text-sm italic text-gray-600 mt-2">
                    *In emergencies or special circumstances, adjustments can be made through the responsible leader.
                  </p>

                  <div className="bg-red-50 border border-red-200 rounded-lg p-4 mt-4">
                    <p className="text-gray-700">
                      Airbnb & similar are <strong>not permitted</strong> for safety reasons. Unapproved overspend may be rejected.
                    </p>
                  </div>
                </div>

                {/* Communication Costs */}
                <div>
                  <h5 className="text-lg font-semibold text-gray-900 mb-4">4. Communication Costs</h5>
                  <ul className="list-disc ml-6 space-y-2 text-lg text-gray-700">
                    <li>Data roaming for business use only.</li>
                    <li>Voice calls via Slack / VoIP when possible; otherwise claim regular calls with explanation.</li>
                    <li>Long-term trips may purchase a local SIM – reimbursed up to <strong>$100 USD / month</strong>.</li>
                  </ul>
                </div>

                {/* Food Expenses */}
                <div>
                  <h5 className="text-lg font-semibold text-gray-900 mb-4">5. Food Expenses</h5>
                  
                  <div className="overflow-x-auto">
                    <table className="w-full border-collapse border border-gray-300 rounded-lg">
                      <thead>
                        <tr className="bg-gray-100">
                          <th className="border border-gray-300 px-4 py-2 text-left">Location</th>
                          <th className="border border-gray-300 px-4 py-2 text-left">Daily limit</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td className="border border-gray-300 px-4 py-2">Korea</td>
                          <td className="border border-gray-300 px-4 py-2">60,000 KRW</td>
                        </tr>
                        <tr>
                          <td className="border border-gray-300 px-4 py-2">USA</td>
                          <td className="border border-gray-300 px-4 py-2">60 USD</td>
                        </tr>
                        <tr>
                          <td className="border border-gray-300 px-4 py-2">Mexico</td>
                          <td className="border border-gray-300 px-4 py-2">1,200 MXN</td>
                        </tr>
                        <tr>
                          <td className="border border-gray-300 px-4 py-2">Colombia</td>
                          <td className="border border-gray-300 px-4 py-2">200,000 COP</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* Other Expenses */}
                <div className="space-y-4">
                  <div>
                    <h5 className="text-lg font-semibold text-gray-900 mb-2">6. Laundry Expenses</h5>
                    <p className="text-lg text-gray-700">
                      Trips &gt; 10 days: actual receipts reimbursed up to <strong>$20 USD / day</strong>.
                    </p>
                  </div>

                  <div>
                    <h5 className="text-lg font-semibold text-gray-900 mb-2">7. Special Expenses</h5>
                    <p className="text-lg text-gray-700">
                      Business samples, performance tickets, etc. – prior approval required.
                    </p>
                  </div>

                  <div>
                    <h5 className="text-lg font-semibold text-gray-900 mb-2">8. Entertainment & Other Expenses</h5>
                    <p className="text-lg text-gray-700">
                      Generally <strong>not accepted</strong>; prior approval required if work-related.<br/>
                      Company covers visas & travel insurance fees.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Article 6 */}
            <div className="bg-orange-50 rounded-2xl p-6 mb-8">
              <h4 id="article6" className="text-xl font-semibold text-gray-900 mb-4 font-manrope flex items-center">
                <Shield className="w-6 h-6 mr-3 text-orange-600" />
                Article 6. Principles of Use & Payment of Expenses
              </h4>
              
              <ul className="space-y-3 text-lg text-gray-700">
                <li className="flex items-start">
                  <span className="text-orange-600 mr-2">a.</span>
                  <span>All expenses should be made <strong>with the corporate card</strong>.</span>
                </li>
                <li className="flex items-start">
                  <span className="text-orange-600 mr-2">b.</span>
                  <span>If no traveller holds a corp card, contact Finance <strong>before</strong> travelling.</span>
                </li>
                <li className="flex items-start">
                  <span className="text-orange-600 mr-2">c.</span>
                  <span><strong>Original receipts</strong> must be attached.</span>
                </li>
                <li className="flex items-start">
                  <span className="text-orange-600 mr-2">d.</span>
                  <span>Out-of-policy expenses require approval from the responsible leader or CEO.</span>
                </li>
                <li className="flex items-start">
                  <span className="text-orange-600 mr-2">•</span>
                  <span>Payment is based on number of trip days.</span>
                </li>
                <li className="flex items-start">
                  <span className="text-orange-600 mr-2">•</span>
                  <span>Third-party funded costs will not be reimbursed.</span>
                </li>
                <li className="flex items-start">
                  <span className="text-orange-600 mr-2">•</span>
                  <span>Excess foreign currency should not be carried; use personal credit cards for cash if needed.</span>
                </li>
              </ul>
            </div>
          </motion.div>

          {/* Section 2 */}
          <motion.div
            className="mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.5 }}
            viewport={{ once: true }}
          >
            <hr className="border-gray-300 my-8" />
            
            <h3 id="section2" className="text-2xl font-semibold text-gray-900 mb-6 font-manrope flex items-center">
              <Clock className="w-6 h-6 mr-3 text-accent" />
              Section 2 — Supplementary Provisions
            </h3>

            <div className="bg-gray-50 rounded-2xl p-6">
              <div className="space-y-4">
                <div>
                  <h4 className="text-lg font-semibold text-gray-900 mb-2">Article 1. Effective Date</h4>
                  <p className="text-lg text-gray-700">
                    This regulation comes into effect on <strong>2023-10-18</strong>.
                  </p>
                </div>

                <div>
                  <h4 className="text-lg font-semibold text-gray-900 mb-2">Article 2. Transitional Measures</h4>
                  <p className="text-lg text-gray-700">
                    All matters handled prior to the enforcement of this regulation, or business trips in progress, shall be handled in accordance with this regulation.
                  </p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Back to Top */}
          <motion.div
            className="text-right my-8"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.6 }}
            viewport={{ once: true }}
          >
            <a 
              href="#travel-policy" 
              className="text-sm underline text-accent hover:text-accent-pink transition-colors duration-200"
            >
              ⬆ Back to top
            </a>
          </motion.div>
        </motion.div>
      </div>
    </motion.section>
  );
};

export default TravelPolicy;