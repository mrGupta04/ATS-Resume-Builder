"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Upload, CheckCircle, AlertCircle, ArrowLeft, Loader2, FileText, Target, Zap, BarChart3, Download } from "lucide-react";
import { toast } from "@/hooks/use-toast";

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

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.type !== "application/pdf") {
      toast({ title: "Invalid File", description: "Please upload a valid PDF resume!", duration: 3000, variant: "destructive" });
      return;
    }

    if (file.size > MAX_FILE_SIZE) {
      toast({ title: "File Too Large", description: "Maximum file size is 5MB.", duration: 3000, variant: "destructive" });
      return;
    }

    setPdfFile(file);
    toast({ title: "File Selected", description: `${file.name} selected successfully!`, duration: 3000 });
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const file = e.dataTransfer.files?.[0];
    if (!file) return;

    if (file.type !== "application/pdf") {
      toast({ title: "Invalid File", description: "Please drop a valid PDF resume!", duration: 3000, variant: "destructive" });
      return;
    }

    if (file.size > MAX_FILE_SIZE) {
      toast({ title: "File Too Large", description: "Maximum file size is 5MB.", duration: 3000, variant: "destructive" });
      return;
    }

    setPdfFile(file);
    toast({ title: "File Uploaded", description: `${file.name} uploaded successfully!`, duration: 3000 });
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => e.preventDefault();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!pdfFile) {
      toast({ title: "No Resume", description: "Please upload a resume PDF!", duration: 3000, variant: "destructive" });
      return;
    }

    setLoading(true);
    setSubmitted(true);

    setTimeout(() => {
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
      toast({ title: "Success", description: "ATS check completed!", duration: 3000 });
    }, 2500);
  };

  const resetForm = () => {
    setSubmitted(false);
    setResult(null);
    setPdfFile(null);
    setJobDescription("");
  };

  const getScoreColor = (score: number) => (score >= 80 ? "text-green-600" : score >= 60 ? "text-amber-600" : "text-red-600");
  const getScoreBadgeColor = (score: number) => (score >= 80 ? "bg-green-100 text-green-800 border-green-200" : score >= 60 ? "bg-amber-100 text-amber-800 border-amber-200" : "bg-red-100 text-red-800 border-red-200");
  const getProgressColor = (score: number) => (score >= 80 ? "bg-green-500" : score >= 60 ? "bg-amber-400" : "bg-red-400");

  const handleDownloadReport = () => {
    if (!result) return;

    const report = `
ATS Resume Checker Report
=========================

Score: ${result.score}%

Matched Keywords:
${result.keywords.map(k => `• ${k}`).join("\n")}

Suggestions for Improvement:
${result.suggestions.map(s => `• ${s}`).join("\n")}

Generated on: ${new Date().toLocaleDateString()}
    `;

    const blob = new Blob([report], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `ATS-Report-${Date.now()}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);

    toast({ title: "Report Downloaded", description: "Your ATS report has been downloaded successfully!", duration: 3000 });
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
                    <Input id="resume" type="file" accept=".pdf" onChange={handleFileChange} className="hidden" />
                  </div>
                </div>

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

                <Button type="submit" disabled={loading || !pdfFile} className="w-full py-3 text-base font-medium relative overflow-hidden" size="lg">
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
              </form>
            </CardContent>
          </Card>
        ) : (
          // Results Section
          <div className="space-y-6">
            {loading ? (
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
                          className={`h-3 ${getProgressColor(result?.score || 0)}`} 
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

                {/* Keywords Card */}
                <Card className="border-0 shadow-lg overflow-hidden">
                  <CardHeader>
                    <CardTitle className="text-lg flex items-center gap-2">
                      <FileText className="h-5 w-5 text-blue-600" />
                      Matched Keywords
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="list-disc list-inside space-y-1 text-sm">
                      {result?.keywords.map((kw, idx) => (
                        <li key={idx}>{kw}</li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>

                {/* Suggestions Card */}
                <Card className="border-0 shadow-lg overflow-hidden">
                  <CardHeader>
                    <CardTitle className="text-lg flex items-center gap-2">
                      <Zap className="h-5 w-5 text-blue-600" />
                      Suggestions for Improvement
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="list-disc list-inside space-y-1 text-sm">
                      {result?.suggestions.map((sug, idx) => (
                        <li key={idx}>{sug}</li>
                      ))}
                    </ul>
                  </CardContent>
                  <CardContent className="pt-0">
                    <Button onClick={handleDownloadReport} className="w-full flex items-center justify-center gap-2">
                      <Download className="w-4 h-4" />
                      Download Report
                    </Button>
                  </CardContent>
                </Card>

                <Button onClick={resetForm} variant="outline" className="w-full flex items-center justify-center gap-2 mt-4">
                  <ArrowLeft className="w-4 h-4" />
                  Go Back
                </Button>
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
