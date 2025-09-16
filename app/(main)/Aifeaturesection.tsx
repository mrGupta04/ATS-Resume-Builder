"use client";
import { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Sparkles,
  Upload,
  FileText,
  Wand2,
  Copy,
  CheckCircle2,
  ArrowRight,
  Bot,
  Zap,
  Brain,
} from "lucide-react";

export function AIFeaturesSection() {
  const [isDragging, setIsDragging] = useState(false);
  const [uploadedFileName, setUploadedFileName] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedContent, setGeneratedContent] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  // Drag events
  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    if (file) {
      setUploadedFileName(file.name);
      simulateContentGeneration();
      router.push("/ats-checker");
    }
  };

  // File input
  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setUploadedFileName(file.name);
      simulateContentGeneration();
      router.push("/ats-checker");
    }
  };

  // Trigger file upload dialog
  const handleClickUpload = () => {
    fileInputRef.current?.click();
  };

  // Simulate content generation
  const simulateContentGeneration = () => {
    setIsGenerating(true);
    setTimeout(() => {
      setGeneratedContent(
        "Experienced software engineer with 5+ years in full-stack development. Expertise in React, Node.js, and cloud infrastructure. Successfully led a team of 5 developers to deliver a scalable SaaS product that increased client revenue by 35%. Strong problem-solving skills with a track record of optimizing system performance by 40%."
      );
      setIsGenerating(false);
    }, 2500);
  };

  return (
    <section className="py-16 md:py-24 bg-gradient-to-b from-muted/20 to-background relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-full h-72 bg-gradient-to-r from-primary/5 to-violet-500/5 -skew-y-3 -translate-y-32"></div>
      <div className="absolute -top-4 -right-4 w-72 h-72 bg-primary/10 rounded-full blur-3xl"></div>
      <div className="absolute -bottom-4 -left-4 w-72 h-72 bg-violet-500/10 rounded-full blur-3xl"></div>

      <div className="container px-4 mx-auto relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16 md:mb-20">
          <Badge
            variant="outline"
            className="mb-4 px-4 py-1.5 text-sm bg-primary/10 text-primary border-primary/30 backdrop-blur-sm rounded-full"
          >
            <Zap className="h-3.5 w-3.5 mr-1.5 fill-primary" />
            AI-Powered Features
          </Badge>
          <h2 className="text-4xl md:text-5xl font-bold mb-5 bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
            Supercharge Your Resume With AI
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Our advanced AI tools help you create a professional, ATS-optimized resume that stands out to employers.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
          {/* Left Column - AI Parsing */}
          <div className="flex flex-col h-full">
            <div className="mb-8">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-primary/10 rounded-lg">
                  <Wand2 className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-2xl font-bold">AI-Powered Resume Parsing</h3>
              </div>
              <p className="text-muted-foreground pl-11">
                Instantly extract information from your existing resume with our advanced AI parsing technology. No need to start from scratch—we'll handle the heavy lifting.
              </p>
            </div>

            <Card className="bg-background/80 backdrop-blur-sm border-border/50 shadow-lg rounded-xl flex-grow flex flex-col overflow-hidden transition-all duration-300 hover:shadow-xl">
              <CardContent className="p-6 flex flex-col flex-grow">
                <div
                  className={`relative border-2 border-dashed rounded-xl p-8 text-center cursor-pointer transition-all duration-300 flex-grow flex flex-col justify-center group
                  ${
                    isDragging
                      ? "border-primary bg-primary/10 scale-[1.02]"
                      : "border-muted-foreground/20 hover:border-primary/50 hover:bg-primary/5"
                  }`}
                  onDragOver={handleDragOver}
                  onDragLeave={handleDragLeave}
                  onDrop={handleDrop}
                  onClick={handleClickUpload}
                >
                  <div className="flex flex-col items-center justify-center gap-4">
                    <div className="relative">
                      <Upload className="h-12 w-12 text-muted-foreground group-hover:text-primary transition-colors" />
                      <div className="absolute -inset-3 bg-primary/10 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-md"></div>
                    </div>
                    <div>
                      <p className="font-semibold mb-1.5 text-foreground">UPLOAD YOUR RESUME</p>
                      <p className="text-sm text-muted-foreground">
                        DOC, DOCX, PDF, HTML, RTF or TXT files
                      </p>
                    </div>
                    <p className="text-sm text-muted-foreground group-hover:text-foreground transition-colors">
                      Drag and drop or click to browse
                    </p>
                    <p className="text-xs text-muted-foreground/70">Max file size: 5MB</p>
                  </div>

                  {/* Hover Button */}
                  <Button
                    size="sm"
                    className="absolute bottom-5 right-5 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0 shadow-md"
                    onClick={(e) => {
                      e.stopPropagation();
                      router.push("/ats-checker");
                    }}
                  >
                    Analyze Resume
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>

                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleFileInputChange}
                  className="hidden"
                  accept=".doc,.docx,.pdf,.html,.rtf,.txt"
                />

                {uploadedFileName && (
                  <div className="mt-5 flex items-center gap-3 p-3.5 bg-primary/5 rounded-lg border border-primary/10">
                    <FileText className="h-5 w-5 text-primary" />
                    <span className="text-sm font-medium">{uploadedFileName}</span>
                    <CheckCircle2 className="h-5 w-5 text-green-500 ml-auto" />
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Right Column - AI Content Generation */}
          <div className="flex flex-col h-full">
            <div className="mb-8">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-violet-500/10 rounded-lg">
                  <Sparkles className="h-6 w-6 text-violet-500" />
                </div>
                <h3 className="text-2xl font-bold">AI Content Generation</h3>
              </div>
              <p className="text-muted-foreground pl-11">
                Create compelling bullet points and professional summaries powered by ChatGPT. Showcase your experience with impact-driven language that recruiters love.
              </p>
            </div>

            <Card className="bg-background/80 backdrop-blur-sm border-border/50 shadow-lg rounded-xl flex-grow flex flex-col overflow-hidden transition-all duration-300 hover:shadow-xl">
              <CardContent className="p-6 flex flex-col flex-grow">
                <div className="space-y-5 flex flex-col flex-grow">
                  <div className="flex items-center justify-between">
                    <h4 className="font-semibold flex items-center gap-2">
                      <Brain className="h-4 w-4 text-violet-500" />
                      AI-Generated Content
                    </h4>
                    {isGenerating && (
                      <div className="flex items-center">
                        <div className="animate-pulse h-2 w-2 bg-violet-500 rounded-full mr-1"></div>
                        <div className="animate-pulse h-2 w-2 bg-violet-500 rounded-full mr-1 delay-75"></div>
                        <div className="animate-pulse h-2 w-2 bg-violet-500 rounded-full delay-150"></div>
                      </div>
                    )}
                  </div>

                  {isGenerating ? (
                    <div className="space-y-3 flex-grow flex items-center justify-center">
                      <div className="w-full">
                        <div className="flex items-center justify-center mb-4">
                          <Bot className="h-8 w-8 text-violet-500 animate-pulse" />
                        </div>
                        <div className="h-4 bg-muted rounded-lg w-4/5 animate-pulse mx-auto"></div>
                        <div className="h-4 bg-muted rounded-lg w-full animate-pulse mt-3"></div>
                        <div className="h-4 bg-muted rounded-lg w-3/4 animate-pulse mt-3 mx-auto"></div>
                        <div className="h-4 bg-muted rounded-lg w-5/6 animate-pulse mt-3 mx-auto"></div>
                      </div>
                    </div>
                  ) : generatedContent ? (
                    <div className="p-5 bg-muted/20 rounded-xl border flex-grow flex flex-col transition-all duration-300 hover:bg-muted/30">
                      <p className="text-sm mb-5 flex-grow leading-relaxed">{generatedContent}</p>
                      <div className="flex justify-between items-center">
                        <Button
                          variant="outline"
                          size="sm"
                          className="rounded-lg"
                          onClick={() =>
                            navigator.clipboard.writeText(generatedContent)
                          }
                        >
                          <Copy className="h-4 w-4 mr-2" />
                          Copy Content
                        </Button>
                        <div className="flex items-center text-xs text-muted-foreground">
                          <Sparkles className="h-3.5 w-3.5 mr-1 text-violet-500" />
                          Powered by AI
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="p-8 text-center border border-dashed border-muted-foreground/20 rounded-xl flex-grow flex flex-col items-center justify-center gap-4 group hover:border-violet-500/30 transition-colors">
                      <div className="p-3 bg-violet-500/10 rounded-full">
                        <Sparkles className="h-8 w-8 text-violet-500/70 group-hover:text-violet-500 transition-colors" />
                      </div>
                      <p className="text-muted-foreground text-sm max-w-[200px]">
                        Upload a resume to generate AI-powered content
                      </p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Additional Features Grid */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 bg-background/50 backdrop-blur-sm rounded-xl border border-border/50 shadow-sm hover:shadow-md transition-shadow">
            <div className="p-2.5 bg-blue-500/10 rounded-lg w-fit mb-4">
              <Bot className="h-6 w-6 text-blue-500" />
            </div>
            <h3 className="font-semibold text-lg mb-2">ATS Optimization</h3>
            <p className="text-muted-foreground text-sm">
              Ensure your resume passes through Applicant Tracking Systems with our intelligent keyword optimization.
            </p>
          </div>

          <div className="p-6 bg-background/50 backdrop-blur-sm rounded-xl border border-border/50 shadow-sm hover:shadow-md transition-shadow">
            <div className="p-2.5 bg-green-500/10 rounded-lg w-fit mb-4">
              <FileText className="h-6 w-6 text-green-500" />
            </div>
            <h3 className="font-semibold text-lg mb-2">Tailored Templates</h3>
            <p className="text-muted-foreground text-sm">
              Choose from professionally designed templates optimized for different industries and roles.
            </p>
          </div>

          <div className="p-6 bg-background/50 backdrop-blur-sm rounded-xl border border-border/50 shadow-sm hover:shadow-md transition-shadow">
            <div className="p-2.5 bg-amber-500/10 rounded-lg w-fit mb-4">
              <Sparkles className="h-6 w-6 text-amber-500" />
            </div>
            <h3 className="font-semibold text-lg mb-2">Smart Suggestions</h3>
            <p className="text-muted-foreground text-sm">
              Get real-time suggestions to improve your resume's impact and readability as you type.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}