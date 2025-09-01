import { GraduationCap, Calendar, DollarSign, FileText, CheckCircle, Mail, Phone, Users } from "lucide-react";

interface ScholarshipApplicationProps {
  onApply?: () => void;
  onLearnMore?: () => void;
}

export function ScholarshipInfo({ onApply, onLearnMore }: ScholarshipApplicationProps = {}) {
  const currentYear = new Date().getFullYear();
  
  const scholarshipDetails = {
    name: ":20 Second Timeout Foundation Scholarship",
    amount: 2500,
    recipients: 4,
    applicationDeadline: "March 15, 2025",
    announcementDate: "April 30, 2025",
    requirements: [
      "Must be a graduating high school senior",
      "Planning to attend an accredited college or university",
      "Demonstrate financial need",
      "Show commitment to community service",
      "Maintain a minimum 3.0 GPA",
      "Submit a 500-word essay on community impact"
    ],
    applicationMaterials: [
      "Completed application form",
      "Official high school transcript",
      "Two letters of recommendation",
      "Community service documentation",
      "Personal essay (500 words)",
      "FAFSA or financial aid documentation"
    ],
    selectionCriteria: [
      "Academic achievement and potential",
      "Demonstrated financial need",
      "Community service and involvement",
      "Leadership qualities and character",
      "Quality of personal essay",
      "Overall application completeness"
    ]
  };

  return (
    <section className="py-16 lg:py-20 bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-950/20 dark:to-indigo-950/20">
      <div className="container mx-auto px-4">
        {/* Header Section */}
        <div className="text-center mb-16">
          <div className="bg-blue-600 text-white p-4 rounded-full inline-flex mb-6">
            <GraduationCap className="h-8 w-8" />
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-blue-900 dark:text-blue-100 mb-4">
            Scholarship Program
          </h2>
          <p className="text-xl md:text-2xl text-blue-600 dark:text-blue-300 font-medium mb-6">
            Supporting Tomorrow's Leaders
          </p>
          <div className="max-w-3xl mx-auto">
            <p className="text-lg text-blue-800 dark:text-blue-200 leading-relaxed">
              The :20 Second Timeout Foundation is proud to support college-bound high school seniors 
              who demonstrate academic excellence, community involvement, and financial need.
            </p>
          </div>
        </div>

        {/* Scholarship Overview Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          <div className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow-lg border border-blue-200 dark:border-blue-700 text-center">
            <div className="bg-green-100 dark:bg-green-900/20 p-3 rounded-lg inline-flex mb-4">
              <DollarSign className="h-6 w-6 text-green-600" />
            </div>
            <div className="text-2xl font-bold text-green-600 mb-2">
              ${scholarshipDetails.amount.toLocaleString()}
            </div>
            <div className="text-sm text-slate-600 dark:text-slate-400">
              Per Scholarship Award
            </div>
          </div>

          <div className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow-lg border border-blue-200 dark:border-blue-700 text-center">
            <div className="bg-purple-100 dark:bg-purple-900/20 p-3 rounded-lg inline-flex mb-4">
              <Users className="h-6 w-6 text-purple-600" />
            </div>
            <div className="text-2xl font-bold text-purple-600 mb-2">
              {scholarshipDetails.recipients}
            </div>
            <div className="text-sm text-slate-600 dark:text-slate-400">
              Recipients Annually
            </div>
          </div>

          <div className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow-lg border border-blue-200 dark:border-blue-700 text-center">
            <div className="bg-orange-100 dark:bg-orange-900/20 p-3 rounded-lg inline-flex mb-4">
              <Calendar className="h-6 w-6 text-orange-600" />
            </div>
            <div className="text-lg font-bold text-orange-600 mb-2">
              {scholarshipDetails.applicationDeadline}
            </div>
            <div className="text-sm text-slate-600 dark:text-slate-400">
              Application Deadline
            </div>
          </div>

          <div className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow-lg border border-blue-200 dark:border-blue-700 text-center">
            <div className="bg-blue-100 dark:bg-blue-900/20 p-3 rounded-lg inline-flex mb-4">
              <FileText className="h-6 w-6 text-blue-600" />
            </div>
            <div className="text-lg font-bold text-blue-600 mb-2">
              {scholarshipDetails.announcementDate}
            </div>
            <div className="text-sm text-slate-600 dark:text-slate-400">
              Winner Announcement
            </div>
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-2 gap-8 mb-16">
          {/* Eligibility Requirements */}
          <div className="bg-white dark:bg-slate-800 p-6 md:p-8 rounded-xl shadow-lg border border-blue-200 dark:border-blue-700">
            <h3 className="text-2xl font-bold text-blue-900 dark:text-blue-100 mb-6 flex items-center gap-2">
              <CheckCircle className="h-6 w-6 text-blue-600" />
              Eligibility Requirements
            </h3>
            <div className="space-y-3">
              {scholarshipDetails.requirements.map((requirement, index) => (
                <div key={index} className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 shrink-0"></div>
                  <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                    {requirement}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Application Materials */}
          <div className="bg-white dark:bg-slate-800 p-6 md:p-8 rounded-xl shadow-lg border border-blue-200 dark:border-blue-700">
            <h3 className="text-2xl font-bold text-blue-900 dark:text-blue-100 mb-6 flex items-center gap-2">
              <FileText className="h-6 w-6 text-blue-600" />
              Required Materials
            </h3>
            <div className="space-y-3">
              {scholarshipDetails.applicationMaterials.map((material, index) => (
                <div key={index} className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-green-500 rounded-full mt-2 shrink-0"></div>
                  <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                    {material}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Selection Criteria */}
        <div className="bg-white dark:bg-slate-800 p-6 md:p-8 rounded-xl shadow-lg border border-blue-200 dark:border-blue-700 mb-16">
          <h3 className="text-2xl font-bold text-blue-900 dark:text-blue-100 mb-6 text-center">
            Selection Criteria
          </h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {scholarshipDetails.selectionCriteria.map((criteria, index) => (
              <div key={index} className="text-center p-4 bg-blue-50 dark:bg-blue-950/20 rounded-lg">
                <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-bold mx-auto mb-3">
                  {index + 1}
                </div>
                <p className="text-blue-800 dark:text-blue-200 font-medium">
                  {criteria}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Important Dates Timeline */}
        <div className="bg-gradient-to-r from-blue-100 to-indigo-100 dark:from-blue-950/30 dark:to-indigo-950/30 p-8 md:p-12 rounded-xl border border-blue-200 dark:border-blue-700 mb-16">
          <h3 className="text-2xl font-bold text-blue-900 dark:text-blue-100 text-center mb-8">
            {currentYear + 1} Scholarship Timeline
          </h3>
          <div className="max-w-3xl mx-auto">
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold shrink-0">
                  1
                </div>
                <div>
                  <h4 className="font-bold text-blue-900 dark:text-blue-100 mb-1">
                    Application Opens - January 1, {currentYear + 1}
                  </h4>
                  <p className="text-blue-700 dark:text-blue-300">
                    Online application portal becomes available for submissions.
                  </p>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-orange-600 text-white rounded-full flex items-center justify-center font-bold shrink-0">
                  2
                </div>
                <div>
                  <h4 className="font-bold text-blue-900 dark:text-blue-100 mb-1">
                    Application Deadline - {scholarshipDetails.applicationDeadline}
                  </h4>
                  <p className="text-blue-700 dark:text-blue-300">
                    Final date to submit completed applications and all required materials.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-purple-600 text-white rounded-full flex items-center justify-center font-bold shrink-0">
                  3
                </div>
                <div>
                  <h4 className="font-bold text-blue-900 dark:text-blue-100 mb-1">
                    Review Period - March 16 - April 29, {currentYear + 1}
                  </h4>
                  <p className="text-blue-700 dark:text-blue-300">
                    Scholarship committee reviews and evaluates all applications.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-green-600 text-white rounded-full flex items-center justify-center font-bold shrink-0">
                  4
                </div>
                <div>
                  <h4 className="font-bold text-blue-900 dark:text-blue-100 mb-1">
                    Winners Announced - {scholarshipDetails.announcementDate}
                  </h4>
                  <p className="text-blue-700 dark:text-blue-300">
                    Scholarship recipients are notified and publicly recognized.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Call to Action Section */}
        <div className="text-center">
          <h3 className="text-2xl md:text-3xl font-bold text-blue-900 dark:text-blue-100 mb-6">
            Ready to Apply?
          </h3>
          <p className="text-lg text-blue-800 dark:text-blue-200 mb-8 max-w-2xl mx-auto">
            Don't miss this opportunity to invest in your future. Applications for the {currentYear + 1} 
            scholarship program will open January 1st.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
            <button 
              onClick={onApply}
              className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-semibold transition-colors duration-200 shadow-lg hover:shadow-xl"
            >
              Apply Now
            </button>
            <button 
              onClick={onLearnMore}
              className="bg-transparent border-2 border-blue-600 text-blue-700 dark:text-blue-300 hover:bg-blue-600 hover:text-white px-8 py-3 rounded-lg font-semibold transition-colors duration-200"
            >
              Download Application Guide
            </button>
          </div>

          {/* Contact Information */}
          <div className="bg-white dark:bg-slate-800 p-6 rounded-xl border border-blue-200 dark:border-blue-700 max-w-md mx-auto">
            <h4 className="font-bold text-blue-900 dark:text-blue-100 mb-4">
              Questions about the scholarship?
            </h4>
            <div className="space-y-2">
              <a 
                href="mailto:scholarships@20secondtimeout.org"
                className="flex items-center justify-center gap-2 text-blue-600 hover:text-blue-700 font-medium transition-colors"
              >
                <Mail className="h-4 w-4" />
                scholarships@20secondtimeout.org
              </a>
              <a 
                href="tel:(555) 123-4567"
                className="flex items-center justify-center gap-2 text-blue-600 hover:text-blue-700 font-medium transition-colors"
              >
                <Phone className="h-4 w-4" />
                (555) 123-4567
              </a>
            </div>
          </div>
        </div>

        {/* Past Recipients Section */}
        <div className="mt-16 text-center">
          <h3 className="text-2xl md:text-3xl font-bold text-blue-900 dark:text-blue-100 mb-8">
            Celebrating Our Past Recipients
          </h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[2024, 2023, 2022, 2021].map((year) => (
              <div key={year} className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow-lg border border-blue-200 dark:border-blue-700">
                <div className="text-3xl font-bold text-blue-600 mb-2">
                  {year}
                </div>
                <div className="text-lg font-semibold text-blue-900 dark:text-blue-100 mb-2">
                  {scholarshipDetails.recipients} Recipients
                </div>
                <div className="text-sm text-slate-600 dark:text-slate-400">
                  ${(scholarshipDetails.amount * scholarshipDetails.recipients).toLocaleString()} awarded
                </div>
              </div>
            ))}
          </div>
          <div className="mt-8">
            <p className="text-lg text-blue-800 dark:text-blue-200">
              <strong>Total Impact:</strong> 16 students supported, $40,000 in scholarships awarded since 2021
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
