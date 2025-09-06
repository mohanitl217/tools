import React from 'react';
import { ExternalLink, GraduationCap, Users, DollarSign, FileText, Camera } from 'lucide-react';

function App() {
  const tools = [
    {
      title: "UBI Portal Search",
      description: "Search Students UBI Portal Details and Class Strength",
      url: "https://script.google.com/macros/s/AKfycbxHHRmYZA7GPMYfOrgMD6CN6E-iu-AOOEBN93MScwm7UXI20Rw-lHOCCw_l1Jeo7Ub3Gg/exec",
      icon: Users
    },
    {
      title: "UDISE Student Details",
      description: "Students PEN and Students Apaar Number",
      url: "https://script.google.com/macros/s/AKfycbz09R4Ejtac9vrg83_ZWXOgwjihGVurytLR-BFHP7Xd3iMEdRhwCCjTXDym4lVjeWIm/exec",
      icon: FileText
    },
    {
      title: "Fee Collection Report",
      description: "Classwise Monthly Fee Summary",
      url: "https://script.google.com/macros/s/AKfycbyLdCOhaxJMV3l2bAyquci7SDho-a8bYBDqskZQ_6z2BSeQA0hMupLSsjNCOra9H1wWrA/exec",
      icon: DollarSign
    },
    {
      title: "Markslip Entry",
      description: "PT1, Half Year, SSE Exam Marks Entry For Primary Classes",
      url: "https://script.google.com/macros/s/AKfycbzAKlr9EfsG7EpyRaX7Ak54NIvo7TYll2N3UcXyv9Rtx5VKhIRNnJuLESZEv_5a5Cp1rg/exec",
      icon: FileText
    },
    {
      title: "Photo & Video Gallery",
      description: "School Occasion Photos and Video Gallery",
      url: "https://script.google.com/macros/s/AKfycbxNU9jWb4DiIB0IxmBhh8ESYAbTxOL5jphq8thKy4rs9WIhxUZtSzPw1D238kBpyaYIog/exec",
      icon: Camera
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-3 mb-4">
            <GraduationCap className="w-10 h-10 text-blue-600" />
            <h1 className="text-3xl font-bold text-gray-900">School Management Portal</h1>
          </div>
          <p className="text-gray-600">Access all school management tools</p>
        </div>

        {/* Tools Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {tools.map((tool, index) => {
            const IconComponent = tool.icon;
            return (
              <div key={index} className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
                <div className="flex items-center gap-3 mb-3">
                  <IconComponent className="w-6 h-6 text-blue-600" />
                  <h3 className="text-lg font-semibold text-gray-900">{tool.title}</h3>
                </div>
                <p className="text-gray-600 mb-4 text-sm">{tool.description}</p>
                <a
                  href={tool.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors text-sm"
                >
                  Open Tool
                  <ExternalLink className="w-4 h-4" />
                </a>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default App;
