"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Upload, CheckCircle, AlertCircle, ArrowLeft, Loader2, FileText, Target, Zap, BarChart3, Download } from "lucide-react";
import { toast } from "@/hooks/use-toast";

// Maximum file size: 5MB in bytes
const MAX_FILE_SIZE = 5 * 1024 * 1024;

export default function ATSCheckerPage() {
  const [pdfFile, setPdfFile] = useState<File | null>(null);
  const [jobDescription, setJobDescription] = useState("");
  const [result, setResult] = useState<{
    score: number;
    keywords: string[];
    suggestions: string[];
  } | null>(null);
  
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  
  // Handle file selection via input
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    
    if (!file) return;
    
    if (file.type !== "application/pdf") {
      toast({
        title: "Invalid File",
        description: "Please upload a valid PDF resume!",
        duration: 3000,
        variant: "destructive",
      });
      return;
    }
    
    if (file.size > MAX_FILE_SIZE) {
      toast({
        title: "File Too Large",
        description: "Maximum file size is 5MB.",
        duration: 3000,
        variant: "destructive",
      });
      return;
    }
    
    setPdfFile(file);
    toast({
      title: "File Selected",
      description: `${file.name} selected successfully!`,
      duration: 3000,
    });
  };

  // Handle drag-and-drop
  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    
    const file = e.dataTransfer.files?.[0];
    
    if (!file) return;
    
    if (file.type !== "application/pdf") {
      toast({
        title: "Invalid File",
        description: "Please drop a valid PDF resume!",
        duration: 3000,
        variant: "destructive",
      });
      return;
    }
    
    if (file.size > MAX_FILE_SIZE) {
      toast({
        title: "File Too Large",
        description: "Maximum file size is 5MB.",
        duration: 3000,
        variant: "destructive",
      });
      return;
    }
    
    setPdfFile(file);
    toast({
      title: "File Uploaded",
      description: `${file.name} uploaded successfully!`,
      duration: 3000,
    });
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!pdfFile) {
      toast({
        title: "No Resume",
        description: "Please upload a resume PDF!",
        duration: 3000,
        variant: "destructive",
      });
      return;
    }

    setLoading(true);
    setSubmitted(true);
    
    // Simulate API call with timeout
    setTimeout(() => {
      // Mock result data
      setResult({
        score: 72,
        keywords: ["React", "TypeScript", "Node.js", "UI/UX", "Agile", "REST API", "Problem Solving"],
        suggestions: [
          "Include more metrics to quantify your achievements",
          "Add missing keyword: 'JavaScript' from the job description",
          "Consider adding a skills section for easier parsing",
          "Optimize section headings for ATS (use standard titles like 'Work Experience')"
        ]
      });
      setLoading(false);
      toast({
        title: "Success",
        description: "ATS check completed!",
        duration: 3000,
      });
    }, 2500);
  };

  const resetForm = () => {
    setSubmitted(false);
    setResult(null);
    setPdfFile(null);
    setJobDescription("");
  };

  // Get score color based on value
  const getScoreColor = (score: number) => {
    if (score >= 80) return "text-green-600";
    if (score >= 60) return "text-amber-600";
    return "text-red-600";
  };

  // Get score badge color
  const getScoreBadgeColor = (score: number) => {
    if (score >= 80) return "bg-green-100 text-green-800 border-green-200";
    if (score >= 60) return "bg-amber-100 text-amber-800 border-amber-200";
    return "bg-red-100 text-red-800 border-red-200";
  };

  // Handle download report
  const handleDownloadReport = () => {
    if (!result) return;
    
    // Create a simple text report
    const report = `
      ATS Resume Checker Report
      =========================
      
      Score: ${result.score}%
      
      Matched Keywords:
      ${result.keywords.map(keyword => `• ${keyword}`).join('\n')}
      
      Suggestions for Improvement:
      ${result.suggestions.map(suggestion => `• ${suggestion}`).join('\n')}
      
      Generated on: ${new Date().toLocaleDateString()}
    `;
    
    // Create a blob and download link
    const blob = new Blob([report], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `ATS-Report-${new Date().getTime()}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    
    toast({
      title: "Report Downloaded",
      description: "Your ATS report has been downloaded successfully!",
      duration: 3000,
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-blue-50/30 dark:from-gray-900 dark:to-gray-800 py-8 px-4">
      <div className="container mx-auto max-w-4xl">
        {/* Header Section */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center p-2 bg-blue-100 rounded-full mb-4 dark:bg-blue-900/30">
            <BarChart3 className="h-6 w-6 text-blue-600 dark:text-blue-400" />
          </div>
          <h1 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-400 dark:to-indigo-400 mb-2">
            ATS Resume Checker
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-3">
            Optimize your resume for Applicant Tracking Systems and increase your chances of landing interviews
          </p>
          <div className="inline-flex items-center px-3 py-1 rounded-full bg-amber-100 text-amber-800 text-sm font-medium border border-amber-200 dark:bg-amber-900/30 dark:text-amber-300 dark:border-amber-800">
            <AlertCircle className="w-4 h-4 mr-1" />
            Beta - Experimental Feature
          </div>
        </div>
        
        {!submitted ? (
          // Upload Form
          <Card className="shadow-lg border-0 overflow-hidden">
            <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-1"></div>
            <CardHeader className="text-center pb-4">
              <CardTitle className="text-2xl flex items-center justify-center gap-2">
                <Target className="h-6 w-6 text-blue-600" />
                Analyze Your Resume
              </CardTitle>
              <CardDescription>
                Upload your resume and optionally add a job description for targeted analysis
              </CardDescription>
            </CardHeader>
            <CardContent className="pt-2">
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* File Drop Zone */}
                <div>
                  <label htmlFor="resume" className="block text-sm font-medium mb-2 text-foreground">
                    Upload Resume (PDF, max 5MB)
                  </label>
                  <div
                    className={`border-2 border-dashed rounded-xl p-8 text-center transition-all duration-300 cursor-pointer group
                      ${pdfFile 
                        ? 'border-green-400 bg-green-50/50 dark:bg-green-900/10' 
                        : 'border-blue-300 bg-blue-50/30 hover:bg-blue-50/50 dark:bg-blue-900/5 dark:hover:bg-blue-900/10 dark:border-blue-700'
                      }`}
                    onDrop={handleDrop}
                    onDragOver={handleDragOver}
                    onClick={() => document.getElementById('resume')?.click()}
                  >
                    <div className={`inline-flex items-center justify-center p-3 rounded-full mb-3 transition-all duration-300 group-hover:scale-110
                      ${pdfFile 
                        ? 'bg-green-100 text-green-600 dark:bg-green-900/20' 
                        : 'bg-blue-100 text-blue-600 dark:bg-blue-900/20'
                      }`}>
                      {pdfFile ? <CheckCircle className="w-6 h-6" /> : <Upload className="w-6 h-6" />}
                    </div>
                    <p className="text-sm font-medium mb-1">
                      {pdfFile ? pdfFile.name : "Drag & drop your PDF here or click to upload"}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {pdfFile ? `${(pdfFile.size / (1024 * 1024)).toFixed(2)} MB` : "PDF files only (max 5MB)"}
                    </p>
                    <Input
                      id="resume"
                      type="file"
                      accept=".pdf"
                      onChange={handleFileChange}
                      className="hidden"
                    />
                  </div>
                </div>

                {/* Job Description Textarea */}
                <div>
                  <label htmlFor="jobDescription" className="block text-sm font-medium mb-2 text-foreground">
                    Job Description (Optional)
                  </label>
                  <div className="relative">
                    <textarea
                      id="jobDescription"
                      value={jobDescription}
                      onChange={(e) => setJobDescription(e.target.value)}
                      placeholder="Paste the job description here for targeted keyword matching and suggestions..."
                      className="w-full p-4 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-card resize-y min-h-[120px]"
                      rows={4}
                    />
                    {!jobDescription && (
                      <div className="absolute inset-y-0 right-4 flex items-center">
                        <div className="inline-flex items-center px-2 py-1 rounded-md bg-slate-100 text-slate-500 text-xs dark:bg-slate-800">
                          <Zap className="w-3 h-3 mr-1" />
                          Optional
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {/* Submit Button */}
                <Button 
                  type="submit" 
                  disabled={loading || !pdfFile} 
                  className="w-full py-3 text-base font-medium relative overflow-hidden"
                  size="lg"
                >
                  {loading ? (
                    <>
                      <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                      Analyzing...
                    </>
                  ) : (
                    <>
                      <Target className="w-5 h-5 mr-2" />
                      Check ATS Score
                    </>
                  )}
                </Button>
                
                {/* Info Tips */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3 pt-4">
                  <div className="flex items-start gap-2 text-xs text-muted-foreground p-2 rounded-lg bg-slate-100 dark:bg-slate-800/50">
                    <FileText className="w-3 h-3 mt-0.5 flex-shrink-0" />
                    <span>We analyze formatting, keywords, and structure</span>
                  </div>
                  <div className="flex items-start gap-2 text-xs text-muted-foreground p-2 rounded-lg bg-slate-100 dark:bg-slate-800/50">
                    <CheckCircle className="w-3 h-3 mt-0.5 flex-shrink-0" />
                    <span>Get personalized improvement suggestions</span>
                  </div>
                  <div className="flex items-start gap-2 text-xs text-muted-foreground p-2 rounded-lg bg-slate-100 dark:bg-slate-800/50">
                    <AlertCircle className="w-3 h-3 mt-0.5 flex-shrink-0" />
                    <span>This is a beta feature - results may vary</span>
                  </div>
                </div>
              </form>
            </CardContent>
          </Card>
        ) : (
          // Results Section
          <div className="space-y-6">
            {loading ? (
              // Loading Card
              <Card className="text-center py-12 border-0 shadow-lg bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-gray-800 dark:to-gray-900">
                <CardContent className="flex flex-col items-center justify-center">
                  <div className="relative">
                    <Loader2 className="h-12 w-12 text-blue-600 animate-spin mb-4" />
                    <div className="absolute inset-0 bg-blue-100 rounded-full animate-ping opacity-20"></div>
                  </div>
                  <h3 className="text-xl font-medium mb-2">Analyzing your resume...</h3>
                  <p className="text-muted-foreground max-w-md">
                    We&apos;re checking your resume against ATS criteria and optimizing for better readability.
                  </p>
                  <div className="w-full max-w-sm mt-6">
                    <Progress value={33} className="h-2" />
                  </div>
                </CardContent>
              </Card>
            ) : (
              // Results Cards
              <>
                {/* Score Card */}
                <Card className="border-0 shadow-lg overflow-hidden">
                  <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-1"></div>
                  <CardHeader className="pb-4">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                      <CardTitle className="text-xl flex items-center gap-2">
                        <BarChart3 className="h-5 w-5 text-blue-600" />
                        ATS Compatibility Score
                      </CardTitle>
                      <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium border ${getScoreBadgeColor(result?.score || 0)}`}>
                        {result?.score && result.score >= 70 ? "Good" : result?.score && result.score >= 60 ? "Fair" : "Needs Improvement"}
                      </span>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-end gap-4 mb-4">
                      <span className={`text-5xl font-bold ${getScoreColor(result?.score || 0)}`}>{result?.score}%</span>
                      <div className="flex-1">
                        <div className="flex justify-between text-sm text-muted-foreground mb-1">
                          <span>0%</span>
                          <span>50%</span>
                          <span>100%</span>
                        </div>
                        <Progress 
                          value={result?.score || 0} 
                          className="h-3" 
                          indicatorClassName={
                            result?.score && result.score >= 80 ? "bg-green-500" : 
                            result?.score && result.score >= 60 ? "bg-amber-400" : "bg-red-400"
                          }
                        />
                      </div>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      {result?.score && result.score >= 80 
                        ? "Your resume has a high chance of passing through most Applicant Tracking Systems." 
                        : result?.score && result.score >= 60
                        ? "Your resume may pass through some ATS systems but could use optimization."
                        : "Your resume likely needs significant improvements to pass through ATS systems."
                      }
                    </p>
                  </CardContent>
                </Card>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Keywords Card */}
                  <Card className="border-0 shadow-lg">
                    <CardHeader className="pb-3">
                      <CardTitle className="flex items-center gap-2 text-lg">
                        <div className="p-1 bg-green-100 rounded-full dark:bg-green-900/30">
                          <CheckCircle className="h-4 w-4 text-green-600 dark:text-green-400" />
                        </div>
                        Matched Keywords
                      </CardTitle>
                      <CardDescription>
                        These keywords from your resume match common ATS criteria
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      {result?.keywords && result.keywords.length > 0 ? (
                        <div className="flex flex-wrap gap-2">
                          {result.keywords.map((keyword, idx) => (
                            <span 
                              key={idx} 
                              className="px-3 py-1.5 bg-green-100 text-green-800 text-sm rounded-full border border-green-200 font-medium dark:bg-green-900/30 dark:text-green-300 dark:border-green-800/50"
                            >
                              {keyword}
                            </span>
                          ))}
                        </div>
                      ) : (
                        <p className="text-sm text-muted-foreground">No keywords matched.</p>
                      )}
                    </CardContent>
                  </Card>

                  {/* Suggestions Card */}
                  <Card className="border-0 shadow-lg">
                    <CardHeader className="pb-3">
                      <CardTitle className="flex items-center gap-2 text-lg">
                        <div className="p-1 bg-amber-100 rounded-full dark:bg-amber-900/30">
                          <AlertCircle className="h-4 w-4 text-amber-600 dark:text-amber-400" />
                        </div>
                        Improvement Suggestions
                      </CardTitle>
                      <CardDescription>
                        Recommendations to improve your ATS compatibility
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      {result?.suggestions && result.suggestions.length > 0 ? (
                        <ul className="space-y-3">
                          {result.suggestions.map((suggestion, idx) => (
                            <li key={idx} className="flex items-start gap-3 text-sm">
                              <div className="p-0.5 bg-amber-100 rounded-full mt-0.5 dark:bg-amber-900/30">
                                <div className="w-2 h-2 rounded-full bg-amber-500"></div>
                              </div>
                              <span>{suggestion}</span>
                            </li>
                          ))}
                        </ul>
                      ) : (
                        <p className="text-sm text-muted-foreground">Your resume looks good! No suggestions available.</p>
                      )}
                    </CardContent>
                  </Card>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-4 pt-4">
                  <Button 
                    onClick={resetForm} 
                    variant="outline" 
                    className="flex-1 py-3 gap-2"
                    size="lg"
                  >
                    <ArrowLeft className="h-5 w-5" />
                    Check Another Resume
                  </Button>
                  <Button 
                    onClick={handleDownloadReport} 
                    className="flex-1 py-3 gap-2" 
                    size="lg"
                  >
                    <Download className="h-5 w-5" />
                    Download Report
                  </Button>
                </div>
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
}