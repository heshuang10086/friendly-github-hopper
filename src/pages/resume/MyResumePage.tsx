
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import ResumeList from "@/components/resume/ResumeList";
import { useResumes } from "@/hooks/useResumes";
import { usePdfParser } from "@/hooks/usePdfParser";

const MyResumePage = () => {
  const {
    resumes,
    isDeletingResume,
    handleResumeView,
    handleResumeDelete,
  } = useResumes();

  const {
    isParsingResume,
    parsingResumeId,
    handleResumeParse,
  } = usePdfParser();

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-[#F0EFEA]">
      <Navigation />
      
      <main className="pt-16 container mx-auto px-4 py-12">
        <div className="max-w-5xl mx-auto">
          <div className="flex items-center mb-8 border-b border-[#E6E4DD] pb-4">
            <div className="bg-gradient-to-r from-[#9EE755] to-[#CFDD3C] p-1 rounded-lg mr-4">
              <div className="bg-white p-2 rounded-md">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary">
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                  <polyline points="14 2 14 8 20 8"></polyline>
                  <line x1="16" y1="13" x2="8" y2="13"></line>
                  <line x1="16" y1="17" x2="8" y2="17"></line>
                  <polyline points="10 9 9 9 8 9"></polyline>
                </svg>
              </div>
            </div>
            <h1 className="text-3xl font-bold text-primary">我的简历</h1>
          </div>
          
          <div className="bg-white rounded-xl shadow-sm border border-[#E6E4DD] overflow-hidden">
            <ResumeList
              resumes={resumes}
              isParsingResume={isParsingResume}
              parsingResumeId={parsingResumeId}
              isDeletingResume={isDeletingResume}
              onView={handleResumeView}
              onParse={handleResumeParse}
              onDelete={handleResumeDelete}
            />
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default MyResumePage;
